import { createStackNavigator } from 'react-navigation';

import { ConversionRates, CurrencyList, Calculator } from './components';

const Router = createStackNavigator(
  {
    Home: { screen: ConversionRates },
    CurrencyList: { screen: CurrencyList },
    Calculator: { screen: Calculator }
  },
  {
    initialRouteName: 'Home'
  }
);

export default Router;
