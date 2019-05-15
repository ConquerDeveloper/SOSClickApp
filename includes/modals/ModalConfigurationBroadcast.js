import React from 'react';
import {
    Modal,
    Dimensions,
    View,
    Switch,
    StatusBar
} from "react-native";
import {
    Header,
    Left,
    Right,
    Icon,
    Body,
    Title,
    Button,
    Text,
    Container
} from 'native-base';

const {width, height} = Dimensions.get('window');

const ModalConfigurationBroadcast = props => {
    const {
        visible
    } = props;
    return (
        <Modal
            animationType="slide"
            visible={visible}>
            <Container style={{
                height,
                width,
                backgroundColor: '#F9FCFF'
            }}>
                <Header style={{
                    backgroundColor: '#D0282E'
                }}>
                    <Left style={{flex: 1, zIndex: 9999}}>
                        <Button transparent
                                onPress={() => props.handleToggleConfigurationModal(false)}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body style={{flex: 1}}>
                        <Title style={{
                            width,
                            alignSelf: 'center',
                            fontFamily: 'UniSansRegular',
                            fontSize: 19
                        }}>Ajustes de la cámara</Title>
                    </Body>
                    <Right style={{flex: 1}}/>
                </Header>
                <View style={{
                    flex: 1,
                    marginTop: 50,
                    paddingHorizontal: 20
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}>
                        <View style={{
                            flexDirection: 'column'
                        }}>
                            <Text style={{
                                fontFamily: 'UniSansRegular',
                                fontSize: 20,
                                color: '#606A75'
                            }}>Audio de la cámara</Text>
                            <Text note
                                  style={{
                                      fontFamily: 'UniSansRegular',
                                      fontSize: 12,
                                      color: '#92A0B1'
                                  }}>Activar / Desactivar sonido de la cámara</Text>
                        </View>
                        <Switch value={true}/>
                    </View>
                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(96,106,117, .3)',
                        marginVertical: 20,
                        width: '100%'
                    }}/>


                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}>
                        <View style={{
                            flexDirection: 'column'
                        }}>
                            <Text style={{
                                fontFamily: 'UniSansRegular',
                                fontSize: 20,
                                color: '#606A75'
                            }}>Zoom de la cámara</Text>
                            <Text note
                                  style={{
                                      fontFamily: 'UniSansRegular',
                                      fontSize: 12,
                                      color: '#92A0B1'
                                  }}>Activar / Desactivar zoom de la cámara</Text>
                        </View>
                        <Switch value={true}/>
                    </View>
                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(96,106,117, .3)',
                        marginVertical: 20,
                        width: '100%'
                    }}/>


                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}>
                        <View style={{
                            flexDirection: 'column'
                        }}>
                            <Text style={{
                                fontFamily: 'UniSansRegular',
                                fontSize: 20,
                                color: '#606A75'
                            }}>Bloqueo con contraseña</Text>
                            <Text note
                                  style={{
                                      fontFamily: 'UniSansRegular',
                                      fontSize: 12,
                                      color: '#92A0B1'
                                  }}>Activar / Desactivar bloqueo con contraseña</Text>
                        </View>
                        <Switch value={true}/>
                    </View>
                    <View style={{
                        height: 1,
                        backgroundColor: 'rgba(96,106,117, .3)',
                        marginVertical: 20,
                        width: '100%'
                    }}/>
                </View>
            </Container>
        </Modal>
    )
};

export default ModalConfigurationBroadcast;