import React from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    Title,
    Text,
    Container,
    Header,
    Left,
    Button,
    Icon,
    Body,
    Right,
    Textarea
} from 'native-base';
import {
    Dimensions
} from 'react-native';
import {
    generalStyles,
    ComplaintStyles
} from "../includes/styles";
import Spinner from '../includes/Spinner';
import DialogConfirmation from '../includes/modals/DialogConfirmation';

const {width} = Dimensions.get('window');


const ComplaintView = props => {
    const {
        navigation,
        spinner,
        complaint,
        isDialogVisible
    } = props;
    return (
        <Container style={{
            backgroundColor: '#F5F8FA',

        }}>
            <DialogConfirmation visible={isDialogVisible}
                                handleToggleDialogConfirmation={props.handleToggleDialogConfirmation}
            />
            <Spinner visible={spinner}/>
            <Header style={generalStyles.headerContainer}
                    androidStatusBarColor="#822120"
                    noShadow>
                <Left style={{flex: 1}}>
                    <Button transparent
                            onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back'/>
                    </Button>
                </Left>
                <Body style={{flex: 1}}>
                    <Title style={{width, alignSelf: 'center'}}>Red de seguridad</Title>
                </Body>
                <Right style={{flex: 1}}/>
            </Header>
            <View style={{
                ...generalStyles.columnCenteredContainer,
                paddingHorizontal: 20
            }}>
                <View style={{
                    width: 116,
                    height: 116,
                    borderRadius: 116 / 2,
                    backgroundColor: '#fff'
                }}>
                    <View style={generalStyles.columnCenteredContainer}>
                        <Image source={require('../assets/img/complaint-icon.png')}
                               style={{
                                   width: 71,
                                   height: 64,
                                   marginTop: -10
                               }}
                        />
                    </View>
                </View>
                <Text style={{
                    fontSize: 24,
                    color: '#606A75',
                    marginTop: 10,
                    fontFamily: 'UniSansRegular'
                }}>Video Denuncia</Text>
                <Text style={{
                    fontFamily: 'UniSansRegular',
                    fontSize: 14,
                    color: '#92A0B1',
                    textAlign: 'center',
                    marginVertical: 10
                }}>Escribe o graba una denuncia y la enviaremos a un centro de seguridad para poder asistirte.</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ComplaintCameraScreen')}
                                  style={{
                                      backgroundColor: '#D0282E',
                                      paddingVertical: 20,
                                      paddingHorizontal: 20,
                                      borderRadius: 30,
                                      marginTop: 10
                                  }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image source={require('../assets/img/play-icon.png')}
                               style={{
                                   width: 15,
                                   height: 21,
                                   marginRight: 10
                               }}
                        />
                        <Text style={{
                            color: '#fff',
                            fontFamily: 'UniSansRegular',
                            fontSize: 16
                        }}>Grabar Denuncia</Text>
                    </View>
                </TouchableOpacity>
                <View style={{
                    height: 1,
                    backgroundColor: 'rgba(0, 0, 0, .1)',
                    width: 300,
                    marginVertical: 25
                }}/>

                <Text style={{
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                    fontSize: 14,
                    color: '#606A75',
                    fontFamily: 'UniSansRegular'
                }}>Escribe tu denuncia</Text>
                <Textarea rowSpan={5}
                          bordered
                          placeholder="Mensaje"
                          placeholderTextColor={'#92A0B1'}
                          style={ComplaintStyles.textArea}
                          value={complaint}
                          onChangeText={props.handleTextChange}
                />
                <TouchableOpacity style={ComplaintStyles.sendButton}
                                  onPress={props.handleSendComplaint}>
                    <Text style={ComplaintStyles.sendText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
};

export default ComplaintView;


{/*            <Header style={generalStyles.headerContainer}
                    androidStatusBarColor="#822120"
                    noShadow>
                <Left>
                    <Button transparent
                            onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back'/>
                    </Button>
                </Left>
                <Body/>
                <Right/>
            </Header>
            <View style={ComplaintStyles.container}>
                <Image source={{uri: userInfo.usuario.foto_perfil}}
                       style={ComplaintStyles.profilePic}/>
                <Text
                    style={ComplaintStyles.headerTitle}>{`Escribe o graba una denuncia y la enviaremos a un centro de seguridad para poder asistirte.`}</Text>
                {
                    !videoMessage ?
                        <TouchableOpacity style={ComplaintStyles.recordButton}
                                          onPress={() => navigation.navigate('ComplaintCameraScreen')}
                        >
                            <Text style={ComplaintStyles.buttonText}>Grabar denuncia (opcional)</Text>
                        </TouchableOpacity> :
                        <View>
                            <Text style={{
                                textAlign: 'center',
                                color: '#92A0B1',
                                fontFamily: 'UniSansRegular',
                                fontSize: 14,
                                marginTop: 10
                            }}>{`${videoMessage}`}</Text>
                        </View>
                }
                <Textarea rowSpan={5}
                          bordered
                          placeholder="Escribe tu denuncia"
                          placeholderTextColor={'#92A0B1'}
                          style={ComplaintStyles.textArea}
                          value={complaint}
                          onChangeText={props.handleTextChange}
                />
                <TouchableOpacity style={ComplaintStyles.sendButton}
                                  onPress={props.handleSendComplaint}>
                    <Text style={ComplaintStyles.sendText}>ENVIAR</Text>
                </TouchableOpacity>
            </View>*/
}