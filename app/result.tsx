import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Crown, Heart, RotateCcw, Home, Vote, BarChart3 } from 'lucide-react-native';
import ScreenHeader from '../src/components/ScreenHeader';
import { questions } from '../src/data/questionData';
import {
  TRAIT_KEYS,
  TRAIT_LABELS,
  TraitKey,
  decodeAnswers,
  formatVotes,
  runElection,
} from '../src/utils/election';

const goHome = () => router.replace('/');
const retryTest = () => router.replace('/test');

// 성향 막대 (-2 ~ 2는 가운데 기준, madness 0 ~ 1은 왼쪽 기준)
const TraitBar = ({ traitKey, value }: { traitKey: TraitKey; value: number }) => {
  const label = TRAIT_LABELS[traitKey];
  const isMadness = traitKey === 'madness';
  const ratio = isMadness ? Math.min(Math.max(value, 0), 1) : Math.min(Math.abs(value) / 2, 1);
  const positive = value >= 0;
  const displayValue = isMadness ? `${Math.round(value * 100)}%` : value.toFixed(2);

  return (
    <View style={styles.traitRow}>
      <View style={styles.traitHeader}>
        <Text style={styles.traitName}>{label.name}</Text>
        <Text style={styles.traitValue}>{displayValue}</Text>
      </View>
      <View style={styles.traitTrack}>
        {isMadness ? (
          <View style={[styles.traitFill, styles.madnessFill, { left: 0, width: `${ratio * 100}%` }]} />
        ) : (
          <>
            <View style={styles.traitCenter} />
            <View
              style={[
                styles.traitFill,
                positive ? styles.positiveFill : styles.negativeFill,
                positive ? { left: '50%' } : { right: '50%' },
                { width: `${ratio * 50}%` },
              ]}
            />
          </>
        )}
      </View>
      <View style={styles.traitHeader}>
        <Text style={styles.traitEdge}>{label.low}</Text>
        <Text style={styles.traitEdge}>{label.high}</Text>
      </View>
    </View>
  );
};

