import React from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator, StyleSheet, AsyncStorage} from 'react-native';
import {NavigationActions, StackActions} from "react-navigation";
import {
    isAuthenticated,
    logOutAction
} from '../store/Actions';

class logOut extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.handleLogout();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
            AsyncStorage.removeItem('token');
            const {navigation} = this.props;
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'SignInScreen'})],
            });
            navigation.dispatch(resetAction);
        }
    }

    render() {
        const {spinner} = this.props;
        return <ActivityIndicator size="large"
                                  color="#0000ff"
                                  style={StyleSheet.absoluteFillObject}
                                  animating={spinner}/>
    }
}

const mapDispatchToProps = dispatch => ({
    handleAuthentication: bool => {
        dispatch(isAuthenticated(bool));
    },
    handleLogout: () => {
        dispatch(logOutAction());
    }
});

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticatedReducer,
    spinner: state.spinnerReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(logOut);