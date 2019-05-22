import React from 'react';
import {connect} from 'react-redux';
import HomeView from '../components/HomeView';
import {
    toggleCameraDialogAction,
    userInfoAction
} from '../store/Actions';
import {PermissionsAndroid} from "react-native";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount(): void {
        const checkPermissions = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (checkPermissions) {
            console.log('granted')
        } else {
            this.requestLocationPermissions();
        }
        this.props.handleUserInfo();
    }

    requestLocationPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
               console.log('granted')
            } else {
                console.log('not granted');
            }
        } catch (err) {
            console.warn(err);
        }
    };

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