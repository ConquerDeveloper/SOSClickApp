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
    isAuthenticated
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
        const {status, response} = result[0];
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
        const {status, response: {access_token, token_type}} = result[0];
        switch (status) {
            case 200:
                const token = `${token_type} ${access_token}`;
                AsyncStorage.setItem('token', token);
                yield put(isAuthenticated(true));
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

export default function* Generator() {
    yield takeEvery(Constants.SIGN_UP, sagaSignUp);
    yield takeEvery(Constants.SIGN_IN, sagaSignIn);
}