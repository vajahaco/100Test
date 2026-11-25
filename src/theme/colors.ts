// 앱 전체 색상 팔레트: 따뜻한 크림 배경 + 코랄 메인 + 민트 포인트
// app-wide palette: warm cream background, coral primary, fresh mint accent
export const colors = {
  background: '#FFF8F2', // 크림 배경
  surface: '#FFFFFF',
  line: '#F7E9DF', // 연한 테두리 / 보조 면
  lineStrong: '#EEDCCF',

  ink: '#3D2C2E', // 제목, 본문 강조
  inkSoft: '#6B5856', // 본문
  muted: '#9C8682', // 보조 텍스트
  subtle: '#B9A6A0', // 힌트, 캡션
  faint: '#E3D3CB', // 화살표 등 아주 흐린 요소

  primary: '#EF6B57', // 코랄
  primarySoft: '#FFEDE7',
  heart: '#F25C7A',
  heartSoft: '#FFEEF1',

  mint: '#22A88F',
  mintSoft: '#E2F6F0',
  mintLine: '#BDE9DD',
  mintInk: '#17806C',

  sun: '#F2A93B',
  sunSoft: '#FFF4DC',
  sunBright: '#FFCF5C',
  sunInk: '#B7791F',

  overlay: 'rgba(61, 44, 46, 0.22)',
  shadow: '#C98B6B',
} as const;
