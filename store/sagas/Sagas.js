import React from 'react';
import {
    AsyncStorage,
    PermissionsAndroid
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
    saveUserPhotoAction,
    toggleModalAction,
    saveContactsAction,
    isSelectedAction,
    selectSingleItemAction,
    selectedAction,
    deselectAction,
    saveSecurityNetwork,
    addNewContactAction
} from "../Actions";
import ImagePicker from 'react-native-image-crop-picker';
import Contacts from "react-native-contacts";

this.contacts = [];

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
    return Promise.all([{
        status: await apiResponse.status,
        response: await apiResponse.json(),
        img: cloudinaryResponse.secure_url
    }]);
};

function* sagaOpenGallery(item) {
    yield put(spinnerAction(true));
    try {
        const {requestType} = item;
        const result = yield call(openGallery, requestType);
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

const requestContacts = async () => {
    const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
            'title': 'Contacts',
            'message': 'This app would like to view your contacts.'
        }
    );
    if (permission) {
        return new Promise(resolve => {
            Contacts.getAll((err, contacts) => {
                if (err === 'denied') {
                    console.log(err);
                } else {
                    resolve(contacts);
                }
            });
        });
    }
};

function* sagaLoadContacts() {
    yield put(spinnerAction(true));
    try {
        const contacts = yield call(requestContacts);
        const securityNetwork = yield select(state => state.securityNetworkReducer);
        const res = contacts.filter((item1, index) =>
            !securityNetwork.some(item2 => {
                if (item1.phoneNumbers[0]) {
                    return (item2.numero_telefono === item1.phoneNumbers[0].number.replace('+56', '').replace(/\s/g, ''))
                }
            }));
        this.contacts = res;
        let array = [];
        for (let i = 0; i < this.contacts.length; i++) {
            array.push({isSelected: false});
        }
        yield put(isSelectedAction(array));
        yield put(saveContactsAction(res));
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

function* sagaSearchContact(item) {
    const {text} = item;
    const newData = this.contacts.filter(item => {
        const itemData = `${item.givenName.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
    });
    yield put(saveContactsAction(newData));
}

function* sagaToggleSelected(item) {
    const {array, index} = item;
    const isSelected = yield select(state => state.isSelectedReducer);
    const selectedContacts = yield select(state => state.selectedItemsReducer);
    isSelected[index].isSelected = !isSelected[index].isSelected;
    yield put(selectSingleItemAction(isSelected));
    if (isSelected[index].isSelected) {
        yield put(selectedAction(array));
    } else {
        selectedContacts.splice(index, 1);
        yield put(deselectAction(selectedContacts));
    }
}

const addToNetwork = async array => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.SAVE_NETWORK_API, {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        body: JSON.stringify({
            contactos: {
                ...array
            }
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaAddToNetwork() {
    yield put(spinnerAction(true));
    try {
        const selectedContacts = yield select(state => state.selectedItemsReducer);
        const result = yield call(addToNetwork, selectedContacts);
        const {status, response} = result[0];
        switch (status) {
            case 200:
                yield put(addNewContactAction(selectedContacts));
                yield put(goBackAction(true));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const loadSecurityNetwork = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.LOAD_SECURITY_NETWORK_API, {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'GET'
    });
    return Promise.all([{status: await response.status, response: await response.json()}])
};

function* sagaLoadSecurityNetwork() {
    yield put(spinnerAction(true));
    try {
        const result = yield call(loadSecurityNetwork);
        const {status, response} = result[0];
        console.log('status', status);
        console.log('response', response);
        switch (status) {
            case 200:
                yield put(saveSecurityNetwork(response));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

function* sagaSelectedRemove() {
    const securityNetwork = yield select(state => state.securityNetworkReducer);
    let array = [];
    for (let i = 0; i < securityNetwork.length; i++) {
        array.push({
            isSelected: false
        });
    }
    yield put(isSelectedAction(array));
}

const removeNetwork = async array => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.REMOVE_NETWORK_API, {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        body: JSON.stringify({
            ...array
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}])
};

function* sagaRemoveNetwork() {
    try {
        const selectedContacts = yield select(state => state.selectedItemsReducer);
        console.log('selectedContacts', selectedContacts);
        const result = yield call(removeNetwork, selectedContacts);
        const {status, response} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: response.mensaje,
                    buttonText: 'OK'
                });
                yield put(goBackAction(true));
                break;
            case 421:
                Toast.show({
                    text: response.mensaje,
                    buttonText: 'OK'
                });
                break;
        }
    } catch (e) {
        console.log(e);
    }
}

export default function* Generator() {
    yield takeEvery(Constants.SIGN_UP, sagaSignUp);
    yield takeEvery(Constants.SIGN_IN, sagaSignIn);
    yield takeEvery(Constants.USER_INFO_LOAD, sagaLoadUserInfo);
    yield takeEvery(Constants.LOG_OUT, sagaLogOut);
    yield takeEvery(Constants.EDIT_USER, sagaEditUser);
    yield takeEvery(Constants.OPEN_GALLERY, sagaOpenGallery);
    yield takeEvery(Constants.CHANGE_PASSWORD, sagaChangePassword);
    yield takeEvery(Constants.LOAD_CONTACTS, sagaLoadContacts);
    yield takeEvery(Constants.SEARCH_CONTACT, sagaSearchContact);
    yield takeEvery(Constants.TOGGLE_SELECTED, sagaToggleSelected);
    yield takeEvery(Constants.ADD_TO_NETWORK, sagaAddToNetwork);
    yield takeEvery(Constants.LOAD_SECURITY_NETWORK, sagaLoadSecurityNetwork);
    yield takeEvery(Constants.IS_SELECTED_REMOVE, sagaSelectedRemove);
    yield takeEvery(Constants.REMOVE_NETWORK, sagaRemoveNetwork);
}