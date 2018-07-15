import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { ListItem } from './';
import { FlatListSeparator } from './common';
import { getCurrencies } from '../api/currencyHelpers';

class ConversionRates extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    currencies: [],
    baseCurrency: '',
    conversionRates: null
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

      this.setState({ currencies: currArr });
    } catch (err) {
      console.log('Error fetching currency list: ', err);
    }
  };

  handleSelection = (currency, conversionRates) => {
    console.log('Selected: ', currency);
    console.log('Conversion rates: ', conversionRates);

    this.setState({ baseCurrency: currency, conversionRates });
  };

  handleBaseCurrPress = () => {
    if (this.state.currencies) {
      this.props.navigation.navigate('CurrencyList', {
        currencies: this.state.currencies,
        onSelection: this.handleSelection
      });
    }
  };

  handleRenderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.row}>
        <Text>{item.key}</Text>
        <Text>{item.rate}</Text>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <FlatListSeparator />;

  renderConversionRates = () => {
    console.log('Rendering conversion rates: ', this.state.conversionRates);
    return (
      <FlatList
        data={this.state.conversionRates}
        renderItem={this.handleRenderItem}
        ItemSeparatorComponent={this.renderSeparator}
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
        {conversionRates && this.renderConversionRates()}
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
  },
  row: {
    flexDirection: 'row'
  }
});

export { ConversionRates };
