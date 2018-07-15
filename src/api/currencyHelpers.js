import axios from 'axios';
import Config from 'react-native-config';

export const getCurrencies = () => {
  const url = `http://data.fixer.io/api/symbols?access_key=${Config.FIXER_API_KEY}`;

  return axios(url)
    .then(response => response.data.symbols)
    .catch(err => console.log(err));
};
