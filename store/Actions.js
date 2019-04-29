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

export const openGalleryAction = requestType => ({
    type: Constants.OPEN_GALLERY,
    requestType
});

export const saveUserPhotoAction = photo => ({
    type: Constants.SAVE_PHOTO,
    photo
});

export const toggleModalAction = bool => ({
    type: bool ? Constants.OPEN_MODAL : Constants.CLOSE_MODAL,
});

export const saveBroadcastIdAction = broadcastId => ({
    type: Constants.SAVE_BROADCAST_ID,
    broadcastId
});

export const broadcastStateAction = bool => ({
    type: bool ? Constants.BROADCAST_ON : Constants.BROADCAST_OFF
});

export const changePasswordAction = info => ({
    type: Constants.CHANGE_PASSWORD,
    info
});

export const loadContactsAction = () => ({
    type: Constants.LOAD_CONTACTS
});

export const searchContactAction = text => ({
    type: Constants.SEARCH_CONTACT,
    text
});

export const isSelectedAction = array => ({
    type: Constants.IS_SELECTED,
    array
});

export const toggleSelectedAction = (array, index) => ({
    type: Constants.TOGGLE_SELECTED,
    array,
    index
});

export const selectSingleItemAction = array => ({
    type: Constants.SELECT_SINGLE_ITEM,
    array
});

export const addToNetworkAction = () => ({
    type: Constants.ADD_TO_NETWORK
});

export const selectedAction = array => ({
    type: Constants.SELECTED_ITEM,
    array
});

export const deselectAction = array => ({
   type: Constants.DESELECT_ITEM,
   array
});

export const saveSecurityNetwork = array => ({
    type: Constants.SAVE_SECURITY_NETWORK,
    array
});

export const loadSecurityNetworkAction = () => ({
    type: Constants.LOAD_SECURITY_NETWORK
});

export const addNewContactAction = array => ({
    type: Constants.ADD_NEW_CONTACT,
    array
});

export const cleanSelectedAction = () => ({
    type: Constants.CLEAN_SELECTED
});

export const isSelectedRemove = () => ({
    type: Constants.IS_SELECTED_REMOVE
});

export const removeNetworkAction = () => ({
    type: Constants.REMOVE_NETWORK
});