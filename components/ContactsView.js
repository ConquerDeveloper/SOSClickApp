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
    List,
    ListItem,
    CheckBox
} from 'native-base';
import {
    Image,
    Dimensions,
    View,
    ScrollView
} from "react-native";
import Spinner from '../includes/Spinner';
import {generalStyles, securityNetworkStyles} from "../includes/styles";

const {width} = Dimensions.get('window');

const ContactsView = props => {
    const {
        navigation,
        contacts,
        spinner
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
                    }}>Red de seguridad</Title>
                </Body>
                <Right/>
            </Header>
            <View style={securityNetworkStyles.container}>
                <View style={securityNetworkStyles.logoContainer}>
                    <View style={generalStyles.columnCenteredContainer}>
                        <Image source={require('../assets/img/security-network-icon.png')}
                               style={securityNetworkStyles.logo}
                        />
                    </View>
                </View>
                <Title style={securityNetworkStyles.title}>Red de seguridad</Title>
                <Text style={securityNetworkStyles.subtitle}>Agregue los contactos que formarán{"\n"} parte de su red de
                    seguridad</Text>
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
                            //onChangeText={props.searchContact}
                            //value={props.searchValue}
                               placeholderTextColor='rgba(59, 85, 117, .6)'
                               style={{fontSize: 16, fontFamily: 'UniSansRegular'}}
                        />
                    </Item>
                </View>
                <ScrollView>
                    <List style={securityNetworkStyles.listContacts}>
                        {
                            contacts.length > 0 && contacts.map((item, index) => {
                                return (
                                    <ListItem key={index}
                                              icon
                                              style={{marginLeft: 0}}>
                                        <Body>
                                            <Text style={{marginLeft: 20}}>{item.givenName}</Text>
                                        </Body>
                                        <Right>
                                            <CheckBox checked={true}
                                                      color={'green'}/>
                                        </Right>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </ScrollView>
            </View>
        </Container>
    );
};

export default ContactsView;