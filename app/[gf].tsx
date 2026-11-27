import React, { useMemo, Suspense } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import ResultCard from '../src/components/CharacterCard';
import { EFFECT_LAZY_COMPONENTS } from '../src/components/resultEffect/index.';
import NanoEffect from '../src/components/resultEffect/Rentaro'; // fallback용 기본 컴포넌트
import { girlfriends } from '../src/data/girlfriendsData'

export default function ResultScreen() {
  const { gf } = useLocalSearchParams<{ gf: string }>();

  // 💡 [수정] gf(id) 값에 맞는 세부 정보를 데이터셋에서 찾아옵니다.
  const characterInfo = girlfriends.find((g) => g.name.includes(gf)) || {
    name: gf || '???',
    description: '결과 데이터를 불러올 수 없습니다.',
    tag: '미확인',
    color: '#F1F5F9',
    iconColor: '#64748B'
  };

  // 💡 [수정] CharacterCardProps 규격에 맞춰서 props를 전달합니다.
  const renderCard = (
    <ResultCard 
      id={gf}
      name={characterInfo.name}
      description={characterInfo.description}
      tag={characterInfo.tag}
      color={characterInfo.color}
      iconColor={characterInfo.iconColor}
      onAnalyze={() => console.log('성향 분석 클릭')}
      onDetails={() => console.log('가중치 정보 클릭')}
    />
  );

  // 💡 현재 캐릭터에 맞는 컴포넌트를 메모리 낭비 없이 "그때그때" 동적 로드 (수정 없음)
  const ChosenEffect = useMemo(() => {
    const importFunc = EFFECT_LAZY_COMPONENTS[gf];
    if (!importFunc) return NanoEffect; // 없으면 기본값
    
    return React.lazy(importFunc);
  }, [gf]);

  return (
    // 컴포넌트 파일을 읽어오는 아주 짧은 순간 동안 보일 로딩 스피너 설정 (수정 없음)
    <Suspense fallback={
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#3ac7c7' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    }>
      <ChosenEffect>
        {renderCard}
      </ChosenEffect>
    </Suspense>
  );
}