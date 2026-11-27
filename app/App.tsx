import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useFonts, BlackHanSans_400Regular } from '@expo-google-fonts/black-han-sans';
import { HinaMincho_400Regular } from '@expo-google-fonts/hina-mincho';
import GachaGlowReveal from '../src/components/GachaGlowReveal';
import { Rarity } from '../src/components/rarityTheme';

const SAMPLE_NAMES: Record<Rarity, string> = {
  N: '평범한 모험가',
  R: '숲의 궁수 리나',
  SR: '빙결의 마도사 유키',
  SSR: '천계의 검성 세라핀',
};

export default function App() {
  const [fontsLoaded] = useFonts({
    BlackHanSans_400Regular,
    HinaMincho_400Regular,
  });

  const [key, setKey] = useState(0);
  const [rarity, setRarity] = useState<Rarity>('SSR');

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safe}>
      {/* key를 바꿔주면 컴포넌트가 새로 마운트되며 애니메이션이 처음부터 재생됨 */}
      <GachaGlowReveal key={key} characterName={SAMPLE_NAMES[rarity]} rarity={rarity} />

      <View style={styles.controls}>
        {(['N', 'R', 'SR', 'SSR'] as Rarity[]).map((r) => (
          <Pressable
            key={r}
            style={[styles.chip, rarity === r && styles.chipActive]}
            onPress={() => setRarity(r)}
          >
            <Text style={styles.chipText}>{r}</Text>
          </Pressable>
        ))}
        <Pressable style={styles.pullButton} onPress={() => setKey((k) => k + 1)}>
          <Text style={styles.pullButtonText}>다시 뽑기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B0B14' },
  controls: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginHorizontal: 4,
    marginVertical: 4,
  },
  chipActive: {
    backgroundColor: '#FFD54F',
  },
  chipText: { color: '#fff', fontWeight: '600' },
  pullButton: {
    marginLeft: 8,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FF6F00',
  },
  pullButtonText: { color: '#fff', fontWeight: '700' },
});
