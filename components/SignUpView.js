import React from 'react';
import {
    Button,
    Container,
    Icon
} from 'native-base';
import {
    generalStyles,
    loginStyles
} from "../includes/styles";
import {
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    View
} from "react-native";
import SignUpForm from '../store/forms/SignUpForm';
import Spinner from '../includes/Spinner';

const SignUpView = props => {
    const {
        navigation,
        spinner
    } = props;
    return (
        <Container style={loginStyles.loginContainer}>
            <Spinner visible={spinner}/>
            <ImageBackground style={generalStyles.imageBackground}
                             source={require('../assets/img/login-background.png')}>
                <Button transparent
                        style={{
                            position: 'absolute',
                            top: 20,
                            zIndex: 99999
                        }}
                        onPress={() => navigation.goBack()}>
                    <Icon type={'Ionicons'}
                          style={{color: '#fff'}}
                          name={'md-arrow-back'}/>
                </Button>
                <View style={generalStyles.columnCenteredContainer}>
                    <Image source={require('../assets/img/logo.png')}
                           style={loginStyles.logo}/>
                    <KeyboardAvoidingView style={{flex: 1}}
                                          behavior={'padding'}>
                        <SignUpForm navigation={navigation}
                                    handleSignUp={props.handleSignUp}
                        />
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
        </Container>
    )
};

export default SignUpView;