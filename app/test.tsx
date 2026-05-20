import React, { useRef, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, useWindowDimensions, StyleSheet } from 'react-native';
import { questions, Question } from '../question';
import Inform from '../components/Modal';
import { useInform } from '../hooks';
import { router } from 'expo-router';
import { Heart } from 'lucide-react-native';

const SurveyFlatList = () => {
  const { height } = useWindowDimensions()
  const flatListRef = useRef<FlatList>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const inform = useInform(false)
  const finishAllAnswerInform = useInform(false)

  const OPTION_LEVELS = {
    '너무 좋아': 2,
    '좋아': 1,
    '보통': 0,
    '싫어': -1,
    '너무 싫어': -2,
  } as const;

  const handleSelect = (questionId: number, value: number, index: number) => {
  // 1. 현재 선택을 포함한 최신 답변 객체를 미리 만듭니다. (비동기 문제 해결)
  const currentAnswers = { ...answers, [questionId]: value };
  setAnswers(currentAnswers);

  // 2. 모든 답변이 완료되었는지 확인 (currentAnswers 기준)
  // 질문 ID가 0부터 시작한다면 i, 1부터 시작한다면 i + 1로 수정하세요.
  const isAllAnswered = questions.every(q => q.id in currentAnswers);

  if (index < questions.length - 1) {
    flatListRef.current?.scrollToIndex({
      index: index + 1,
      animated: true,
    });
  } 
  else if (isAllAnswered) {
    // 마지막 문항이고 모든 답변이 완료된 경우
    handleFinish(currentAnswers);
  }
  else {
    // 마지막 문항인데 아직 빠진 답변이 있는 경우
    finishAllAnswerInform.openInform(); // 괄호 () 추가 필수!
  }};

  const handleFinish = (finalAnswers: Record<number, number>) => {
    
    // 여기에 결과 계산 로직 및 router 이동 추가
    inform.openInform()
    return
  };

  const renderItem = ({ item, index }: { item: Question, index: number }) => (
    <View style={[styles.page, { height }]}>
      <View style={styles.card}>
        <Text style={styles.questionNumber}>{index + 1} / {questions.length}</Text>
        <Text style={styles.questionText}>{item.question}</Text>
        
        {Object.entries(OPTION_LEVELS).map(([label, score]) => {
  // 1. 현재 질문(item.id)에 해당하는 답변이 저장된 점수와 일치하는지 확인
          const isSelected = answers[item.id] === score;

          return (
            <TouchableOpacity 
              key={label} 
              // 2. 선택 여부에 따른 스타일 분기 (예: styles.selectedButton 추가)
              style={[styles.button, isSelected && styles.selectedButton]}
              activeOpacity={0.7}
              onPress={() => handleSelect(item.id, score, index)}
            >
              <Text style={[styles.buttonText, isSelected && styles.selectedButtonText]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
              </View>

    <Inform
      visible= {inform.value}
      onClose={inform.closeInform}
      title='100그녀 인물 검사 종료!'
      message='결과 확인하러 가기'
    />

    <Inform
      visible= {finishAllAnswerInform.value}
      onClose={()=>{
        finishAllAnswerInform.closeInform();
        router.replace('/result');
      }}
      title='검사 미완료!'
      message="빠트린 검사 항목이 있습니다. 모든 검사에 응답해주세요. 해당 사항이 없는 경우 '보통'을 눌러주세요"
    />  
    </View>
  );

  const TestGuide = () => (
    <View style={[styles.page, { height }]}>
      <View style={styles.guideBox}>
        <View style={{flexDirection:'row', justifyContent: 'center', marginBottom: 15, alignItems:'center'}}>
          <Heart color={'#f00'} fill={'#f00'} style={{marginRight: 10}}/>
          <Text style={styles.guideTitle}>100그녀 테스트 안내사항</Text>
          <Heart color={'#f00'} fill={'#f00'} style={{marginLeft: 10}}/>
        </View>
        <Text style={styles.guideText}>
          {'상하 스크롤해서 전/후 질문창으로 넘어갈 수 있습니다.\n질문에 답변시 자동으로 다음 질문으로 넘어갑니다.\n\n모든 질문은 상황, 질문, 답변 5개로 구성됩니다.\n상황을 확인하고 질문에 가장 알맞다 생각되는 답변을 골라주세요!'}
        </Text>
      </View>
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={questions}
      renderItem={renderItem}
      ListHeaderComponent={TestGuide}
      keyExtractor={(item) => item.id.toString()}
      pagingEnabled
      scrollEnabled={true} // 버튼 클릭 유도를 위해 스크롤은 막는 것을 권장합니다
      getItemLayout={(_, index) => ({
        length: height,
        offset: height * index,
        index,
      })}
    />
  );
};

export default SurveyFlatList;

const styles = StyleSheet.create({
  page: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC', // 배경색 살짝 추가
  },
  card: {
    width: '90%',
    maxWidth: 500, // 웹 대응을 위한 맥스 사이즈
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 24,
    // 그림자 효과 (iOS/Web용)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    // 그림자 효과 (Android용)
    elevation: 5,
  },
  questionNumber: { fontSize: 16, color: '#94A3B8', marginBottom: 8, fontWeight: '600' },
  questionText: { fontSize: 24, fontWeight: 'bold', color: '#1E293B', textAlign: 'center', marginBottom: 40 },
  button: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    marginBottom: 12,
  },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: '600' },
  selectedButton: {
    width: '100%',
    paddingVertical: 16,
    backgroundColor: '#e54646',
    borderRadius: 16,
    marginBottom: 12,
  },
  selectedButtonText: { color: '#fff', fontSize: 20, textAlign: 'center', fontWeight: '600' },
  guideBox: {
    backgroundColor: '#e3f2fd', // 연한 푸른빛 배경
    padding: 16,
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#90caf9',
  },
  guideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0d47a1',
  },
  guideText: {
    fontSize: 15,
    color: '#1565c0',
    lineHeight: 20,
  },
});