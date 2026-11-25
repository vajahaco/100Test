import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Sparkles, Heart, RotateCcw, Home, BarChart3, Flower2 } from 'lucide-react-native';
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
import { colors } from '../src/theme/colors';

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
            <RotateCcw size={18} color={colors.surface} />
            <Text style={styles.primaryButtonText}>검사하러 가기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const { winner, ranking, userProfile, abstentions } = result;
  const maxSupport = Math.max(...ranking.map((c) => c.supportRate), 1);
  const formatSupport = (rate: number) => `${Math.round(rate * 100)}%`;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <ScreenHeader title="검사 결과" onBack={goHome} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 운명의 상대 카드 | best match card */}
        <View style={[styles.winnerCard, { borderColor: winner.character.iconColor }]}>
          <View style={styles.crownBadge}>
            <Sparkles size={16} color={colors.sun} fill={colors.sunBright} />
            <Text style={styles.crownText}>운명의 상대</Text>
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
                <Text style={styles.statUnit}> 개</Text>
              </Text>
              <Text style={styles.statLabel}>닮은 답변</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{formatSupport(winner.supportRate)}</Text>
              <Text style={styles.statLabel}>궁합 지수</Text>
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

        {/* 궁합 순위 | compatibility ranking */}
        <View style={styles.sectionHeader}>
          <Flower2 size={18} color={colors.primary} />
          <Text style={styles.sectionHeading}>여친별 궁합 순위</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.cardCaption}>
            답변 {questions.length}개마다 나와 가장 닮은 여친을 찾아봤어요.
            {abstentions > 0 ? ` (어느 여친과도 겹치지 않은 답변 ${abstentions}개)` : ''}{'\n'}
            <Text style={styles.captionStrong}>궁합 지수</Text>는 닮은 답변이 평균보다 얼마나 많은지를
            나타내요. 100%가 평균이에요.
          </Text>
          {ranking.map((candidate, index) => (
            <View key={candidate.character.id} style={styles.rankRow}>
              <Text style={[styles.rankNumber, index === 0 && styles.rankNumberFirst]}>{index + 1}</Text>
              <View style={styles.rankBody}>
                <View style={styles.rankHeader}>
                  <Text style={styles.rankName} numberOfLines={1}>
                    {candidate.character.name}
                  </Text>
                  <Text style={styles.rankVotes}>궁합 {formatSupport(candidate.supportRate)}</Text>
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
                  닮은 답변 {formatVotes(candidate.votes)}개 (평균 {candidate.expectedVotes.toFixed(1)}개) · 성향 일치율{' '}
                  {candidate.matchRate}%
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* 나의 성향 | my traits */}
        <View style={styles.sectionHeader}>
          <BarChart3 size={18} color={colors.primary} />
          <Text style={styles.sectionHeading}>나의 성향 분석</Text>
        </View>
        <View style={styles.infoCard}>
          {TRAIT_KEYS.map((key) => (
            <TraitBar key={key} traitKey={key} value={userProfile[key]} />
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={retryTest} activeOpacity={0.8}>
          <RotateCcw size={18} color={colors.surface} />
          <Text style={styles.primaryButtonText}>다시 검사하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={goHome} activeOpacity={0.8}>
          <Home size={18} color={colors.primary} />
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
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
  },
  winnerCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    borderWidth: 2,
    padding: 24,
    alignItems: 'center',
    marginBottom: 28,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  crownBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.sunSoft,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 16,
  },
  crownText: {
    marginLeft: 6,
    color: colors.sunInk,
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
    color: colors.muted,
    marginBottom: 6,
  },
  winnerName: {
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 10,
    textAlign: 'center',
  },
  tagBadge: {
    backgroundColor: colors.line,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 14,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.inkSoft,
  },
  winnerDescription: {
    fontSize: 15,
    color: colors.inkSoft,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  winnerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
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
    backgroundColor: colors.lineStrong,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.ink,
  },
  statUnit: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.muted,
  },
  statLabel: {
    marginTop: 2,
    fontSize: 12,
    color: colors.subtle,
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
    color: colors.inkSoft,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: colors.line,
  },
  cardCaption: {
    fontSize: 13,
    color: colors.muted,
    lineHeight: 20,
    marginBottom: 16,
  },
  captionStrong: {
    fontWeight: '700',
    color: colors.primary,
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
    color: colors.subtle,
    marginTop: 1,
  },
  rankNumberFirst: {
    color: colors.sun,
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
    color: colors.ink,
    marginRight: 8,
  },
  rankVotes: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.ink,
  },
  voteTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.line,
    overflow: 'hidden',
  },
  voteFill: {
    height: '100%',
    borderRadius: 999,
  },
  rankMatch: {
    marginTop: 4,
    fontSize: 12,
    color: colors.subtle,
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
    color: colors.ink,
    marginBottom: 6,
  },
  traitValue: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 6,
  },
  traitTrack: {
    height: 12,
    borderRadius: 999,
    backgroundColor: colors.line,
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
    backgroundColor: colors.faint,
  },
  traitFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  positiveFill: {
    backgroundColor: colors.mint,
  },
  negativeFill: {
    backgroundColor: colors.primary,
  },
  madnessFill: {
    backgroundColor: colors.sun,
  },
  traitEdge: {
    marginTop: 4,
    fontSize: 11,
    color: colors.subtle,
  },
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 12,
  },
  primaryButtonText: {
    marginLeft: 8,
    color: colors.surface,
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    paddingVertical: 16,
    borderRadius: 16,
  },
  secondaryButtonText: {
    marginLeft: 8,
    color: colors.primary,
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
    color: colors.ink,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
});
