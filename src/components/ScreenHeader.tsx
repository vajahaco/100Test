import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

type ScreenHeaderProps = {
  title: string;
  onBack: () => void;
  rightIcon?: React.ReactNode;
  onRightPress?: () => void;
};

const ScreenHeader = ({ title, onBack, rightIcon, onRightPress }: ScreenHeaderProps) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.headerButton} onPress={onBack} activeOpacity={0.6}>
      <ArrowLeft size={22} color="#1E293B" />
    </TouchableOpacity>

    <Text style={styles.headerTitle} numberOfLines={1}>
      {title}
    </Text>

    {rightIcon ? (
      <TouchableOpacity style={styles.headerButton} onPress={onRightPress} activeOpacity={0.6}>
        {rightIcon}
      </TouchableOpacity>
    ) : (
      <View style={styles.headerButton} />
    )}
  </View>
);

export default ScreenHeader;

const styles = StyleSheet.create({
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
    marginHorizontal: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    textAlign: 'center',
  },
});