import React from 'react';
import LoginView from '../components/LoginView';
import {connect} from 'react-redux';
import {
    signInAction
} from '../store/Actions';
import {NavigationActions, StackActions} from "react-navigation";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (prevProps.isAuthenticated !== this.props.isAuthenticated) {
            const {navigation} = this.props;
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'WelcomeScreen'})],
            });
            navigation.dispatch(resetAction);
        }
    }

    render() {
        const {
            navigation,
            spinner
        } = this.props;
        return <LoginView navigation={navigation}
                          handleForgotModal={() => this.setState({isModalVisible: true})}
                          hideModal={() => this.setState({isModalVisible: false})}
                          isModalVisible={this.state.isModalVisible}
                          handleLogin={this.props.handleLogin}
                          spinner={spinner}
        />
    }
}

const mapDispatchToProps = dispatch => ({
    handleLogin: info => {
        dispatch(signInAction(info));
    }
});

const mapStateToProps = state => ({
    spinner: state.spinnerReducer,
    isAuthenticated: state.isAuthenticatedReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);