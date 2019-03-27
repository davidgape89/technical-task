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
      return {
        ...state,
        [action.fromCurrency]: state[action.fromCurrency] - action.fromAmount,
        [action.toCurrency]: state[action.toCurrency] + action.toAmount,
      };
    default:
      return state;
  }
};
