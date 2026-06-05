import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, Smile, Activity } from 'lucide-react-native';

type CharacterCardProps = {
  id: string;
  name: string;
  description: string;
  tag: string;
  color: string;
  iconColor: string;
  onAnalyze?: () => void;
  onDetails?: () => void;
};

const CharacterCard = ({
  name,
  description,
  tag,
  color,
  iconColor,
  onAnalyze,
  onDetails,
}: CharacterCardProps) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={[styles.iconWrapper, { backgroundColor: color }]}> 
        <Heart size={24} color={iconColor} fill={iconColor} />
      </View>
      <View style={styles.cardTitleContainer}>
        <Text style={styles.charName}>{name}</Text>
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      </View>
    </View>

    <Text style={styles.charDescription}>{description}</Text>

    <View style={styles.cardFooter}>
      <TouchableOpacity style={styles.actionButton} activeOpacity={0.6} onPress={onAnalyze}>
        <Smile size={16} color="#64748B" />
        <Text style={styles.actionText}>성향분석</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton} activeOpacity={0.6} onPress={onDetails}>
        <Activity size={16} color="#64748B" />
        <Text style={styles.actionText}>가중치 정보</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default CharacterCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardTitleContainer: {
    flex: 1,
  },
  charName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  tagBadge: {
    marginTop: 6,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  charDescription: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
  },
  actionText: {
    marginLeft: 8,
    color: '#64748B',
    fontWeight: '700',
  },
});