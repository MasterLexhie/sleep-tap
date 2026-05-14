import React, { useEffect } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { useAudio } from '../context/AudioContext';
import { VolumeSlider } from '../components/VolumeSlider';

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

function OrbRing({ radius, delay, isPlaying, color }: {
  radius: number;
  delay: number;
  isPlaying: boolean;
  color: string;
}) {
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
      progress.value = withTiming(0, { duration: 400 });
    }
  }, [isPlaying]);

  const style = useAnimatedStyle(() => ({
    position: 'absolute' as const,
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    borderWidth: 1.5,
    borderColor: color,
    opacity: interpolate(progress.value, [0, 1], [0.5, 0]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.85, 1.45]) }],
  }));

  return <Animated.View style={style} />;
}

export default function NowPlayingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { state, togglePlayPause, playNext, playPrevious } = useAudio();
  const { width } = useWindowDimensions();

  const orbSize = width * 0.45;

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

  const timerText = state.timerRemaining !== null && state.timerRemaining > 0
    ? `${Math.floor(state.timerRemaining / 60)}:${(state.timerRemaining % 60).toString().padStart(2, '0')} remaining`
    : null;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          style={styles.dismissButton}
          accessibilityLabel="Dismiss"
          accessibilityRole="button"
        >
          <Ionicons name="chevron-down" size={28} color={Colors.txtPrimary} />
        </Pressable>
        <Text style={styles.topTitle}>Now Playing</Text>
        <View style={styles.topSpacer} />
      </View>

      <View style={styles.orbSection}>
        <View style={[styles.orbWrapper, { width: orbSize + 80, height: orbSize + 80 }]}>
          <OrbRing radius={(orbSize + 20) / 2} delay={0} isPlaying={state.isPlaying} color={state.currentSound?.iconColor ?? Colors.acc} />
          <OrbRing radius={(orbSize + 40) / 2} delay={700} isPlaying={state.isPlaying} color={state.currentSound?.iconColor ?? Colors.acc} />
          <OrbRing radius={(orbSize + 60) / 2} delay={1400} isPlaying={state.isPlaying} color={state.currentSound?.iconColor ?? Colors.acc} />
          <View
            style={[
              styles.orb,
              {
                width: orbSize,
                height: orbSize,
                borderRadius: orbSize / 2,
                backgroundColor: state.currentSound?.iconBg ?? Colors.elev,
              },
            ]}
          >
            <Ionicons
              name={getSoundIcon(state.currentSound?.id ?? '')}
              size={orbSize * 0.3}
              color={state.currentSound?.iconColor ?? Colors.acc}
            />
          </View>
        </View>
      </View>

      <View style={[styles.bottomSection, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.trackInfo}>
          <Text style={styles.trackName} numberOfLines={1}>
            {state.currentSound?.name ?? 'No Sound Selected'}
          </Text>
          <Text style={styles.trackCategory} numberOfLines={1}>
            {state.currentSound?.category ?? ''}
          </Text>
        </View>

        {timerText && (
          <View style={styles.timerBadge}>
            <Ionicons name="time-outline" size={14} color={Colors.acc} />
            <Text style={styles.timerText}>{timerText}</Text>
          </View>
        )}

        <View style={styles.controls}>
          <Pressable
            onPress={handlePrev}
            style={styles.skipButton}
            accessibilityLabel="Previous sound"
            accessibilityRole="button"
          >
            <Ionicons name="play-skip-back" size={28} color={Colors.txtPrimary} />
          </Pressable>

          <Pressable
            onPress={handlePlayPause}
            style={({ pressed }) => [styles.playButton, pressed && styles.playButtonPressed]}
            accessibilityLabel={state.isPlaying ? 'Pause' : 'Play'}
            accessibilityRole="button"
          >
            <Ionicons
              name={state.isPlaying ? 'pause' : 'play'}
              size={30}
              color="#FFFFFF"
            />
          </Pressable>

          <Pressable
            onPress={handleNext}
            style={styles.skipButton}
            accessibilityLabel="Next sound"
            accessibilityRole="button"
          >
            <Ionicons name="play-skip-forward" size={28} color={Colors.txtPrimary} />
          </Pressable>
        </View>

        <VolumeSlider />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  dismissButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.txtSecondary,
    letterSpacing: -0.2,
  },
  topSpacer: {
    width: 44,
  },
  orbSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  orb: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.bdr2,
  },
  bottomSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  trackInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  trackName: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.txtPrimary,
    letterSpacing: -0.3,
  },
  trackCategory: {
    fontSize: 15,
    color: Colors.txtSecondary,
    marginTop: 4,
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.surf,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.bdr,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  timerText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.acc,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 36,
    marginTop: 16,
    marginBottom: 20,
  },
  skipButton: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.acc,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonPressed: {
    backgroundColor: Colors.accDim,
    transform: [{ scale: 0.97 }],
  },
});
