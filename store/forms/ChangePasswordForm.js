import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {
    Form,
    Item,
    Input,
    Button, CardItem
} from 'native-base';
import {Field, reduxForm} from 'redux-form';
import {
    loginStyles,
    generalStyles,
    signUpStyles
} from "../../includes/styles";

const {width} = Dimensions.get('window');

const formField = props => {
    return (
        <View>
            <Text style={{
                fontSize: 12,
                color: '#3B5575',
                fontWeight: '600',
                marginBottom: 5,
                marginLeft: 10
            }}>{props.placeholder}</Text>
            <Item style={generalStyles.inputContainer}
                  regular>
                <Input placeholder={props.placeholder}
                       placeholderTextColor={'#fff'}
                       style={{
                           fontSize: 14,
                           color: '#3B5575',
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

const ChangePasswordForm = props => {
    const {navigation} = props;
    return (
        <Form style={{width: '100%', alignSelf: 'center', paddingLeft: 10, paddingRight: 10}}>
            <Field name='password'
                   placeholder='Nueva contraseña'
                   autocapitalize='none'
                   secure={true}
                   component={formField}
            />
            <Field name='password_confirmation'
                   placeholder='Repita nueva contraseña'
                   autocapitalize='none'
                   secure={true}
                   component={formField}
            />
        </Form>
    );
};

export default reduxForm({form: 'ChangePasswordForm'})(ChangePasswordForm);