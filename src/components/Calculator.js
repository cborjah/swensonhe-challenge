import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import {
  convertBaseAmount,
  formatAmount,
  roundToTwoDecimalPlaces
} from '../api/currencyHelpers';

class Calculator extends PureComponent {
  state = {
    wholeNum: '1',
    decimalNum: '00',
    convertedAmount: ''
  };

  componentDidMount() {
    const { navigation } = this.props;
    console.log('Calculator has mounted.');
    // console.log('baseCurrency: ', navigation.getParam('baseCurrency'));
    // console.log('conversionRate: ', navigation.getParam('conversionRate'));
    const defaultAmount = navigation.getParam('conversionRate').rate;
    const formattedAmount = roundToTwoDecimalPlaces(defaultAmount);
    this.setState({ convertedAmount: formattedAmount.toString() });
  }

  handleOnChange = (amount, type) => {
    if (type === 'whole') {
      this.setState({ wholeNum: amount }, () => {
        this.performCalculations()
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
    return (
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          onChangeText={val => this.handleOnChange(val, 'whole')}
          value={this.state.wholeNum}
          keyboardType="number-pad"
          maxLength={4}
        />
        <Text>.</Text>
        <TextInput
          style={styles.input}
          onChangeText={val => this.handleOnChange(val, 'decimal')}
          value={this.state.decimalNum}
          keyboardType="number-pad"
          maxLength={2}
        />
        <Text>EUR</Text>
      </View>
    );
  };

  renderResult = () => {
    const conversionRate = this.props.navigation.getParam('conversionRate');
    return (
      <View style={styles.row}>
        <Text>{this.state.convertedAmount}</Text>
        <Text>{conversionRate.key}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderInput()}
        {this.renderResult()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {},
  row: {
    flexDirection: 'row'
  }
});

export { Calculator };
