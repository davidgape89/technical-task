import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import configureStore from './store/configureStore';
import ExchangePage from './pages/ExchangePage';
import {requestRates} from './actions/rates';

import 'normalize.css/normalize.css';
import './styles.scss';

const POLLING_TIME = 10000;
const store = configureStore();

store.dispatch(requestRates());

setInterval(() => store.dispatch(requestRates()), POLLING_TIME);

const App = () => (
  <Provider store={store}>
    <div className="App">
      <ExchangePage />
    </div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));