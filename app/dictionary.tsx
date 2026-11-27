import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Search, Sparkles, Heart, Smile, Activity, Eye } from 'lucide-react-native';
import { ArrowRight } from 'lucide-react-native/icons';
import ScreenHeader from '../src/components/ScreenHeader';
import CharacterCard from '../src/components/CharacterCard';
import { girlfriends } from '../src/data/girlfriendsData';


const DictionaryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCharacters = girlfriends.filter((char) =>
    char.name.includes(searchQuery) || char.description.includes(searchQuery)
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <ScreenHeader
        title="여친 도감 및 정보"
        onBack={() => router.back()}
        rightIcon={<ArrowRight size={22} color="#1E293B" />}
        onRightPress={() => router.push('/credit')}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Sparkles size={20} color="#4F46E5" fill="#4F46E5" />
            <Text style={styles.statsTitle}>현재 등록 현황</Text>
          </View>
          <Text style={styles.statsCount}>
            <Text style={styles.statsHighlight}>{girlfriends.length}</Text> / 100 명
          </Text>
          <Text style={styles.statsSubText}>빠른 검사에 등록된 핵심 멤버 리스트입니다.</Text>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="이름 또는 특징 검색..."
            placeholderTextColor="#94A3B8"
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
              onAnalyze={() => {}}
              onDetails={() => {}}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>검색 결과에 맞는 인물이 없습니다 ㅠㅠ</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DictionaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    height: 56,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
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
    color: '#4F46E5',
    marginLeft: 6,
  },
  statsCount: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1E293B',
    marginBottom: 4,
  },
  statsHighlight: {
    color: '#E11D48',
  },
  statsSubText: {
    fontSize: 13,
    color: '#94A3B8',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 54,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '500',
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 16,
    paddingLeft: 4,
  },
  charCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardTitleContainer: {
    flex: 1,
  },
  charName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  tagBadge: {
    marginTop: 6,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  charDescription: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
  },
  actionText: {
    marginLeft: 8,
    color: '#64748B',
    fontWeight: '700',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 15,
  },
});
