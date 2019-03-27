import axios from 'axios';

// Export for testing
export const ratesUrl = `https://api.exchangeratesapi.io/latest`;

export const setBaseCurrency = (base) => {
  return (dispatch) => {
    dispatch({type: 'SET_BASE', base});
    dispatch(requestRates());
  }
}

export const requestRates = () => {
  return (dispatch, getState) => {
    const {rates: {base}} = getState();
    
    return axios.get(`${ratesUrl}?base=${base}`)
      .then((response) => {
        let rates = response.data.rates;
        rates[base] = 1;
        dispatch(setRates(rates));
      })
      .catch((error) => 
        console.error('There was a problem fetching the rates'));
  }
}

export const setRates = (rates) => ({
  type: 'SET_RATES',
  rates
});