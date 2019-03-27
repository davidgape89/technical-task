import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {currencies} from '../../mocks/currencyMock';
import {rates} from '../../mocks/ratesMock';
import {setBaseCurrency, requestRates} from '../../actions/rates';

const createMockStore = configureMockStore([thunk]);
jest.mock('axios');

describe('rates actions - ', () => {
  // describe('setBaseCurrency - ', () => {

  // });

  describe('requestRates - ', () => {
    it('makes the correct call', (done) => {
      const store = createMockStore({rates: {base: 'EUR'}});
      const response = {data: {rates}};
      axios.get.mockResolvedValue(response);
      
      store.dispatch(requestRates()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'SET_RATES',
          rates
        });
        expect(axios.get)
          .toHaveBeenCalledWith(
            'https://api.exchangeratesapi.io/latest?base=EUR');
        done();
      });
    });
  });
});