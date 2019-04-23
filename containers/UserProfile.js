import React from 'react';
import {connect} from 'react-redux';
import UserProfileView from '../components/UserProfileView';
import {editUserAction, goBackAction} from "../store/Actions";

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (prevProps.goBack !== this.props.goBack) {
            const {navigation} = this.props;
            navigation.goBack();
        }
    }

    render() {
        const {
            navigation,
            spinner
        } = this.props;
        return <UserProfileView navigation={navigation}
                                spinner={spinner}
                                handleUserSubmit={this.props.handleUserSubmit}
        />
    }

    componentWillUnmount(): void {
        this.props.handleGoBack(false);
    }
}

const mapDispatchToProps = dispatch => ({
    handleUserSubmit: info => {
        dispatch(editUserAction(info));
    },
    handleGoBack: bool => {
        dispatch(goBackAction(bool));
    }
});

const mapStateToProps = state => ({
    spinner: state.spinnerReducer,
    goBack: state.goBackReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);