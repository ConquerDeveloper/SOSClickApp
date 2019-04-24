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
    saveUserInfoAction,
    userInfoAction,
    goBackAction,
    saveUserPhotoAction, toggleModalAction
} from "../Actions";
import ImagePicker from 'react-native-image-crop-picker';

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
        console.log('result', result);
        switch (status) {
            case 200:
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
                            text: errors.nombre[0],
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
                yield put(saveUserPhotoAction(response.usuario.foto_perfil));
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

const editUser = async info => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.EDIT_USER_API, {
        headers: {
            Authorization: token,
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

function* sagaEditUser(info) {
    yield put(spinnerAction(true));
    try {
        const {obj} = info;
        const result = yield call(editUser, obj);
        const userInfo = yield select(state => state.userInfoReducer);
        console.warn(result);
        const {status, response, response: {errors}} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: response.message,
                    buttonText: 'OK'
                });
                yield put(userInfoAction({
                    usuario: obj
                }));
                yield put(goBackAction(true));
                break;
            case 422:
                if (errors) {
                    if (errors.primer_apellido) {
                        Toast.show({
                            text: errors.primer_apellido[0],
                            buttonText: 'OK'
                        });
                    }
                    if (errors.segundo_apellido) {
                        Toast.show({
                            text: errors.segundo_apellido[0],
                            buttonText: 'OK'
                        });
                    }
                    if (errors.email) {
                        Toast.show({
                            text: errors.email[0],
                            buttonText: 'OK'
                        });
                    }
                    if (errors.telefono_movil) {
                        Toast.show({
                            text: errors.telefono_movil[0],
                            buttonText: 'OK'
                        });
                    }
                    if (errors.direccion) {
                        Toast.show({
                            text: errors.direccion[0],
                            buttonText: 'OK'
                        });
                    }
                    if (errors.telefono_fijo) {
                        Toast.show({
                            text: errors.telefono_fijo[0],
                            buttonText: 'OK'
                        });
                    }
                    if (errors.fecha_nacimiento) {
                        Toast.show({
                            text: errors.fecha_nacimiento[0],
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

const openGallery = async requestType => {
    let image = '';
    switch (requestType) {
        case 'gallery':
            image = await ImagePicker.openPicker({
                cropping: true
            });
            break;
        case 'camera':
            image = await ImagePicker.openCamera({
                cropping: true
            });
            break;
    }
    const path = image.path.split('/'),
        fileName = [...path].pop();
    const foto = {
        uri: image.path,
        type: image.mime,
        name: fileName
    };
    const formData = new FormData();
    formData.append('upload_preset', Constants.CLOUDINARY_PRESET);
    formData.append('file', foto);
    const response = await fetch(Constants.CLOUDINARY_NAME, {
        headers: {
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: formData
    });
    const cloudinaryResponse = await response.json();
    const token = await AsyncStorage.getItem('token');
    const apiResponse = await fetch(Constants.UPDATE_PHOTO_API, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': token
        },
        body: JSON.stringify({
            foto_perfil: cloudinaryResponse.secure_url
        })
    });
    return Promise.all([{status: await apiResponse.status, response: await apiResponse.json(), img: cloudinaryResponse.secure_url}]);
};

function* sagaOpenGallery(item) {
    yield put(spinnerAction(true));
    try {
        const {requestType} = item;
        const result = yield call(openGallery, requestType);
        console.log('result', result);
        const {status, response, img} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: response.message,
                    buttonText: 'OK'
                });
                yield put(saveUserPhotoAction(img));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const changePassword = async info => {
    const {
        password,
        password_confirmation
    } = info;
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.CHANGE_PASSWORD_API, {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        body: JSON.stringify({
            password,
            password_confirmation
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaChangePassword(item) {
    yield put(toggleModalAction(false));
    yield put(spinnerAction(true));
    try {
        const {info} = item;
        const result = yield call(changePassword, info);
        const {status, response, response: {errors}} = result[0];
        console.log('result', result);
        switch (status) {
            case 200:
                Toast.show({
                    text: response.message,
                    buttonText: 'OK'
                });
                break;
            case 422:
                if (errors) {
                    if (errors.password) {
                        Toast.show({
                            text: errors.password[0],
                            buttonText: 'OK'
                        });
                    }
                    if (errors.password_confirmation) {
                        Toast.show({
                            text: errors.password_confirmation[0],
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

export default function* Generator() {
    yield takeEvery(Constants.SIGN_UP, sagaSignUp);
    yield takeEvery(Constants.SIGN_IN, sagaSignIn);
    yield takeEvery(Constants.USER_INFO_LOAD, sagaLoadUserInfo);
    yield takeEvery(Constants.LOG_OUT, sagaLogOut);
    yield takeEvery(Constants.EDIT_USER, sagaEditUser);
    yield takeEvery(Constants.OPEN_GALLERY, sagaOpenGallery);
    yield takeEvery(Constants.CHANGE_PASSWORD, sagaChangePassword);
}