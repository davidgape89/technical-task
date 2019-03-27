import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import exchangeCurrency from '../actions/pockets';
import { CurrencySelect } from '../components/CurrencySelect';
import { CurrencyInput } from '../components/CurrencyInput';
import { CurrencyExchangePanel } from '../components/CurrencyExchangePanel';
import { exchangeToValue, exchangeFromValue } from '../selectors/rates';
import { CURRENCY_SYMBOLS } from '../constants';

export const ExchangePage = ({ pockets, rates, exchangeCurrency }) => {
  const pocketCurrencies = Object.keys(pockets);
  const [state, setState] = useState({
    fromCurrency: pocketCurrencies[0],
    toCurrency: pocketCurrencies[1],
    toValue: '',
    fromValue: '',
    isDisabled: true,
  });

  const onFromCurrencyChange = (value) => {
    setState(prevState => ({
      ...prevState,
      toCurrency: prevState.toCurrency === value
        ? prevState.fromCurrency : prevState.toCurrency,
      fromCurrency: value,
    }));

    onFromValueChange(state.fromValue);
  };

  const onToCurrencyChange = (value) => {
    setState(prevState => ({
      ...prevState,
      fromCurrency: prevState.fromCurrency === value
        ? prevState.toCurrency : prevState.fromCurrency,
      toCurrency: value,
    }));

    onToValueChange(state.toValue);
  };

  const onFromValueChange = (value) => {
    setState((prevState) => {
      const newToValue = value
        ? exchangeToValue(rates, prevState.fromCurrency, prevState.toCurrency, parseFloat(value)).toString()
        : '';
      return {
        ...prevState,
        fromValue: value,
        toValue: newToValue,
      };
    });

    isButtonDisabled();
  };

  const onToValueChange = (value) => {
    setState((prevState) => {
      const newFromValue = value
        ? exchangeFromValue(rates, prevState.fromCurrency, prevState.toCurrency, parseFloat(value)).toString()
        : '';
      return ({
        ...prevState,
        toValue: value,
        fromValue: newFromValue,
      });
    });

    isButtonDisabled();
  };

  const switchCurrencies = () => {
    setState(prevState => ({
      ...prevState,
      toCurrency: prevState.fromCurrency,
      fromCurrency: prevState.toCurrency,
      toValue: prevState.fromValue,
      fromValue: prevState.toValue,
    }));

    isButtonDisabled();
  };

  const isButtonDisabled = () => {
    setState((prevState) => {
      const isDisabled = !parseFloat(prevState.fromValue)
                          || parseFloat(prevState.fromValue) > pockets[prevState.fromCurrency];
      return {
        ...prevState,
        isDisabled,
      };
    });
  };

  const onExchangeClick = () => {
    const toValue = parseFloat(state.toValue);
    const fromValue = parseFloat(state.fromValue);
    exchangeCurrency(
      state.fromCurrency,
      fromValue,
      state.toCurrency,
      toValue,
    );
  };

  return (
    <div className="exchange-page">
      <h1>Currency Exchange</h1>
      <div className="exchange-page__from-row">
        <div className="exchange-page__from-select">
          <CurrencySelect
            currencies={pockets}
            onChange={onFromCurrencyChange}
            value={state.fromCurrency}
          />
        </div>
        <div className="exchange-page__from-input">
          <CurrencyInput
            value={state.fromValue}
            placeholder="0"
            label="Amount to Exchange"
            required
            symbol={CURRENCY_SYMBOLS[state.fromCurrency]}
            onChange={onFromValueChange}
          />
        </div>
      </div>
      <div className="exchange-page__utils">
        <div className="exchange-page__switcher">
          <Fab color="primary" onClick={switchCurrencies}>
            <Icon>cached</Icon>
          </Fab>
        </div>
        <div className="exchange-page__currency-info">
          <Icon>show_chart</Icon>
          <CurrencyExchangePanel
            rates={rates}
            fromCurrency={state.fromCurrency}
            toCurrency={state.toCurrency}
          />
        </div>
      </div>
      <div className="exchange-page__to-row">
        <div className="exchange-page__to-select">
          <CurrencySelect
            currencies={pockets}
            onChange={onToCurrencyChange}
            value={state.toCurrency}
          />
        </div>
        <div className="exchange-page__to-input">
          <CurrencyInput
            value={state.toValue}
            placeholder="0"
            label="Exchanged Amount"
            symbol={CURRENCY_SYMBOLS[state.toCurrency]}
            onChange={onToValueChange}
          />
        </div>
      </div>
      <Button
        fullWidth
        disabled={state.isDisabled}
        variant="contained"
        color="primary"
        onClick={onExchangeClick}
      >
Exchange
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  pockets: state.pockets,
  rates: state.rates.rates,
});

const mapDispatchToProps = {
  exchangeCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangePage);
