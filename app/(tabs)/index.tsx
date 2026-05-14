import React, { useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { SOUNDS, SoundItem } from '../../constants/sounds';
import { useAudio } from '../../context/AudioContext';
import { useFavorites } from '../../context/FavoritesContext';
import { SoundCard } from '../../components/SoundCard';
import { SectionHeader } from '../../components/SectionHeader';
import { TimerChips } from '../../components/TimerChips';
import { getGreeting } from '../../constants/greetings';

export default function SleepScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { state, playSound } = useAudio();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { width } = useWindowDimensions();
  const cardWidth = (width - 32 - 8) / 2;
  const greeting = useMemo(() => getGreeting(), []);

  const handleSoundPress = (sound: SoundItem) => {
    playSound(sound);
    setTimeout(() => router.push('/now-playing'), 150);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: state.currentSound ? 90 : 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>{greeting.eyebrow}</Text>
        <Text style={styles.title}>{greeting.title}</Text>
      </View>

      <SectionHeader title="Sounds" />
      <View style={styles.grid}>
        {SOUNDS.map((sound) => (
          <View key={sound.id} style={{ width: cardWidth }}>
            <SoundCard
              sound={sound}
              isActive={state.currentSound?.id === sound.id}
              isFavorite={isFavorite(sound.id)}
              onPress={() => handleSoundPress(sound)}
              onToggleFavorite={() => toggleFavorite(sound.id)}
            />
          </View>
        ))}
      </View>

      <View style={styles.timerSection}>
        <SectionHeader title="Sleep Timer" />
      </View>
      <TimerChips />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    paddingHorizontal: 22,
    marginTop: 6,
    marginBottom: 8,
  },
  eyebrow: {
    fontSize: 14,
    color: Colors.txtSecondary,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.txtPrimary,
    letterSpacing: -0.4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  timerSection: {
    marginTop: 10,
  },
});
