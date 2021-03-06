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
    Right,
    Item,
    Input,
    CheckBox
} from 'native-base';
import {
    Dimensions,
    Image,
    ScrollView,
    TouchableOpacity,
    View,
    FlatList
} from "react-native";
import Spinner from '../includes/Spinner';
import {
    generalStyles,
    securityNetworkStyles
} from "../includes/styles";

const {width} = Dimensions.get('window');

const SecurityNetworkView = props => {
    const {
        navigation,
        spinner,
        securityNetwork
    } = props;
    console.log('securityNetwork', securityNetwork);
    return (
        <Container>
            <Spinner visible={spinner}
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
                    }}>Red de seguridad</Title>
                </Body>
                <Right/>
            </Header>
            <View style={securityNetworkStyles.container}>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('RemoveSecurityNetworkScreen')}
                                      style={securityNetworkStyles.editButton}>
                        <View style={generalStyles.columnCenteredContainer}>
                            <Icon type={'Ionicons'}
                                  name={'create'}
                                  style={securityNetworkStyles.editIcon}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        ...securityNetworkStyles.logoContainer,
                        marginTop: 0
                    }}>
                        <View style={generalStyles.columnCenteredContainer}>
                            <Image source={require('../assets/img/security-network-icon.png')}
                                   style={securityNetworkStyles.logo}
                            />
                        </View>
                    </View>
                    <Title style={securityNetworkStyles.title}>Red de seguridad</Title>
                    <Text style={securityNetworkStyles.subtitle}>Agregue los contactos que formarán{"\n"} parte de su
                        red de
                        seguridad</Text>
                </View>
                <ScrollView style={{
                    marginTop: 40
                }}>
                    <FlatList
                        data={securityNetwork}
                        renderItem={({item, index}) => {
                            return (
                                <View key={index}
                                      style={{
                                          flexDirection: 'row',
                                          alignItems: 'center',
                                          justifyContent: 'space-between',
                                          borderBottomWidth: 1,
                                          borderBottomColor: '#E1E1E1',
                                          marginBottom: 10
                                      }}>
                                    <View style={{flexDirection: 'column'}}>
                                        <Text style={{
                                            marginLeft: 30,
                                            alignSelf: 'flex-start',
                                            fontFamily: 'UniSansRegular',
                                            color: '#606A75',
                                            fontSize: 17
                                        }}>{`${item.nombre}`}</Text>
                                        <Text note
                                              style={{
                                                  marginLeft: 30,
                                                  marginBottom: 10,
                                              }}>{item.numero_telefono}</Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </ScrollView>
                <View style={{
                    position: 'absolute',
                    bottom: 30,
                    left: 0,
                    right: 0,
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ContactsScreen')}
                                      style={{
                                          height: 53,
                                          width: 319,
                                          backgroundColor: '#D0282E',
                                          borderRadius: 4
                                      }}>
                        <View style={generalStyles.columnCenteredContainer}>
                            <Text style={{
                                fontFamily: 'UniSansRegular',
                                fontSize: 16,
                                textAlign: 'center',
                                color: '#fff'
                            }}>Agregar contactos</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    );
};

export default SecurityNetworkView;