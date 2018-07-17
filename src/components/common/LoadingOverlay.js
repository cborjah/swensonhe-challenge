import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

const LoadingOverlay = () => (
  <ActivityIndicator style={styles.overlay} size={'large'} />
);

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

export { LoadingOverlay };
