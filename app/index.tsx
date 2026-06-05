import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Zap, Users, ChevronRight, Eye } from 'lucide-react-native';
import Inform from '../src/components/Inform';
import { Link } from 'expo-router';

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
                <View style={[styles.iconWrapper, { backgroundColor: '#EEF2FF' }]}> 
                  <Zap size={24} color="#4F46E5" fill="#4F46E5" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionTitle}>빠른 검사</Text>
                  <Text style={styles.sectionSubTitle}>핵심 질문으로 빠르게 확인하기</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#CBD5E1" strokeWidth={3} />
            </TouchableOpacity>
          </Link>

          <View style={styles.divider} />

          <TouchableOpacity
            style={styles.sectionButton}
            activeOpacity={0.6}
            onPress={() => setShow100Alert(true)}
          >
            <View style={styles.leftContent}>
              <View style={[styles.iconWrapper, { backgroundColor: '#FFF1F2' }]}> 
                <Users size={24} color="#E11D48" fill="#E11D48" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>100 검사</Text>
                <Text style={styles.sectionSubTitle}>100가지 질문으로 모든 100여친 인물 검사</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#CBD5E1" strokeWidth={3} />
          </TouchableOpacity>

          <View style={styles.divider} />

          <Link href="/dictionary" asChild>
            <TouchableOpacity
              style={styles.sectionButton}
              activeOpacity={0.6}
            >
              <View style={styles.leftContent}>
                <View style={[styles.iconWrapper, { backgroundColor: '#1e293b18' }]}> 
                  <Eye size={24} color="#000000" fill="#ffffff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionTitle}>도감 및 정보</Text>
                  <Text style={styles.sectionSubTitle}>빠른 검사에 등록된 여친들 및 기타 정보 보기</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#CBD5E1" strokeWidth={3} />
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
    backgroundColor: '#F8FAFC',
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
    color: '#0F172A',
    marginBottom: 40,
    letterSpacing: -0.5,
  },
  mainBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 10,
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
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
    color: '#1E293B',
    marginBottom: 4,
  },
  sectionSubTitle: {
    fontSize: 14,
    color: '#94A3B8',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 20,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 13,
    color: '#CBD5E1',
    fontWeight: '500',
  },
});