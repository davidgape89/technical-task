export const exchangeToValue = (rates, fromCurrency, toCurrency, amount) => {
  return amount / rates[fromCurrency] * rates[toCurrency];
}

export const exchangeFromValue = (rates, fromCurrency, toCurrency, amount) => {
  return amount / rates[toCurrency] * rates[fromCurrency];
}