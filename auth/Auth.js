import React from 'react';
import {connect} from 'react-redux';
import {
    ActivityIndicator,
    AsyncStorage,
    StyleSheet
} from 'react-native';
import {
    isAuthenticated
} from "../store/Actions";
import {NavigationActions, StackActions} from "react-navigation";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    async componentWillMount() {
        const AuthToken = await AsyncStorage.getItem('token');
        const {navigation} = this.props;
        if (AuthToken !== null) {
            this.props.handleAuthentication(true);
            this.setState({loading: false});
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'WelcomeScreen'})],
            });
            navigation.dispatch(resetAction);
        } else {
            this.props.handleAuthentication(false);
            this.setState({loading: false});
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'SignInScreen'})],
            });
            navigation.dispatch(resetAction);
        }
    }

    render() {
        if (this.state.loading) {
            return <ActivityIndicator size="large" color="#0000ff" style={StyleSheet.absoluteFillObject} />
        } else {
            return null;
        }
    }
}

const mapDispatchToProps = dispatch => ({
    handleAuthentication: bool => {
        dispatch(isAuthenticated(bool));
    }
});

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticatedReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);