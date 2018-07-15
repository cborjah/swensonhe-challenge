import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { convertBaseAmount, formatAmount, roundToTwoDecimalPlaces } from '../api/currencyHelpers';

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

  handleOnChangeWholeNum = amount => {
    const rate = this.props.navigation.getParam('conversionRate').rate;

    this.setState({ wholeNum: amount }, () => {
      const formattedAmount = formatAmount(
        this.state.wholeNum,
        this.state.decimalNum
      );
      const newAmount = convertBaseAmount(formattedAmount, rate);
      console.log('newAmount: ', newAmount);
      const newAmountRounded = roundToTwoDecimalPlaces(newAmount);
      this.setState({ convertedAmount: newAmountRounded.toString() });
    });
  };

  handleOnChangeDecimalNum = amount => {
    const rate = this.props.navigation.getParam('conversionRate').rate;

    this.setState({ decimalNum: amount }, () => {
      const formattedAmount = formatAmount(
        this.state.wholeNum,
        this.state.decimalNum
      );
      const newAmount = convertBaseAmount(formattedAmount, rate);
      console.log('newAmount: ', newAmount);
      const newAmountRounded = roundToTwoDecimalPlaces(newAmount);
      this.setState({ convertedAmount: newAmountRounded.toString() });
    });
  };

  renderInput = () => {
    return (
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          onChangeText={this.handleOnChangeWholeNum}
          value={this.state.wholeNum}
          keyboardType="number-pad"
          maxLength={4}
        />
        <Text>.</Text>
        <TextInput
          style={styles.input}
          onChangeText={this.handleOnChangeDecimalNum}
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
