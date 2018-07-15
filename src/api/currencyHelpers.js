import axios from 'axios';
import Config from 'react-native-config';

export const getCurrencies = () => {
  const url = `http://data.fixer.io/api/symbols?access_key=${
    Config.FIXER_API_KEY
  }`;

  return axios(url)
    .then(response => response.data.symbols)
    .catch(err => console.log(err));
};

export const getLatestRates = base => {
  console.log('base: ', base);

  base = 'EUR'; // Mock data

  const url = `http://data.fixer.io/api/latest?access_key=${
    Config.FIXER_API_KEY
  }&base=${base}`;

  return axios(url).then(response => response.data.rates).catch(err => err);
};
