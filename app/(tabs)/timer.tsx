import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/colors';
import { useAudio } from '../../context/AudioContext';
import { SectionHeader } from '../../components/SectionHeader';
import { TimerRing } from '../../components/TimerRing';
import { TimerChips } from '../../components/TimerChips';
import { ListGroup } from '../../components/ListGroup';
import { ListRow } from '../../components/ListRow';
import { Toggle } from '../../components/Toggle';
import { StartTimerButton } from '../../components/StartTimerButton';

export default function TimerScreen() {
  const insets = useSafeAreaInsets();
  const { state, setTimer } = useAudio();
  const hasPlayer = state.currentSound !== null;
  const [fadeOut, setFadeOut] = useState(true);

  const isTimerActive = state.timerRemaining !== null && state.timerRemaining > 0;

  const handleStartCancel = () => {
    if (isTimerActive) {
      setTimer(0);
    } else if (state.timerMinutes > 0) {
      setTimer(state.timerMinutes);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top,
        paddingBottom: hasPlayer ? 90 : 16,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Wind-down</Text>
        <Text style={styles.title}>Timer</Text>
      </View>

      <View style={styles.ringWrap}>
        <TimerRing
          selectedMinutes={state.timerMinutes}
          remainingSeconds={state.timerRemaining}
          isActive={isTimerActive}
        />
      </View>

      <TimerChips />

      <View style={styles.optionsSection}>
        <SectionHeader title="Options" />
      </View>
      <ListGroup>
        <ListRow
          icon="volume-low"
          iconBg={Colors.elev}
          iconColor={Colors.txtSecondary}
          label="Fade out on stop"
          right={<Toggle value={fadeOut} onValueChange={setFadeOut} />}
        />
        <ListRow
          icon="time-outline"
          iconBg={Colors.elev}
          iconColor={Colors.txtSecondary}
          label="Fade duration"
          value="3 sec"
        />
      </ListGroup>

      <View style={styles.buttonWrap}>
        <StartTimerButton isActive={isTimerActive} onPress={handleStartCancel} />
      </View>
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
  ringWrap: {
    paddingTop: 6,
    paddingBottom: 16,
  },
  optionsSection: {
    marginTop: 10,
  },
  buttonWrap: {
    marginTop: 20,
  },
});
