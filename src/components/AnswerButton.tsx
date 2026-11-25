import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';

type AnswerButtonProps = {
  answer: string;
  selected: boolean;
  onPress: () => void;
};

const AnswerButton = ({ answer, selected, onPress }: AnswerButtonProps) => (
  <TouchableOpacity
    style={[styles.button, selected && styles.selectedButton]}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <Text style={[styles.buttonText, selected && styles.selectedButtonText]}>{answer}</Text>
  </TouchableOpacity>
);

export default AnswerButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.lineStrong,
    borderRadius: 18,
    marginBottom: 10,
  },
  buttonText: {
    color: colors.ink,
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '600',
  },
  selectedButton: {
    backgroundColor: colors.mint,
    borderColor: colors.mint,
  },
  selectedButtonText: {
    color: colors.surface,
    fontSize: 17,
    fontWeight: '700',
  },
});