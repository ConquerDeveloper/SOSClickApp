import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity, KeyboardAvoidingView,
} from 'react-native';
import {
    Form,
    Item,
    Input,
    Button
} from 'native-base';
import {Field, reduxForm} from 'redux-form';
import {loginStyles, generalStyles} from "../../includes/styles";

const formField = props => {
    return (
        <View>
            <Item style={loginStyles.input}>
                {
                    props.input.name === 'email' && <Image source={require('../../assets/img/user-input.png')}
                                                     style={loginStyles.inputIcon}/>
                }
                {
                    props.input.name === 'password' && <Image source={require('../../assets/img/password-input.png')}
                                                        style={loginStyles.inputIcon}/>
                }
                <Input placeholder={props.placeholder}
                       placeholderTextColor={'#fff'}
                       style={{
                           fontSize: 14,
                           color: '#fff',
                           fontFamily: 'UniSansRegular'
                       }}
                       autoCapitalize={props.autocapitalize}
                       onChangeText={props.input.onChange}
                       keyboardType={props.keyboardtype}
                       secureTextEntry={props.secure}
                       value={props.input.value}
                />
            </Item>
        </View>
    );
};

const LoginForm = props => {
    const {navigation} = props;
    return (
        <Form style={loginStyles.signInForm}>
            <Field name='email'
                   placeholder='Correo electrónico'
                   autocapitalize='none'
                   keyboardtype='email-address'
                   inputName={'emailField'}
                   component={formField}
            />
            <Field name='password'
                   placeholder='Contraseña'
                   autocapitalize='none'
                   secure={true}
                   inputName={'emailField'}
                   component={formField}
            />
            <Button block
                    rounded
                    full
                    transparent
                    title={'Entrar'}
                    onPress={props.handleSubmit(props.handleLogin)}
                    style={loginStyles.signInButton}
            >
                <Text style={loginStyles.signInText}>Entrar</Text>
            </Button>
            <TouchableOpacity onPress={props.handleForgotModal}>
                <Text style={{
                    ...generalStyles.textWhite,
                    ...generalStyles.textCenter,
                    ...loginStyles.forgotPasswordText
                }}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </Form>
    );
};

export default reduxForm({form: 'LoginForm'})(LoginForm);