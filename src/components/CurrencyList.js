import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ListItem } from './';
import { getCurrencies } from '../api/currencyHelpers';

class CurrencyList extends Component {
  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies = async () => {
    try {
      const currencies = await getCurrencies();
      console.log('List of currencies received: ', currencies);
    } catch (err) {
      console.log('Error fetching currency list: ', err);
    }
  };

  render() {
    return (
      <View>
        <Text>CurrencyList screen</Text>
      </View>
    );
  }
}

export { CurrencyList };
