import React from 'react';
import {Dialog} from 'react-native-simple-dialogs';
import {
    TouchableOpacity,
    View,
    Image
} from "react-native";
import {Text} from "native-base";

const DialogConfirmation = props => {
    const {
        visible
    } = props;
    return (
        <Dialog
            visible={visible}
            animationType={'fade'}
            title="¡Denuncia enviada!"
            titleStyle={{
                textAlign: 'center',
                fontFamily: 'UniSansRegular',
                fontSize: 23,
                color: '#606A75'
            }}
            onTouchOutside={() => props.handleToggleDialogConfirmation(false)}
            dialogStyle={{
                borderRadius: 10,
                width: 292,
                alignSelf: 'center'
            }}
        >
            <View>
                <View style={{
                    width: 84,
                    height: 84,
                    backgroundColor: '#fff',
                    borderRadius: 84 / 2,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,

                    elevation: 5,
                    alignSelf: 'center',
                    justifyContent: 'center'
                }}>
                    <Image source={require('../../assets/img/check-icon.png')}
                           style={{
                               width: 70,
                               height: 51,
                               alignSelf: 'center',
                               marginLeft: 15,
                               marginBottom: 15
                           }}
                    />
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: 'rgba(146,160,177, .3)',
                    marginVertical: 20
                }}/>
                <Text style={{
                    color: '#92A0B1',
                    fontFamily: 'UniSansRegular',
                    fontSize: 14,
                    textAlign: 'center',
                    marginBottom: 15
                }}>{`Nuestro centro de Seguridad\n atenderá tu denuncia\n lo antes posible.`}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => props.handleToggleDialogConfirmation(false)}>
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

export default DialogConfirmation;