import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import {ratesReducer} from '../reducers/rates';
import {pocketsReducer} from '../reducers/pockets';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
          rates: ratesReducer,
          pockets: pocketsReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );

    return store;
};