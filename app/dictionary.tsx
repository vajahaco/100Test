import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, Sparkles, ArrowRight } from 'lucide-react-native';
import ScreenHeader from '../src/components/ScreenHeader';
import CharacterCard from '../src/components/CharacterCard';
import Inform from '../src/components/Inform';
import { characters } from '../src/data/characterData';
import { Character } from '../src/types/character';
import { TRAIT_KEYS, TRAIT_LABELS } from '../src/utils/election';
import { colors } from '../src/theme/colors';

type InfoModal = { title: string; message: string } | null;

// 성향분석: 가장 두드러진 성향 2개를 문장으로 | describe the two strongest traits
const describeTraits = (character: Character): string => {
  const strongest = TRAIT_KEYS.filter((k) => k !== 'madness')
    .map((k) => ({ key: k, value: character.profile[k] }))
    .filter((t) => t.value !== 0)
    .sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
    .slice(0, 2)
    .map((t) => {
      const label = TRAIT_LABELS[t.key];
      return `• ${label.name}: ${t.value > 0 ? label.high : label.low}`;
    });
  const madness = character.profile.madness > 0 ? '\n• 광기: 있음 (주의!)' : '';
  return `${character.description}\n\n${strongest.join('\n')}${madness}`;
};

// 가중치 정보: 프로필 수치 그대로 | raw profile weights
const describeWeights = (character: Character): string =>
  TRAIT_KEYS.map((k) => {
    const value = character.profile[k];
    return `${TRAIT_LABELS[k].name}  ${value > 0 ? '+' : ''}${value}`;
  }).join('\n');


const DictionaryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [infoModal, setInfoModal] = useState<InfoModal>(null);

  const filteredCharacters = characters.filter((char) =>
    char.name.includes(searchQuery) ||
    char.description.includes(searchQuery) ||
    char.tag.includes(searchQuery)
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <ScreenHeader
        title="여친 도감 및 정보"
        onBack={() => router.back()}
        rightIcon={<ArrowRight size={22} color={colors.ink} />}
        onRightPress={() => router.push('/credit')}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Sparkles size={20} color={colors.primary} fill={colors.primary} />
            <Text style={styles.statsTitle}>현재 등록 현황</Text>
          </View>
          <Text style={styles.statsCount}>
            <Text style={styles.statsHighlight}>{characters.length}</Text> / 100 명
          </Text>
          <Text style={styles.statsSubText}>빠른 검사에 등록된 핵심 멤버 리스트입니다.</Text>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color={colors.subtle} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="이름 또는 특징 검색..."
            placeholderTextColor={colors.subtle}
            value={searchQuery}
            onChangeText={setSearchQuery}
            spellCheck={false}
          />
        </View>

        <Text style={styles.sectionHeading}>등록된 여친 목록</Text>

        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((char) => (
            <CharacterCard
              key={char.id}
              id={char.id}
              name={char.name}
              description={char.description}
              tag={char.tag}
              color={char.color}
              iconColor={char.iconColor}
              onAnalyze={() => setInfoModal({ title: `${char.name} 성향분석`, message: describeTraits(char) })}
              onDetails={() => setInfoModal({ title: `${char.name} 가중치`, message: describeWeights(char) })}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>검색 결과에 맞는 인물이 없습니다 ㅠㅠ</Text>
          </View>
        )}
      </ScrollView>

      <Inform
        visible={infoModal !== null}
        onClose={() => setInfoModal(null)}
        title={infoModal?.title ?? ''}
        message={infoModal?.message ?? ''}
      />
    </SafeAreaView>
  );
};

export default DictionaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  statsCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 6,
  },
  statsCount: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.ink,
    marginBottom: 4,
  },
  statsHighlight: {
    color: colors.heart,
  },
  statsSubText: {
    fontSize: 13,
    color: colors.subtle,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 54,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.ink,
    fontWeight: '500',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.inkSoft,
    marginBottom: 16,
    paddingLeft: 4,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.subtle,
    fontSize: 15,
  },
});
