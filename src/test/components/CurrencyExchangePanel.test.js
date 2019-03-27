import React from 'react';
import renderer from 'react-test-renderer';
import rates from '../fixtures/rates';
import {CurrencyExchangePanel} from '../../components/CurrencyExchangePanel';

describe('CurrencyExchangePanel - ', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = renderer.create(
      <CurrencyExchangePanel rates={rates.rates} 
                             fromCurrency="EUR"
                             toCurrency="USD"/>
    ).toJSON();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});