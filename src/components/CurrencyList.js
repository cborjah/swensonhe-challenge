import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { ListItem } from './';
import { FlatListSeparator, LoadingOverlay } from './common';
import { getLatestRates } from '../api/currencyHelpers';

class CurrencyList extends PureComponent {
  static navigationOptions = {
    title: 'Currencies'
  };

  state = {
    currencies: null,
    loading: false
  };

  handleOnPress = async baseCurrency => {
    const { navigation } = this.props;
    const onSelection = navigation.getParam('onSelection');

    this.setState({ loading: true });

    try {
      const conversionRates = await getLatestRates(baseCurrency);
      console.log('Successfully retrieved conversion rates: ', conversionRates);

      const ratesArr = Object.keys(conversionRates).map(key => {
        return {
          key,
          rate: conversionRates[key]
        };
      });

      // Passes back fetched conversion rates to ConversionRates screen.
      onSelection(baseCurrency, ratesArr);

      navigation.goBack();
    } catch (err) {
      console.log(err);
    }

    this.setState({ loading: false });
  };

  handleRenderItem = ({ item }) => (
    <ListItem data={item} onPress={this.handleOnPress} type={'currencies'} />
  );

  renderSeparator = () => <FlatListSeparator />;

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && <LoadingOverlay />}
        <FlatList
          data={this.props.navigation.getParam('currencies')}
          renderItem={this.handleRenderItem}
          keyExtractor={item => item}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

CurrencyList.propTypes = {
  currencies: PropTypes.object.isRequired,
  onSelection: PropTypes.func.isRequired
};

export { CurrencyList };
