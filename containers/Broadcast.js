import React from 'react';
import {connect} from 'react-redux';
import {
    PermissionsAndroid
} from 'react-native';
import {
    withNavigationFocus
} from 'react-navigation';
import BroadcastView from "../components/BroadcastView";

class Broadcast extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        //return this.requestCameraPermission();
    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            ]);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    render() {
        const {navigation} = this.props;
        if (!navigation.isFocused()) {
            return null;
        }
        return (
            <BroadcastView navigation={navigation}
                           camera={this.camera}
            />
        );
    }

    componentWillUnmount() {
        this.camera = null;
        return null;
    }
}

export default connect()(withNavigationFocus(Broadcast));
