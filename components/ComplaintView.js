import React from 'react';
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import {
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
    generalStyles,
    ComplaintStyles
} from "../includes/styles";
import Spinner from '../includes/Spinner';


const ComplaintView = props => {
    const {
        navigation,
        userInfo,
        videoMessage,
        spinner
    } = props;
    return (
        <Container>
            <Spinner visible={spinner}/>
            <Header style={generalStyles.headerContainer}
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
                />
                <TouchableOpacity style={ComplaintStyles.sendButton}
                                  onPress={props.handleSendComplaint}>
                    <Text style={ComplaintStyles.sendText}>ENVIAR</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
};

export default ComplaintView;