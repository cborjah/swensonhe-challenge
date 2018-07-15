import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
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

      onSelection(item, conversionRates);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  handleRenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => this.handleOnPress(item)}
      >
        <Text>{item.key}</Text>
        <Text>{item.caption}</Text>
      </TouchableOpacity>
    );
  };

  renderSeparator = () => <View style={styles.separator} />;

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
  separator: {
    height: 1,
    backgroundColor: 'black'
  }
});

// CurrencyList.propTypes = {
//   onSelection: PropTypes.string.isRequired
// };

// CurrencyList.defaultProps = {
//   text: "Lorem ipsum"
// };

export { CurrencyList };
