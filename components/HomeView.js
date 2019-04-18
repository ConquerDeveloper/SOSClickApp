import React from 'react';
import {
    Dimensions,
    ImageBackground
} from 'react-native';
import {
    Text,
    Container, Left, Button, Icon, Body, Title, Right, Header
} from 'native-base';
import {generalStyles, homeStyles} from "../includes/styles";
import Spinner from '../includes/Spinner';

const {width} = Dimensions.get('window');

const HomeView = props => {
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
                            onPress={() => navigation.openDrawer()}>
                        <Icon name='menu'/>
                    </Button>
                </Left>
                <Body style={generalStyles.alignRow}>
                    <Title style={generalStyles.headerTitle}>SOS <Text
                        style={generalStyles.headerTitleLight}>Click</Text></Title>
                </Body>
                <Right/>
            </Header>
            <ImageBackground style={homeStyles.imageBackground}
                             source={require('../assets/img/home-background.png')}>
            </ImageBackground>
        </Container>
    )
};

export default HomeView;