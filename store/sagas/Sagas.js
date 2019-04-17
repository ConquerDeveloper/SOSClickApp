import React from 'react';
import {
    AsyncStorage,
    Platform,
    Alert
} from 'react-native';
import {
    takeEvery,
    call,
    select,
    put
} from 'redux-saga/effects'
import {Toast} from 'native-base';
import Constants from '../../includes/Constants';
import {
    spinnerAction,
    isAuthenticated,
    saveUserInfoAction
} from "../Actions";

const signUp = async info => {
    const response = await fetch(Constants.SIGN_UP_API, {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        body: JSON.stringify({
            ...info
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaSignUp(data) {
    yield put(spinnerAction(true));
    try {
        const {info} = data;
        const result = yield call(signUp, info);
        const {status, response: {errors}} = result[0];
        switch (status) {
            case 201:
                Toast.show({
                    text: 'Usuario creado con éxito',
                    buttonText: 'OK'
                });
                const rsp = yield call(signIn, info);
                switch (rsp[0].status) {
                    case 200:
                        const token = `${rsp[0].response.token_type} ${rsp[0].response.access_token}`;
                        AsyncStorage.setItem('token', token);
                        yield put(isAuthenticated(true));
                        break;
                }
                break;
            case 422:
                if (errors) {
                    if (errors.email) {
                        Toast.show({
                            text: errors.email[0],
                            buttonText: 'OK'
                        });
                    }
                    if (errors.name) {
                        Toast.show({
                            text: errors.name[0],
                            buttonText: 'OK'
                        });
                    }
                    if (errors.password) {
                        Toast.show({
                            text: errors.password[0],
                            buttonText: 'OK'
                        });
                    }
                }
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const signIn = async info => {
    const response = await fetch(Constants.SIGN_IN_API, {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        body: JSON.stringify({
            ...info
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaSignIn(data) {
    yield put(spinnerAction(true));
    try {
        const {info} = data;
        const result = yield call(signIn, info);
        const {status, response: {access_token, token_type}, response} = result[0];
        console.log('result', result);
        switch (status) {
            case 200:
                const token = `${token_type} ${access_token}`;
                AsyncStorage.setItem('token', token);
                yield put(isAuthenticated(true));
                break;
            case 422:
                Toast.show({
                    text: response.message,
                    buttonText: 'OK'
                });
                break;
            case 401:
                Toast.show({
                    text: response.message,
                    buttonText: 'OK'
                });
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const loadUserInfo = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.USER_INFO_API, {
        method: 'GET',
        headers: {
            Authorization: token,
            Accept: 'application/json'
        }
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaLoadUserInfo() {
    yield put(spinnerAction(true));
    try {
        const result = yield call(loadUserInfo);
        const {status, response} = result[0];
        console.log('userinfo', result);
        switch (status) {
            case 200:
                yield put(saveUserInfoAction(response));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const logOut = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.LOG_OUT_API, {
        method: 'GET',
        headers: {
            Authorization: token,
            Accept: 'application/json'
        }
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaLogOut() {
    yield put(spinnerAction(true));
    try {
        const result = yield call(logOut);
        console.log('result', result);
        const {status} = result[0];
        switch (status) {
            case 200:
                yield put(isAuthenticated(false));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

export default function* Generator() {
    yield takeEvery(Constants.SIGN_UP, sagaSignUp);
    yield takeEvery(Constants.SIGN_IN, sagaSignIn);
    yield takeEvery(Constants.USER_INFO_LOAD, sagaLoadUserInfo);
    yield takeEvery(Constants.LOG_OUT, sagaLogOut);
}