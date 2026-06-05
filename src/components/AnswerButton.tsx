import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

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
    paddingVertical: 16,
    backgroundColor: '#4F46E5',
    borderRadius: 16,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
  selectedButton: {
    backgroundColor: '#e54646',
  },
  selectedButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});