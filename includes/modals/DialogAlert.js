import React from 'react';
import {Dialog} from "react-native-simple-dialogs";
import {
    TouchableOpacity,
    View
} from "react-native";
import {
    Text,
    CheckBox
} from "native-base";

const DialogAlert = props => {
    return (
        <Dialog
            visible={props.visible}
            animationType={'fade'}
            title="Compartir mi cámara con"
            titleStyle={{
                textAlign: 'center',
                fontFamily: 'UniSansRegular',
                fontSize: 23,
                color: '#606A75'
            }}
            onTouchOutside={() => props.handleAlertDialog(false)}
            dialogStyle={{
                borderRadius: 10,
                width: 292,
                alignSelf: 'center'
            }}
        >
            <View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        color: '#92A0B1',
                        fontFamily: 'UniSansRegular',
                        fontSize: 14,
                    }}>Mi red de seguridad</Text>
                    <CheckBox checked={true}
                              color={'#03E19C'}
                              style={{
                                  marginRight: 15
                              }}
                    />
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: 'rgba(146,160,177, .2)',
                    marginVertical: 10
                }}/>


                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        color: '#92A0B1',
                        fontFamily: 'UniSansRegular',
                        fontSize: 14,
                    }}>Monitores SOS Click</Text>
                    <CheckBox checked={false}
                              color={'#03E19C'}
                              style={{
                                  marginRight: 15
                              }}
                    />
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: 'rgba(146,160,177, .2)',
                    marginVertical: 10
                }}/>


                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        color: '#92A0B1',
                        fontFamily: 'UniSansRegular',
                        fontSize: 14,
                    }}>Seguridad ciudadana</Text>
                    <CheckBox checked={false}
                              color={'#03E19C'}
                              style={{
                                  marginRight: 15
                              }}
                    />
                </View>
                <View style={{
                    height: 1,
                    backgroundColor: 'rgba(146,160,177, .2)',
                    marginVertical: 10
                }}/>


                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 20
                }}>
                    <TouchableOpacity onPress={() => props.handleAlertDialog(false)}>
                        <Text style={{
                            fontFamily: 'UniSansRegular',
                            fontSize: 19,
                            color: '#D0282E'
                        }}>CANCELAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        props.handleSendAlert();
                        props.handleAlertDialog(false);
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

export default DialogAlert;