import React from 'react';
import {
    Modal,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Image, ImageBackground
} from "react-native";
import {
    Text,
    Button,
    Item,
    Input,
    Card,
    CardItem,
    Body,
    Icon
} from "native-base";
import {generalStyles, loginStyles} from "../../includes/styles";

const ModalForgotPassword = props => {
    const {
        visible
    } = props;
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}>
            <ImageBackground source={require('../../assets/img/home-background.png')}
                             style={generalStyles.forgotPasswordBackground}>
                <ScrollView contentContainerStyle={generalStyles.columnCenteredContainer}>
                    <Card style={{
                        width: 300,
                        ...generalStyles.cardBordered
                    }}>
                        <CardItem header
                                  style={generalStyles.cardBordered}>
                            <View style={generalStyles.columnCenteredContainer}>
                                <Icon type={'Ionicons'}
                                      name={'lock'}
                                      style={loginStyles.lockIcon}
                                />
                                <View style={{
                                    marginTop: 15,
                                    marginBottom: 5,
                                    marginLeft: 10,
                                    flex: 0,
                                    alignSelf: 'flex-start',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start'
                                }}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: '#454F63',
                                        fontWeight: '400',
                                        textAlign: 'left',
                                    }}>Recupere su contraseña</Text>
                                </View>
                            </View>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={{
                                    fontSize: 12,
                                    color: '#3B5575',
                                    fontWeight: '600',
                                    marginBottom: 5,
                                    marginLeft: 10
                                }}>Correo electrónico</Text>
                                <Item regular
                                      style={generalStyles.inputContainer}
                                >
                                    <Input placeholder={'Escriba su correo electrónico'}
                                           placeholderTextColor='#D2D2D9'
                                           style={{fontSize: 14}}
                                           autoCapitalize={'none'}
                                        //onChangeText={props.handleEmailChange}
                                           keyboardType={'email-address'}
                                        //value={`${props.email}`}
                                    />
                                </Item>
                            </Body>
                        </CardItem>
                        <CardItem footer
                                  style={generalStyles.cardBordered}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                flex: 1
                            }}>
                                <Button
                                    style={{
                                        backgroundColor: '#8F9EBC',
                                        borderRadius: 10,
                                        width: 120
                                    }}
                                    onPress={props.hideModal}
                                >
                                    <Text style={{
                                        flex: 1,
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        ...generalStyles.alignRow,
                                        fontSize: 14,
                                        fontWeight: 'bold'
                                    }}>CANCELAR</Text>
                                </Button>
                                <Button
                                    style={{
                                        backgroundColor: '#0064ED',
                                        borderRadius: 8,
                                        width: 120
                                    }}
                                    //onPress={props.submitModal}
                                >
                                    <Text style={{
                                        flex: 1,
                                        alignSelf: 'center',
                                        textAlign: 'center',
                                        ...generalStyles.alignRow,
                                        fontSize: 14,
                                        fontWeight: 'bold'
                                    }}>ACEPTAR</Text>
                                </Button>
                            </View>
                        </CardItem>
                    </Card>
                </ScrollView>
            </ImageBackground>
        </Modal>
    );
};

export default ModalForgotPassword;