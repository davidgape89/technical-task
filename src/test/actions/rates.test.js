import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import ratesResponse from '../fixtures/rates';
import {requestRates, setBaseCurrency} from '../../actions/rates';

const createMockStore = configureMockStore([thunk]);
jest.mock('axios');

describe('rates actions - ', () => {
  let store, response, actions;

  beforeEach(() => {
    store = createMockStore({rates: {base: 'EUR'}});
    response = {data: {rates: ratesResponse.rates}};
    axios.get.mockResolvedValue(response);
  });

  describe('setBaseCurrency - ', () => {
    let promise;
    beforeEach(() => {
      promise = store.dispatch(setBaseCurrency('USD'));
      actions = store.getActions();
    });

    it('dispatches the base action', () => {
      promise.then(() => {
        expect(actions[0]).toEqual({
          type: 'SET_BASE',
          base: 'USD'
        });
      });
    });

    it('dispatches the request rates action', () => {
      promise.then(() => {
        expect(actions[1]).toEqual({
          type: 'SET_RATES',
          rates: {...ratesResponse.rates, USD: 1}
        });
      })
    });
  });

  describe('requestRates - ', () => {
    it('makes the correct call', (done) => {
      
      store.dispatch(requestRates()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'SET_RATES',
          rates: ratesResponse.rates
        });
        expect(axios.get)
          .toHaveBeenCalledWith(
            'https://api.exchangeratesapi.io/latest?base=EUR');
        done();
      });
    });
  });
});