export const defaultState = {
  EUR: 20.000000,
  USD: 40.000000,
  GBP: 80.000000,
};

export const pocketsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_POCKET':
      return { ...state, [action.currency]: action.amount };
    case 'EXCHANGE_CURRENCY':
      const { fromCurrency } = action;
      const { toCurrency } = action;
      const { fromAmount } = action;
      const { toAmount } = action;
      return {
        ...state,
        [fromCurrency]: state[fromCurrency] - fromAmount,
        [toCurrency]: state[toCurrency] + toAmount,
      };
    default:
      return state;
  }
};
