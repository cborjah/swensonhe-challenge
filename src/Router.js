import { createStackNavigator } from 'react-navigation';

import { CurrencyList } from './components';

const Router = createStackNavigator(
  {
    Home: CurrencyList
  },
  {
    initialRouteName: 'Home'
  }
);

export default Router;
