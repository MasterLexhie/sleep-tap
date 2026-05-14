import React from 'react';
import { StyleSheet, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { useAudio } from '../context/AudioContext';

export function VolumeSlider() {
  const { state, setVolume } = useAudio();

  return (
    <View style={styles.container}>
      <Ionicons name="volume-low" size={20} color={Colors.txtTertiary} />
      <Slider
        style={styles.slider}
        value={state.volume}
        onValueChange={setVolume}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={Colors.acc}
        maximumTrackTintColor={Colors.elev2}
        thumbTintColor="#FFFFFF"
        accessibilityLabel="Volume"
      />
      <Ionicons name="volume-high" size={20} color={Colors.acc} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 22,
    gap: 8,
  },
  slider: {
    flex: 1,
    height: 44,
  },
});
