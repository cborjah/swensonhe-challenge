import { createStackNavigator } from 'react-navigation';

import { ConversionRates, CurrencyList } from './components';

const Router = createStackNavigator(
  {
    Home: { screen: ConversionRates },
    CurrencyList: { screen: CurrencyList }
  },
  {
    initialRouteName: 'Home'
  }
);

export default Router;
