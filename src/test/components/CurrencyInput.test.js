import React from 'react';
import {shallow} from 'enzyme';

import Input from '@material-ui/core/Input';
import CurrencyInput from '../../components/CurrencyInput';

describe('CurrencyInput -', () => {
  let wrapper, onChange, defaultProps;

  beforeEach(() => {
    onChange = jest.fn();
    defaultProps = {
      label: 'Amount',
      value: '34',
      placeholder: '0',
      symbol: '$',
      onChange: onChange
    };
    wrapper = shallow(
      <CurrencyInput {...defaultProps} />
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('number formatter -', () => {
    it('formats empty string correctly', () => {
      wrapper.setProps({ value: '' });

      expect(wrapper.find(Input).prop('value')).toBe('');
    });

    it('formats letters out', () => {
      wrapper.setProps({value: 'afds'});

      expect(wrapper.find(Input).prop('value')).toBe('');
    });

    it('formats short integers correctly', () => {
      wrapper.setProps({value: '22'});

      expect(wrapper.find(Input).prop('value')).toBe('22');
    });

    it('formats long integers correctly', () => {
      wrapper.setProps({value: '2222222222222'});

      expect(wrapper.find(Input).prop('value')).toBe('2,222,222,222,222');
    });

    it('does not accept numbers out of range', () => {
      wrapper.setProps({value: Number.MAX_SAFE_INTEGER.toString()});

      expect(wrapper.find(Input).prop('value')).toBe('');
    });

    it('formats numbers with decimals correctly', () => {
      wrapper.setProps({value: '22,222.22'});

      expect(wrapper.find(Input).prop('value')).toBe('22,222.22');
    });

    it('truncates down to two decimals', () => {
      wrapper.setProps({value: '22,222.2233432'});

      expect(wrapper.find(Input).prop('value')).toBe('22,222.22');
    });
  });

  describe('onAmountChange -', () => {
    let event = {
      target: {
        value: ''
      }
    };
    it('calls the function in the props correctly', () => {
      wrapper.setProps({onChange: onChange});
      wrapper.find(Input).prop('onChange')(event);

      expect(onChange).toHaveBeenCalled();
    });
  });
});