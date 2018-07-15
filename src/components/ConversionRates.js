import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ListItem } from './';
import { getCurrencies } from '../api/currencyHelpers';

class ConversionRates extends Component {
  static navigationOptions = {
    header: null
  };

  handleBaseCurrPress = () => {
    this.props.navigation.navigate('CurrencyList');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.baseCurrBtn}
          onPress={this.handleBaseCurrPress}
        >
          <Text style={styles.baseCurrBtnTxt}>Base Currency</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  baseCurrBtn: {
    height: 70,
    backgroundColor: 'blue',
    justifyContent: 'center'
  },
  baseCurrBtnTxt: {
    color: 'white'
  }
});

export { ConversionRates };
