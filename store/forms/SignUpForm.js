import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import {
    Form,
    Item,
    Input,
    Button
} from 'native-base';
import {Field, reduxForm} from 'redux-form';
import {
    loginStyles,
    generalStyles,
    signUpStyles
} from "../../includes/styles";

const formField = props => {
    return (
        <View>
            <Item style={loginStyles.input}>
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

const SignUpForm = props => {
    const {navigation} = props;
    return (
        <Form style={signUpStyles.signUpForm}>
            <Field name='nombre'
                   placeholder='Nombre'
                   autocapitalize='words'
                   component={formField}
            />
            <Field name='email'
                   placeholder='Correo electrónico'
                   autocapitalize='none'
                   keyboardtype='email-address'
                   component={formField}
            />
            <Field name='password'
                   placeholder='Contraseña'
                   autocapitalize='none'
                   secure={true}
                   component={formField}
            />
            <Field name='password_confirmation'
                   placeholder='Verificar contraseña'
                   autocapitalize='none'
                   secure={true}
                   component={formField}
            />
            <Button block
                    rounded
                    full
                    transparent
                    title={'Registrar'}
                    onPress={props.handleSubmit(props.handleSignUp)}
                    style={loginStyles.signInButton}
            >
                <Text style={loginStyles.signInText}>Registrar</Text>
            </Button>
        </Form>
    );
};

export default reduxForm({form: 'SignUpForm'})(SignUpForm);