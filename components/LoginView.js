import React from 'react';
import {
    Image,
    ImageBackground,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    StatusBar
} from 'react-native';
import {
    Container,
    Text
} from 'native-base';
import {generalStyles, loginStyles} from "../includes/styles";
import LoginForm from '../store/forms/LoginForm';
import ModalForgotPassword from '../includes/modals/ModalForgotPassword';
import Spinner from '../includes/Spinner';

const LoginView = props => {
    const {
        navigation,
        isModalVisible,
        spinner
    } = props;
    return (
        <Container style={loginStyles.loginContainer}>
            <StatusBar backgroundColor={'#822120'}
                       barStyle={'light-content'}/>
            <Spinner visible={spinner}/>
            <ModalForgotPassword visible={isModalVisible}
                                 hideModal={props.hideModal}
            />
            <ImageBackground style={generalStyles.imageBackground}
                             source={require('../assets/img/login-background.png')}>
                <View style={generalStyles.columnCenteredContainer}>
                    <Image source={require('../assets/img/logo.png')}
                           style={loginStyles.logo}/>
                    <KeyboardAvoidingView style={{flex: 1}}
                                          behavior={'padding'}>
                        <LoginForm navigation={navigation}
                                   handleForgotModal={props.handleForgotModal}
                                   handleLogin={props.handleLogin}
                        />
                    </KeyboardAvoidingView>
                </View>
                <View style={[generalStyles.alignRow, {marginBottom: 20}]}>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                        <Text style={{
                            ...generalStyles.textWhite,
                            marginRight: 5,
                            ...loginStyles.createAccountText
                        }}>¿No tienes cuenta? <Text style={{
                            ...generalStyles.textWhite,
                            ...loginStyles.createAccountTextBold
                        }}>Crear cuenta</Text></Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </Container>
    )
};

export default LoginView;




/*

<Container style={loginStyles.loginContainer}>
    <StatusBar backgroundColor={'#822120'}
               barStyle={'light-content'}/>
    <Spinner visible={spinner}/>
    <ModalForgotPassword visible={isModalVisible}
                         hideModal={props.hideModal}
    />
    <ImageBackground style={generalStyles.imageBackground}
                     source={require('../assets/img/login-background.png')}>
        <View style={generalStyles.columnCenteredContainer}>
            <Image source={require('../assets/img/logo.png')}
                   style={loginStyles.logo}/>
            <KeyboardAvoidingView style={{flex: 1}}
                                  behavior={'padding'}>
                <LoginForm navigation={navigation}
                           handleForgotModal={props.handleForgotModal}
                           handleLogin={props.handleLogin}
                />
            </KeyboardAvoidingView>
        </View>
        <View style={[generalStyles.alignRow, {marginBottom: 20}]}>
            <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                <Text style={{
                    ...generalStyles.textWhite,
                    marginRight: 5,
                    ...loginStyles.createAccountText
                }}>¿No tienes cuenta? <Text style={{
                    ...generalStyles.textWhite,
                    ...loginStyles.createAccountTextBold
                }}>Crear cuenta</Text></Text>
            </TouchableOpacity>
        </View>
    </ImageBackground>
</Container>*/
