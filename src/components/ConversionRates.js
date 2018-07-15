import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { ListItem } from './';

class ConversionRates extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    baseCurrency: '',
    conversionRates: []
  };

  handleSelection = currency => {
    console.log('Selected: ', currency);
    this.setState({ baseCurrency: currency });
  };

  handleBaseCurrPress = () => {
    this.props.navigation.navigate('CurrencyList', {
      onSelection: this.handleSelection
    });
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
