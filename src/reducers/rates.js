export const defaultState = {
  base: 'EUR',
  rates: {},
};

export const ratesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_BASE':
      return { ...state, base: action.base };
    case 'SET_RATES':
      return { ...state, rates: action.rates };
    default:
      return state;
  }
};
