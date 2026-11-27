import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, DimensionValue } from 'react-native';
import Animated, { 
  FadeIn, 
  ZoomIn, 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming, 
  withDelay
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

// 💡 1. 하카리 테마 고유 SVG 아이콘 컴포넌트 정의
const CherryBlossomSvg = ({ size }: { size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* 부드러운 곡선의 벚꽃잎 모양 */}
    <Path
      d="M12 22C12 22 4 17 4 11C4 6.5 7.5 4 12 2C16.5 4 20 6.5 20 11C20 17 12 22 12 22Z"
      fill="#FFB7C5"
    />
  </Svg>
);

const HeartSvg = ({ size }: { size: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    {/* 러블리한 통통 하트 모양 */}
    <Path
      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      fill="#FF69B4"
    />
  </Svg>
);

// 흩날리는 요소들의 타입 정의
type PetalItem = {
  left: DimensionValue;
  size: number;
  delay: number;
  duration: number;
  type: 'blossom' | 'heart'; // 어떤 SVG를 그릴지 결정
};

// 💡 2. 벚꽃과 하트가 황금비율로 섞인 7인조 연출 명부
const CHERRY_BLOSSOMS: PetalItem[] = [
  { left: '10%', size: 24, delay: 0, duration: 4000, type: 'blossom' },
  { left: '30%', size: 28, delay: 500, duration: 5000, type: 'heart' },
  { left: '50%', size: 20, delay: 200, duration: 4500, type: 'blossom' },
  { left: '70%', size: 26, delay: 800, duration: 6000, type: 'blossom' },
  { left: '90%', size: 22, delay: 400, duration: 3500, type: 'heart' },
  { left: '25%', size: 24, delay: 1200, duration: 4800, type: 'blossom' },
  { left: '75%', size: 32, delay: 1500, duration: 5200, type: 'blossom' },
];

interface HakariEffectProps {
  children: React.ReactNode;
}

export default function HakariEffect({ children }: HakariEffectProps) {
  const { height } = useWindowDimensions();
  const [showCard, setShowCard] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCard(true);
    }, 2000); // 2초간 흩날림 연출 후 도화지 덧대기
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.background, { height }]}>
      {/* 🌸 1. 밑바탕 레이어: 은은한 아이보리 베이지 도화지 + 무한 낙하 SVG 연출 */}
      <View style={styles.baseLayer}>
        {CHERRY_BLOSSOMS.map((petal, index) => {
          const translateY = useSharedValue<number>(-50);
          const rotate = useSharedValue<number>(0);

          useEffect(() => {
            // 하늘에서 땅끝 아래까지 무한 루프 낙하
            translateY.value = withDelay(
              petal.delay,
              withRepeat(withTiming(height + 50, { duration: petal.duration }), -1, false)
            );
            // 뱅글뱅글 춤추는 회전 무한 루프
            rotate.value = withRepeat(
              withTiming(360, { duration: petal.duration }), -1, false
            );
          }, [height, petal.delay, petal.duration, rotate, translateY]);

          const animatedPetalStyle = useAnimatedStyle(() => ({
            transform: [
              { translateY: translateY.value },
              { rotate: `${rotate.value}deg` }
            ]
          }));

          return (
            <Animated.View 
              key={index} 
              style={[
                styles.petalWrapper, 
                animatedPetalStyle, 
                { left: petal.left }
              ]} 
            >
              {/* 💡 이식 완료: 타입에 맞는 벡터 고해상도 SVG를 실시간 렌더링 */}
              {petal.type === 'blossom' ? (
                <CherryBlossomSvg size={petal.size} />
              ) : (
                <HeartSvg size={petal.size} />
              )}
            </Animated.View>
          );
        })}

        {!showCard && (
          <Animated.Text entering={FadeIn.duration(800)} style={styles.introText}>
            사랑이 가득한 봄바람이 불어옵니다... 핑크빛 기류 포착! 💕
          </Animated.Text>
        )}
      </View>

      {/* 📄 2. 덧대는 레이어: 연출 종료 후 오차 없이 비치는 베이지막 얹기 */}
      {showCard && (
        <Animated.View entering={FadeIn.duration(500)} style={styles.overlayLayer}>
          <Animated.View entering={ZoomIn.duration(500).delay(100)} style={styles.cardContainer}>
            <Text style={styles.finalComment}>
              "냐하~♡ 당신과 나는 운명일 줄 알았어요 메로메로~"
            </Text>
            {/* 💳 공통 결과 카드 합체 수신처 */}
            {children}
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#FAF6EE', // 하카리 고유 은은베이지 톤
    width: '100%',
    overflow: 'hidden',
  },
  baseLayer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petalWrapper: {
    position: 'absolute',
    top: -60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FFB7C5', // SVG에 은은한 핑크빛 네온 아우라 부여
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  introText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#D4A373',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  overlayLayer: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(250, 246, 238, 0.94)', // 뒤의 낙하 효과들이 미세하게 레이어링 됨
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  cardContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  finalComment: {
    fontSize: 16,
    fontWeight: '700',
    color: '#C2479D',
    marginBottom: 20,
    backgroundColor: '#FFF1F2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#FCE7F3',
    textAlign: 'center',
  }
});