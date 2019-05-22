import React from 'react';
import {connect} from 'react-redux';
import {
    Body,
    Container,
    Header,
    Icon,
    Left,
    Right,
    Text
} from "native-base";
import {
    generalStyles,
    BroadcastingStyles
} from "../includes/styles";
import {
    TouchableOpacity,
    View,
    Image,
    PermissionsAndroid,
    Dimensions,
    StatusBar
} from "react-native";
import RNBambuserBroadcaster from 'react-native-bambuser-broadcaster';
import {
    saveBroadcastIdAction,
    broadcastStateAction,
    toggleBroadcastTutorialAction,
    toggleBlockScreenAction,
    toggleConfigurationModal
} from '../store/Actions';
import {
    NavigationActions,
    StackActions
} from "react-navigation";
import Firebase from 'react-native-firebase';
import Swiper from 'react-native-swiper';
import ModalBlockedScreen from '../includes/modals/ModalBlockedScreen';
import ModalConfigurationBroadcast from '../includes/modals/ModalConfigurationBroadcast';

const {width, height} = Dimensions.get('window');

class Broadcasting extends React.Component {
    constructor(props) {
        super(props);
        this.db = Firebase.database().ref('broadcasting');
    }

    async componentDidMount(): void {
        //StatusBar.setHidden(true);
        const checkPermissions = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (checkPermissions) {
            this.timer = setTimeout(this.startBroadcast, 1000);
        } else {
            this.requestCameraPermission();
        }
    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ]);
            console.log('granted1', granted['android.permission.CAMERA']);
            console.log('granted2', granted['android.permission.RECORD_AUDIO']);
            console.log('granted3', granted['android.permission.ACCESS_FINE_LOCATION']);
            if (granted['android.permission.CAMERA'] === 'granted'
                && granted['android.permission.RECORD_AUDIO'] === 'granted'
                && granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted') {
                this.timer = setTimeout(this.startBroadcast, 1000);
            } else {
                console.log('not granted');
            }
        } catch (err) {
            console.warn(err);
        }
    };

    stopBroadcast = () => {
        this.myBroadcasterRef.stopBroadcast();
    };

    startBroadcast = () => {
        this.myBroadcasterRef.startBroadcast();
    };

    render() {
        const {
            userInfo,
            broadcastState,
            isTutorialVisible,
            isModalBlockVisible,
            isConfigModalVisible
        } = this.props;
        return (
            <Container>

                <ModalBlockedScreen visible={isModalBlockVisible}
                                    handleToggleBlock={this.props.handleToggleBlock}
                />
                <ModalConfigurationBroadcast visible={isConfigModalVisible}
                                             handleToggleConfigurationModal={this.props.handleToggleConfigurationModal}/>
                <Header style={generalStyles.headerContainer}
                        androidStatusBarColor="#822120"
                        noShadow>
                    <Left/>
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
                                       audioQuality={RNBambuserBroadcaster.AUDIO_QUALITY.HIGH}
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
                                           navigator.geolocation.getCurrentPosition(position => {
                                               Firebase.database().ref(`broadcasting/${broadcastId}`).set({
                                                   broadcastId,
                                                   id,
                                                   nombre: `${nombre} ${primer_apellido}`,
                                                   longitud: position.coords.longitude,
                                                   latitud: position.coords.latitude
                                               });
                                           });
                                       }}
                                       onBroadcastStopped={() => {
                                           const {
                                               navigation,
                                               broadcastId
                                           } = this.props;
                                           Firebase.database().ref(`broadcasting/${broadcastId}`).remove();
                                           this.props.handleBroadcastState(false);
                                           const resetAction = StackActions.reset({
                                               index: 0,
                                               actions: [NavigationActions.navigate({routeName: 'WelcomeScreen'})],
                                           });
                                           navigation.dispatch(resetAction);
                                       }}
                />
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flexDirection: 'column',
                    flex: 1
                }}>
                    {
                        broadcastState && <View style={{
                            flexDirection: 'row',
                            marginBottom: 15
                        }}>
                            <Image source={require('../assets/img/live-broadcast-icon.png')}
                                   style={{width: 18, height: 18, marginTop: 2.5}}/>
                            <Text style={{
                                color: '#fff',
                                fontSize: 13,
                                fontFamily: 'Montserrat-Regular'
                            }}>Cámara en línea</Text>
                        </View>
                    }
                    {
                        !broadcastState && <View style={{
                            flexDirection: 'row',
                            marginBottom: 10
                        }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: 13
                            }}>Conectando, por favor espere...</Text>
                        </View>
                    }
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                        marginBottom: 20
                    }}>
                        <TouchableOpacity style={{marginRight: 40}}
                                          onPress={() => this.props.handleToggleConfigurationModal(true)}>
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
                        <TouchableOpacity onPress={() => this.props.handleToggleBlock(true)}>
                            <Image source={require('../assets/img/lock-icon.png')}
                                   style={BroadcastingStyles.configIcon}
                            />
                        </TouchableOpacity>
                    </View>


                    {
                        isTutorialVisible &&
                        <View style={{
                            backgroundColor: '#BE2F34',
                            height: '80%',
                            width
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#D0282E'
                            }}>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                }}/>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1,
                                    alignSelf: 'flex-start',
                                    marginVertical: 10
                                }}>
                                    <Text style={{
                                        fontFamily: 'UniSansRegular',
                                        color: '#fff',
                                        fontSize: 21,
                                        textAlign: 'center',
                                        whiteSpace: 'nowrap',
                                        width
                                    }}>Ahorro de energía</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => this.props.handleToggleBroadcastTutorial(!isTutorialVisible)}
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                        alignSelf: 'flex-start',
                                        marginTop: 10
                                    }}>
                                    <Icon type={'FontAwesome'}
                                          name={'angle-down'}
                                          style={{
                                              marginRight: 20,
                                              color: '#fff'
                                          }}
                                    />
                                </TouchableOpacity>


                            </View>
                            <View style={{
                                flex: 1,
                                flexWrap: 'wrap'
                            }}>
                                <Swiper showsButtons={false}
                                        ref={c => this.swiper = c}
                                        dotColor={'rgba(255, 255, 255, .6)'}
                                        activeDotColor={'#fff'}
                                        showsPagination={true}>
                                    <View style={{
                                        flex: 1,
                                        alignSelf: 'center',
                                        flexWrap: 'wrap'
                                    }}>
                                        <Image source={require('../assets/img/slide-2-broadcast.png')}
                                               style={{
                                                   width: 150,
                                                   resizeMode: 'contain',
                                                   height: 100,
                                                   flex: 1,
                                                   alignSelf: 'center'
                                               }}/>
                                        <View style={{
                                            paddingHorizontal: 20,
                                            marginBottom: 60
                                        }}>
                                            <Text style={{
                                                textAlign: 'center',
                                                color: '#fff',
                                                fontFamily: 'UniSansRegular',
                                                fontSize: 16
                                            }}>Enhorabuena por haber completado la configuración. Ahora es el momento de
                                                encontrarle un lugar a tu teléfono cámara. ¿Necesitas inspiración? ¡Mira
                                                nuestra sección "Acerca de"!</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        alignSelf: 'center',
                                        flexWrap: 'wrap'
                                    }}>
                                        <Image source={require('../assets/img/slide-3-broadcast.png')}
                                               style={{
                                                   width: 250,
                                                   resizeMode: 'contain',
                                                   height: 100,
                                                   flex: 1,
                                                   alignSelf: 'center'
                                               }}/>
                                        <View style={{
                                            paddingHorizontal: 30,
                                            marginBottom: 60
                                        }}>
                                            <Text style={{
                                                textAlign: 'center',
                                                color: '#fff',
                                                fontFamily: 'UniSansRegular',
                                                fontSize: 16
                                            }}>Si sólo tienes un dispositivo a mano, no olvides que también puedes ver
                                                la transmisión en directo desde tu ordenador. Ve a la interfaz en línea
                                                de SOS Click en <Text style={{
                                                    color: '#F7E921',
                                                    fontSize: 14
                                                }}>http://sosclick.cl</Text></Text>
                                        </View>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        alignSelf: 'center',
                                        flexWrap: 'wrap'
                                    }}>
                                        <Image source={require('../assets/img/slide-1-broadcast.png')}
                                               style={{
                                                   width: 300,
                                                   resizeMode: 'cover',
                                                   height: 100,
                                                   flex: 1,
                                                   alignSelf: 'center'
                                               }}/>
                                        <View style={{
                                            paddingHorizontal: 20,
                                            marginBottom: 60
                                        }}>
                                            <Text style={{
                                                textAlign: 'center',
                                                color: '#fff',
                                                fontFamily: 'UniSansRegular',
                                                fontSize: 16
                                            }}>No presiones la tecla inicio, ya que
                                                puedes apagar la cámara y el wifi. Toca sobre "Ahorrar energía" para
                                                atenuar
                                                y bloquear la pantalla.</Text>
                                        </View>
                                    </View>
                                </Swiper>
                            </View>
                        </View>

                    }

                    {
                        !isTutorialVisible &&
                        <View style={{
                            backgroundColor: '#D0282E',
                            height: 51,
                            width,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                            }}/>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                                alignSelf: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: 'UniSansRegular',
                                    color: '#fff',
                                    fontSize: 21,
                                    textAlign: 'center',
                                    whiteSpace: 'nowrap',
                                    width
                                }}>Ahorro de energía</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.props.handleToggleBroadcastTutorial(!isTutorialVisible)}
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center'
                                }}>
                                <Icon type={'FontAwesome'}
                                      name={'angle-up'}
                                      style={{
                                          marginRight: 20,
                                          color: '#fff'
                                      }}
                                />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </Container>
        );
    }

    componentWillUnmount(): void {
        //StatusBar.setHidden(false);
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
    },
    handleToggleBroadcastTutorial: bool => {
        dispatch(toggleBroadcastTutorialAction(bool));
    },
    handleToggleBlock: bool => {
        dispatch(toggleBlockScreenAction(bool));
    },
    handleToggleConfigurationModal: bool => {
        dispatch(toggleConfigurationModal(bool));
    }
});

const mapStateToProps = state => ({
    userInfo: state.userInfoReducer,
    broadcastId: state.broadcastReducer,
    broadcastState: state.broadcastStateReducer,
    isTutorialVisible: state.toggleBroadcastTutorialReducer,
    isModalBlockVisible: state.toggleModalBlockScreenReducer,
    isConfigModalVisible: state.toggleConfigurationModalReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Broadcasting);