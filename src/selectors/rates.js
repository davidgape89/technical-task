export const exchangeToValue = (rates, fromCurrency, toCurrency, amount) => amount / rates[fromCurrency] * rates[toCurrency];

export const exchangeFromValue = (rates, fromCurrency, toCurrency, amount) => amount / rates[toCurrency] * rates[fromCurrency];
