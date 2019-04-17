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
    Text, Icon, Button
} from 'native-base';
import {connect} from 'react-redux';
import {generalStyles, menuStyles} from "./styles";
import {StackActions, NavigationActions} from "react-navigation";

const {width} = Dimensions.get('window');

const CustomDrawerContentComponent = props => {
    const {
        userInfo
    } = props;
    return (
        <Container style={{flex: 1, backgroundColor: '#F5F8FA'}}>
            <View style={menuStyles.menuHeader}>
                <View style={generalStyles.columnCenteredContainer}>
                    <Image source={require('../assets/img/user-avatar.png')}
                           style={menuStyles.avatar}/>
                    <Title style={menuStyles.username}>{userInfo && `${userInfo.name}`}</Title>
                    <Text style={menuStyles.email}>{userInfo && `${userInfo.email}`}</Text>
                </View>
            </View>
            <TouchableOpacity style={{paddingHorizontal: 20, paddingVertical: 25}}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Image source={require('../assets/img/hd-icon.png')}
                           style={{
                               height: 28,
                               width: 28
                           }}/>
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
                        }}>Consigue calidad HD</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
                    <Text style={{
                        textAlign: 'center',
                        color: '#92A0B1',
                        fontFamily: 'UniSansRegular',
                        fontSize: 13
                    }}>Cerrar sesión</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

const mapStateToProps = state => ({
    userInfo: state.userInfoReducer
});

export default connect(mapStateToProps)(CustomDrawerContentComponent);