const ResultScreen = () => {
  const params = useLocalSearchParams<{ answers?: string }>();
  const code = Array.isArray(params.answers) ? params.answers[0] : params.answers;

  const result = useMemo(() => {
    const answers = decodeAnswers(code);
    return answers ? runElection(answers) : null;
  }, [code]);

  if (!result) {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <ScreenHeader title="검사 결과" onBack={goHome} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>결과를 찾을 수 없어요</Text>
          <Text style={styles.emptyText}>
            검사를 끝까지 마쳐야 결과를 볼 수 있습니다.{'\n'}처음부터 다시 검사해 주세요!
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={retryTest} activeOpacity={0.8}>
            <RotateCcw size={18} color="#fff" />
            <Text style={styles.primaryButtonText}>검사하러 가기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const { winner, ranking, userProfile, totalVotes, abstentions } = result;
  const maxSupport = Math.max(...ranking.map((c) => c.supportRate), 1);
  const formatSupport = (rate: number) => `${Math.round(rate * 100)}%`;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <ScreenHeader title="검사 결과" onBack={goHome} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 당선 카드 | winner card */}
        <View style={[styles.winnerCard, { borderColor: winner.character.iconColor }]}>
          <View style={styles.crownBadge}>
            <Crown size={16} color="#CA8A04" fill="#FACC15" />
            <Text style={styles.crownText}>당선!</Text>
          </View>
          <View style={[styles.winnerIcon, { backgroundColor: winner.character.color }]}>
            <Heart size={44} color={winner.character.iconColor} fill={winner.character.iconColor} />
          </View>
          <Text style={styles.winnerLabel}>당신과 가장 닮은 여친은</Text>
          <Text style={[styles.winnerName, { color: winner.character.iconColor }]}>
            {winner.character.name}
          </Text>
          <View style={styles.tagBadge}>
            <Text style={styles.tagText}>{winner.character.tag}</Text>
          </View>
          <Text style={styles.winnerDescription}>{winner.character.description}</Text>

          <View style={styles.winnerStats}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {formatVotes(winner.votes)}
                <Text style={styles.statUnit}> 표</Text>
              </Text>
              <Text style={styles.statLabel}>득표</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{formatSupport(winner.supportRate)}</Text>
              <Text style={styles.statLabel}>지지율</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {winner.matchRate}
                <Text style={styles.statUnit}> %</Text>
              </Text>
              <Text style={styles.statLabel}>성향 일치율</Text>
            </View>
          </View>
        </View>

        {/* 개표 결과 | vote count */}
        <View style={styles.sectionHeader}>
          <Vote size={18} color="#4F46E5" />
          <Text style={styles.sectionHeading}>개표 결과</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.cardCaption}>
            답변 {questions.length}개가 각각 가장 닮은 여친에게 한 표씩 투표했어요.{'\n'}
            유효표 {totalVotes}표 · 무효표 {abstentions}표{'\n'}
            당선은 <Text style={styles.captionStrong}>지지율</Text>(득표 ÷ 아무렇게나 답했을 때의 기대 득표)로
            정해서, 질문지에 선택지가 많은 여친이 유리하지 않게 했어요.
          </Text>
          {ranking.map((candidate, index) => (
            <View key={candidate.character.id} style={styles.rankRow}>
              <Text style={[styles.rankNumber, index === 0 && styles.rankNumberFirst]}>{index + 1}</Text>
              <View style={styles.rankBody}>
                <View style={styles.rankHeader}>
                  <Text style={styles.rankName} numberOfLines={1}>
                    {candidate.character.name}
                  </Text>
                  <Text style={styles.rankVotes}>지지율 {formatSupport(candidate.supportRate)}</Text>
                </View>
                <View style={styles.voteTrack}>
                  <View
                    style={[
                      styles.voteFill,
                      {
                        width: `${(candidate.supportRate / maxSupport) * 100}%`,
                        backgroundColor: candidate.character.iconColor,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.rankMatch}>
                  {formatVotes(candidate.votes)}표 (기대 {candidate.expectedVotes.toFixed(1)}표) · 성향 일치율{' '}
                  {candidate.matchRate}%
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* 나의 성향 | my traits */}
        <View style={styles.sectionHeader}>
          <BarChart3 size={18} color="#4F46E5" />
          <Text style={styles.sectionHeading}>나의 성향 분석</Text>
        </View>
        <View style={styles.infoCard}>
          {TRAIT_KEYS.map((key) => (
            <TraitBar key={key} traitKey={key} value={userProfile[key]} />
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={retryTest} activeOpacity={0.8}>
          <RotateCcw size={18} color="#fff" />
          <Text style={styles.primaryButtonText}>다시 검사하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={goHome} activeOpacity={0.8}>
          <Home size={18} color="#4F46E5" />
          <Text style={styles.secondaryButtonText}>처음으로</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  winnerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 2,
    padding: 24,
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  crownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
  },
  crownText: {
    marginLeft: 6,
    color: '#A16207',
    fontWeight: '800',
    fontSize: 13,
  },
  winnerIcon: {
    width: 88,
    height: 88,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  winnerLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 6,
  },
  winnerName: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 10,
    textAlign: 'center',
  },
  tagBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 14,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  winnerDescription: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  winnerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingVertical: 14,
    width: '100%',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#E2E8F0',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E293B',
  },
  statUnit: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  statLabel: {
    marginTop: 2,
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 4,
  },
  sectionHeading: {
    marginLeft: 8,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#334155',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardCaption: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
    marginBottom: 16,
  },
  captionStrong: {
    fontWeight: '700',
    color: '#4F46E5',
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  rankNumber: {
    width: 26,
    fontSize: 16,
    fontWeight: '800',
    color: '#94A3B8',
    marginTop: 1,
  },
  rankNumberFirst: {
    color: '#CA8A04',
  },
  rankBody: {
    flex: 1,
  },
  rankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  rankName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginRight: 8,
  },
  rankVotes: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E293B',
  },
  voteTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  voteFill: {
    height: '100%',
    borderRadius: 999,
  },
  rankMatch: {
    marginTop: 4,
    fontSize: 12,
    color: '#94A3B8',
  },
  traitRow: {
    marginBottom: 16,
  },
  traitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  traitName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  traitValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4F46E5',
    marginBottom: 6,
  },
  traitTrack: {
    height: 12,
    borderRadius: 999,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
    position: 'relative',
  },
  traitCenter: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 2,
    marginLeft: -1,
    backgroundColor: '#CBD5E1',
  },
  traitFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  positiveFill: {
    backgroundColor: '#4F46E5',
  },
  negativeFill: {
    backgroundColor: '#F43F5E',
  },
  madnessFill: {
    backgroundColor: '#CA8A04',
  },
  traitEdge: {
    marginTop: 4,
    fontSize: 11,
    color: '#94A3B8',
  },
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 12,
  },
  primaryButtonText: {
    marginLeft: 8,
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    paddingVertical: 16,
    borderRadius: 16,
  },
  secondaryButtonText: {
    marginLeft: 8,
    color: '#4F46E5',
    fontSize: 17,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
});
