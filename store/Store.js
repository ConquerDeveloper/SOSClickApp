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

const isSelectedReducer = (state = [], action) => {
    switch (action.type) {
        case Constants.IS_SELECTED:
            return state = action.array;
        case Constants.SELECT_SINGLE_ITEM:
            return state = [...action.array];
        case Constants.CLEAN_SELECTED:
            return state = [];
        default:
            return state;
    }
};

const selectedItemsReducer = (state = [], action) => {
    switch (action.type) {
        case Constants.SELECTED_ITEM:
            return state = [...state, ...action.array];
        case Constants.DESELECT_ITEM:
            return state = [...action.array];
        default:
            return state;
    }
};

const securityNetworkReducer = (state = [], action) => {
    switch (action.type) {
        case Constants.SAVE_SECURITY_NETWORK:
            return state = action.array;
        case Constants.ADD_NEW_CONTACT:
            return state = [...state, ...action.array];
        case Constants.REMOVE_SECURITY_NETWORK_CONTACT:
            return state = [...action.array];
        default:
            return state;
    }
};

const toggleDialogCameraReducer = (state = false, action) => {
    switch (action.type) {
        case Constants.SHOW_DIALOG_CAMERA:
            return state = true;
        case Constants.HIDE_DIALOG_CAMERA:
            return state = false;
        default:
            return state;
    }
};

const toggleBroadcastTutorialReducer = (state = false, action) => {
    switch (action.type) {
        case Constants.SHOW_BROADCAST_TUTORIAL:
            return state = true;
        case Constants.HIDE_BROADCAST_TUTORIAL:
            return state = false;
        default:
            return state;
    }
};

const toggleModalBlockScreenReducer = (state = false, action) => {
    switch (action.type) {
        case Constants.SHOW_MODAL_BLOCK:
            return state = true;
        case Constants.HIDE_MODAL_BLOCK:
            return state = false;
        default:
            return state;
    }
};

const toggleConfigurationModalReducer = (state = false, action) => {
    switch (action.type) {
        case Constants.SHOW_CONFIG_MODAL:
            return state = true;
        case Constants.HIDE_CONFIG_MODAL:
            return state = false;
        default:
            return state;
    }
};

const toggleAlertDialogReducer = (state = false, action) => {
    switch (action.type) {
        case Constants.SHOW_ALERT_DIALOG:
            return state = true;
        case Constants.HIDE_ALERT_DIALOG:
            return state = false;
        default:
            return state;
    }
};

const isRecordingReducer = (state = false, action) => {
    switch (action.type) {
        case Constants.START_RECORD:
            return state = true;
        case Constants.STOP_RECORD:
            return state = false;
        default:
            return state;
    }
};

const saveUriReducer = (state = null, action) => {
    switch (action.type) {
        case Constants.SAVE_URI_VIDEO:
            return state = action.uri;
        case Constants.CLEAN_URI_VIDEO:
            return state = null;
        default:
            return state;
    }
};

const toggleDialogConfirmationReducer = (state = false, action) => {
    switch (action.type) {
        case Constants.SHOW_DIALOG_CONFIRMATION:
            return state = true;
        case Constants.HIDE_DIALOG_CONFIRMATION:
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
    isSelectedReducer,
    selectedItemsReducer,
    securityNetworkReducer,
    toggleDialogCameraReducer,
    toggleBroadcastTutorialReducer,
    toggleModalBlockScreenReducer,
    toggleConfigurationModalReducer,
    toggleAlertDialogReducer,
    isRecordingReducer,
    saveUriReducer,
    toggleDialogConfirmationReducer,
    form
});

const Store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(Generator);

export default Store;