import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { ListItem } from './';
import { FlatListSeparator } from './common';
import { getCurrencies, roundToTwoDecimalPlaces } from '../api/currencyHelpers';

class ConversionRates extends PureComponent {
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

      this.setState({ currencies: currencies });
    } catch (err) {
      console.log('Error fetching currency list: ', err);
    }
  };

  handleSelectedCurrency = (currency, conversionRates) => {
    this.setState({ baseCurrency: currency, conversionRates });
  };

  handleSelectedRate = item => {
    this.props.navigation.navigate('Calculator', {
      baseCurrency: this.state.baseCurrency,
      conversionRate: item
    });
  };

  handleBaseCurrPress = () => {
    if (!!this.state.currencies.length) {
      this.props.navigation.navigate('CurrencyList', {
        currencies: this.state.currencies,
        onSelection: this.handleSelectedCurrency
      });
    }
  };

  handleRenderItem = ({ item }) => (
    <ListItem data={item} onPress={this.handleSelectedRate} type={'rates'} />
  );

  renderSeparator = () => <FlatListSeparator />;

  renderConversionRates = () => {
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
          <Text style={styles.baseCurrBtnTxt}>{baseCurrency ? 'Base Currency' : 'Please select a base currency.'}</Text>
          <Text style={styles.baseCurrBtnTxt}>{baseCurrency}</Text>
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
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 35,
    paddingVertical: 30
  },
  baseCurrBtnTxt: {
    color: 'white'
  },
  row: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export { ConversionRates };
