import React from 'react';
import {shallow} from 'enzyme';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';

import pockets from '../fixtures/pockets';
import rates from '../fixtures/rates';
import {ExchangePage} from '../../pages/ExchangePage';

describe('CurrencyExchangePanel - ', () => {
  let wrapper, exchangeCurrency;
  exchangeCurrency = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <ExchangePage pockets={pockets}
                    rates={rates.rates}
                    exchangeCurrency={exchangeCurrency}/>
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('onFromCurrencyChange -', () => {
    it('defaults correctly', () => {
      const fromCurrency = wrapper.find(
        '.exchange-page__from-row CurrencySelect').prop('value');
      const toCurrency = wrapper.find(
        '.exchange-page__to-row CurrencySelect').prop('value');

      expect(fromCurrency).toEqual('EUR');
      expect(toCurrency).toEqual('USD');
    });

    it('changes correctly', () => {
      wrapper.find(
        '.exchange-page__from-row CurrencySelect').prop('onChange')('GBP');
      const fromCurrency = wrapper.find(
        '.exchange-page__from-row CurrencySelect').prop('value');

      expect(fromCurrency).toEqual('GBP');
    });

    it('interchanges the currencies correctly', () => {
      wrapper.find(
        '.exchange-page__from-row CurrencySelect').prop('onChange')('USD');
      const fromCurrency = wrapper.find(
        '.exchange-page__from-row CurrencySelect').prop('value');
      const toCurrency = wrapper.find(
        '.exchange-page__to-row CurrencySelect').prop('value');

      expect(fromCurrency).toEqual('USD');
      expect(toCurrency).toEqual('EUR');
    });
  });

  describe('onToCurrencyChange -', () => {
    it('defaults correctly', () => {
      const fromCurrency = wrapper.find(
        '.exchange-page__from-row CurrencySelect').prop('value');
      const toCurrency = wrapper.find(
        '.exchange-page__to-row CurrencySelect').prop('value');

      expect(fromCurrency).toEqual('EUR');
      expect(toCurrency).toEqual('USD');
    });

    it('changes correctly', () => {
      wrapper.find(
        '.exchange-page__to-row CurrencySelect').prop('onChange')('GBP');
      const toCurrency = wrapper.find(
        '.exchange-page__to-row CurrencySelect').prop('value');

      expect(toCurrency).toEqual('GBP');
    });

    it('interchanges the currencies correctly', () => {
      wrapper.find(
        '.exchange-page__to-row CurrencySelect').prop('onChange')('EUR');
      const fromCurrency = wrapper.find(
        '.exchange-page__from-row CurrencySelect').prop('value');
      const toCurrency = wrapper.find(
        '.exchange-page__to-row CurrencySelect').prop('value');

      expect(fromCurrency).toEqual('USD');
      expect(toCurrency).toEqual('EUR');
    });
  });

  describe('onFromValueChange -', () => {
    it('defaults correctly', () => {
      const fromValue = wrapper.find(
        '.exchange-page__from-row CurrencyInput').prop('value');
      
      expect(fromValue).toEqual('');
    });

    it('changes correctly', () => {
      wrapper.find(
        '.exchange-page__from-row CurrencyInput').prop('onChange')('1');
      const fromValue = wrapper.find(
        '.exchange-page__from-row CurrencyInput').prop('value');
      const toValue = wrapper.find(
        '.exchange-page__to-row CurrencyInput').prop('value');

      expect(fromValue).toBe('1');
      expect(toValue).toBe('1.1354');
    });

    it('goes back to empty correctly', () => {
      wrapper.find(
        '.exchange-page__from-row CurrencyInput').prop('onChange')('');
      const fromValue = wrapper.find(
        '.exchange-page__from-row CurrencyInput').prop('value');
      const toValue = wrapper.find(
        '.exchange-page__to-row CurrencyInput').prop('value');

      expect(fromValue).toBe('');
      expect(toValue).toBe('');
    });
  });

  describe('onToValueChange -', () => {
    it('defaults correctly', () => {
      const toValue = wrapper.find(
        '.exchange-page__to-row CurrencyInput').prop('value');
      
      expect(toValue).toEqual('');
    });

    it('changes correctly', () => {
      wrapper.find(
        '.exchange-page__to-row CurrencyInput').prop('onChange')('1.1354');
      const fromValue = wrapper.find(
        '.exchange-page__from-row CurrencyInput').prop('value');
      const toValue = wrapper.find(
        '.exchange-page__to-row CurrencyInput').prop('value');

      expect(fromValue).toBe('1');
      expect(toValue).toBe('1.1354');
    });

    it('goes back to empty correctly', () => {
      wrapper.find(
        '.exchange-page__to-row CurrencyInput').prop('onChange')('');
      const fromValue = wrapper.find(
        '.exchange-page__from-row CurrencyInput').prop('value');
      const toValue = wrapper.find(
        '.exchange-page__to-row CurrencyInput').prop('value');

      expect(fromValue).toBe('');
      expect(toValue).toBe('');
    });
  });

  describe('switchCurrencies -', () => {
    it('exchanges inputs correctly', () => {
      wrapper.find(
        '.exchange-page__from-row CurrencyInput').prop('onChange')('1');
      wrapper.find(Fab).simulate('click');
  
      const fromCurrency = wrapper.find(
        '.exchange-page__from-row CurrencySelect').prop('value');
      const toCurrency = wrapper.find(
        '.exchange-page__to-row CurrencySelect').prop('value');
      const fromValue = wrapper.find(
        '.exchange-page__from-row CurrencyInput').prop('value');
      const toValue = wrapper.find(
        '.exchange-page__to-row CurrencyInput').prop('value');
  
      expect(fromCurrency).toEqual('USD');
      expect(toCurrency).toEqual('EUR');
      expect(fromValue).toEqual('1.1354');
      expect(toValue).toEqual('1');
    });
  });

  describe('isButtonDisabled -', () => {
    it('is disabled by default', () => {
      expect(wrapper.find(Button).prop('disabled')).toBe(true);
    });

    it('is enabled with valid attributes', () => {
      wrapper.find(
        '.exchange-page__from-row CurrencyInput').prop('onChange')('1');

        expect(wrapper.find(Button).prop('disabled')).toBe(false);
    });

    it('is disabled when the amount exeeds the funds', () => {
      wrapper.find(
        '.exchange-page__from-row CurrencyInput').prop('onChange')('50');

      expect(wrapper.find(Button).prop('disabled')).toBe(true);
    });
  });

  describe('onExchangeClick -', () => {
    it('exchanges the amount when clicked', () => {
      wrapper.find(
        '.exchange-page__from-row CurrencyInput').prop('onChange')('1');
      wrapper.find(Button).simulate('click');
      
      expect(exchangeCurrency).toHaveBeenCalled();
    });
  });
});