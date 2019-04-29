import React from 'react';
import {connect} from 'react-redux';
import {
    cleanContactsAction,
    searchContactAction,
    loadContactsAction,
    toggleSelectedAction,
    addToNetworkAction, goBackAction, cleanSelectedAction
} from "../store/Actions";
import {
    Keyboard
} from 'react-native';
import ContactsView from "../components/ContactsView";

class ContactsNetwork extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textFilter: '',
            showHeader: true
        }
    }

    componentDidMount(): void {
        this.props.handleContacts();
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', () => this.setState({
                showHeader: false
            })
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide', () => this.setState({
                showHeader: true
            })
        );
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (prevProps.isGoBack !== this.props.isGoBack) {
            const {navigation} = this.props;
            navigation.goBack();
        }
    }

    searchContact = textFilter => {
        this.setState({textFilter});
        this.props.handleSearchContact(textFilter);
    };

    render() {
        const {
            navigation,
            contacts,
            spinner,
            isSelected
        } = this.props;
        return <ContactsView navigation={navigation}
                             contacts={contacts}
                             spinner={spinner}
                             searchContact={this.searchContact}
                             textFilter={this.state.textFilter}
                             isSelected={isSelected}
                             handleSelected={this.props.handleSelected}
                             handleAddToNetwork={this.props.handleAddToNetwork}
                             showHeader={this.state.showHeader}
        />
    }

    componentWillUnmount(): void {
        this.props.handleCleanContactsList();
        this.props.handleGoBack(false);
        this.props.handleCleanSelected();
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
}

const mapDispatchToProps = dispatch => ({
    handleCleanContactsList: () => {
        dispatch(cleanContactsAction());
    },
    handleSearchContact: text => {
        dispatch(searchContactAction(text));
    },
    handleContacts: () => {
        dispatch(loadContactsAction());
    },
    handleSelected: (array, index) => {
        dispatch(toggleSelectedAction(array, index));
    },
    handleAddToNetwork: () => {
        dispatch(addToNetworkAction());
    },
    handleGoBack: bool => {
        dispatch(goBackAction(bool));
    },
    handleCleanSelected: () => {
        dispatch(cleanSelectedAction());
    }
});


const mapStateToProps = state => ({
    contacts: state.contactsReducer,
    spinner: state.spinnerReducer,
    isSelected: state.isSelectedReducer,
    isGoBack: state.goBackReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsNetwork);