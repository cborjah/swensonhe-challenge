import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { ListItem } from './';
import { FlatListSeparator } from './common';
import { getCurrencies, getLatestRates } from '../api/currencyHelpers';

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
    
    try {
      const conversionRates = await getLatestRates(baseCurrency);
      console.log('Successfully retrieved conversion rates: ', conversionRates);

      const ratesArr = Object.keys(conversionRates).map(key => {
        return {
          key,
          rate: conversionRates[key]
        };
      });

      onSelection(baseCurrency, ratesArr);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  handleRenderItem = ({ item }) => (
    <ListItem data={item} onPress={this.handleOnPress} type={'currencies'} />
  );

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
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

// CurrencyList.propTypes = {
//   onSelection: PropTypes.string.isRequired
// };

// CurrencyList.defaultProps = {
//   text: "Lorem ipsum"
// };

export { CurrencyList };
