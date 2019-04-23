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

const {width} = Dimensions.get('window');

const UserProfileView = props => {
    const {
        navigation,
        spinner
    } = props;
    return (
        <Container>
            <Spinner visible={spinner}/>
            <Header style={generalStyles.headerContainer}
                    androidStatusBarColor="#822120"
                    noShadow>
                <Left style={{flex: 1}}>
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
                    <TouchableOpacity style={generalStyles.columnCenteredContainer}>
                        <Image source={require('../assets/img/user-avatar.png')}
                               style={userProfileStyles.photo}
                        />
                        <Text style={userProfileStyles.photoText}>Cambiar foto de perfil</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={userProfileStyles.formContainer}>
                    <UserForm handleUserSubmit={props.handleUserSubmit}/>
                </ScrollView>
            </View>
        </Container>
    )
};

export default UserProfileView;