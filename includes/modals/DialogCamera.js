import React from 'react';
import {Dialog} from 'react-native-simple-dialogs';
import {
    View,
    TouchableOpacity
} from "react-native";
import {
    Text
} from "native-base";

const DialogCamera = props => {
    const {
        navigation
    } = props;
    return (
        <Dialog
            visible={props.visible}
            animationType={'fade'}
            title="Cambiar a Cámara"
            titleStyle={{
                textAlign: 'center',
                fontFamily: 'UniSansRegular',
                fontSize: 23,
                color: '#606A75'
            }}
            onTouchOutside={() => props.handleToggleCamera(false)}
            dialogStyle={{
                borderRadius: 10,
                width: 292,
                alignSelf: 'center'
            }}
        >
            <View>
                <Text style={{
                    color: '#92A0B1',
                    fontFamily: 'UniSansRegular',
                    fontSize: 14,
                }}>¿Quieres cambiar este teléfono a modo Cámara?</Text>
                <View style={{
                    height: 1,
                    backgroundColor: 'rgba(146,160,177, .5)',
                    marginVertical: 20
                }}/>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => props.handleToggleCamera(false)}>
                        <Text style={{
                            fontFamily: 'UniSansRegular',
                            fontSize: 19,
                            color: '#D0282E'
                        }}>CANCELAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        props.handleToggleCamera(false);
                        navigation.navigate('BroadcastingScreen');
                    }}>
                        <Text style={{
                            fontFamily: 'UniSansRegular',
                            fontSize: 19,
                            color: '#D0282E'
                        }}>ACEPTAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Dialog>
    )
};

export default DialogCamera;