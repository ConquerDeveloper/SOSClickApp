import React from 'react';
import {
    Container,
    Text
} from 'native-base';
import {
    View
} from 'native-base';
import {BroadcastStyles, generalStyles} from "../includes/styles";
import {RNCamera} from "react-native-camera";


const BroadcastView = props => {
    const {
        navigation
    } = props;
    return (
        <Container>
            <RNCamera
                ref={ref => {
                    props.camera = ref;
                }}
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
                style={BroadcastStyles.camera}
                type={RNCamera.Constants.Type.front}
            />
        </Container>
    )
};

export default BroadcastView;