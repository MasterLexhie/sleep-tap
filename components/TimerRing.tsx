import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '../constants/colors';

const CANVAS = 200;
const RENDERED_SIZE = 192;
const RADIUS = 72;
const STROKE_WIDTH = 11;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const INNER_RADIUS = 55;

interface Props {
  selectedMinutes: number;
  remainingSeconds: number | null;
  isActive: boolean;
}

export function TimerRing({ selectedMinutes, remainingSeconds, isActive }: Props) {
  const progress =
    isActive && remainingSeconds !== null && selectedMinutes > 0
      ? remainingSeconds / (selectedMinutes * 60)
      : selectedMinutes > 0
        ? selectedMinutes / 60
        : 1;

  const offset = CIRCUMFERENCE * (1 - Math.min(1, Math.max(0, progress)));

  const displayText =
    isActive && remainingSeconds !== null
      ? `${Math.floor(remainingSeconds / 60)}:${(remainingSeconds % 60).toString().padStart(2, '0')}`
      : selectedMinutes > 0
        ? `${selectedMinutes}`
        : '∞';

  const unitText =
    isActive && remainingSeconds !== null
      ? 'remaining'
      : selectedMinutes > 0
        ? 'minutes'
        : 'endless';

  return (
    <View style={styles.container}>
      <Svg
        width={RENDERED_SIZE}
        height={RENDERED_SIZE}
        viewBox={`0 0 ${CANVAS} ${CANVAS}`}
      >
        <Circle
          cx={CANVAS / 2}
          cy={CANVAS / 2}
          r={INNER_RADIUS}
          fill="#171210"
        />
        <Circle
          cx={CANVAS / 2}
          cy={CANVAS / 2}
          r={RADIUS}
          stroke={Colors.elev}
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
        <Circle
          cx={CANVAS / 2}
          cy={CANVAS / 2}
          r={RADIUS}
          stroke={Colors.acc}
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${CIRCUMFERENCE}`}
          strokeDashoffset={offset}
          rotation={-90}
          origin={`${CANVAS / 2}, ${CANVAS / 2}`}
        />
      </Svg>

      <View style={styles.labels}>
        <Text style={styles.bigNumber}>{displayText}</Text>
        <Text style={styles.unit}>{unitText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: RENDERED_SIZE,
    height: RENDERED_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  labels: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigNumber: {
    fontSize: 40,
    fontWeight: '700',
    color: Colors.txtPrimary,
    letterSpacing: -1,
  },
  unit: {
    fontSize: 13,
    color: Colors.txtSecondary,
    marginTop: 2,
  },
});
