# 가챠 글로우 리빌 (Expo / React Native Web)

서브컬쳐 모바일 게임 스타일의 캐릭터 뽑기 연출 컴포넌트입니다.
벚꽃잎이 떨어지는 배경 위에 중심부 광원(글로우)이 퍼지면서 캐릭터명과 레어도 텍스트가
확대·페이드인 되는 구조입니다. Expo SDK 49+ / `react-native-web` 기준으로 작성했습니다.

## 파일 구성

```
gacha-glow-reveal/
├── App.tsx                       # 데모 화면 (레어도 선택 + 다시뽑기 버튼)
└── components/
    ├── CherryBlossomFall.tsx     # 벚꽃잎 낙하 배경 레이어
    ├── GachaGlowReveal.tsx       # 광원 + 텍스트 리빌 메인 연출
    └── rarityTheme.ts            # N / R / SR / SSR 색상 테마 정의
```

## 설치

```bash
npx create-expo-app gacha-demo
cd gacha-demo
# 위 파일들을 그대로 복사해서 덮어쓰기

npx expo install expo-linear-gradient expo-font \
  @expo-google-fonts/black-han-sans @expo-google-fonts/hina-mincho

npx expo start --web
```

## 사용법

```tsx
import GachaGlowReveal from './components/GachaGlowReveal';

<GachaGlowReveal
  characterName="천계의 검성 세라핀"
  rarity="SSR"          // 'N' | 'R' | 'SR' | 'SSR'
  subtitle="획득!"
  onFinish={() => console.log('연출 끝')}
/>
```

`key` prop을 바꿔서 다시 마운트시키면 애니메이션이 처음부터 재생됩니다
(App.tsx의 "다시 뽑기" 버튼 참고).

## 폰트

게임 타이틀/연출 텍스트에는 굵고 강한 임팩트가 있는 디스플레이 폰트,
보조 문구에는 일본풍 세리프 폰트를 섞어 사용했습니다. 둘 다 Google Fonts의
무료 폰트이며 Expo 공식 `@expo-google-fonts` 패키지로 바로 불러올 수 있습니다.

| 용도 | 폰트 | 링크 | 패키지 |
|---|---|---|---|
| 캐릭터명 / 레어도 타이틀 | Black Han Sans | https://fonts.google.com/specimen/Black+Han+Sans | `@expo-google-fonts/black-han-sans` |
| 보조 문구 ("획득!" 등) | Hina Mincho | https://fonts.google.com/specimen/Hina+Mincho | `@expo-google-fonts/hina-mincho` |

더 화려한 한글 타이틀 폰트를 원한다면 누군에서 무료 라이선스를 확인 후
ttf 파일을 받아 `expo-font`의 `useFonts({ '폰트이름': require('./assets/fonts/...ttf') })`
형태로 직접 로드할 수도 있습니다 (예: Cafe24 Ohsquare, 도현체 계열 등 — 사이트:
https://noonnu.cc , 폰트별 라이선스 꼭 확인하세요).

## 레어도 테마 커스터마이징

`components/rarityTheme.ts`에서 등급별 글로우 색상, 꽃잎 색상, SSR 전용
화이트 플래시 여부(`flash`)를 한 곳에서 관리합니다. 색상만 바꿔서 자체 게임의
등급 컬러(예: UR=레인보우)를 추가하려면 `Rarity` 타입과 `RARITY_THEME` 객체에
키를 하나 더 추가하면 됩니다.

## 동작 원리 요약

1. `bgOpacity` — 검은 배경이 먼저 살짝 페이드인
2. (SSR만) `flashOpacity` — 화면 전체가 짧게 하얗게 번쩍였다가 사라짐 (임팩트 강조)
3. `glowOpacity` + `glowScale` — `expo-linear-gradient`로 만든 원형 그라데이션이
   확대되며 중심 광원처럼 퍼짐. 웹에서는 `filter: blur()`를 추가로 적용해 더 부드럽게 처리
4. `rayRotate` — 같은 원형 그라데이션을 회전시켜 빛줄기가 도는 느낌을 줌 (무한 루프)
5. `textOpacity` + `textScale` — 캐릭터명이 살짝 작은 상태에서 스프링으로 튀어 오르듯 확대
6. `sparkleOpacity` — 중심 주변에 작은 점들이 깜빡이며 반짝이는 효과 추가

## 성능 / 호환 메모

- `Animated` API의 `useNativeDriver: true`는 네이티브(iOS/Android)에서 GPU 가속되고,
  웹에서는 자동으로 무시되지만 애니메이션 자체는 정상 동작합니다.
- 벚꽃잎 개수(`count`)가 많을수록 화려하지만 저사양 기기/구형 브라우저에서는
  15~20개 정도로 줄이는 것을 권장합니다.
- `filter: blur()`는 웹 전용 처리이며 네이티브에서는 `Platform.select`로 분기해
  적용하지 않도록 되어 있습니다.

## 추가로 붙이면 좋은 효과 (여유가 될 때)

- **연출 사운드**: `expo-av`로 카드 등장 시 챠르륵/팡파레 사운드 재생
- **진동 피드백**: `expo-haptics`의 `notificationAsync(Success)`를 SSR 등장 직후 호출
- **카드 플립 리빌**: 텍스트 등장 후 캐릭터 일러스트 카드가 3D로 뒤집히며 공개되는
  2단계 연출 (`react-native-reanimated`의 `rotateY` interpolate로 구현 가능)
- **컨페티/별가루 폭발**: 중심 글로우가 터지는 순간 사방으로 흩어지는 파티클 버스트
  (현재 스파클은 고정 위치 깜빡임 → 위치 자체가 바깥으로 퍼지도록 확장하면 더 화려해짐)
- **레어도별 배경 차별화**: SSR/UR 등급에서는 벚꽃 대신 별빛이나 금빛 파티클로
  교체해 등급 간 시각적 차이를 더 크게 주는 것도 좋은 방향입니다.
