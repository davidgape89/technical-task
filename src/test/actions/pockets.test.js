import {exchangeCurrency} from '../../actions/pockets';

describe('pocket actions - ', () => {
  describe('exchange currency -', () => {
    it('creates a valid action with valid values', () => {
      const fromCurrency = 'EUR';
      const fromAmount = 9;
      const toCurrency = 'USD';
      const toAmount = 10;
      const action = exchangeCurrency(
        fromCurrency,
        fromAmount,
        toCurrency,
        toAmount
      );
      expect(action).toEqual({
        type: 'EXCHANGE_CURRENCY',
        fromCurrency,
        fromAmount,
        toCurrency,
        toAmount
      });
    });
  });
});