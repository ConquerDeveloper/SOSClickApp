import React from 'react';
import {connect} from 'react-redux';
import {
    PermissionsAndroid,
    Dimensions,
    TouchableOpacity,
    View
} from 'react-native';
import {
    Text,
    Container, Header, Left, Button, Icon, Body, Title, Right
} from 'native-base';
import {generalStyles} from "../includes/styles";
import {NavigationActions, StackActions} from "react-navigation";


const {width, height} = Dimensions.get('window');

class Broadcast extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        return this.requestCameraPermission();
    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
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
        return (
            <Container>
                <View style={generalStyles.columnCenteredContainer}>
                    <Button onPress={() => navigation.navigate('BroadcastingScreen')}>
                        <Text>Transmitir</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

export default connect()(Broadcast);
