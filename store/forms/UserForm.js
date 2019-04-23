import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {
    Form,
    Item,
    Input,
    Button,
    Text,
    Icon
} from 'native-base';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import {
    loginStyles,
    generalStyles,
    signUpStyles
} from "../../includes/styles";
import {connect} from 'react-redux';

const {width} = Dimensions.get('window');

const formField = props => {
    return (
        <View>
            <Text style={generalStyles.label}>{props.placeholder}</Text>
            <Item style={generalStyles.inputContainer}
                  regular>
                <Input placeholder={props.placeholder}
                       placeholderTextColor={'#fff'}
                       style={{
                           fontSize: 14,
                           color: '#454F63',
                           fontFamily: 'UniSansRegular'
                       }}
                       autoCapitalize={props.autocapitalize}
                       onChangeText={props.input.onChange}
                       keyboardType={props.keyboardType}
                       secureTextEntry={props.secure}
                       value={`${props.input.value}`}
                />
            </Item>
        </View>
    );
};

let UserForm = props => {
    const {navigation} = props;
    return (
        <Form style={{width, alignSelf: 'center', paddingLeft: 20, paddingRight: 20, paddingBottom: 20}}>
            <Field name='nombre'
                   placeholder='Nombre'
                   autocapitalize='words'
                   component={formField}
            />
            <Field name='primer_apellido'
                   placeholder='Primer apellido'
                   autocapitalize='words'
                   component={formField}
            />
            <Field name='segundo_apellido'
                   placeholder='Segundo apellido'
                   autocapitalize='words'
                   component={formField}
            />
            <Field name='email'
                   placeholder='Correo electrónico'
                   autocapitalize='none'
                   keyboardtype='email-address'
                   component={formField}
            />
            <Field name='telefono_fijo'
                   placeholder='Teléfono fijo'
                   autocapitalize='none'
                   keyboardType={'numeric'}
                   component={formField}
            />
            <Field name='telefono_movil'
                   placeholder='Teléfono móvil'
                   autocapitalize='none'
                   keyboardType={'numeric'}
                   component={formField}
            />
            <Field name='direccion'
                   placeholder='Dirección'
                   autocapitalize='words'
                   component={formField}
            />
            <Text style={generalStyles.label}>Contraseña</Text>
            <TouchableOpacity onPress={props.openModalChangePassword}
                style={{
                height: 40,
                borderRadius: 5,
                backgroundColor: '#F6F8FA'
            }}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flex: 1,
                    marginRight: 10,
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: 'UniSansRegular',
                        fontSize: 14,
                        color: '#454F63',
                        marginRight: 10
                    }}>Editar contraseña</Text>
                    <Icon type={'Ionicons'}
                          name={'arrow-forward'}
                          style={{
                              fontSize: 14,
                              color: '#454F63'
                          }}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.handleSubmit(props.handleUserSubmit)}
                style={{
                    width: 182,
                    height: 41,
                    borderWidth: 1,
                    borderRadius: 13,
                    borderColor: 'rgba(59,85,117, .4)',
                    marginTop: 20,
                    alignSelf: 'center'
                }}>
                <View style={generalStyles.columnCenteredContainer}>
                    <Text style={{
                        fontSize: 14,
                        fontFamily: 'UniSansRegular',
                        color: '#3B5575'
                    }}>APLICAR CAMBIOS</Text>
                </View>
            </TouchableOpacity>
        </Form>
    );
};

UserForm = reduxForm({form: 'UserForm', enableReinitialize: true})(UserForm);

const selector = formValueSelector('UserForm');
UserForm = connect(
    state => {
        return {
            initialValues: state.userInfoReducer.usuario
        }
    }
)(UserForm);

export default UserForm;