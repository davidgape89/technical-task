import axios from 'axios';

// Export for testing
export const ratesUrl = `https://api.exchangeratesapi.io/latest`;

const makeRequest = (base) => axios.get(`${ratesUrl}?base=${base}`);

export const setBaseCurrency = (base) => {
  return (dispatch) => {
    return makeRequest(base)
      .then(({data: {rates}}) => {
        dispatch(setBase(base));
        dispatch(setRates({...rates, [base]: 1}))
      })
      .catch(() => 
        console.error('There was a problem fetching the rates'));
  }
}

export const requestRates = () => {
  return (dispatch, getState) => {
    const {rates: {base}} = getState();
    
    return makeRequest(base)
      .then(({data: {rates}}) => 
        dispatch(setRates({...rates, [base]: 1}))
      )
      .catch(() => 
        console.error('There was a problem fetching the rates'));
  }
}

export const setBase = (base) => ({
  type: 'SET_BASE',
  base
});

export const setRates = (rates) => ({
  type: 'SET_RATES',
  rates
});