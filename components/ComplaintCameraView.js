import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {
    Text,
    Container,
    Icon
} from 'native-base';
import {
    ComplaintStyles
} from "../includes/styles";
import {RNCamera} from 'react-native-camera';

const {width} = Dimensions.get('window');


const ComplaintCameraView = props => {
    const {
        navigation,
        isRecording,
        countdown
    } = props;
    return (
        <Container style={{flex: 1}}>
            <RNCamera
                ref={props.setRef}
                style={ComplaintStyles.camera}
                type={RNCamera.Constants.Type.front}
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
            >
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-start'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        width,
                        backgroundColor: 'rgba(0, 0, 0, .3)',
                        paddingVertical: 10
                    }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}
                        style={{
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            flex: 1
                        }}>
                            <Icon name={'arrow-back'}
                                  style={ComplaintStyles.arrowIcon}
                            />
                        </TouchableOpacity>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            flex: 1
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                alignSelf: 'center',
                                color: '#fff'
                            }}>{countdown}</Text>
                        </View>
                        <View style={{flex: 1}}/>
                    </View>
                </View>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}>
                    <View style={ComplaintStyles.footerCamera}>

                        {
                            !isRecording ?
                                <TouchableOpacity onPress={props.recordVideo}>
                                    <Image source={require('../assets/img/record.png')}
                                           style={ComplaintStyles.recordIcon}
                                    />
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={props.stopVideo}>
                                    <Image source={require('../assets/img/stop.png')}
                                           style={ComplaintStyles.recordIcon}
                                    />
                                </TouchableOpacity>
                        }


                        <Text style={ComplaintStyles.recordText}>GRABAR DENUNCIA</Text>
                    </View>
                </View>
            </RNCamera>
        </Container>
    )
};

export default ComplaintCameraView;