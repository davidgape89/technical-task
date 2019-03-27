import React, {useState} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

import {exchangeCurrency} from '../actions/pockets';
import {CurrencySelect} from '../components/CurrencySelect';
import {CurrencyInput} from '../components/CurrencyInput';
import {CurrencyExchangePanel} from '../components/CurrencyExchangePanel';
import {exchangeToValue, exchangeFromValue} from '../selectors/rates';
import {CURRENCY_SYMBOLS} from '../constants';

const ExchangePage = ({pockets, rates, exchangeCurrency}) => {
  const pocketCurrencies = Object.keys(pockets);
  const [fromCurrency, setFromCurrency] = useState(pocketCurrencies[0]);
  const [fromValue, setFromValue] = useState('');
  const [toCurrency, setToCurrency] = useState(pocketCurrencies[1]);
  const [toValue, setToValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const onFromCurrencyChange = (value) => {
    if(toCurrency === value) {
      setToCurrency(fromCurrency)
    }
    setFromCurrency(value);
    if(fromValue) {
      setToValue(exchangeToValue(rates, fromCurrency, toCurrency, fromValue));
    } else {
      setToValue('')
    }
  }

  const onToCurrencyChange = (value) => {
    if(fromCurrency === value) {
      setFromCurrency(toCurrency);
    }
    setToCurrency(value);
    if(toValue) {
      setFromValue(exchangeFromValue(rates,fromCurrency,toCurrency,toValue));
    } else {
      setToValue('');
    }
  }

  const onFromValueChange = (value) => {
    setFromValue(value);
    if(value) {
      setToValue(exchangeToValue(rates, fromCurrency, toCurrency, value));
    } else {
      setToValue('');
    }
    
    if(parseFloat(value) > 0 && parseFloat(value) <= pockets[fromCurrency]) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }

  const onToValueChange = (value) => {
    setToValue(value);
    if(value) {
      setFromValue(exchangeFromValue(rates,fromCurrency,toCurrency,value));
    } else {
      setFromValue('');
    }
  }

  const switchCurrencies = () => {
    const auxFromValue = fromValue;
    const auxFromCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setFromValue(toValue);
    setToCurrency(auxFromCurrency);
    setToValue(auxFromValue);
  }

  const onExchangeClick = () => {
    exchangeCurrency(fromCurrency,fromValue,toCurrency, toValue);
  }
  
  return (
  <div className="exchange-page">
    <h1>Currency Exchange</h1>
    <div className="exchange-page__from-row">
      <div className="exchange-page__from-select">
        <CurrencySelect currencies={pockets}
                        onChange={onFromCurrencyChange}
                        value={fromCurrency}/>
      </div>
      <div className="exchange-page__from-input">
        <CurrencyInput value={fromValue} 
                       placeholder="0"
                       label="Amount to Exchange"
                       required
                       symbol={CURRENCY_SYMBOLS[fromCurrency]}
                       onChange={onFromValueChange} />
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
        <CurrencyExchangePanel rates={rates}
                               fromCurrency={fromCurrency}
                               toCurrency={toCurrency} />
      </div>
    </div>
    <div className="exchange-page__to-row">
      <div className="exchange-page__to-select">
        <CurrencySelect currencies={pockets}
                        onChange={onToCurrencyChange}
                        value={toCurrency}/>
      </div>
      <div className="exchange-page__to-input">
        <CurrencyInput value={toValue} 
                       placeholder="0"
                       label="Exchanged Amount"
                       symbol={CURRENCY_SYMBOLS[toCurrency]}
                       onChange={onToValueChange}/>
      </div>
    </div>
    <Button fullWidth disabled={isDisabled} variant="contained" color="primary"
            onClick={onExchangeClick}>Exchange</Button>
  </div>
)}

const mapStateToProps = (state) => ({
  pockets: state.pockets,
  rates: state.rates.rates
});

const mapDispatchToProps = {
  exchangeCurrency
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangePage);

