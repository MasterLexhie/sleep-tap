import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors } from '../constants/colors';
import { TIMER_PRESETS } from '../constants/sounds';
import { useAudio } from '../context/AudioContext';

export function TimerChips() {
  const { state, setTimer } = useAudio();

  const handleSelect = (minutes: number) => {
    Haptics.selectionAsync();
    setTimer(minutes);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {TIMER_PRESETS.map((preset) => {
        const isSelected = state.timerMinutes === preset.minutes;
        return (
          <Pressable
            key={preset.label}
            onPress={() => handleSelect(preset.minutes)}
            style={[styles.chip, isSelected && styles.chipSelected]}
            accessibilityLabel={`Set timer to ${preset.minutes === 0 ? 'endless' : `${preset.minutes} minutes`}`}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
              {preset.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chip: {
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 18,
    backgroundColor: Colors.surf,
    borderWidth: 1,
    borderColor: Colors.bdr,
  },
  chipSelected: {
    backgroundColor: Colors.elev,
    borderColor: Colors.acc,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.txtSecondary,
  },
  chipTextSelected: {
    color: Colors.acc,
  },
});
