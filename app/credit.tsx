import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { ArrowLeft, Code2, Heart, Sparkles, Layers, ExternalLink, BookOpen } from 'lucide-react-native';

const CreditScreen = () => {
  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('링크를 열 수 없습니다:', err));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
          activeOpacity={0.6}
        >
          <ArrowLeft size={22} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>크레딧 및 정보</Text>
        <View style={styles.headerButtonPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.artCard}>
          <View style={styles.heartWrapper}>
            <Heart size={40} color="#E11D48" fill="#E11D48" />
          </View>
          <Text style={styles.appName}>100그녀 인물 검사</Text>
          <Text style={styles.appVersion}>Version 1.0.0 (Beta)</Text>
          <Text style={styles.appDescription}>
            "너를 너무너무너무너무 좋아하는 100명의 여친" 팬들을 위한 성향 검사 & 여친 유형 매칭 프로그램입니다.
          </Text>
        </View>

        <Text style={styles.sectionHeading}>제작자</Text>
        <View style={styles.infoCard}>
          <View style={styles.cardRow}>
            <View style={[styles.iconWrapper, { backgroundColor: '#EEF2F6' }]}> 
              <Code2 size={22} color="#4F46E5" />
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>기획 및 개발</Text>
              <Text style={styles.rowSubTitle}>vajahaco</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => handleOpenLink('https://github.com/vajahaco/100Test')}
            activeOpacity={0.7}
          >
            <AntDesign name="github" size={30} color="black" />
            <Text style={styles.linkButtonText}>프로젝트 깃허브 바로가기</Text>
            <ExternalLink size={14} color="#94A3B8" />
          </TouchableOpacity>

          <View style={[styles.cardRow, { borderTopWidth: 1, borderColor: '#F1F5F9', marginTop: 12, paddingTop: 12 }]}> 
            <View style={[styles.iconWrapper, { backgroundColor: '#FFF1F2' }]}> 
              <Sparkles size={22} color="#E11D48" />
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Details</Text>
              <Text style={styles.rowSubTitle}>구조 및 질문지는 개발자가 구상하고, 가중치는 Gemini가 조정했습니댜. 디자인과 코드 대부분은 Gemini가 만들었으며 일부 코드 리팩토링 및 보수는 개발자가 담당했습니다.</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionHeading}>데이터 및 원작 출처</Text>
        <View style={styles.infoCard}>
          <Text style={styles.paragraphText}>
            본 앱에 사용된 캐릭터 설정, 질문의 가중치 밸런싱, 대사 텍스트 정보는 원작 만화 및 나무위키의 데이터를 기반으로 가공되었습니다.
          </Text>
          <TouchableOpacity
            style={styles.linkButton}
            onPress={() => handleOpenLink('https://shonenjumpplus.com/episode/13933686331623812157')}
            activeOpacity={0.7}
          >
            <BookOpen size={16} color="#4F46E5" />
            <Text style={styles.linkButtonText}>원작 정보 확인하기</Text>
            <ExternalLink size={14} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeading}>사용한 기술 스택</Text>
        <View style={styles.infoCard}>
          <View style={styles.techRow}>
            <Layers size={16} color="#64748B" />
            <Text style={styles.techText}>React Native & Expo Ecosystem</Text>
          </View>
          <View style={styles.techRow}>
            <Layers size={16} color="#64748B" />
            <Text style={styles.techText}>Expo Router (File-based Routing)</Text>
          </View>
          <View style={styles.techRow}>
            <Layers size={16} color="#64748B" />
            <Text style={styles.techText}>Lucide React Native Icons</Text>
          </View>
          <Text style={styles.licenseNotice}>
            지원을 아끼지 않은 오픈소스 커뮤니티 개발자분들께 감사드립니다.
          </Text>
        </View>

        <Text style={styles.footerText}>
          © 2026 100GF Fan Project. Licensed under CC BY-NC 4.0.{"\n"}
          본 프로그램은 비영리 팬 메이드 어플리케이션입니다.{"\n"}
          수정 및 재배포는 자유로우나, 상업적 목적의 이용 및 2차 배포는 제한됩니다.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreditScreen;

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
  headerButtonPlaceholder: {
    width: 40,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  artCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  heartWrapper: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#FFF1F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1E293B',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
    marginBottom: 14,
  },
  appDescription: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 12,
    paddingLeft: 4,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  rowTextContainer: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  rowSubTitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginTop: 16,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
  },
  linkButtonText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '600',
  },
  paragraphText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
  techRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  techText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#475569',
  },
  licenseNotice: {
    marginTop: 16,
    color: '#64748B',
    fontSize: 13,
    lineHeight: 20,
  },
  footerText: {
    marginTop: 24,
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 20,
  },
});
