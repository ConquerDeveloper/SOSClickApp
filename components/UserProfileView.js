import React from 'react';
import {
    Text,
    Container,
    Header,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Right
} from 'native-base';
import {
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {
    generalStyles,
    userProfileStyles
} from "../includes/styles";
import UserForm from '../store/forms/UserForm';
import Spinner from '../includes/Spinner';
import ActionSheet from 'react-native-actionsheet';
import ModalChangePassword from '../includes/modals/ModalChangePassword';

const {width} = Dimensions.get('window');

const UserProfileView = props => {
    const {
        navigation,
        spinner,
        userPhoto,
        isModalVisible
    } = props;
    return (
        <Container>
            <Spinner visible={spinner}/>
            <ModalChangePassword visible={isModalVisible}
                                 hideModalChangePassword={props.hideModalChangePassword}
                                 handleChangePassword={props.handleChangePassword}
            />
            <ActionSheet
                ref={o => this.ActionSheet = o}
                title={'Cambiar foto de perfil'}
                options={['Abrir cámara', 'Abrir galería', 'Cancelar']}
                cancelButtonIndex={2}
                destructiveButtonIndex={2}
                onPress={(index) => {
                    if (index === 1) {
                        props.handleOpenGallery('gallery');
                    }
                    if (index === 0) {
                        props.handleOpenGallery('camera');
                    }
                }}
            />
            <Header style={generalStyles.headerContainer}
                    androidStatusBarColor="#822120"
                    noShadow>
                <Left style={{flex: 1, zIndex: 9999}}>
                    <Button transparent
                            onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back'/>
                    </Button>
                </Left>
                <Body style={generalStyles.alignRow}>
                    <Title style={{
                        ...generalStyles.headerTitle,
                        width,
                        fontFamily: 'UniSansRegular'
                    }}>Mi perfil</Title>
                </Body>
                <Right/>
            </Header>
            <View style={{flex: 1}}>
                <View style={userProfileStyles.header}>
                    <TouchableOpacity style={generalStyles.columnCenteredContainer}
                                      onPress={() => this.ActionSheet.show()}>
                        {
                            userPhoto && <Image source={{uri: userPhoto}}
                                                style={userProfileStyles.photo}
                            />
                        }
                        {
                            !userPhoto && <Image source={require('../assets/img/user-avatar.png')}
                                                 style={userProfileStyles.photo}
                            />
                        }
                        <Text style={userProfileStyles.photoText}>Cambiar foto de perfil</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={userProfileStyles.formContainer}>
                    <UserForm handleUserSubmit={props.handleUserSubmit}
                              openModalChangePassword={props.openModalChangePassword}
                    />
                </ScrollView>
            </View>
        </Container>
    )
};

export default UserProfileView;