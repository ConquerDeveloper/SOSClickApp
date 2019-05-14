import React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {
    Container,
    Title,
    Text,
    Icon,
} from 'native-base';
import {connect} from 'react-redux';
import {generalStyles, menuStyles} from "./styles";
import {StackActions, NavigationActions} from "react-navigation";

const {width} = Dimensions.get('window');

const CustomDrawerContentComponent = props => {
    const {
        userInfo,
        navigation,
        userPhoto
    } = props;
    return (
        <Container style={{
            backgroundColor: '#F5F8FA'
        }}>
            <View style={{
                backgroundColor: '#D0282E',
                flex: 1,
                flexWrap: 'wrap'
            }}>
                <View style={generalStyles.columnCenteredContainer}>
                    {
                        userPhoto && <Image source={{uri: userPhoto}}
                                            style={menuStyles.avatar}/>
                    }
                    {
                        !userPhoto && <Image source={require('../assets/img/user-avatar.png')}
                                             style={menuStyles.avatar}/>
                    }
                    <Title style={menuStyles.username}>{userInfo && `${userInfo.usuario.nombre}`}</Title>
                    <Text style={menuStyles.email}>{userInfo && `${userInfo.usuario.email}`}</Text>
                </View>
                <View style={{
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0, 0, 0, .2)',
                    height: 5
                }}/>
            </View>
            <View style={{
                flex: 1
            }}>
                <TouchableOpacity style={{paddingHorizontal: 20, paddingTop: 25}}
                                  onPress={() => navigation.navigate('UserProfileScreen')}
                >
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Icon type={'Ionicons'}
                              name={'person'}
                              style={{
                                  fontSize: 22,
                                  color: '#92A0B1'
                              }}
                        />
                        <View style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row',
                            flex: 1,
                            marginLeft: 30
                        }}>
                            <Text style={{
                                fontSize: 14,
                                color: '#92A0B1',
                                fontFamily: 'UniSansRegular'
                            }}>Mi perfil</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingHorizontal: 20, marginTop: 15}}
                                  onPress={() => navigation.navigate('SecurityNetworkScreen')}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Image source={require('../assets/img/network-menu-icon.png')}
                               style={{
                                   width: 28,
                                   height: 28,
                                   marginLeft: -5
                               }}
                        />
                        <View style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row',
                            flex: 1,
                            marginLeft: 20
                        }}>
                            <Text style={{
                                fontSize: 14,
                                color: '#92A0B1',
                                fontFamily: 'UniSansRegular'
                            }}>Red de seguridad</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-end',
                alignSelf: 'center',
                marginBottom: 20,
            }}>
                <TouchableOpacity onPress={() => {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'logOutScreen'})],
                    });
                    props.navigation.dispatch(resetAction);
                }}
                                  style={{
                                      width: 258,
                                      height: 40,
                                      backgroundColor: '#fff',
                                      borderRadius: 6,
                                      padding: 10,
                                      shadowColor: "#000",
                                      shadowOffset: {
                                          width: 1,
                                          height: 1,
                                      },
                                      shadowOpacity: 0.25,
                                      shadowRadius: 3.84,

                                      elevation: 1,
                                  }}>
                    <View style={generalStyles.rowCenteredContainer}>
                        <Image source={require('../assets/img/signout-icon.png')}
                               style={{
                                   width: 13,
                                   height: 15,
                                   marginRight: 10
                               }}
                        />
                        <Text style={{
                            textAlign: 'center',
                            color: '#92A0B1',
                            fontFamily: 'UniSansRegular',
                            fontSize: 13
                        }}>Cerrar sesión</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

const mapStateToProps = state => ({
    userInfo: state.userInfoReducer,
    userPhoto: state.userPhotoReducer
});

export default connect(mapStateToProps)(CustomDrawerContentComponent);