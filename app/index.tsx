import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Zap, Users, ChevronRight, Eye } from 'lucide-react-native';
import Inform from '../src/components/Inform';
import { Link } from 'expo-router';
import { colors } from '../src/theme/colors';

const HomeScreen = () => {
  const [show100Alert, setShow100Alert] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.title}>100그녀 인물 검사!</Text>

        <View style={styles.mainBox}>
          <Link href="/test" asChild>
            <TouchableOpacity style={styles.sectionButton} activeOpacity={0.6}>
              <View style={styles.leftContent}>
                <View style={[styles.iconWrapper, { backgroundColor: colors.primarySoft }]}> 
                  <Zap size={24} color={colors.primary} fill={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionTitle}>빠른 검사</Text>
                  <Text style={styles.sectionSubTitle}>핵심 질문으로 빠르게 확인하기</Text>
                </View>
              </View>
              <ChevronRight size={20} color={colors.faint} strokeWidth={3} />
            </TouchableOpacity>
          </Link>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.sectionButton}
            activeOpacity={0.6}
            onPress={() => setShow100Alert(true)}
          >
            <View style={styles.leftContent}>
              <View style={[styles.iconWrapper, { backgroundColor: colors.heartSoft }]}> 
                <Users size={24} color={colors.heart} fill={colors.heart} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>100 검사</Text>
                <Text style={styles.sectionSubTitle}>100가지 질문으로 모든 100여친 인물 검사</Text>
              </View>
            </View>
            <ChevronRight size={20} color={colors.faint} strokeWidth={3} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <Link href="/dictionary" asChild>
            <TouchableOpacity
              style={styles.sectionButton}
              activeOpacity={0.6}
            >
              <View style={styles.leftContent}>
                <View style={[styles.iconWrapper, { backgroundColor: colors.mintSoft }]}> 
                  <Eye size={24} color={colors.mint} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionTitle}>도감 및 정보</Text>
                  <Text style={styles.sectionSubTitle}>빠른 검사에 등록된 여친들 및 기타 정보 보기</Text>
                </View>
              </View>
              <ChevronRight size={20} color={colors.faint} strokeWidth={3} />
            </TouchableOpacity>
          </Link>
        </View>

        <Text style={styles.footerText}>© 2026 100 Kanojo Fan Project</Text>
      </View>

      <Inform
        visible={show100Alert}
        onClose={() => setShow100Alert(false)}
        title="제작 진행 중입니다"
        message="연재 끝나는 게 빠를까, 내가 이걸 만드는 게 빠를까"
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    color: colors.ink,
    marginBottom: 40,
    letterSpacing: -0.5,
  },
  mainBox: {
    backgroundColor: colors.surface,
    borderRadius: 32,
    padding: 10,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  sectionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: colors.ink,
    marginBottom: 4,
  },
  sectionSubTitle: {
    fontSize: 14,
    color: colors.subtle,
  },
  divider: {
    height: 1,
    backgroundColor: colors.line,
    marginHorizontal: 20,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 13,
    color: colors.faint,
    fontWeight: '500',
  },
});