import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface Props {
  onFinish: () => void;
}

const MESSAGES = [
  'Loading sounds…',
  'Preparing loops…',
  'Almost ready…',
  'Welcome back',
];

function SplashRipple({ radius, delay }: { radius: number; delay: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: 2800, easing: Easing.out(Easing.ease) }),
        -1,
        false,
      ),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    position: 'absolute' as const,
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    borderWidth: 1.5,
    borderColor: Colors.bdr2,
    opacity: interpolate(progress.value, [0, 1], [0.4, 0]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.85, 1.45]) }],
  }));

  return <Animated.View style={style} />;
}

export function AppSplash({ onFinish }: Props) {
  const [messageIndex, setMessageIndex] = useState(0);
  const barProgress = useSharedValue(0);
  const fadeOut = useSharedValue(1);

  useEffect(() => {
    barProgress.value = withTiming(1, {
      duration: 2400,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });

    const interval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev >= MESSAGES.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 700);

    const timeout = setTimeout(() => {
      fadeOut.value = withTiming(0, { duration: 300 }, () => {
        runOnJS(onFinish)();
      });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const barStyle = useAnimatedStyle(() => ({
    width: `${barProgress.value * 100}%` as any,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    opacity: fadeOut.value,
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <View style={styles.center}>
        <View style={styles.orbContainer}>
          <SplashRipple radius={44} delay={0} />
          <SplashRipple radius={58} delay={700} />
          <SplashRipple radius={72} delay={1400} />
          <SplashRipple radius={86} delay={2100} />
          <View style={styles.orb}>
            <Ionicons name="water" size={38} color={Colors.acc} />
          </View>
        </View>

        <Text style={styles.title}>Sleep Tap</Text>
        <Text style={styles.subtitle}>for Victoria's quiet mind</Text>
      </View>

      <View style={styles.bottom}>
        <View style={styles.barTrack}>
          <Animated.View style={[styles.barFill, barStyle]} />
        </View>
        <Text style={styles.message}>{MESSAGES[messageIndex]}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    alignItems: 'center',
  },
  orbContainer: {
    width: 176,
    height: 176,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  orb: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#1a1208',
    borderWidth: 1.5,
    borderColor: Colors.bdr2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.txtPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.txtTertiary,
    marginTop: 6,
  },
  bottom: {
    position: 'absolute',
    bottom: 72,
    alignItems: 'center',
  },
  barTrack: {
    width: 120,
    height: 2,
    backgroundColor: Colors.elev,
    borderRadius: 1,
    overflow: 'hidden',
  },
  barFill: {
    height: 2,
    backgroundColor: Colors.acc,
    borderRadius: 1,
  },
  message: {
    fontSize: 11,
    color: Colors.txtTertiary,
    marginTop: 12,
  },
});
