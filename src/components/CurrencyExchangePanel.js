import React from 'react';
import { CURRENCY_SYMBOLS } from '../constants';
import { exchangeToValue } from '../selectors/rates';
import propTypes from 'prop-types';

export const CurrencyExchangePanel = ({
  rates,
  fromCurrency,
  toCurrency,
}) => {
  const result = exchangeToValue(rates, fromCurrency, toCurrency, 1);
  return (
    <span>
      {CURRENCY_SYMBOLS[fromCurrency]}
1&nbsp;=&nbsp;
      {CURRENCY_SYMBOLS[toCurrency]}
      {Math.round(result * 10000) / 10000}
    </span>
  );
};

CurrencyExchangePanel.propTypes = {
  rates: propTypes.object,
  fromCurrency: propTypes.string,
  toCurrency: propTypes.string
}
