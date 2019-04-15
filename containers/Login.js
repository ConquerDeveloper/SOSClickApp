import React from 'react';
import LoginView from '../components/LoginView';


class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navigation} = this.props;
        return <LoginView navigation={navigation}/>
    }
}

export default Login;