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


const ComplaintView = props => {
    const {
        navigation,
        userInfo
    } = props;
    console.warn('userInfo', userInfo);
    return (
        <Container>
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
                <TouchableOpacity style={ComplaintStyles.recordButton}
                                  onPress={() => navigation.navigate('ComplaintCameraScreen')}
                >
                    <Text style={ComplaintStyles.buttonText}>Grabar denuncia (opcional)</Text>
                </TouchableOpacity>
                <Textarea rowSpan={5}
                          bordered
                          placeholder="Escribe tu denuncia"
                          placeholderTextColor={'#454F63'}
                          style={ComplaintStyles.textArea}
                />
                <TouchableOpacity style={ComplaintStyles.sendButton}>
                    <Text style={ComplaintStyles.sendText}>ENVIAR</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
};

export default ComplaintView;