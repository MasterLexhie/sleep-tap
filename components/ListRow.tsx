import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  iconColor: string;
  label: string;
  value?: string;
  right?: React.ReactNode;
  onPress?: () => void;
}

export function ListRow({ icon, iconBg, iconColor, label, value, right, onPress }: Props) {
  const content = (
    <>
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={15} color={iconColor} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.right}>
        {right ?? (
          <>
            {value != null && <Text style={styles.value}>{value}</Text>}
            {onPress && (
              <Ionicons name="chevron-forward" size={13} color={Colors.txtTertiary} />
            )}
          </>
        )}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      >
        {content}
      </Pressable>
    );
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 14,
    gap: 10,
  },
  pressed: {
    backgroundColor: Colors.elev,
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.txtPrimary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  value: {
    fontSize: 14,
    color: Colors.txtSecondary,
  },
});
