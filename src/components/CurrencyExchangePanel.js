import React from 'react';
import propTypes from 'prop-types';
import { CURRENCY_SYMBOLS } from '../constants';
import { exchangeToValue } from '../selectors/rates';

const CurrencyExchangePanel = ({
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
  rates: propTypes.objectOf(propTypes.number).isRequired,
  fromCurrency: propTypes.string.isRequired,
  toCurrency: propTypes.string.isRequired,
};

export default CurrencyExchangePanel;
