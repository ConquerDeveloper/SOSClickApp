import React from 'react';
import {
    Modal,
    View,
    KeyboardAvoidingView,
    ScrollView,
    ImageBackground
} from "react-native";
import {
    Text,
    Button,
    Item,
    Input,
    Card,
    CardItem,
    Body,
    Icon,
    Container
} from "native-base";
import {generalStyles, loginStyles} from "../../includes/styles";
import ChangePasswordForm from '../../store/forms/ChangePasswordForm';

const ModalChangePassword = props => {
    const {
        visible
    } = props;
    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}>
            <ImageBackground source={require('../../assets/img/home-background.png')}
                             style={generalStyles.forgotPasswordBackground}>

                <ScrollView contentContainerStyle={generalStyles.columnCenteredContainer}>
                    <ChangePasswordForm hideModalChangePassword={props.hideModalChangePassword}
                                        handleChangePassword={props.handleChangePassword}
                    />
                </ScrollView>
            </ImageBackground>
        </Modal>
    );
};

export default ModalChangePassword;