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
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
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


/*

<View style={{
    justifyContent: "center",
    alignItems: "center"
}}>
    <RNBambuserBroadcaster ref={ref => {
        this.myBroadcasterRef = ref;
    }} applicationId={'AEI3qY0EhtPUWiyg28UV3A'}
                           title={'Kevin Abreu'}
                           style={{
                               width,
                               height,
                               position: "absolute",
                               top: 0,
                               left: 0,
                               bottom: 0,
                               right: 0,
                               zIndex: -1
                           }}
                           onBroadcastIdReceived={broadcastId => alert(broadcastId)}
    >
        <View style={{
            alignItems: 'space-between',
            justifyContent: 'flex-end',
            flex: 1,
            alignSelf: 'center',
            flexDirection: 'row'
        }}>
            <TouchableOpacity onPress={() => {
                this.myBroadcasterRef.startBroadcast();
            }}
                              style={{
                                  marginBottom: 50,
                                  width: 100,
                                  height: 100,
                                  backgroundColor: '#09f'
                              }}>
                <Text>INICIAR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.myBroadcasterRef.getRecentPosition()}
                              style={{
                                  marginTop: 5,
                                  width: 100,
                                  height: 100,
                                  backgroundColor: 'red',
                                  marginBottom: 50,
                              }}>
                <Text>Detener</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.myBroadcasterRef.switchCamera()}
                              style={{
                                  marginTop: 5,
                                  width: 100,
                                  height: 100,
                                  backgroundColor: 'green',
                                  marginBottom: 50,
                              }}>
                <Text>Voltear cámara</Text>
            </TouchableOpacity>
        </View>
    </RNBambuserBroadcaster>
</View>*/
