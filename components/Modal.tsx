import React from 'react'; // useState는 여기서 안 쓰면 빼셔도 됩니다.
import { 
  StyleSheet, 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  Pressable 
} from 'react-native';

// 인터페이스로 빼두면 가독성이 훨씬 좋아집니다!
interface CustomAlertProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const Inform = ({ visible, onClose, title, message }: CustomAlertProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay}>
        <Pressable style={styles.alertBox} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.alertTitle}>{title}</Text>
          <Text style={styles.alertMessage}>{message}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.confirmButton} 
              onPress={onClose}
              activeOpacity={0.8} // 클릭 시 피드백 살짝 조절
            >
              <Text style={styles.buttonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default Inform;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertBox: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 24, // 조금 더 둥글게 (아까 메인 디자인과 맞춤)
    padding: 24,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  alertTitle: {
    fontSize: 20, // 살짝 키움
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 12,
  },
  alertMessage: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14, // 조금 더 시원하게
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});