import React from 'react';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

export const CurrencySelect = ({
  currencies, 
  onChange,
  value
}) => {
  const balance = Math.round(currencies[value] * 100) / 100;
  return (
    <FormControl fullWidth>
      <Select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        input={
          <OutlinedInput labelWidth={0}/>
        }
      >
        {Object.keys(currencies).map(currency => (
          <MenuItem  key={currency}
                    value={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Balance: {balance}</FormHelperText>
    </FormControl>
  )
};