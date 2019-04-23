import React from 'react';
import {connect} from 'react-redux';
import {
    PermissionsAndroid,
    Dimensions,
    TouchableOpacity,
    View,
    StyleSheet,
    findNodeHandle
} from 'react-native';
import {
    Text,
    Container, Title
} from 'native-base';
import RNBambuserBroadcaster from 'react-native-bambuser-broadcaster';
import {generalStyles} from "../includes/styles";
import {BlurView} from "@react-native-community/blur";


const {width, height} = Dimensions.get('window');

class Broadcast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewRef: null
        };
    }

    componentDidMount(): void {
        this.setState({viewRef: findNodeHandle(this.myBroadcasterRef)});
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
        return (
            <View style={{
                justifyContent: "center",
                alignItems: "center"
            }}>
                <RNBambuserBroadcaster ref={ref => {
                    this.myBroadcasterRef = ref;
                }} applicationId={'AEI3qY0EhtPUWiyg28UV3A'}
                                       style={{
                                           width,
                                           height,
                                           position: "absolute",
                                           top: 0,
                                           left: 0,
                                           bottom: 0,
                                           right: 0,
                                           zIndex: -1
                                       }}>
                    <View style={{
                        alignItems: 'space-between',
                        justifyContent: 'flex-end',
                        flex: 1,
                        alignSelf: 'center',
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity onPress={() => this.myBroadcasterRef.startBroadcast()}
                                          style={{
                                              marginBottom: 50,
                                              width: 100,
                                              height: 100,
                                              backgroundColor: '#09f'
                                          }}>
                            <Text>INICIAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.stopBroadcastNow}
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
                <BlurView
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        zIndex: 1,
                        opacity: .2,
                    }}
                    viewRef={this.state.viewRef}
                    blurType="dark"
                    blurAmount={5}
                    blurRadius={15}
                    downsampleFactor={5}
                    overlayColor={'rgba(255, 255, 255, .25)'}
                />
                {/*  <View style={generalStyles.columnCenteredContainer}>
                        <View
                            style={{
                                backgroundColor: '#EFEFEF',
                                borderRadius: 23,
                                width: 215,
                                height: 245,
                                alignSelf: 'center',
                                paddingVertical: 20
                            }}>
                            <View style={generalStyles.columnCenteredContainer}>
                                  <Image source={require('../img/doctor-icon.svg')}
                                           style={{
                                               width: 64,
                                               height: 82
                                           }}/>
                                <Text style={{
                                    textAlign: 'center',
                                    marginTop: 10,
                                    fontSize: 13
                                }}>¿Desea iniciar un monitoreo?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('MonitoringScreen')}>
                                      <Image source={require('../img/record-icon.svg')}
                                               style={{
                                                   width: 60,
                                                   height: 60
                                               }}/>
                                </TouchableOpacity>
                                <Title style={{
                                    fontSize: 14,
                                    fontWeight: 'bold'
                                }}>INICIAR</Title>
                            </View>
                        </View>
                    </View>*/}

            </View>
        );
    }
}

export default connect()(Broadcast);