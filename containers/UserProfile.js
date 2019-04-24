import React from 'react';
import {connect} from 'react-redux';
import UserProfileView from '../components/UserProfileView';
import {
    editUserAction,
    goBackAction,
    openGalleryAction,
    toggleModalAction,
    changePasswordAction
} from "../store/Actions";

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
            spinner,
            userPhoto,
            isModalVisible
        } = this.props;
        return <UserProfileView navigation={navigation}
                                spinner={spinner}
                                userPhoto={userPhoto}
                                isModalVisible={isModalVisible}
                                handleUserSubmit={this.props.handleUserSubmit}
                                handleOpenGallery={this.props.handleOpenGallery}
                                openModalChangePassword={() => this.props.handleToggleModal(true)}
                                hideModalChangePassword={() => this.props.handleToggleModal(false)}
                                handleChangePassword={this.props.handleChangePassword}
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
    },
    handleOpenGallery: (requestType) => {
        dispatch(openGalleryAction(requestType));
    },
    handleToggleModal: bool => {
        dispatch(toggleModalAction(bool));
    },
    handleChangePassword: info => {
        dispatch(changePasswordAction(info));
    }
});

const mapStateToProps = state => ({
    spinner: state.spinnerReducer,
    goBack: state.goBackReducer,
    userPhoto: state.userPhotoReducer,
    isModalVisible: state.toggleModalReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);