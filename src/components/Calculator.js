import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import {
  convertBaseAmount,
  formatAmount,
  roundToTwoDecimalPlaces
} from '../api/currencyHelpers';
import { FlatListSeparator } from './common';

const WIDTH = Dimensions.get('window').width;

class Calculator extends PureComponent {
  static navigationOptions = {
    title: 'Calculator'
  };

  state = {
    wholeNum: '1',
    decimalNum: '00',
    convertedAmount: ''
  };

  componentDidMount() {
    const { navigation } = this.props;
    const defaultAmount = navigation.getParam('conversionRate').rate;
    const formattedAmount = roundToTwoDecimalPlaces(defaultAmount);

    this.setState({ convertedAmount: formattedAmount.toString() });
  }

  handleOnChange = (amount, type) => {
    if (type === 'whole') {
      this.setState({ wholeNum: amount }, () => {
        this.performCalculations();
      });
    }

    if (type === 'decimal') {
      this.setState({ decimalNum: amount }, () => {
        this.performCalculations();
      });
    }
  };

  performCalculations = () => {
    const rate = this.props.navigation.getParam('conversionRate').rate;

    const formattedAmount = formatAmount(
      this.state.wholeNum,
      this.state.decimalNum
    );

    const newAmount = convertBaseAmount(formattedAmount, rate);
    this.setState({ convertedAmount: newAmount.toString() });
  };

  renderInput = () => {
    const baseCurrency = this.props.navigation.getParam('baseCurrency');

    return (
      <View style={[styles.inputContainer, styles.row]}>
        <View style={[styles.row, styles.input]}>
          <TextInput
            style={styles.number}
            onChangeText={val => this.handleOnChange(val, 'whole')}
            value={this.state.wholeNum}
            keyboardType="number-pad"
            maxLength={4}
          />
          <Text style={styles.number}>.</Text>
          <TextInput
            style={styles.number}
            onChangeText={val => this.handleOnChange(val, 'decimal')}
            value={this.state.decimalNum}
            keyboardType="number-pad"
            maxLength={2}
          />
        </View>
        <Text style={styles.currencyText}>{baseCurrency}</Text>
      </View>
    );
  };

  renderResult = () => {
    const conversionRate = this.props.navigation.getParam('conversionRate');
    return (
      <View style={[styles.resultContainer, styles.row]}>
        <Text style={styles.number}>{this.state.convertedAmount}</Text>
        <Text style={styles.currencyText}>{conversionRate.key}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container} keyboardVerticalOffset={20}>
        {this.renderInput()}
        <FlatListSeparator />
        {this.renderResult()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: WIDTH * 0.1,
    paddingTop: 30,
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row'
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15
  },
  number: {
    fontSize: 50,
    fontWeight: '200'
  },
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15
  },
  currencyText: {
    fontSize: 45,
    fontWeight: '200'
  }
});

export { Calculator };
