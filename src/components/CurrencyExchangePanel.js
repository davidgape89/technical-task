import React from 'react';
import {CURRENCY_SYMBOLS} from '../constants';
import {exchangeToValue} from '../selectors/rates';

export const CurrencyExchangePanel = ({
  rates,
  fromCurrency,
  toCurrency
}) => {
  const result = exchangeToValue(rates,fromCurrency,toCurrency,1);
  return (
    <span>
      {CURRENCY_SYMBOLS[fromCurrency]}1&nbsp;=&nbsp;
      {CURRENCY_SYMBOLS[toCurrency]}
      {Math.round(result * 10000) / 10000}
    </span>
  )
};