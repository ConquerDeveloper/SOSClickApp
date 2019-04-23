import React from 'react';
import {connect} from 'react-redux';
import {
    saveContactsAction,
    spinnerAction,
    cleanContactsAction
} from "../store/Actions";
import {PermissionsAndroid} from "react-native";
import Contacts from 'react-native-contacts';
import ContactsView from "../components/ContactsView";

class ContactsNetwork extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.handleSpinner(true);
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.'
            }
        ).then(() => {
            Contacts.getAll((err, contacts) => {
                if (err === 'denied'){
                    this.props.handleSpinner(false);
                    // error
                } else {
                    // contacts returned in Array
                    console.warn('contacts', contacts);
                    this.props.handleSpinner(false);
                    this.props.handleSaveContacts(contacts);
                }
            })
        })
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