import React from 'react';
import propTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

const CURRENCY_REGEX = /^[0-9,]+.?([0-9]{0,2}$)/;

const CurrencyInput = ({
  label,
  value,
  placeholder,
  symbol,
  onChange,
}) => {
  const formatNumber = (number) => {
    let formattedNumber = number;
    if (formattedNumber && parseFloat(formattedNumber) < Number.MAX_SAFE_INTEGER) {
      // Format integer part
      formattedNumber = formattedNumber.replace(/\d+/, integerPart => parseFloat(integerPart).toLocaleString('en-US'));
      // Take only two decimals
      return formattedNumber.match(/[\d,]*\.?\d{0,2}/)[0];
    }

    return '';
  };

  const onAmountChange = ({ target }) => {
    let formattedValue = target.value;
    if (formattedValue.match(CURRENCY_REGEX)) {
      [formattedValue] = formattedValue.match(CURRENCY_REGEX);
      formattedValue = formattedValue.replace(/,/g, '');
      if (parseFloat(formattedValue) < Number.MAX_SAFE_INTEGER) {
        onChange(formattedValue);
      }
    } else if (formattedValue === '') {
      onChange('');
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="currency-input">{label}</InputLabel>
      <Input
        id="currency-input"
        variant="outlined"
        placeholder={placeholder}
        value={formatNumber(value)}
        onChange={onAmountChange}
        startAdornment={<InputAdornment position="start">{symbol}</InputAdornment>}
      />
    </FormControl>
  );
};

CurrencyInput.propTypes = {
  label: propTypes.string,
  value: propTypes.string.isRequired,
  placeholder: propTypes.string,
  symbol: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

CurrencyInput.defaultProps = {
  label: 'Amount',
  placeholder: '',
};

export default CurrencyInput;
