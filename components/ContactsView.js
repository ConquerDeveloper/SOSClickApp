import React from 'react';
import {
    Text,
    Container,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Right,
    Header,
    Item,
    Input,
    CheckBox
} from 'native-base';
import {
    Image,
    Dimensions,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList
} from "react-native";
import Spinner from '../includes/Spinner';
import {
    generalStyles,
    securityNetworkStyles
} from "../includes/styles";

const {width} = Dimensions.get('window');

const ContactsView = props => {
    const {
        navigation,
        contacts,
        spinner,
        isSelected,
        showHeader
    } = props;
    contacts.sort(function (a, b) {
        if (`${a.givenName} ${a.familyName}` < `${b.givenName} ${b.familyName}`) {
            return -1;
        }
        if (`${a.givenName} ${a.familyName}` > `${b.givenName} ${b.familyName}`) {
            return 1;
        }
        return 0;
    });
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
                    }}>Mis contactos</Title>
                </Body>
                <Right/>
            </Header>
            <View style={securityNetworkStyles.container}>
                {
                    showHeader &&
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
                }
                <View style={{
                    paddingLeft: 20,
                    paddingRight: 20
                }}>
                    <Item regular
                          style={{
                              ...generalStyles.inputContainer,
                              marginTop: 30,
                              borderWidth: 1,
                              borderColor: '#fff',
                              alignSelf: 'center',
                              shadowColor: "#000",
                              shadowOffset: {
                                  width: 0,
                                  height: 2,
                              },
                              shadowOpacity: 0.15,
                              shadowRadius: 2.84,
                              elevation: 2,
                          }}>
                        <Image source={require('../assets/img/search-icon.png')}
                               style={securityNetworkStyles.searchIcon}
                        />
                        <Input placeholder={'Buscar'}
                               autoCorrect={false}
                               lightTheme
                               round
                               onChangeText={props.searchContact}
                               value={props.textFilter}
                               placeholderTextColor='rgba(59, 85, 117, .6)'
                               style={{fontSize: 16, fontFamily: 'UniSansRegular'}}
                        />
                    </Item>
                </View>
                <ScrollView style={{
                    marginTop: 20
                }}>
                    <FlatList
                        data={contacts}
                        initialNumToRender={10}
                        extraData={isSelected}
                        renderItem={({item, index}) => {
                            if (item.phoneNumbers.length > 0 && item.givenName !== "") {
                                const array = [{
                                    nombre: `${item.givenName}`,
                                    numero_telefono: item.phoneNumbers[0].number.replace('+56', '').replace(/\s/g, '').toString()
                                }];
                                return (
                                    <View style={{
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
                                            }}>{`${item.givenName}`}</Text>
                                            <Text note
                                                  style={{
                                                      marginLeft: 30,
                                                      marginBottom: 10,
                                                  }}>{item.phoneNumbers[0].number}</Text>
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
                            }
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
                    <TouchableOpacity onPress={props.handleAddToNetwork}
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
                            }}>Agregar a mi red</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Container>
    );
};

export default ContactsView;