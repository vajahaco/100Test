export type Rarity = 'N' | 'R' | 'SR' | 'SSR';

type RarityConfig = {
  label: string;
  glowColor: string;
  accentColor: string;
  // 중심부 광원 그라데이션 (안쪽 -> 바깥쪽 -> 투명)
  gradient: [string, string, string];
  petalColors: string[];
  // SSR처럼 화면을 한 번 더 강하게 플래시할지 여부
  flash: boolean;
};

export const RARITY_THEME: Record<Rarity, RarityConfig> = {
  N: {
    label: 'N',
    glowColor: '#CFD8DC',
    accentColor: '#90A4AE',
    gradient: ['#ECEFF1', '#B0BEC5', 'transparent'],
    petalColors: ['#E0E0E0', '#ECEFF1'],
    flash: false,
  },
  R: {
    label: 'R',
    glowColor: '#4FC3F7',
    accentColor: '#0288D1',
    gradient: ['#E1F5FE', '#4FC3F7', 'transparent'],
    petalColors: ['#81D4FA', '#B3E5FC'],
    flash: false,
  },
  SR: {
    label: 'SR',
    glowColor: '#CE93D8',
    accentColor: '#8E24AA',
    gradient: ['#F3E5F5', '#CE93D8', 'transparent'],
    petalColors: ['#F8BBD0', '#E1BEE7'],
    flash: false,
  },
  SSR: {
    label: 'SSR',
    glowColor: '#FFD54F',
    accentColor: '#FF6F00',
    gradient: ['#FFF8E1', '#FFD54F', 'transparent'],
    petalColors: ['#FFE082', '#FFCC80'],
    flash: true,
  },
};
