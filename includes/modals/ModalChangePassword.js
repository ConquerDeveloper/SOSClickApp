import React from 'react';
import {
    Modal,
    View,
    KeyboardAvoidingView,
    ScrollView,
    Image
} from "react-native";
import {
    Text,
    Button,
    Item,
    Input,
    Card,
    CardItem,
    Body,
    Icon,
    Container
} from "native-base";
import {generalStyles, loginStyles} from "../../includes/styles";
import ChangePasswordForm from '../../store/forms/ChangePasswordForm';

const ModalChangePassword = props => {
    const {
        visible
    } = props;
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}>
            <Container style={loginStyles.loginContainer}>
                <KeyboardAvoidingView style={{flex: 1}}
                                      behavior={'padding'}>
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
                                        }}>Cambie su contraseña</Text>
                                    </View>
                                </View>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <ChangePasswordForm/>
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
                                        onPress={props.hideModalChangePassword}
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
                </KeyboardAvoidingView>
            </Container>
        </Modal>
    );
};

export default ModalChangePassword;