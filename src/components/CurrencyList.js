import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { FlatListSeparator } from './common';
import { getCurrencies, getLatestRates } from '../api/currencyHelpers';

class CurrencyList extends PureComponent {
  state = {
    currencies: null,
    loading: false
  };

  handleOnPress = async item => {
    const { navigation } = this.props;
    const onSelection = navigation.getParam('onSelection');

    try {
      const conversionRates = await getLatestRates(item.key);
      console.log('Successfully retrieved conversion rates: ', conversionRates);

      const ratesArr = Object.keys(conversionRates).map(key => {
        return {
          key,
          rate: conversionRates[key]
        };
      });

      onSelection(item, ratesArr);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  handleRenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={() => this.handleOnPress(item)}
      >
        <Text>{item.key}</Text>
        <Text>{item.caption}</Text>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <FlatListSeparator />;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.navigation.getParam('currencies')}
          renderItem={this.handleRenderItem}
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
    flexDirection: 'row'
  }
});

// CurrencyList.propTypes = {
//   onSelection: PropTypes.string.isRequired
// };

// CurrencyList.defaultProps = {
//   text: "Lorem ipsum"
// };

export { CurrencyList };
