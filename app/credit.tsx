import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { Code2, Heart, Sparkles, Layers, ExternalLink, BookOpen } from 'lucide-react-native';
import ScreenHeader from '../src/components/ScreenHeader';
import { colors } from '../src/theme/colors';

const CreditScreen = () => {
  // 외부 링크 열기 함수 | function to open external links
  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) => console.error('링크를 열 수 없습니다:', err));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <ScreenHeader title="크레딧 및 정보" onBack={() => router.back()} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.artCard}>
          <View style={styles.heartWrapper}>
            <Heart size={40} color={colors.heart} fill={colors.heart} />
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
            <View style={[styles.iconWrapper, { backgroundColor: colors.primarySoft }]}> 
              <Code2 size={22} color={colors.primary} />
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
            <AntDesign name="github" size={30} color={colors.ink} />
            <Text style={styles.linkButtonText}>프로젝트 깃허브 바로가기</Text>
            <ExternalLink size={14} color={colors.subtle} />
          </TouchableOpacity>

          <View style={[styles.cardRow, { borderTopWidth: 1, borderColor: colors.line, marginTop: 12, paddingTop: 12 }]}> 
            <View style={[styles.iconWrapper, { backgroundColor: colors.heartSoft }]}> 
              <Sparkles size={22} color={colors.heart} />
            </View>
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>Details</Text>
              <Text style={styles.rowSubTitle}>구조 및 질문지는 개발자가 구상하고, 가중치는 Gemini가 조정했습니다. 디자인과 코드 대부분은 Gemini가 만들었으며 일부 코드 리팩토링 및 보수는 개발자가 담당했습니다.</Text>
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
            <BookOpen size={16} color={colors.primary} />
            <Text style={styles.linkButtonText}>원작 정보 확인하기</Text>
            <ExternalLink size={14} color={colors.subtle} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeading}>사용한 기술 스택</Text>
        <View style={styles.infoCard}>
          <View style={styles.techRow}>
            <Layers size={16} color={colors.muted} />
            <Text style={styles.techText}>React Native & Expo Ecosystem</Text>
          </View>
          <View style={styles.techRow}>
            <Layers size={16} color={colors.muted} />
            <Text style={styles.techText}>Expo Router (File-based Routing)</Text>
          </View>
          <View style={styles.techRow}>
            <Layers size={16} color={colors.muted} />
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
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  artCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.line,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  heartWrapper: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: colors.heartSoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.ink,
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 13,
    color: colors.subtle,
    fontWeight: '600',
    marginBottom: 14,
  },
  appDescription: {
    fontSize: 14,
    color: colors.inkSoft,
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.inkSoft,
    marginBottom: 12,
    paddingLeft: 4,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.line,
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
    color: colors.ink,
  },
  rowSubTitle: {
    fontSize: 13,
    color: colors.muted,
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
    backgroundColor: colors.background,
  },
  linkButtonText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: colors.ink,
    fontWeight: '600',
  },
  paragraphText: {
    fontSize: 14,
    color: colors.inkSoft,
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
    color: colors.inkSoft,
  },
  licenseNotice: {
    marginTop: 16,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  footerText: {
    marginTop: 24,
    fontSize: 13,
    color: colors.subtle,
    lineHeight: 20,
  },
});
