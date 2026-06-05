import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { ArrowLeft, Search, Sparkles, Heart, Smile, Activity, Eye } from 'lucide-react-native';
import { ArrowRight } from 'lucide-react-native/icons';

const mockCharacters = [
  { id: '1', name: '하나조노 하카리', description: '사교성이 좋고 연애 정보력이 뛰어난 행동파 여친', tag: '외향형 / 우호형', color: '#FFF1F2', iconColor: '#c2479d' },
  { id: '2', name: '인다 카라네', description: '속마음은 따뜻하지만 표현이 서툰 전형적인 츤데레 여친', tag: '신경증 / 츤데레', color: '#EFF6FF', iconColor: '#2563EB' },
  { id: '3', name: '요시모토 시즈카', description: '책을 좋아하고 소심하지만 다정한 문학소녀 여친', tag: '내향형 / 우호형', color: '#F0FDF4', iconColor: '#16A34A' },
  { id: '4', name: '에이아이 나노', description: '이성적이고 효율적인 정보 수집에 능한 강철멘탈 AI형 여친', tag: '성실성 / 이성적', color: '#F8FAFC', iconColor: '#475569' },
  { id: '5', name: '야쿠젠 쿠스리', description: '화학실의 천재이자 늘 새로운 약을 만들어내는 트릭스터 여친', tag: '개방성 / 광기', color: '#FEF9C3', iconColor: '#CA8A04' },
  { id: '6', name: '하나조노 하하리', description: '아기들을 극도로 사랑하는 연애의 광전사 여친', tag: '개방성 / 광기', color: '#FEF9C3', iconColor: '#CA8A04' },
];

const DictionaryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCharacters = mockCharacters.filter((char) =>
    char.name.includes(searchQuery) || char.description.includes(searchQuery)
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()} activeOpacity={0.6}>
          <ArrowLeft size={22} color="#1E293B" />
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          여친 도감 및 정보
        </Text>

        <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/credit')} activeOpacity={0.6}>
          <ArrowRight size={22} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.statsCard}>
          <View style={styles.statsHeader}>
            <Sparkles size={20} color="#4F46E5" fill="#4F46E5" />
            <Text style={styles.statsTitle}>현재 등록 현황</Text>
          </View>
          <Text style={styles.statsCount}>
            <Text style={styles.statsHighlight}>5</Text> / 100 명
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
            <View key={char.id} style={styles.charCard}>
              <View style={styles.cardHeader}>
                <View style={[styles.iconWrapper, { backgroundColor: char.color }]}> 
                  <Heart size={24} color={char.iconColor} fill={char.iconColor} />
                </View>
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.charName}>{char.name}</Text>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagText}>{char.tag}</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.charDescription}>{char.description}</Text>

              <View style={styles.cardFooter}>
                <TouchableOpacity style={styles.actionButton} activeOpacity={0.6}>
                  <Smile size={16} color="#64748B" />
                  <Text style={styles.actionText}>성향분석</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} activeOpacity={0.6}>
                  <Activity size={16} color="#64748B" />
                  <Text style={styles.actionText}>가중치 정보</Text>
                </TouchableOpacity>
              </View>
            </View>
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
