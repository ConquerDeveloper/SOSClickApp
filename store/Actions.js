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