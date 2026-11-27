import React from 'react';

// 💡 100명의 컴포넌트를 미리 로드하지 않고, 경로만 매핑해 둡니다.
export const EFFECT_LAZY_COMPONENTS: Record<string, () => Promise<{ default: React.ComponentType<any> }>> = {
  karane: () => import('./Karane'),
  hakari: () => import('./Hakari'),
  rentaro: () => import('./Rentaro')
};