import React from 'react';
import {connect} from 'react-redux';
import HomeView from '../components/HomeView';
import {
    toggleCameraDialogAction,
    userInfoAction
} from '../store/Actions';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        this.props.handleUserInfo();
    }

    render() {
        const {
            navigation,
            spinner,
            isCameraVisible
        } = this.props;
        return <HomeView navigation={navigation}
                         handleToggleCamera={this.props.handleToggleCamera}
                         isCameraVisible={isCameraVisible}
                         spinner={spinner}
        />
    }
}

const mapDispatchToProps = dispatch => ({
    handleUserInfo: () => {
        dispatch(userInfoAction());
    },
    handleToggleCamera: bool => {
        dispatch(toggleCameraDialogAction(bool));
    }
});

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticatedReducer,
    spinner: state.spinnerReducer,
    isCameraVisible: state.toggleDialogCameraReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);