import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';

interface Props {
  title: string;
}

export function SectionHeader({ title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    paddingHorizontal: 22,
    paddingBottom: 5,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.txtSecondary,
    letterSpacing: 0.8,
  },
});
