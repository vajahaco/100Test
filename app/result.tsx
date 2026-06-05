import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ResultScreen = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container} />
  </SafeAreaView>
);

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3ac7c7',
  },
});