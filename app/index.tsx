import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar 
} from 'react-native';
// 표준 SafeAreaView 라이브러리 사용
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// Lucide 아이콘 임포트
import { Zap, Users, ChevronRight, Eye } from 'lucide-react-native';
import Inform from '../components/Modal';
import { Link } from 'expo-router';


const CharacterTestScreen = () => {
  const [show100Alert,setShow100Alert] = useState(false)
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        {/* 타이틀 */}
        <Text style={styles.title}>100그녀 인물 검사!</Text>

        {/* 메인 박스 (모서리가 둥근 사각형) */}
        <View style={styles.mainBox}>
          
          {/* 빠른 검사 섹션 */}
        <Link href="/test" asChild>
        <TouchableOpacity 
            style={styles.sectionButton} 
            activeOpacity={0.6}
        >
            <View style={styles.leftContent}>
            <View style={[styles.iconWrapper, { backgroundColor: '#EEF2FF' }]}>
                <Zap size={24} color="#4F46E5" fill="#4F46E5" />
            </View>
            <View style={{flex:1}}>
                <Text style={styles.sectionTitle}>빠른 검사</Text>
                <Text style={styles.sectionSubTitle}>핵심 질문으로 빠르게 확인하기</Text>
            </View>
            </View>
            <ChevronRight size={20} color="#CBD5E1" strokeWidth={3} />
        </TouchableOpacity>
        </Link>
        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 100 검사 섹션 */}
        <TouchableOpacity 
        style={styles.sectionButton} 
        activeOpacity={0.6}
        onPress={() => setShow100Alert(true)}
        >
        <View style={styles.leftContent}>
            <View style={[styles.iconWrapper, { backgroundColor: '#FFF1F2' }]}>
            <Users size={24} color="#E11D48" fill="#E11D48" />
            </View>
            <View style={{flex:1}}>
            <Text style={styles.sectionTitle}>100 검사</Text>
            <Text style={styles.sectionSubTitle}>100가지 질문으로 모든 100여친 인물 검사</Text>
            </View>
        </View>
        <ChevronRight size={20} color="#CBD5E1" strokeWidth={3} />
        </TouchableOpacity>

        {/* 구분선 */}
        <View style={styles.divider} />

        {/* 빠른 검사 섹션 */}
        <TouchableOpacity 
        style={styles.sectionButton} 
        activeOpacity={0.6}
        onPress={() => console.log('도감 및 정보')}
        >
        <View style={styles.leftContent}>
            <View style={[styles.iconWrapper, { backgroundColor: '#1e293b18' }]}>
            <Eye size={24} color="#000000" fill="#ffffff" />
            </View>
            <View style={{flex:1}}>
            <Text style={styles.sectionTitle}>도감 및 정보</Text>
            <Text style={styles.sectionSubTitle}>빠른 검사에 등록된 여친들 및 기타 정보 보기</Text>
            </View>
        </View>
        <ChevronRight size={20} color="#CBD5E1" strokeWidth={3} />
        </TouchableOpacity>

        </View>



        {/* 하단 카피라이트 */}
        <Text style={styles.footerText}>© 2026 100 Kanojo Fan Project</Text>
      </View>

      <Inform 
        visible={show100Alert}
        onClose={()=>{setShow100Alert(false)}}
        title='제작 진행 중입니다'
        message='연재 끝나는 게 빠를까, 내가 이걸 만드는 게 빠를까'
      ></Inform>

    </SafeAreaView>
  );
};

// 메인 App 컴포넌트에서 SafeAreaProvider로 감싸주는 것이 좋습니다.
export default () => (
  <SafeAreaProvider>
    <CharacterTestScreen />
  </SafeAreaProvider>
);

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
    fontWeight: '900', // 더 두꺼운 폰트로 강조
    textAlign: 'center',
    color: '#0F172A',
    marginBottom: 40,
    letterSpacing: -0.5,
  },
  mainBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32, // 더 둥근 모서리
    padding: 10,
    // 그림자 (iOS)
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    // 그림자 (Android)
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