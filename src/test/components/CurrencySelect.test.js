import React from 'react';
import {shallow} from 'enzyme';

import currencies from '../fixtures/pockets';
import Select from '@material-ui/core/Select';
import {CurrencySelect} from '../../components/CurrencySelect';

describe('CurrencySelect -', () => {
  let wrapper, onChange, defaultProps;

  beforeEach(() => {
    onChange = jest.fn();
    defaultProps = {
      currencies,
      value: 'EUR',
      onChange: onChange
    };
    wrapper = shallow(
      <CurrencySelect {...defaultProps} />
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('changes the currency when selected', () => {
    const event = {
      target: {
        value: 'USD'
      }
    };
    wrapper.find(Select).prop('onChange')(event);
    expect(onChange).toHaveBeenCalledWith('USD');
  });
});