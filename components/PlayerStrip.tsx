import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
  cancelAnimation,
  interpolate,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/colors';
import { useAudio } from '../context/AudioContext';

function getSoundIcon(id: string): keyof typeof Ionicons.glyphMap {
  const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
    rain: 'rainy',
    white_noise: 'radio',
    ocean: 'boat',
    fireplace: 'flame',
    forest: 'leaf',
    light_rain: 'cloud',
    night_forest_with_insects: 'bug',
    rain_thunder_storm: 'thunderstorm',
    sea_waves: 'water',
    water_flowing_ambience: 'water',
  };
  return icons[id] ?? 'musical-note';
}

function RippleRing({ size, delay, isPlaying }: { size: number; delay: number; isPlaying: boolean }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (isPlaying) {
      progress.value = 0;
      progress.value = withDelay(
        delay,
        withRepeat(
          withTiming(1, { duration: 2800, easing: Easing.out(Easing.ease) }),
          -1,
          false,
        ),
      );
    } else {
      cancelAnimation(progress);
      progress.value = withTiming(0, { duration: 300 });
    }
  }, [isPlaying]);

  const style = useAnimatedStyle(() => ({
    position: 'absolute' as const,
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 1,
    borderColor: Colors.accGlow,
    opacity: interpolate(progress.value, [0, 1], [0.4, 0]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.85, 1.45]) }],
  }));

  return <Animated.View style={style} />;
}

export function PlayerStrip() {
  const router = useRouter();
  const { state, togglePlayPause, playNext, playPrevious } = useAudio();

  if (!state.currentSound) return null;

  const handlePlayPause = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    togglePlayPause();
  };

  const handlePrev = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    playPrevious();
  };

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    playNext();
  };

  const handleOpen = () => {
    router.push('/now-playing');
  };

  return (
    <Pressable onPress={handleOpen} style={styles.container}>
      <View style={styles.orbContainer}>
        {state.isPlaying && (
          <>
            <RippleRing size={42} delay={0} isPlaying={state.isPlaying} />
            <RippleRing size={56} delay={900} isPlaying={state.isPlaying} />
          </>
        )}
        <View style={styles.orb}>
          <Ionicons
            name={getSoundIcon(state.currentSound.id)}
            size={17}
            color={state.currentSound.iconColor}
          />
        </View>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {state.currentSound.name}
        </Text>
        <Text style={styles.sub} numberOfLines={1}>
          {state.isPlaying ? 'Now playing · looping' : 'Paused'}
        </Text>
      </View>

      <View style={styles.controls}>
        <Pressable
          onPress={handlePrev}
          hitSlop={6}
          style={styles.skipButton}
          accessibilityLabel="Previous sound"
          accessibilityRole="button"
        >
          <Ionicons name="play-skip-back" size={16} color={Colors.txtPrimary} />
        </Pressable>

        <Pressable
          onPress={handlePlayPause}
          style={({ pressed }) => [styles.playButton, pressed && styles.playButtonPressed]}
          accessibilityLabel={state.isPlaying ? 'Pause' : 'Play'}
          accessibilityRole="button"
        >
          <Ionicons
            name={state.isPlaying ? 'pause' : 'play'}
            size={15}
            color="#FFFFFF"
          />
        </Pressable>

        <Pressable
          onPress={handleNext}
          hitSlop={6}
          style={styles.skipButton}
          accessibilityLabel="Next sound"
          accessibilityRole="button"
        >
          <Ionicons name="play-skip-forward" size={16} color={Colors.txtPrimary} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surf,
    borderWidth: 1,
    borderColor: Colors.bdr,
    borderRadius: 18,
    paddingVertical: 9,
    paddingLeft: 10,
    paddingRight: 8,
    marginHorizontal: 10,
    gap: 10,
  },
  orbContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orb: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.elev,
    borderWidth: 1,
    borderColor: Colors.bdr2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.txtPrimary,
  },
  sub: {
    fontSize: 12,
    color: Colors.txtSecondary,
    marginTop: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  skipButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.acc,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonPressed: {
    backgroundColor: Colors.accDim,
    transform: [{ scale: 0.97 }],
  },
});
