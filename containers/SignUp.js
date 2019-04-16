import React from 'react';
import SignUpView from '../components/SignUpView';
import {connect} from 'react-redux';
import {
    signUpAction
} from '../store/Actions';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            navigation,
            spinner
        } = this.props;
        return <SignUpView navigation={navigation}
                           spinner={spinner}
                           handleSignUp={this.props.handleSignUp}
        />
    }
}

const mapDispatchToProps = dispatch => ({
    handleSignUp: info => {
        dispatch(signUpAction(info));
    }
});

const mapStateToProps = state => ({
    spinner: state.spinnerReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);