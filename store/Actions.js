import Constants from '../includes/Constants';

export const signUpAction = info => ({
    type: Constants.SIGN_UP,
    info
});

export const spinnerAction = bool => ({
    type: bool ? Constants.SHOW_SPINNER : Constants.HIDE_SPINNER
});

export const signInAction = info => ({
    type: Constants.SIGN_IN,
    info
});

export const isAuthenticated = bool => ({
    type: bool ? Constants.AUTHENTICATED_TRUE : Constants.AUTHENTICATED_FALSE
});

export const userInfoAction = () => ({
    type: Constants.USER_INFO_LOAD
});

export const saveUserInfoAction = obj => ({
    type: Constants.SAVE_USER_INFO,
    obj
});

export const logOutAction = () => ({
    type: Constants.LOG_OUT
});

export const saveContactsAction = array => ({
    type: Constants.SAVE_CONTACTS,
    array
});

export const cleanContactsAction = () => ({
    type: Constants.CLEAN_CONTACTS
});

export const editUserAction = obj => ({
    type: Constants.EDIT_USER,
    obj
});

export const goBackAction = bool => ({
    type: bool ? Constants.GO_BACK_TRUE : Constants.GO_BACK_FALSE
});