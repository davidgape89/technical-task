import React from 'react';
import propTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const CurrencySelect = ({
  isBalanceRed,
  currencies,
  onChange,
  value,
}) => {
  const balance = Math.round(currencies[value] * 100) / 100;
  return (
    <FormControl fullWidth>
      <Select
        value={value}
        onChange={event => onChange(event.target.value)}
        input={
          <OutlinedInput labelWidth={0} />
        }
      >
        {Object.keys(currencies).map(currency => (
          <MenuItem
            key={currency}
            value={currency}
          >
            {currency}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        <span style={{ color: isBalanceRed ? 'red' : 'black' }}>
          Balance:&nbsp;
          {balance}
        </span>
      </FormHelperText>
    </FormControl>
  );
};

CurrencySelect.defaultProps = {
  isBalanceRed: false,
};

CurrencySelect.propTypes = {
  isBalanceRed: propTypes.bool,
  currencies: propTypes.objectOf(propTypes.number).isRequired,
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
};

export default CurrencySelect;
