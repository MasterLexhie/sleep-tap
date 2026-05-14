import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';

type Variant = 'success' | 'info';

interface Props {
  label: string;
  variant?: Variant;
}

export function Badge({ label, variant = 'info' }: Props) {
  const isSuccess = variant === 'success';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isSuccess ? Colors.successBg : Colors.elev,
          borderColor: isSuccess ? Colors.successBdr : Colors.bdr2,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: isSuccess ? Colors.success : Colors.acc },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});
