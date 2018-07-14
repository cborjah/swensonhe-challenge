import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Router } from ''

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RootStack />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
