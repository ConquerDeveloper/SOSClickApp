import React from 'react';
import {
    Image,
    ImageBackground,
    View
} from 'react-native';
import {
    Container,
    Form,
    Item,
    Label,
    Input,
    Button,
    Text
} from 'native-base';
import {generalStyles, loginStyles} from "../includes/styles";

const LoginView = props => {
    return (
        <Container style={loginStyles.loginContainer}>
            <ImageBackground style={generalStyles.imageBackground}
                             source={require('../assets/img/login-background.png')}>
                <View style={generalStyles.columnCenteredContainer}>
                    <Image source={require('../assets/img/logo.png')}
                           style={loginStyles.logo}/>
                    <Form style={loginStyles.signInForm}>
                        <Item floatingLabel>
                            <Label style={loginStyles.inputLabel}>Correo electrónico</Label>
                            <Input/>
                        </Item>
                        <Item floatingLabel>
                            <Label style={loginStyles.inputLabel}>Contraseña</Label>
                            <Input/>
                        </Item>
                        <Button block
                                rounded
                                full
                                transparent
                                title={'Entrar'}
                                style={loginStyles.signInButton}
                        >
                            <Text style={loginStyles.signInText}>Entrar</Text>
                        </Button>
                    </Form>
                </View>
            </ImageBackground>
        </Container>
    )
};

export default LoginView;