import { CharacteristicType } from './question';

// 캐릭터 / 사용자의 성향 프로필 | trait profile of a character or a user
// OCEAN 각 항목은 -2 ~ 2, madness는 0 ~ 1 범위 | OCEAN traits range -2..2, madness ranges 0..1
export type TraitProfile = Record<CharacteristicType, number> & {
  madness: number;
};

// 투표 후보(여친) 정의 | define a candidate (girlfriend) for the vote
export type Character = {
  id: string;
  name: string;
  description: string;
  tag: string;
  color: string;
  iconColor: string;
  profile: TraitProfile;
};
