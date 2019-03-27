export const exchangeCurrency = (fromCurrency, fromAmount, toCurrency, toAmount) => ({
  type: 'EXCHANGE_CURRENCY',
  fromCurrency,
  fromAmount,
  toCurrency,
  toAmount
});