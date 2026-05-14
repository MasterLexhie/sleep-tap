import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '../../constants/colors';
import { useAudio } from '../../context/AudioContext';
import { useSettings } from '../../context/SettingsContext';
import { SectionHeader } from '../../components/SectionHeader';
import { ListGroup } from '../../components/ListGroup';
import { ListRow } from '../../components/ListRow';
import { Badge } from '../../components/Badge';
import { Toggle } from '../../components/Toggle';

const VOLUME_OPTIONS = [
  { label: '25%', value: 0.25 },
  { label: '50%', value: 0.5 },
  { label: '65%', value: 0.65 },
  { label: '75%', value: 0.75 },
  { label: '100%', value: 1.0 },
];

const FADE_OPTIONS = [
  { label: '1 sec', value: 1 },
  { label: '2 sec', value: 2 },
  { label: '3 sec', value: 3 },
  { label: '5 sec', value: 5 },
  { label: '10 sec', value: 10 },
];

const DURATION_OPTIONS = [
  { label: '15 min', value: 15 },
  { label: '30 min', value: 30 },
  { label: '45 min', value: 45 },
  { label: '60 min', value: 60 },
];

type PickerConfig = {
  title: string;
  options: { label: string; value: number }[];
  current: number;
  onSelect: (value: number) => void;
} | null;

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { state, setVolume } = useAudio();
  const { settings, update } = useSettings();
  const [picker, setPicker] = useState<PickerConfig>(null);

  const handleVolumeSelect = (value: number) => {
    update('defaultVolume', value);
    setVolume(value);
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
        <Text style={styles.eyebrow}>Preferences</Text>
        <Text style={styles.title}>Settings</Text>
      </View>

      <SectionHeader title="Playback" />
      <ListGroup>
        <ListRow
          icon="volume-high"
          iconBg="#2e1e0e"
          iconColor={Colors.acc}
          label="Default volume"
          value={`${Math.round(settings.defaultVolume * 100)}%`}
          onPress={() =>
            setPicker({
              title: 'Default Volume',
              options: VOLUME_OPTIONS,
              current: settings.defaultVolume,
              onSelect: handleVolumeSelect,
            })
          }
        />
        <ListRow
          icon="pulse"
          iconBg={Colors.elev}
          iconColor={Colors.txtSecondary}
          label="Fade out duration"
          value={`${settings.fadeDuration} sec`}
          onPress={() =>
            setPicker({
              title: 'Fade Duration',
              options: FADE_OPTIONS,
              current: settings.fadeDuration,
              onSelect: (v) => update('fadeDuration', v),
            })
          }
        />
        <ListRow
          icon="headset"
          iconBg={Colors.elev}
          iconColor={Colors.txtSecondary}
          label="Background audio"
          right={<Badge label="Enabled" variant="success" />}
        />
      </ListGroup>

      <View style={styles.section}>
        <SectionHeader title="Timer" />
      </View>
      <ListGroup>
        <ListRow
          icon="time"
          iconBg="#2e1e0e"
          iconColor={Colors.acc}
          label="Default duration"
          value={`${settings.defaultTimerMinutes} min`}
          onPress={() =>
            setPicker({
              title: 'Default Duration',
              options: DURATION_OPTIONS,
              current: settings.defaultTimerMinutes,
              onSelect: (v) => update('defaultTimerMinutes', v),
            })
          }
        />
        <ListRow
          icon="infinite"
          iconBg={Colors.elev}
          iconColor={Colors.txtSecondary}
          label="Endless by default"
          right={
            <Toggle
              value={settings.endlessByDefault}
              onValueChange={(v) => update('endlessByDefault', v)}
            />
          }
        />
      </ListGroup>

      <View style={styles.section}>
        <SectionHeader title="About" />
      </View>
      <ListGroup>
        <ListRow
          icon="information-circle"
          iconBg={Colors.elev}
          iconColor={Colors.txtSecondary}
          label="Version"
          right={<Badge label="1.0.0 MVP" variant="info" />}
        />
        <ListRow
          icon="cloud-offline"
          iconBg={Colors.successBg}
          iconColor={Colors.success}
          label="Offline mode"
          right={<Badge label="Always on" variant="success" />}
        />
        <ListRow
          icon="checkmark-circle"
          iconBg={Colors.successBg}
          iconColor={Colors.success}
          label="No account needed"
          right={<Ionicons name="checkmark" size={17} color={Colors.acc} />}
        />
      </ListGroup>

      <Modal
        visible={picker !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setPicker(null)}
      >
        <Pressable style={styles.overlay} onPress={() => setPicker(null)}>
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{picker?.title}</Text>
            {picker?.options.map((opt) => {
              const isSelected = opt.value === picker.current;
              return (
                <Pressable
                  key={opt.value}
                  style={[styles.option, isSelected && styles.optionSelected]}
                  onPress={() => {
                    Haptics.selectionAsync();
                    picker.onSelect(opt.value);
                    setPicker(null);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {opt.label}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark" size={18} color={Colors.acc} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
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
  section: {
    marginTop: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.surf,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.txtPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 4,
  },
  optionSelected: {
    backgroundColor: Colors.elev,
  },
  optionText: {
    fontSize: 16,
    color: Colors.txtPrimary,
  },
  optionTextSelected: {
    color: Colors.acc,
    fontWeight: '600',
  },
});
