import React from 'react';
import {connect} from 'react-redux';
import {Body, Button, Container, Header, Icon, Left, Right, Text} from "native-base";
import {generalStyles, BroadcastingStyles} from "../includes/styles";
import {TouchableOpacity, View, Image} from "react-native";
import RNBambuserBroadcaster from 'react-native-bambuser-broadcaster';
import {
    saveBroadcastIdAction,
    broadcastStateAction
} from '../store/Actions';
import {NavigationActions, StackActions} from "react-navigation";
import Firebase from 'react-native-firebase';


class Broadcasting extends React.Component {
    constructor(props) {
        super(props);
        this.db = Firebase.database().ref('broadcasting');
    }

    componentDidMount(): void {
        this.timer = setTimeout(() => {
            this.myBroadcasterRef.startBroadcast();
        }, 1000);
    }

    stopBroadcast = () => {
        const {
            navigation,
            broadcastId
        } = this.props;
        Firebase.database().ref(`broadcasting/${broadcastId}`).remove();
        this.myBroadcasterRef.stopBroadcast();
        this.props.handleBroadcastState(false);
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'WelcomeScreen'})],
        });
        navigation.dispatch(resetAction);
    };

    startBroadcast = () => {
        this.myBroadcasterRef.startBroadcast();
    };

    render() {
        const {
            userInfo,
            broadcastState,
            navigation
        } = this.props;
        return (
            <Container>
                <Header style={generalStyles.headerContainer}
                        androidStatusBarColor="#822120"
                        noShadow>
                    <Left>
                        <Button transparent>
                            <Icon type={'Ionicons'}
                                  name={'menu'}
                                  style={{
                                      color: '#fff'
                                  }}
                            />
                        </Button>
                    </Left>
                    <Body/>
                    <Right>
                        <TouchableOpacity style={BroadcastingStyles.disconnect}
                                          onPress={this.stopBroadcast}>
                            <View style={generalStyles.columnCenteredContainer}>
                                <Text style={BroadcastingStyles.disconnectText}>Desconectar</Text>
                            </View>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <RNBambuserBroadcaster ref={ref => {
                    this.myBroadcasterRef = ref;
                }} applicationId={'AEI3qY0EhtPUWiyg28UV3A'}
                                       title={`${userInfo.usuario.nombre}`}
                                       style={BroadcastingStyles.bambuserContainer}
                                       onBroadcastStarted={() => this.props.handleBroadcastState(true)}
                                       onBroadcastIdReceived={broadcastId => {
                                           this.props.handleBroadcastId(broadcastId);
                                           const {
                                               userInfo: {
                                                   usuario: {
                                                       nombre,
                                                       primer_apellido,
                                                       id
                                                   }
                                               }
                                           } = this.props;
                                           Firebase.database().ref(`broadcasting/${broadcastId}`).set({
                                               broadcastId,
                                               id,
                                               nombre: `${nombre} ${primer_apellido}`
                                           });
                                       }}
                />
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flexDirection: 'column',
                    marginBottom: 30,
                    flex: 1
                }}>
                    {
                        broadcastState && <View style={{
                            flexDirection: 'row',
                            marginBottom: 10
                        }}>
                            <Image source={require('../assets/img/live-broadcast-icon.png')}
                                   style={{width: 18, height: 18, marginTop: 4}}/>
                            <Text style={generalStyles.textWhite}>Cárama en línea</Text>
                        </View>
                    }
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        alignSelf: 'center'
                    }}>
                        <TouchableOpacity style={{marginRight: 40}}>
                            <Image source={require('../assets/img/config-icon.png')}
                                   style={BroadcastingStyles.configIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.myBroadcasterRef.switchCamera()}
                                          style={{marginRight: 40}}>
                            <Image source={require('../assets/img/switch-camera-broadcast.png')}
                                   style={BroadcastingStyles.configIcon}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('../assets/img/lock-icon.png')}
                                   style={BroadcastingStyles.configIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        );
    }

    componentWillUnmount(): void {
        this.props.handleBroadcastState(false);
        clearTimeout(this.timer);
    }
}

const mapDispatchToProps = dispatch => ({
    handleBroadcastId: broadcastId => {
        dispatch(saveBroadcastIdAction(broadcastId));
    },
    handleBroadcastState: bool => {
        dispatch(broadcastStateAction(bool));
    }
});

const mapStateToProps = state => ({
    userInfo: state.userInfoReducer,
    broadcastId: state.broadcastReducer,
    broadcastState: state.broadcastStateReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Broadcasting);