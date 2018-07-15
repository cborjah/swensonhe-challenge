import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Router from './Router';
import { CurrencyList } from './components';

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar hidden />
        <View style={styles.container}>
          <Router />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
