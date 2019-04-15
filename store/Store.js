import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
//import Generator from './sagas/Sagas';
import {reducer as form} from 'redux-form';
//const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({

});

//const Store = createStore(reducers, applyMiddleware(sagaMiddleware));
const Store = createStore(reducers);

export default Store;