import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CherryBlossomFall from './CherryBlossomFall';
import { RARITY_THEME, Rarity } from './rarityTheme';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

type Props = {
  characterName: string;
  rarity: Rarity;
  subtitle?: string;
  /** 등장 애니메이션이 끝나면 호출됨 */
  onFinish?: () => void;
  /** 마운트 시 바로 재생할지 여부 (기본 true) */
  autoPlay?: boolean;
};

export default function GachaGlowReveal({
  characterName,
  rarity,
  subtitle = '획득!',
  onFinish,
  autoPlay = true,
}: Props) {
  const theme = RARITY_THEME[rarity];

  const bgOpacity = useRef(new Animated.Value(0)).current;
  const flashOpacity = useRef(new Animated.Value(0)).current;
  const glowScale = useRef(new Animated.Value(0)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(0.3)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const rayRotate = useRef(new Animated.Value(0)).current;
  const sparkleOpacity = useRef(new Animated.Value(0)).current;

  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    if (autoPlay) play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, characterName, rarity]);

  function play() {
    bgOpacity.setValue(0);
    flashOpacity.setValue(0);
    glowScale.setValue(0);
    glowOpacity.setValue(0);
    textScale.setValue(0.3);
    textOpacity.setValue(0);
    sparkleOpacity.setValue(0);
    setShowSubtitle(false);

    // 광선 회전은 계속 반복
    Animated.loop(
      Animated.timing(rayRotate, {
        toValue: 1,
        duration: 14000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const sequence = [
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 450,
        useNativeDriver: true,
      }),
    ];

    // SSR급은 등장 직전 화면 전체 화이트 플래시를 한 번 더 넣어 임팩트를 강조
    if (theme.flash) {
      sequence.push(
        Animated.sequence([
          Animated.timing(flashOpacity, {
            toValue: 0.9,
            duration: 120,
            useNativeDriver: true,
          }),
          Animated.timing(flashOpacity, {
            toValue: 0,
            duration: 380,
            useNativeDriver: true,
          }),
        ])
      );
    }

    sequence.push(
      Animated.parallel([
        Animated.timing(glowOpacity, {
          toValue: 1,
          duration: 380,
          useNativeDriver: true,
        }),
        Animated.spring(glowScale, {
          toValue: 1,
          friction: 5,
          tension: 60,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.spring(textScale, {
          toValue: 1,
          friction: 4,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.sequence(sequence).start(() => {
      setShowSubtitle(true);
      onFinish?.();
    });
  }

  const rayRotateDeg = rayRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: bgOpacity }]}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: '#0B0B14' }]} />

      {/* 배경 벚꽃잎 낙하 */}
      <CherryBlossomFall colors={theme.petalColors} count={26} />

      {/* 회전하는 빛줄기 */}
      <Animated.View
        style={[
          styles.rays,
          { opacity: glowOpacity, transform: [{ rotate: rayRotateDeg }] },
        ]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={[
            `${theme.glowColor}55`,
            'transparent',
            `${theme.glowColor}33`,
            'transparent',
          ]}
          style={styles.rayGradient}
        />
      </Animated.View>

      {/* 중심 광원(글로우) */}
      <Animated.View
        style={[
          styles.glowWrap,
          { opacity: glowOpacity, transform: [{ scale: glowScale }] },
        ]}
        pointerEvents="none"
      >
        <LinearGradient colors={theme.gradient} style={styles.glowCircle} />
      </Animated.View>

      {/* 반짝이는 스파클 파티클 */}
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: sparkleOpacity }]}
        pointerEvents="none"
      >
        <Sparkles color={theme.glowColor} />
      </Animated.View>

      {/* 캐릭터명 + 레어도 텍스트 */}
      <Animated.View
        style={{
          opacity: textOpacity,
          transform: [{ scale: textScale }],
          alignItems: 'center',
        }}
      >
        <Text
          style={[
            styles.rarityLabel,
            { color: theme.glowColor, textShadowColor: theme.glowColor },
          ]}
        >
          {theme.label}
        </Text>
        <Text style={[styles.nameText, { textShadowColor: theme.glowColor }]}>
          {characterName}
        </Text>
        {showSubtitle && (
          <Text style={[styles.subtitleText, { color: theme.accentColor }]}>
            {subtitle}
          </Text>
        )}
      </Animated.View>

      {/* SSR 전용 화이트 플래시 오버레이 */}
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: '#FFFFFF', opacity: flashOpacity },
        ]}
      />
    </Animated.View>
  );
}

function Sparkles({ color }: { color: string }) {
  return (
    <>
      {Array.from({ length: 14 }).map((_, i) => (
        <Sparkle key={i} color={color} index={i} />
      ))}
    </>
  );
}

function Sparkle({ color, index }: { color: string; index: number }) {
  const anim = useRef(new Animated.Value(0)).current;
  const angle = (index / 14) * Math.PI * 2;
  const radius = 90 + (index % 3) * 40;
  const x = SCREEN_W / 2 + Math.cos(angle) * radius;
  const y = SCREEN_H / 2 + Math.sin(angle) * radius * 0.6;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 900 + index * 50,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 900 + index * 50,
          useNativeDriver: true,
        }),
      ])
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1.2] });
  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: color,
        opacity,
        transform: [{ scale }],
      }}
    />
  );
}

const webBlur = Platform.OS === 'web' ? ({ filter: 'blur(30px)' } as any) : {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  rays: {
    position: 'absolute',
    width: SCREEN_W * 1.6,
    height: SCREEN_W * 1.6,
  },
  rayGradient: {
    flex: 1,
    borderRadius: SCREEN_W,
  },
  glowWrap: {
    position: 'absolute',
    width: 420,
    height: 420,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
    ...webBlur,
  },
  rarityLabel: {
    fontFamily: 'BlackHanSans_400Regular',
    fontSize: 28,
    letterSpacing: 4,
    marginBottom: 4,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  nameText: {
    fontFamily: 'BlackHanSans_400Regular',
    fontSize: 44,
    color: '#FFFFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 24,
  },
  subtitleText: {
    fontFamily: 'HinaMincho_400Regular',
    fontSize: 18,
    marginTop: 8,
    letterSpacing: 2,
  },
});
