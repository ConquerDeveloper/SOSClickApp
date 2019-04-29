import React from 'react';
import {
    Body,
    Button, CheckBox,
    Container, Header, Icon, Input, Item, Left, Right,
    Text, Title
} from "native-base";
import {
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
    View,
    Dimensions
} from "react-native";
import {generalStyles, securityNetworkStyles} from "../includes/styles";
import Spinner from "../includes/Spinner";

const {width} = Dimensions.get('window');

const RemoveSecurityNetworkView = props => {
    const {
        navigation,
        spinner,
        securityNetwork,
        isSelected
    } = props;
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
                    }}>Editar contactos</Title>
                </Body>
                <Right/>
            </Header>
            <View style={securityNetworkStyles.container}>
                <View>
                    <View style={securityNetworkStyles.logoContainer}>
                        <View style={generalStyles.columnCenteredContainer}>
                            <Image source={require('../assets/img/security-network-icon.png')}
                                   style={securityNetworkStyles.logo}
                            />
                        </View>
                    </View>
                    <Title style={securityNetworkStyles.title}>Red de seguridad</Title>
                    <Text style={securityNetworkStyles.subtitle}>Agregue los contactos que formarán{"\n"} parte de
                        su red de
                        seguridad</Text>
                </View>
                <ScrollView style={{
                    marginTop: 40
                }}>
                    <FlatList
                        data={securityNetwork}
                        extraData={isSelected}
                        renderItem={({item, index}) => {
                            const array = [{
                                id_seguridad: item.id,
                                nombre: `${item.nombre}`,
                                numero_telefono: item.numero_telefono
                            }];
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
                                    <CheckBox checked={isSelected[index] && isSelected[index].isSelected}
                                              onPress={() => props.handleSelected(array, index)}
                                              color={'#03E19C'}
                                              style={{
                                                  marginRight: 30,
                                                  marginBottom: 10
                                              }}
                                    />
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
                    <TouchableOpacity onPress={props.handleRemoveNetwork}
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
                            }}>Eliminar de mi red</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    )
};

export default RemoveSecurityNetworkView;