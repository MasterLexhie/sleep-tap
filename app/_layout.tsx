import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AudioProvider } from '../context/AudioContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { SettingsProvider } from '../context/SettingsContext';
import { Colors } from '../constants/colors';
import { AppSplash } from '../components/AppSplash';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <SettingsProvider>
        <AudioProvider>
          <FavoritesProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: Colors.bg },
              }}
            >
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="now-playing"
                options={{
                  presentation: 'modal',
                  animation: 'slide_from_bottom',
                  gestureEnabled: true,
                  gestureDirection: 'vertical',
                }}
              />
            </Stack>
          </FavoritesProvider>
        </AudioProvider>
      </SettingsProvider>
      {showSplash && (
        <View style={[StyleSheet.absoluteFill, { zIndex: 10 }]}>
          <AppSplash onFinish={() => setShowSplash(false)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
});
