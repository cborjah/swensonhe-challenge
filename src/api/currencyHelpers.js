import axios from 'axios';
import Config from 'react-native-config';

export const getCurrencies = () => {
  const url = `https://exchangeratesapi.io/api/latest`;

  return axios(url)
    .then(response => {
      console.log('response: ', response);
      const codeArr = Object.keys(response.data.rates).map(
        currencyCode => currencyCode
      );
      codeArr.push('EUR');
      return codeArr.sort();
    })
    .catch(err => console.log(err));
};

export const getLatestRates = base => {
  console.log('base: ', base);
  const url = `https://exchangeratesapi.io/api/latest?base=${base}`;

  return axios(url)
    .then(response => response.data.rates)
    .catch(err => err);
};

export const convertBaseAmount = (amount, rate) => {
  const result = amount * rate;
  console.log('converted base amount: ', result);
  return result.toFixed(2);
};

export const formatAmount = (wholeNum, decimalNum) => {
  const resultStr = wholeNum.concat(`.${decimalNum}`);
  return parseFloat(resultStr);
};

export const roundToTwoDecimalPlaces = number => {
  return (Math.round(number * 100) / 100).toFixed(2);
};
