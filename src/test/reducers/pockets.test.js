import {pocketsReducer, defaultState} from '../../reducers/pockets';

describe('pocketsReducer -', () => {
  it('sets up correctly', () => {
    const state = pocketsReducer(undefined, {
      type: '@@INIT'
    });

    expect(state).toEqual(defaultState);
  });

  it('sets a pocket correctly', () => {
    const amount = 20.00;
    const currency = 'EUR';
    const state = pocketsReducer(defaultState, {
      type: 'SET_POCKET',
      amount,
      currency
    });

    expect(state[currency]).toBe(amount);
  });

  it('makes an exchange correctly', () => {
    const fromCurrency = 'USD';
    const fromAmount = 10.00;
    const toCurrency = 'EUR';
    const toAmount = 20.00;
    const state = pocketsReducer(defaultState, {
      type: 'EXCHANGE_CURRENCY',
      fromCurrency,
      fromAmount,
      toCurrency,
      toAmount
    });
    
    expect(state[fromCurrency]).toBe(defaultState[fromCurrency] - fromAmount);
    expect(state[toCurrency]).toBe(defaultState[toCurrency] + toAmount);
  });
});