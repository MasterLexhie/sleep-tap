import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../constants/colors';

interface Props {
  children: React.ReactNode;
}

export function ListGroup({ children }: Props) {
  const items = React.Children.toArray(children);

  return (
    <View style={styles.container}>
      {items.map((child, i) => (
        <React.Fragment key={i}>
          {child}
          {i < items.length - 1 && <View style={styles.separator} />}
        </React.Fragment>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    backgroundColor: Colors.surf,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.bdr,
    overflow: 'hidden',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.bdr,
  },
});
