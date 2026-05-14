import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { SoundItem } from '../constants/sounds';

interface Props {
  sound: SoundItem;
  isActive: boolean;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

function getSoundIcon(id: string): keyof typeof Ionicons.glyphMap {
  const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
    drip: 'water',
    rain: 'rainy',
    white_noise: 'radio',
    ocean: 'boat',
    fireplace: 'flame',
    forest: 'leaf',
  };
  return icons[id] ?? 'musical-note';
}

export function SoundCard({ sound, isActive, isFavorite, onPress, onToggleFavorite }: Props) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const handleFavorite = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onToggleFavorite();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        isActive && styles.activeContainer,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.topRow}>
        <View style={[styles.iconWrap, { backgroundColor: sound.iconBg }]}>
          <Ionicons name={getSoundIcon(sound.id)} size={14} color={sound.iconColor} />
        </View>
        <Pressable
          onPress={handleFavorite}
          hitSlop={8}
          style={styles.heartButton}
          accessibilityLabel={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
          accessibilityRole="button"
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={16}
            color={isFavorite ? Colors.acc : Colors.txtTertiary}
          />
        </Pressable>
      </View>
      <Text style={[styles.name, isActive && styles.activeName]} numberOfLines={1}>
        {sound.name}
      </Text>
      <Text style={styles.category} numberOfLines={1}>
        {sound.category}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surf,
    borderWidth: 1,
    borderColor: Colors.bdr,
    borderRadius: 16,
    paddingTop: 9,
    paddingHorizontal: 11,
    paddingBottom: 8,
  },
  activeContainer: {
    backgroundColor: Colors.elev,
    borderColor: Colors.acc,
  },
  pressed: {
    backgroundColor: Colors.elev,
    transform: [{ scale: 0.97 }],
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.txtPrimary,
  },
  activeName: {
    color: Colors.acc,
  },
  category: {
    fontSize: 12,
    color: Colors.txtSecondary,
    marginTop: 2,
  },
});
