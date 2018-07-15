import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { ListItem } from './';
import { getCurrencies } from '../api/currencyHelpers';

class ConversionRates extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    currencies: [],
    baseCurrency: '',
    conversionRates: []
  };

  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies = async () => {
    try {
      const currencies = await getCurrencies();
      console.log('List of currencies received: ', currencies);

      const currArr = Object.keys(currencies).map(key => {
        return {
          key,
          caption: currencies[key]
        };
      });

      // console.log('currArr: ', currArr);
      this.setState({ currencies: currArr });
    } catch (err) {
      console.log('Error fetching currency list: ', err);
    }
  };


  handleSelection = (currency, conversionRates) => {
    console.log('Selected: ', currency);
    console.log('Conversion rates: ', conversionRates);

    this.setState({ baseCurrency: currency });
  };

  handleBaseCurrPress = () => {
    if (!!this.state.currencies.length) {
      this.props.navigation.navigate('CurrencyList', {
        currencies: this.state.currencies,
        onSelection: this.handleSelection
      });
    }
  };

  renderConversionRates = () => {
    return (
      <FlatList
        data={[{ key: 'a' }, { key: 'b' }]}
        renderItem={({ item }) => <Text>{item.key}</Text>}
      />
    );
  };

  render() {
    const { baseCurrency, conversionRates } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.baseCurrBtn}
          onPress={this.handleBaseCurrPress}
        >
          <Text style={styles.baseCurrBtnTxt}>Base Currency</Text>
          <Text style={styles.baseCurrBtnTxt}>{baseCurrency.key}</Text>
        </TouchableOpacity>
        {!!conversionRates.length && this.renderConversionRates()}
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
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  baseCurrBtnTxt: {
    color: 'white'
  }
});

export { ConversionRates };
