import React from 'react';
import {connect} from 'react-redux';
import {
    saveContactsAction,
    spinnerAction,
    cleanContactsAction
} from "../store/Actions";
import {
    PermissionsAndroid,
    AsyncStorage
} from "react-native";
import Contacts from 'react-native-contacts';
import ContactsView from "../components/ContactsView";

class ContactsNetwork extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this.props.handleSpinner(true);
        const contactsList = await AsyncStorage.getItem('contacts');
        if (!contactsList) {
            const permission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    'title': 'Contacts',
                    'message': 'This app would like to view your contacts.'
                }
            );
            if (permission) {
                Contacts.getAll(async (err, contacts) => {
                    if (err === 'denied') {
                        this.props.handleSpinner(false);
                        // error
                    } else {
                        // contacts returned in Array
                        this.props.handleSpinner(false);
                        console.warn('contacts', contacts);
                        const contactsArray = AsyncStorage.setItem('contacts', `${JSON.stringify(contacts)}`);
                        console.log('contacts1', contactsArray);
                        //this.props.handleSaveContacts(contactsArray);
                    }
                })
            }
        } else {
            this.props.handleSpinner(false);
            console.log('contacts2', JSON.parse(await contactsList));
            this.props.handleSaveContacts(JSON.parse(await contactsList));
        }
    }

    render() {
        const {
            navigation,
            contacts,
            spinner
        } = this.props;
        return <ContactsView navigation={navigation}
                             contacts={contacts}
                             spinner={spinner}
        />
    }

    componentWillUnmount(): void {
        this.props.handleCleanContactsList();
    }
}

const mapDispatchToProps = dispatch => ({
    handleSaveContacts: array => {
        dispatch(saveContactsAction(array));
    },
    handleSpinner: bool => {
        dispatch(spinnerAction(bool));
    },
    handleCleanContactsList: () => {
        dispatch(cleanContactsAction());
    }
});


const mapStateToProps = state => ({
    contacts: state.contactsReducer,
    spinner: state.spinnerReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsNetwork);