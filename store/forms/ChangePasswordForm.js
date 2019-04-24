import React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions, ScrollView
} from 'react-native';
import {
    Form,
    Item,
    Input,
    Button, CardItem, Card, Icon
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
        <Card style={{
            width: 300,
            ...generalStyles.cardBordered
        }}>
            <CardItem header
                      style={generalStyles.cardBordered}>
                <View style={generalStyles.columnCenteredContainer}>
                    <Icon type={'Ionicons'}
                          name={'lock'}
                          style={loginStyles.lockIcon}
                    />
                    <View style={{
                        marginTop: 15,
                        marginLeft: 10,
                        flex: 0,
                        alignSelf: 'flex-start',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start'
                    }}>
                        <Text style={{
                            fontSize: 14,
                            color: '#454F63',
                            fontWeight: '400',
                            textAlign: 'left',
                        }}>Cambie su contraseña</Text>
                    </View>
                </View>
            </CardItem>
            <CardItem>
                <Form style={{width: '100%', alignSelf: 'center', paddingLeft: 10, paddingRight: 10, height: 'auto'}}>
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
            </CardItem>
            <CardItem footer
                      style={generalStyles.cardBordered}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1
                }}>
                    <Button
                        style={{
                            backgroundColor: '#8F9EBC',
                            borderRadius: 10,
                            width: 120
                        }}
                        onPress={props.hideModalChangePassword}
                    >
                        <Text style={{
                            flex: 1,
                            alignSelf: 'center',
                            textAlign: 'center',
                            ...generalStyles.alignRow,
                            fontSize: 14,
                            fontFamily: 'UniSansBold',
                            color: '#fff'
                        }}>CANCELAR</Text>
                    </Button>
                    <Button
                        style={{
                            backgroundColor: '#0064ED',
                            borderRadius: 8,
                            width: 120
                        }}
                        onPress={props.handleSubmit(props.handleChangePassword)}
                    >
                        <Text style={{
                            flex: 1,
                            alignSelf: 'center',
                            textAlign: 'center',
                            ...generalStyles.alignRow,
                            fontSize: 14,
                            fontFamily: 'UniSansBold',
                            color: '#fff'
                        }}>ACEPTAR</Text>
                    </Button>
                </View>
            </CardItem>
        </Card>
    );
};

export default reduxForm({form: 'ChangePasswordForm'})(ChangePasswordForm);