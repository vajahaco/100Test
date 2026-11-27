import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native';

type Petal = {
  id: number;
  startX: number;
  size: number;
  duration: number;
  delay: number;
  swayRange: number;
  opacity: number;
  rotateDir: 1 | -1;
};

type Props = {
  count?: number;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
};

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * 화면 위에서 벚꽃잎이 흩날리며 떨어지는 배경 레이어.
 * pointerEvents="none" 이므로 하위 UI 터치를 막지 않는다.
 */
export default function CherryBlossomFall({
  count = 24,
  colors = ['#FFB7C5', '#FFC9D6', '#FFE1EA'],
  minSize = 10,
  maxSize = 22,
  minDuration = 7000,
  maxDuration = 13000,
}: Props) {
  const petals: Petal[] = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        startX: randomBetween(0, SCREEN_W),
        size: randomBetween(minSize, maxSize),
        duration: randomBetween(minDuration, maxDuration),
        delay: randomBetween(0, maxDuration),
        swayRange: randomBetween(20, 60),
        opacity: randomBetween(0.55, 1),
        rotateDir: Math.random() > 0.5 ? 1 : -1,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count]
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {petals.map((p, idx) => (
        <PetalView key={p.id} petal={p} color={colors[idx % colors.length]} />
      ))}
    </View>
  );
}

function PetalView({ petal, color }: { petal: Petal; color: string }) {
  const fall = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let mounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const loop = () => {
      fall.setValue(0);
      Animated.timing(fall, {
        toValue: 1,
        duration: petal.duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished && mounted) loop();
      });
    };

    timeoutId = setTimeout(loop, petal.delay);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const translateY = fall.interpolate({
    inputRange: [0, 1],
    outputRange: [-40, SCREEN_H + 40],
  });

  const translateX = fall.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [
      petal.startX,
      petal.startX + petal.swayRange,
      petal.startX - petal.swayRange,
      petal.startX + petal.swayRange / 2,
      petal.startX,
    ],
  });

  const rotate = fall.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', `${petal.rotateDir * 360}deg`],
  });

  return (
    <Animated.View
      style={[
        styles.petal,
        {
          width: petal.size,
          height: petal.size,
          backgroundColor: color,
          opacity: petal.opacity,
          transform: [{ translateX }, { translateY }, { rotate }],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  // border-radius 비율을 다르게 줘서 사각형 대신 '꽃잎' 형태로 보이게 함
  petal: {
    position: 'absolute',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
});
