import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { 
  ZoomIn, 
  FadeIn, 
  BounceIn,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  useSharedValue
} from 'react-native-reanimated';

// 💡 광고 카피처럼 한 글자/단어씩 파바박 치고 빠지는 체인 데이터
// 스타일에 변화를 주어 '쭈굴쭈굴함'과 '강인함(분노)'을 연출합니다.
const AD_CHAIN_TEXTS = [
  { text: '뭐', size: 50, rotate: '-15deg', weight: '900', color: '#FF3366', delay: 250 },
  { text: '라', size: 65, rotate: '10deg', weight: '900', color: '#FF3366', delay: 200 },
  { text: '고', size: 80, rotate: '-5deg', weight: '900', color: '#DC2626', delay: 250 },
  { text: '❓', size: 90, rotate: '20deg', weight: '900', color: '#DC2626', delay: 300 },
  
  { text: '나랑', size: 32, rotate: '-5deg', weight: '400', color: '#475569', delay: 300 }, // 약간 소심(쭈굴)
  { text: '똑같은', size: 36, rotate: '5deg', weight: '500', color: '#334155', delay: 300 },
  { text: '유형', size: 45, rotate: '-10deg', weight: '700', color: '#1E293B', delay: 350 },
  { text: '이라니..', size: 28, rotate: '15deg', weight: '300', color: '#64748B', delay: 400 }, // 말끝 흐리기(쭈굴)

  { text: '하', size: 30, rotate: '-20deg', weight: '300', color: '#FF5E84', delay: 200 },
  { text: '지', size: 35, rotate: '10deg', weight: '500', color: '#FF5E84', delay: 200 },
  { text: '만', size: 40, rotate: '-5deg', weight: '700', color: '#FF5E84', delay: 250 },
  
  { text: '하', size: 42, rotate: '5deg', weight: '600', color: '#E11D48', delay: 250 },
  { text: '나', size: 48, rotate: '-10deg', weight: '700', color: '#E11D48', delay: 200 },
  { text: '도', size: 55, rotate: '15deg', weight: '800', color: '#E11D48', delay: 250 },
  
  { text: '안', size: 38, rotate: '-5deg', weight: '400', color: '#475569', delay: 200 },
  { text: '신기하거든', size: 50, rotate: '12deg', weight: '900', color: '#EA580C', delay: 400 },
  { text: '‼️', size: 75, rotate: '-15deg', weight: '900', color: '#DC2626', delay: 350 },

  { text: '바', size: 70, rotate: '-25deg', weight: '900', color: '#DC2626', delay: 180 }, // 초고속 피날레 타격
  { text: '보', size: 95, rotate: '20deg', weight: '900', color: '#DC2626', delay: 200 },
  { text: '야', size: 120, rotate: '-5deg', weight: '900', color: '#DC2626', delay: 400 },
];

export default function KaraneEffect({ children }: { children: React.ReactNode }) {
  const { height } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCard, setShowCard] = useState(false);

  // 글자가 나타날 때마다 꿀렁거리는 텍스트 자체 애니메이션 효과용 셰어드 밸류
  const textScale = useSharedValue(0.5);
  const textShake = useSharedValue(0);

  useEffect(() => {
    if (currentIndex < AD_CHAIN_TEXTS.length) {
      // 새로운 단어가 등장할 때 팡! 튀겨주는 애니메이션 자극
      textScale.value = 0.4;
      textScale.value = withSpring(1, { damping: 8, stiffness: 200 });
      
      // 글자 속성에 따라 미세하게 진동(난리치기) 효과 부여
      textShake.value = withSequence(withTiming(-6, { duration: 40 }), withTiming(6, { duration: 40 }), withTiming(0, { duration: 40 }));

      const timer = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, AD_CHAIN_TEXTS[currentIndex].delay);

      return () => clearTimeout(timer);
    } else {
      // 모든 체인 텍스트 전개가 끝나면 카드 노출
      setShowCard(true);
    }
  }, [currentIndex]);

  // 난리 치는 텍스트 스타일 런타임 적용
  const animatedTextProps = useAnimatedStyle(() => ({
    transform: [
      { scale: textScale.value },
      { translateX: textShake.value }
    ]
  }));

  const currentText = AD_CHAIN_TEXTS[currentIndex];

  return (
    <View style={[styles.background, { height }]}>
      {/* 츤데레 레이더형 백그라운드 데코 */}
      <View style={[styles.bgCircle, { top: -40, left: -40, backgroundColor: '#FFE4E6', transform: [{ scale: showCard ? 1.5 : 1 }] }]} />
      <View style={[styles.bgCircle, { bottom: -80, right: -40, backgroundColor: '#FFF1F2' }]} />

      {/* 1. 타이핑 체인 전개 구간 (단 하나의 단어만 쾅! 찍고 다음으로 체인 체인지) */}
      {!showCard && currentText && (
        <Animated.View style={[styles.textFrame, animatedTextProps]}>
          <Text
            style={[
              styles.adText,
              {
                fontSize: currentText.size,
                fontWeight: currentText.weight as any,
                color: currentText.color,
                transform: [{ rotate: currentText.rotate }],
              },
            ]}
          >
            {currentText.text}
          </Text>
        </Animated.View>
      )}

      {/* 2. 전개가 끝난 후 최종 카드 규격 리턴 */}
      {showCard && (
        <Animated.View entering={ZoomIn.duration(450)} style={styles.cardContainer}>
          <Animated.Text entering={FadeIn.delay(200)} style={styles.finalComment}>
            "흥, 딱히 같이 있고 싶어서 기다린 거 아니니까!"
          </Animated.Text>
          {children}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  bgCircle: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    opacity: 0.5,
  },
  textFrame: {
    width: '90%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  adText: {
    textAlign: 'center',
    // 서체 왜곡을 다이내믹하게 보이게 하기 위해 텍스트 섀도우 연출 추가
    textShadowColor: 'rgba(225, 29, 72, 0.15)',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 2,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  finalComment: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E11D48',
    marginBottom: 20,
    fontStyle: 'italic',
    backgroundColor: '#FFE4E6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FDA4AF',
    textAlign: 'center',
  }
});