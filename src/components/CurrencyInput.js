import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

const CURRENCY_REGEX = /^([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+).?([0-9]{0,2})$/

export const CurrencyInput = ({
  label = 'Amount',
  value,
  placeholder,
  symbol,
  onChange
}) => {

  const formatNumber = (number) => {
    number = number.toString();
    
    if(number && parseFloat(number) < Number.MAX_SAFE_INTEGER) {
      // Format integer part
      number = number.replace(/\d+/, (integerPart) => {
        return parseFloat(integerPart).toLocaleString('en-US');
      });
      // Take only two decimals
      return number.match(/[\d\,]*\.?\d{0,2}/)[0];
    }
    
    return '';
  }

  const onAmountChange = ({target: {value}}) => {
    if(value.match(CURRENCY_REGEX)) {
      value = value.match(CURRENCY_REGEX)[0];
      value = value.replace(/\,/g,'');
      if(parseFloat(value) < Number.MAX_SAFE_INTEGER) {
        onChange(value);
      } 
    } else if(value === '') {
      onChange('');
    }
    
  }

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor="currency-input">{label}</InputLabel>
      <Input id="currency-input"
             variant="outlined"
             placeholder={placeholder}
             value={formatNumber(value)}
             onChange={onAmountChange}
             startAdornment={<InputAdornment position="start">{symbol}</InputAdornment>}
          />
    </FormControl>
  );
}
  