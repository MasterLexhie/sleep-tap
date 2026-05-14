import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { SOUNDS } from '../../constants/sounds';
import { useAudio } from '../../context/AudioContext';
import { useFavorites } from '../../context/FavoritesContext';
import { SectionHeader } from '../../components/SectionHeader';
import { ListGroup } from '../../components/ListGroup';
import { FavouriteRow } from '../../components/FavouriteRow';

export default function FavouritesScreen() {
  const insets = useSafeAreaInsets();
  const { state, playSound } = useAudio();
  const { toggleFavorite, isFavorite } = useFavorites();

  const pinnedSounds = SOUNDS.filter((s) => isFavorite(s.id));
  const recentSounds = state.recentlyPlayed.filter((s) => !isFavorite(s.id));

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
        <Text style={styles.eyebrow}>Your collection</Text>
        <Text style={styles.title}>Favourites</Text>
      </View>

      {pinnedSounds.length > 0 ? (
        <>
          <SectionHeader title="Pinned" />
          <ListGroup>
            {pinnedSounds.map((sound) => (
              <FavouriteRow
                key={sound.id}
                sound={sound}
                showHeart
                onPress={() => playSound(sound)}
                onRemove={() => toggleFavorite(sound.id)}
              />
            ))}
          </ListGroup>
        </>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="heart" size={40} color={Colors.txtTertiary} />
          <Text style={styles.emptyTitle}>No favourites yet</Text>
          <Text style={styles.emptySub}>
            Hold any sound on the Sleep tab to pin it here.
          </Text>
        </View>
      )}

      {recentSounds.length > 0 && (
        <>
          <View style={styles.recentSection}>
            <SectionHeader title="Recently Played" />
          </View>
          <ListGroup>
            {recentSounds.map((sound) => (
              <FavouriteRow
                key={sound.id}
                sound={sound}
                onPress={() => playSound(sound)}
              />
            ))}
          </ListGroup>
        </>
      )}

      <Text style={styles.hint}>Hold any sound card to pin it here</Text>
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 17,
    color: Colors.txtSecondary,
    marginTop: 12,
  },
  emptySub: {
    fontSize: 14,
    color: Colors.txtTertiary,
    textAlign: 'center',
    marginTop: 6,
  },
  recentSection: {
    marginTop: 10,
  },
  hint: {
    fontSize: 13,
    color: Colors.txtTertiary,
    textAlign: 'center',
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginTop: 16,
  },
});
