import React, { useRef, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity, useWindowDimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { questions as originalQuestions } from '../src/data/questionData';
import { Question } from '../src/types/question';
import Inform from '../src/components/Inform';
import AnswerButton from '../src/components/AnswerButton';
import { useInform } from '../src/hooks/useInform';
import { router } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { encodeAnswers } from '../src/utils/election';

type ListItem = { isGuide: true; id: string } | (Question & { isGuide?: false });

const SurveyFlatList = () => {
  const { height } = useWindowDimensions();
  const flatListRef = useRef<FlatList<ListItem>>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const testNotFinishedInform = useInform(false);
  const finishAllAnswerInform = useInform(false);

  const combinedData: ListItem[] = [{ isGuide: true, id: 'guide' }, ...originalQuestions];

  const getMissedQuestionNumbers = (currentAnswers: Record<number, number> = answers): string => {
    const missed = originalQuestions
      .filter((q) => !(q.id in currentAnswers))
      .map((q) => q.id);
    return missed.length > 0 ? `${missed.join(', ')}번` : '';
  };

  const handleSelect = (questionId: number, answerId: number, currentIndex: number) => {
    const currentAnswers = { ...answers, [questionId]: answerId };
    setAnswers(currentAnswers);

    const isAllAnswered = originalQuestions.every((q) => q.id in currentAnswers);

    if (currentIndex < combinedData.length - 1 && !isAllAnswered) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else if (isAllAnswered) {
      finishAllAnswerInform.openInform();
    } else {
      // 마지막 질문에 답했지만 빠진 질문이 있는 경우 | last question answered but some are missing
      testNotFinishedInform.openInform();
    }
  };

  const goToResult = () => {
    finishAllAnswerInform.closeInform();
    router.replace({ pathname: '/result', params: { answers: encodeAnswers(answers) } });
  };

  const renderGuideItem = () => (
    <View style={[styles.page, { height }]}>
      <View style={styles.guideBox}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15, alignItems: 'center' }}>
          <Heart color={'#f00'} fill={'#f00'} style={{ marginRight: 10 }} />
          <Text style={styles.guideTitle}>100그녀 테스트 안내사항</Text>
          <Heart color={'#f00'} fill={'#f00'} style={{ marginLeft: 10 }} />
        </View>
        <Text style={styles.guideText}>
          <Text style={styles.highlightText}>상하 스크롤</Text>
          해서 전/후 질문창으로 넘어갈 수 있습니다. {'\n'}
          질문에 답변시 자동으로 다음 질문으로 넘어갑니다. {'\n'}{'\n'}
          모든 질문은{' '}
          <Text style={styles.highlightText}>상황</Text>,{' '}
          <Text style={styles.highlightText}>질문</Text>,{' '}
          <Text style={styles.highlightText}>답변 5개</Text>로 구성됩니다. {'\n'}
          <Text style={styles.highlightText}>상황</Text>을 확인하고{' '}
          <Text style={styles.highlightText}>질문</Text>에 가장 알맞다 생각되는{' '}
          <Text style={styles.highlightText}>답변</Text>을 골라주세요! {'\n'}{'\n'}
        </Text>

        <TouchableOpacity
          style={styles.startButton}
          onPress={() => flatListRef.current?.scrollToIndex({ index: 1, animated: true })}
        >
          <Text style={styles.startButtonText}>테스트 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderQuestionItem = (item: Question, index: number) => (
    <View style={[styles.page, { height }]}>
      <View style={styles.card}>
        <Text style={styles.questionNumber}>{item.id} / {originalQuestions.length}</Text>
        <Text style={styles.situationText}>{item.situation}</Text>
        <Text style={styles.questionText}>{item.question}</Text>

        {item.answers.map((ans) => {
          const isSelected = answers[item.id] === ans.id;

          return (
            <AnswerButton
              key={ans.id}
              answer={ans.answer}
              selected={isSelected}
              onPress={() => handleSelect(item.id, ans.id, index)}
            />
          );
        })}
      </View>
    </View>
  );

  return (
    <>
      <FlatList
        ref={flatListRef}
        data={combinedData}
        renderItem={({ item, index }) => (item.isGuide ? renderGuideItem() : renderQuestionItem(item, index))}
        keyExtractor={(item) => (item.isGuide ? item.id : item.id.toString())}
        pagingEnabled
        scrollEnabled
        getItemLayout={(_, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
      />
  
      <Inform
        visible={testNotFinishedInform.value}
        onClose={testNotFinishedInform.closeInform}
        title='검사 미완료!'
        message={`[누락 항목: ${getMissedQuestionNumbers()}]\n\n빠트린 검사 항목이 있습니다. 모든 검사에 응답해주세요. 해당 사항이 없는 경우 다른 항목을 선택해주세요.`}
      />
  
      <Inform
        visible={finishAllAnswerInform.value}
        onClose={goToResult}
        title='100그녀 인물 검사 종료!'
        message='결과 확인하러 가기'
      />
    </>
  );
};

export default SurveyFlatList;

const styles = StyleSheet.create({
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  card: {
    width: '90%',
    maxWidth: 500,
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  questionNumber: { fontSize: 16, color: '#94A3B8', marginBottom: 8, fontWeight: '600' },
  situationText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  questionText: { fontSize: 24, fontWeight: 'bold', color: '#1E293B', textAlign: 'center', marginBottom: 40 },
  guideBox: {
    width: '90%',
    maxWidth: 500,
    backgroundColor: '#e3f2fd',
    padding: 24,
    borderRadius: 24,
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
    color: '#334155',
    lineHeight: 24,
  },
  highlightText: {
    fontWeight: 'bold',
    color: '#0d47a1',
    fontSize: 16,
  },
  startButton: {
    marginTop: 20,
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    borderRadius: 16,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});
