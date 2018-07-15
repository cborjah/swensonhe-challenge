import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getCurrencies } from '../api/currencyHelpers';

class CurrencyList extends PureComponent {
  state = {
    currencies: null,
    loading: false
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

      // console.log('currArr: ', currArr);
      this.setState({ currencies: currArr });
    } catch (err) {
      console.log('Error fetching currency list: ', err);
    }
  };

  handleRenderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text>{item.key}</Text>
        <Text>{item.caption}</Text>
      </View>
    );
  };

  renderSeparator = () => <View style={styles.separator} />

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.currencies}
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

export { CurrencyList };
