import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '../constants/colors';

interface Props {
  isActive: boolean;
  onPress: () => void;
}

export function StartTimerButton({ isActive, onPress }: Props) {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={isActive ? 'Cancel timer' : 'Start timer'}
    >
      <Text style={styles.label}>{isActive ? 'Cancel timer' : 'Start timer'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.acc,
    borderRadius: 16,
    paddingVertical: 14,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  pressed: {
    backgroundColor: Colors.accDim,
    transform: [{ scale: 0.97 }],
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
