import React from 'react';
import {shallow} from 'enzyme';
import rates from '../fixtures/rates';
import CurrencyExchangePanel from '../../components/CurrencyExchangePanel';

describe('CurrencyExchangePanel - ', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CurrencyExchangePanel rates={rates.rates} 
                             fromCurrency="EUR"
                             toCurrency="USD"/>
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});