import React from 'react';
import { View, StyleSheet } from 'react-native';

const FlatListSeparator = () => (
  <View style={styles.separator} />
);

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'grey'
  }
});


export { FlatListSeparator };
