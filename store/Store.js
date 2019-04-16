import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Generator from './sagas/Sagas';
import {reducer as form} from 'redux-form';
import Constants from '../includes/Constants';

const sagaMiddleware = createSagaMiddleware();

const spinnerReducer = (state = false, action) => {
    switch (action.type) {
        case Constants.SHOW_SPINNER:
            return state = true;
        case Constants.HIDE_SPINNER:
            return state = false;
        default:
            return state;
    }
};

const isAuthenticatedReducer = (state = false, action) => {
    switch (action.type) {
        case Constants.AUTHENTICATED_TRUE:
            return state = true;
        case Constants.AUTHENTICATED_FALSE:
            return state = false;
        default:
            return state;
    }
};

const reducers = combineReducers({
    spinnerReducer,
    isAuthenticatedReducer,
    form
});

const Store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(Generator);

export default Store;