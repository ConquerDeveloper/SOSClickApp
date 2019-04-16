import React from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import {generalStyles} from "../includes/styles";
import {Text} from 'native-base';

const Spinner = props => {
    if (props.visible) {
        return (
            <View style={{
                flex: 1,
                alignSelf: 'center',
                zIndex: 9999,
                justifyContent: 'center',
                alignItems: 'center',
                ...StyleSheet.absoluteFillObject
            }}>
                <View style={{
                    width: props.progressText ? 100 : 80,
                    height: props.progressText ? 100 : 80,
                    backgroundColor: 'rgba(0, 0, 0, .8)',
                    borderRadius: 10,
                }}>
                    <View style={{
                        ...generalStyles.columnCenteredContainer
                    }}>
                        <ActivityIndicator size="large" color="#fff" />
                        {props.progressText && <Text style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginTop: 5,
                            fontSize: 14
                        }}>{props.progressText}</Text>}
                    </View>
                </View>
            </View>
        );
    } else {
        return null;
    }
};

export default Spinner;