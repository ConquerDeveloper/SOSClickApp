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

const userInfoReducer = (state = null, action) => {
    switch (action.type) {
        case Constants.SAVE_USER_INFO:
            return state = action.obj;
        default:
            return state;
    }
};

const contactsReducer = (state = [], action) => {
    switch (action.type) {
        case Constants.SAVE_CONTACTS:
            return state = action.array;
        case Constants.CLEAN_CONTACTS:
            return state = [];
        default:
            return state;
    }
};

const goBackReducer = (state = false, action) => {
    switch (action.type) {
        case Constants.GO_BACK_TRUE:
            return state = true;
        case Constants.GO_BACK_FALSE:
            return state = false;
        default:
            return state;
    }
};

const userPhotoReducer = (state = null, action) => {
    switch (action.type) {
        case Constants.SAVE_PHOTO:
            return state = action.photo;
        default:
            return state;
    }
};

const toggleModalReducer = (state = false, action) => {
    switch (action.type) {
        case Constants.OPEN_MODAL:
            return state = true;
        case Constants.CLOSE_MODAL:
            return state = false;
        default:
            return state;
    }
};

const broadcastReducer = (state = null, action) => {
    switch (action.type) {
        case Constants.SAVE_BROADCAST_ID:
            return state = action.broadcastId;
        default:
            return state;
    }
};

const broadcastStateReducer = (state = false, action) => {
    switch (action.type) {
        case Constants.BROADCAST_ON:
            return state = true;
        case Constants.BROADCAST_OFF:
            return state = false;
        default:
            return state;
    }
};

const reducers = combineReducers({
    spinnerReducer,
    isAuthenticatedReducer,
    userInfoReducer,
    contactsReducer,
    goBackReducer,
    userPhotoReducer,
    toggleModalReducer,
    broadcastReducer,
    broadcastStateReducer,
    form
});

const Store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(Generator);

export default Store;