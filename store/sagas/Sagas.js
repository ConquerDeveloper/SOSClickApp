/*
import React from 'react';
import {
    AsyncStorage,
    Platform,
    Alert
} from 'react-native';
import {takeEvery, call, select, put} from 'redux-saga/effects'
import Constants from '../../constants/Constants';
import {Toast} from 'native-base';
import {
    spinnerAction,
    saveHistoryDetailAction,
    savePhotoAction,
    userInfoAction,
    saveSecurityNetwork,
    deselectContactsAction,
    personFilledAction,
    storeHistoryAction,
    saveHistoryRCAction,
    saveHistoryBPAction,
    removeSavedContactsAction,
    storeReminderAction,
    storeNewReminderAction,
    storeReminderDetailAction,
    goBackAction,
    isSelectedAction,
    storePasswordUserData,
    navigateAction,
    ecgErrorAction,
    saveAllContactsAction,
    cleanSelectedAction,
    selectItemAction,
    selectedContactsAction,
    deselectContactAction,
    pushContactsAction,
    selectIndividualItem,
    removeContactAction,
    cleanSelectedNetworkAction, arrivingNotificationAction, storeNotificationAction
} from "../Actions";
import firebase from 'react-native-firebase';
import ImagePicker from "react-native-image-crop-picker";
import Contacts from 'react-native-contacts';

const handleLogin = async values => {
    const {email, password} = values;
    const response = await fetch(Constants.LOGIN_SERVICE, {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    });
    const fcmToken = await firebase.messaging().getToken();
    const loginResponse = await response.json();
    if (fcmToken) {
        const fcmResponse = await fetch(Constants.ADD_TOKENFIREBASEMESSAGE, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + loginResponse.access_token
            },
            body: JSON.stringify({
                tokenFirebase: fcmToken,
                id_profile: 4
            })
        });
        console.log('login', fcmResponse);
        return Promise.all([{status: await response.status, response: loginResponse}]);
    }
};

function* sagaLogin(values) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(handleLogin, values.values);
        const {status, response: {access_token, token_type, errors}, response} = result[0];
        console.log(status);
        console.log(response);
        switch (status) {
            case 200:
                const token = `${token_type} ${access_token}`;
                AsyncStorage.multiSet([
                    ['token', token],
                    ['isLogged', 'true']
                ]);
                break;
            case 422:
                if (errors.email) {
                    Toast.show({
                        text: errors.email[0],
                        buttonText: 'OK'
                    });
                }
                if (errors.password) {
                    Toast.show({
                        text: errors.password[0],
                        buttonText: 'OK'
                    });
                }
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

const handleSignUp = async values => {
    const {email, password, password_confirmation} = values;
    const response = await fetch(Constants.SIGNUP_SERVICE, {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
            email,
            password,
            password_confirmation,
            plataforma: Platform.OS === 'ios' ? 2 : 1,
            profileFK: 4

        }),
        method: 'POST'
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaSignUp(values) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(handleSignUp, values.values);
        console.log('valores registro', result);
        const {response: {message, errors}, status} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: message,
                    buttonText: 'OK'
                });
                break;
            case 422:
                if (errors.email) {
                    Toast.show({
                        text: errors.email[0],
                        buttonText: 'OK'
                    });
                }
                if (errors.password) {
                    Toast.show({
                        text: errors.password[0],
                        buttonText: 'OK'
                    });
                }
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const handleLogOut = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('token', token);
    const response = await fetch(Constants.LOGOUT_SERVICE, {
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
        const result = yield call(handleLogOut);
        const {status, response} = result[0];
        console.log('result del logout', status);
        console.log('result del logout', response);
        switch (status) {
            case 200:
                AsyncStorage.removeItem('token');
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const handleLoadInformation = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.LOAD_INFORMATION_SERVICE, {
        headers: {
            Authorization: token,
            Accept: 'application/json'
        }
    });
    return Promise.all([{status: await response.status, response: await response.json(), token}])
};

function* sagaLoadInformation() {
    yield put(spinnerAction(true));
    try {
        const result = yield call(handleLoadInformation);
        const {token, status, response} = result[0];
        console.log('result user', response);
        switch (status) {
            case 200:
                yield put(savePhotoAction(response.usuario.foto_perfil));
                yield put(userInfoAction({
                    ...response.usuario,
                    ...response.datos_fijos
                }));
                yield put(saveSecurityNetwork([...response.seguridad]));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const saveContacts = async array => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.SAVE_CONTACTS_API, {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        },
        method: 'POST',
        body: JSON.stringify({
            contactos: array
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaSaveContacts() {
    yield put(spinnerAction(true));
    try {
        const selectedContacts = yield select(state => state.selectedContactNetworkReducer);
        const result = yield call(saveContacts, selectedContacts);
        const {response: {mensaje, id_seguridad}, status} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: mensaje,
                    buttonText: 'OK'
                });
                id_seguridad.forEach((item, i) => {
                    selectedContacts[i].id = item;
                });
                yield put(pushContactsAction(selectedContacts));
                yield put(goBackAction(true));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const deleteNotification = async id => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.DELETE_NOTIFICATION_API + id, {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST'
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaDeleteNotification(id) {
    yield put(spinnerAction(true));
    try {
        const notification = yield select(state => state.saveNotificationReducer);
        const result = yield call(deleteNotification, id.id);
        const {response: {mensaje}, status} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: mensaje,
                    buttonText: 'OK'
                });
                const index = notification.map(item => item.id).indexOf(id.id);
                if (index > -1) {
                    notification.splice(index, 1);
                }
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const saveECG = async array => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.SAVE_ECG_API, {
        headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        body: JSON.stringify({
            ...array[0],
            idProfile: 4
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaSaveECG(array) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(saveECG, array.array);
        console.warn('resultado ecg', result);
        const {response: {mensaje}, status} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: mensaje,
                    buttonText: 'OK',
                    duration: 3000
                });
                break;
            case 401:
                yield put(ecgErrorAction(true));
                Toast.show({
                    text: mensaje,
                    buttonText: 'OK',
                    duration: 3000
                });
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const editUser = async values => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.EDIT_USER_API, {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            ...values
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaEditUser(values) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(editUser, values.values);
        const user = yield select(state => state.userInfoReducer);
        const {status, response: {message, errors}} = result[0];
        switch (status) {
            case 200:
                yield put(userInfoAction({
                    persona: values.values
                }));
                yield put(personFilledAction(true));
                Toast.show({
                    text: message,
                    buttonText: 'OK'
                });
                break;
            case 422:
                if (errors.nombre) {
                    Toast.show({
                        text: errors.nombre[0],
                        buttonText: 'OK'
                    });
                }
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
                if (errors.rut) {
                    Toast.show({
                        text: errors.rut[0],
                        buttonText: 'OK'
                    });
                }
                if (errors.telefono_movil) {
                    Toast.show({
                        text: errors.telefono_movil[0],
                        buttonText: 'OK'
                    });
                }
                if (errors.fecha_nacimiento) {
                    Toast.show({
                        text: errors.fecha_nacimiento[0],
                        buttonText: 'OK'
                    });
                }
                if (errors.altura) {
                    Toast.show({
                        text: errors.altura[0],
                        buttonText: 'OK'
                    });
                }
                if (errors.peso) {
                    Toast.show({
                        text: errors.peso[0],
                        buttonText: 'OK'
                    });
                }
                if (errors.genero) {
                    Toast.show({
                        text: errors.genero[0],
                        buttonText: 'OK'
                    });
                }
                if (errors.estado_civil) {
                    Toast.show({
                        text: errors.estado_civil[0],
                        buttonText: 'OK'
                    });
                }
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const updateUser = async values => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.UPDATE_USER_API, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            Accept: 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            ...values
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaUpdateUser(values) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(updateUser, values.values);
        const user = yield select(state => state.userInfoReducer);
        const {status, response: {message, errors}} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: message,
                    buttonText: 'OK'
                });
                yield put(userInfoAction({
                    ...user,
                    persona: values.values
                }));
                yield put(personFilledAction(false));
                break;
            case 422:
                if (errors.nombre) {
                    Toast.show({
                        text: errors.nombre[0],
                        buttonText: 'OK'
                    });
                }
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
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const uploadPhoto = async typePhoto => {
    const token = await AsyncStorage.getItem('token');
    let image = '';
    switch (typePhoto) {
        case 'choose':
            image = await ImagePicker.openPicker({
                cropping: true
            });
            break;
        case 'take':
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
    const apiResponse = await fetch(Constants.UPDATE_PHOTO_API, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': token
        },
        body: JSON.stringify({
            imagen: cloudinaryResponse.secure_url
        })
    });
    return Promise.all([{status: await apiResponse.status, response: await apiResponse.json()}]);
};

function* sagaUpdatePhoto(typePhoto) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(uploadPhoto, typePhoto.typePhoto);
        const {status, response: {imagen}} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: 'Imagen subida exitosamente',
                    buttonText: 'OK'
                });
                yield put(savePhotoAction(imagen));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const saveHR = async hr => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.SAVE_ECG_API, {
        headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        body: JSON.stringify({
            frecuencia_cardiaca: hr,
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaSaveHR(hr) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(saveHR, hr.hr);
        const {status, response: {mensaje}} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: mensaje,
                    buttonText: 'OK'
                });
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const saveBP = async bp => {
    const token = await AsyncStorage.getItem('token');
    const bloodPressure = bp.split('/');
    const maxBP = bloodPressure[0];
    const minBP = bloodPressure[1];
    const response = await fetch(Constants.SAVE_ECG_API, {
        headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        body: JSON.stringify({
            sistolica: maxBP,
            diastolica: minBP
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaSaveBP(bp) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(saveBP, bp.bp);
        const {status, response: {mensaje}} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: mensaje,
                    buttonText: 'OK'
                });
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const removeNetwork = async array => {
    console.log('array', array);
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.REMOVE_NETWORK_API, {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        body: JSON.stringify({
            id_seguridad: array
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaRemoveNetwork() {
    yield put(spinnerAction(true));
    try {
        const selectedContacts = yield select(state => state.selectedContactNetworkReducer);
        const securityNetwork = yield select(state => state.securityNetworkReducer);
        console.log('selectedContacts', selectedContacts);
        console.log('securityNetwork', securityNetwork);
        const idArray = selectedContacts.map(item => item.id);
        const data = securityNetwork.filter((item1, index) =>
            !selectedContacts.some(item2 => {
                return (item2.id === item1.id)
            }));
        const result = yield call(removeNetwork, idArray);
        console.log('result delete', result);
        const {response: {mensaje, id_seguridad}, status} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: mensaje,
                    buttonText: 'OK'
                });
                yield put(removeContactAction(data));
                yield put(cleanSelectedNetworkAction());
                yield put(goBackAction(true));
                break;
            case 421:
                Toast.show({
                    text: mensaje
                });
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const loadHistory = async date => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://services.alodoctores.com/api/auth/misMediciones?cantidad=100&desde=${date}&hasta=${date}&tipo=ECG`, {
        headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET'
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaLoadHistory(date) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(loadHistory, date.date);
        const {response, status} = result[0];
        switch (status) {
            case 200:
                yield put(storeHistoryAction(response));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const loadHistoryDetail = async id => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://services.alodoctores.com/api/auth/medicion/${id}`, {
        method: 'GET',
        headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaLoadHistoryDetail(id) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(loadHistoryDetail, id.id);
        const {status, response} = result[0];
        switch (status) {
            case 200:
                yield put(saveHistoryDetailAction(response));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const loadHistoryRC = async date => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://services.alodoctores.com/api/auth/misMediciones?cantidad=100&desde=${date}&hasta=${date}&tipo=RC`, {
        headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET'
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaLoadHistoryRC(date) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(loadHistoryRC, date.date);
        console.log('tonces', result);
        const {status, response} = result[0];
        switch (status) {
            case 200:
                yield put(saveHistoryRCAction(response));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const loadHistoryBP = async date => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://services.alodoctores.com/api/auth/misMediciones?cantidad=100&desde=${date}&hasta=${date}&tipo=PA`, {
        headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        method: 'GET'
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaLoadHistoryBP(date) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(loadHistoryBP, date.date);
        const {status, response} = result[0];
        console.log('result de pa', result);
        switch (status) {
            case 200:
                yield put(saveHistoryBPAction(response));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const saveReminder = async info => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch('http://services.alodoctores.com/api/auth/recordatorio/registrar', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: token
        },
        method: 'POST',
        body: JSON.stringify({
            ...info
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaSaveReminder(info) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(saveReminder, info.info);
        const {status, response} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: response.mensaje,
                    buttonText: 'OK'
                });
                let obj = info.info;
                obj.id = response.id;
                yield put(storeNewReminderAction([obj]));
                const reminderArray = yield select(state => state.reminderReducer);
                console.log('segundo array', reminderArray);
                let array = [];
                for (let i = 0; i < reminderArray.length; i++) {
                    array.push({isSelected: (reminderArray[i].tipo_recordatorio === 1)});
                }
                yield put(isSelectedAction(array));
                yield put(goBackAction(true));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const loadReminder = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.LOAD_REMINDER_API, {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        method: 'GET'
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaLoadReminder() {
    yield put(spinnerAction(true));
    try {
        yield put(cleanSelectedAction());
        const result = yield call(loadReminder);
        console.log('result', result[0]);
        const {status, response} = result[0];
        console.log('primer array', response);
        switch (status) {
            case 200:
                let array = [];
                yield put(storeReminderAction(response));
                for (let i = 0; i < response.length; i++) {
                    array.push({isSelected: (response[i].tipo_recordatorio === 1)})
                }
                yield put(isSelectedAction(array));
                break;
        }
    } catch (e) {
        console.log(e)
    }
    yield put(spinnerAction(false));
}

const setReminderStatus = async status => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.SET_REMINDER_API, {
        method: 'POST',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
            id: status[1],
            estado: status[0] === false ? 0 : 1
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaSetReminderStatus(status) {
    yield put(spinnerAction(true));
    try {
        let index = status.status[2];
        let isSelected = yield select(state => state.isSelectedReducer);
        isSelected[index].isSelected = status.status[0];
        const result = yield call(setReminderStatus, status.status);
        const {response} = result[0];
        switch (result[0].status) {
            case 200:
                const reminderArray = yield select(state => state.reminderReducer);
                reminderArray[index].tipo_recordatorio = (status.status[0]) ? 1 : 2;
                Toast.show({
                    text: response.mensaje,
                    buttonText: 'OK'
                });
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const reminderDetail = async id => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://services.alodoctores.com/api/auth/recordatorio/detalle/${id}`, {
        headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaReminderDetail(id) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(reminderDetail, id.id);
        console.log('detalle', result);
        const {status, response} = result[0];
        switch (status) {
            case 200:
                yield put(storeReminderDetailAction(response));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const removeReminder = async id => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(`http://services.alodoctores.com/api/auth/recordatorio/eliminar/${id}`, {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST'
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaRemoveReminder(id) {
    yield put(spinnerAction(true));
    try {
        let reminderArray = yield select(state => state.reminderReducer);
        let index = reminderArray.map(item => item.id).indexOf(id.id);
        const result = yield call(removeReminder, id.id);
        const {status, response} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: response.mensaje,
                    buttonText: 'OK'
                });
                if (index > -1) {
                    reminderArray.splice(index, 1);
                }
                let array = [];
                for (let i = 0; i < reminderArray.length; i++) {
                    array.push({isSelected: (reminderArray[i].tipo_recordatorio === 1)})
                }
                yield put(isSelectedAction(array));
                yield put(goBackAction(true));
                break;
            case 401:
                Toast.show({
                    text: response.mensaje,
                    buttonText: 'OK'
                })
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const editReminder = async obj => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch(Constants.EDIT_REMINDER_API, {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        body: JSON.stringify({
            ...obj
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaEditReminder(obj) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(editReminder, obj.obj);
        const reminderArray = yield select(state => state.reminderReducer);
        const {status, response} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: response.mensaje,
                    buttonText: 'OK'
                });
                const index = reminderArray.map(item => item.id).indexOf(obj.obj.id);
                if (index > -1) {
                    reminderArray[index] = obj.obj;
                    let array = [];
                    for (let i = 0; i < reminderArray.length; i++) {
                        array.push({isSelected: (reminderArray[i].tipo_recordatorio === 1)});
                    }
                    yield put(isSelectedAction(array));
                }
                yield put(goBackAction(true));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const forgotPassword = async email => {
    const response = await fetch(Constants.FORGOT_PASSWORD_API, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        body: JSON.stringify({email})
    });
    return Promise.all([{status: await response.status, response: await response.json()}])
};

function* sagaForgotPassword(email) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(forgotPassword, email.email);
        console.log('resultado', result);
        const {status, response} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: 'Hemos enviado un correo electrónico a la dirección que proporcionaste. Por favor revísalo para continuar con el proceso.',
                    buttonText: 'OK',
                    duration: 3000
                });
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const emailToken = async token => {
    const response = await fetch(`http://services.alodoctores.com/api/password/find/${token}`, {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'GET'
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaEmailToken(token) {
    yield put(spinnerAction(true));
    try {
        const result = yield call(emailToken, token.token);
        console.log(result);
        const {status, response} = result[0];
        switch (status) {
            case 200:
                const obj = {
                    email: response.email,
                    token: response.token
                };
                yield put(storePasswordUserData(obj));
                yield put(navigateAction(true));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const retorePassword = async obj => {
    console.log('oh', obj);
    const response = await fetch(Constants.PASSWORD_RESET_API, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'POST',
        body: JSON.stringify({
            email: obj.password_data.email,
            token: obj.password_data.token,
            password: obj.password,
            password_confirmation: obj.password_confirmation
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaRestorePassword(password, password_confirmation) {
    yield put(spinnerAction(true));
    try {
        const password_data = yield select(state => state.passwordUserDataReducer);
        const obj = {
            password: password.password,
            password_confirmation: password.password_confirmation,
            password_data
        };
        const result = yield call(retorePassword, obj);
        const {status} = result[0];
        switch (status) {
            case 200:
                Toast.show({
                    text: 'Contraseña modificada con éxito',
                    buttonText: 'OK'
                });
                yield put(goBackAction(true));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

const requestContacts = () => {
    return new Promise((resolve) => {
        Contacts.getAllWithoutPhotos((err, contacts) => {
            resolve(contacts);
        });
    });
};

function* sagaSaveContactsPhone() {
    yield put(spinnerAction(true));
    try {
        yield put(cleanSelectedAction());
        const contacts = yield call(requestContacts);
        const securityNetwork = yield select(state => state.securityNetworkReducer);
        const res = contacts.filter((item1, index) =>
            !securityNetwork.some(item2 => {
                if (item1.phoneNumbers[0]) {
                    return (item2.numero_telefono === item1.phoneNumbers[0].number.replace('+56', '').replace(/\s/g, ''))
                }
            }));
        this.array = res;
        let array = [];
        for (let i = 0; i < this.array.length; i++) {
            array.push({isSelected: false});
        }
        yield put(isSelectedAction(array));
        yield put(saveAllContactsAction(res));
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

function* sagaSelectContacts(item) {
    try {
        const {array, index} = item;
        let isSelected = yield select(state => state.isSelectedReducer);
        isSelected[index].isSelected = !isSelected[index].isSelected;
        yield put(selectItemAction(isSelected));
        let selectedContacts = yield select(state => state.selectedContactNetworkReducer);
        const contacts = yield select(state => state.contactsReducer);
        const index2 = selectedContacts.map(item => item.numero_telefono).indexOf(contacts[index].phoneNumbers[0].number.replace('+56', '').replace(/\s/g, ''));
        if (isSelected[index].isSelected) {
            yield put(selectedContactsAction(array));
        } else {
            selectedContacts.splice(index2, 1);
            yield put(deselectContactAction(selectedContacts));
        }
    } catch (e) {
        console.log(e);
    }
}

function* sagaSelectContactRemove(item) {
    try {
        const {array, index} = item;
        const isSelected = yield select(state => state.isSelectedReducer);
        isSelected[index].isSelected = !isSelected[index].isSelected;
        yield put(selectItemAction(isSelected));
        let selectedContacts = yield select(state => state.selectedContactNetworkReducer);
        const securityNetwork = yield select(state => state.securityNetworkReducer);
        const index2 = selectedContacts.map(item => item.numero_telefono).indexOf(securityNetwork[index].numero_telefono);
        if (isSelected[index].isSelected) {
            yield put(selectedContactsAction(array));
        } else {
            selectedContacts.splice(index2, 1);
            yield put(deselectContactAction(selectedContacts));
        }
    } catch (e) {
        console.log(e);
    }
}

function* sagaSelectedSecurityNetwork() {
    try {
        const securityNetwork = yield select(state => state.securityNetworkReducer);
        let array = [];
        for (let i = 0; i < securityNetwork.length; i++) {
            array.push({isSelected: false});
        }
        yield put(isSelectedAction(array));
    } catch (e) {
        console.log(e);
    }
}

function* sagaSearchContact(item) {
    const {text} = item;
    let isSelected = yield select(state => state.isSelectedReducer);
    const newData = this.array.filter(item => {
        const itemData = `${item.givenName.toUpperCase()} ${item.familyName.toUpperCase()}`;
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
    });
    /!* const index = this.array.map(item => item.phoneNumbers[0].number).indexOf(newData[0].phoneNumbers[0].number);
     console.log('newData', newData);
     console.log('index', index);
     console.log('el is selected del filtrado', isSelected[index]);*!/
    yield put(isSelectedAction(isSelected));
    yield put(saveAllContactsAction(newData));
}

const notificationRequest = async notification => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch('http://services.alodoctores.com/api/auth/notificacion/registrar', {
        method: 'POST',
        headers: {
            Authorization: token,
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tipo_notificacion: 2,
            titulo: notification._title,
            descripcion: notification._body
        })
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaNotification(item) {
    try {
        const {notification} = item;
        const result = yield call(notificationRequest, notification);
        const {status} = result[0];
        switch (status) {
            case 200:
                yield put(arrivingNotificationAction(true));
                break;
        }
    } catch (e) {
        console.log(e);
    }
}

const notificationListRequest = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await fetch('http://services.alodoctores.com/api/auth/notificacion/listado/2', {
        headers: {
            Authorization: token,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        method: 'GET'
    });
    return Promise.all([{status: await response.status, response: await response.json()}]);
};

function* sagaNotificationList() {
    yield put(spinnerAction(true));
    try {
        const result = yield call(notificationListRequest);
        console.log('tonces', result);
        const {status, response} = result[0];
        switch (status) {
            case 200:
                yield put(storeNotificationAction(response));
                break;
        }
    } catch (e) {
        console.log(e);
    }
    yield put(spinnerAction(false));
}

export default function* Generator() {
    yield takeEvery(Constants.LOGIN_SUBMIT, sagaLogin);
    yield takeEvery(Constants.SIGNUP_SUBMIT, sagaSignUp);
    yield takeEvery(Constants.LOG_OUT, sagaLogOut);
    yield takeEvery(Constants.LOAD_USER_INFORMATION, sagaLoadInformation);
    yield takeEvery(Constants.SAVE_CONTACTS, sagaSaveContacts);
    yield takeEvery(Constants.DELETE_NOTIFICATION, sagaDeleteNotification);
    yield takeEvery(Constants.SAVE_ECG, sagaSaveECG);
    yield takeEvery(Constants.EDIT_USER, sagaEditUser);
    yield takeEvery(Constants.UPDATE_USER, sagaUpdateUser);
    yield takeEvery(Constants.UPDATE_PHOTO, sagaUpdatePhoto);
    yield takeEvery(Constants.SAVE_HR_RESULT, sagaSaveHR);
    yield takeEvery(Constants.SAVE_BP_RESULT, sagaSaveBP);
    yield takeEvery(Constants.REMOVE_NETWORK, sagaRemoveNetwork);
    yield takeEvery(Constants.LOAD_HISTORY, sagaLoadHistory);
    yield takeEvery(Constants.LOAD_HISTORY_DETAIL, sagaLoadHistoryDetail);
    yield takeEvery(Constants.LOAD_HISTORY_RC, sagaLoadHistoryRC);
    yield takeEvery(Constants.LOAD_HISTORY_BP, sagaLoadHistoryBP);
    yield takeEvery(Constants.SAVE_REMINDER, sagaSaveReminder);
    yield takeEvery(Constants.LOAD_REMINDER, sagaLoadReminder);
    yield takeEvery(Constants.SET_REMINDER_STATUS, sagaSetReminderStatus);
    yield takeEvery(Constants.REMINDER_DETAIL, sagaReminderDetail);
    yield takeEvery(Constants.REMOVE_REMINDER, sagaRemoveReminder);
    yield takeEvery(Constants.EDIT_REMINDER, sagaEditReminder);
    yield takeEvery(Constants.FORGOT_PASSWORD, sagaForgotPassword);
    yield takeEvery(Constants.EMAIL_TOKEN, sagaEmailToken);
    yield takeEvery(Constants.RESTORE_PASSWORD, sagaRestorePassword);


    yield takeEvery(Constants.SAVE_CONTACTS_PHONE, sagaSaveContactsPhone);
    yield takeEvery(Constants.SELECT_CONTACT_ACTION, sagaSelectContacts);
    yield takeEvery(Constants.SELECTED_SECURITY_NETWORK, sagaSelectedSecurityNetwork);
    yield takeEvery(Constants.SELECT_CONTACT_REMOVE, sagaSelectContactRemove);
    yield takeEvery(Constants.SEARCH_CONTACT, sagaSearchContact);
    yield takeEvery(Constants.NOTIFICATION_LIST, sagaNotification);
    yield takeEvery(Constants.NOTIFICATION_LIST_ARRAY, sagaNotificationList);
}*/
