import {ratesReducer, defaultState} from '../../reducers/rates';
import ratesFixture from '../fixtures/rates';

describe('ratesReducer -', () => {
  it('sets up correctly', () => {
    const state = ratesReducer(undefined, {
      type: '@@INIT'
    });

    expect(state).toEqual(defaultState);
  });

  it('sets the base correctly', () => {
    const newBase = 'GBP';
    const state = ratesReducer(defaultState, {
      type: 'SET_BASE',
      base: newBase
    });

    expect(state.base).toBe(newBase);
  });

  it('sets the rates correctly', () => {
    const rates = ratesFixture.rates;
    const state = ratesReducer(defaultState, {
      type: 'SET_RATES',
      rates
    });

    expect(state.rates).toEqual(rates);
  })
});