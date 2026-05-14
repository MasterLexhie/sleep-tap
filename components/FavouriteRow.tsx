import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { SoundItem } from '../constants/sounds';

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

interface Props {
  sound: SoundItem;
  subtitle?: string;
  showHeart?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
}

export function FavouriteRow({ sound, subtitle, showHeart, onPress, onRemove }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <View style={[styles.iconWrap, { backgroundColor: sound.iconBg }]}>
        <Ionicons name={getSoundIcon(sound.id)} size={17} color={sound.iconColor} />
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {sound.name}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {subtitle ?? sound.category}
        </Text>
      </View>

      {showHeart ? (
        <Pressable onPress={onRemove} hitSlop={12} accessibilityLabel="Remove favourite">
          <Ionicons name="heart" size={17} color={Colors.acc} />
        </Pressable>
      ) : (
        <Ionicons name="chevron-forward" size={14} color={Colors.txtTertiary} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    gap: 11,
  },
  pressed: {
    backgroundColor: Colors.elev,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.txtPrimary,
  },
  sub: {
    fontSize: 13,
    color: Colors.txtSecondary,
    marginTop: 2,
  },
});
