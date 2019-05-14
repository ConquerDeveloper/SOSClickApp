import React from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
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
    Card,
    CardItem
} from 'native-base';
import {
    generalStyles,
    homeStyles
} from "../includes/styles";
import Spinner from '../includes/Spinner';
import Swiper from 'react-native-swiper';
import DialogCamera from '../includes/modals/DialogCamera';

const {width} = Dimensions.get('window');

const HomeView = props => {
    const {
        navigation,
        spinner,
        isCameraVisible
    } = props;
    return (
        <Container>
            <DialogCamera visible={isCameraVisible}
                          handleToggleCamera={props.handleToggleCamera}
                          navigation={navigation}
            />
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

            <View style={{
                flex: 1
            }}>
                <ImageBackground style={homeStyles.imageBackground}
                                 source={require('../assets/img/home-background.png')}>
                    <Swiper style={styles.wrapper}
                            showsButtons={false}
                            containerStyle={{
                                paddingLeft: 20,
                                paddingRight: 20
                            }}
                            paginationStyle={{
                                position: 'absolute',
                                bottom: 6
                            }}
                            activeDotStyle={{
                                backgroundColor: '#D0282E'
                            }}
                    >
                        <View>
                            <Image source={require('../assets/img/slide-1.png')}
                                   style={{
                                       width: '100%',
                                       height: '100%',
                                       resizeMode: 'cover'
                                   }}
                                /*  style={{
                                      width,
                                      height: 231,
                                      resizeMode: 'cover',
                                      alignSelf: 'center'
                                  }}*/
                            />
                        </View>
                        <View>
                            <Image source={require('../assets/img/slide-2.png')}
                                   style={{
                                       width: '100%',
                                       height: '100%',
                                       resizeMode: 'cover'
                                   }}
                                /* style={{
                                     width,
                                     height: 231,
                                     resizeMode: 'cover',
                                     alignSelf: 'center'
                                 }}*/
                            />
                        </View>
                    </Swiper>
                </ImageBackground>
                <View style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#F5F8FA'
                }}>
                    <TouchableOpacity onPress={() => props.handleToggleCamera(true)}
                                      style={{
                                          width: '100%',
                                          height: 53,
                                          backgroundColor: '#D0282E',
                                          borderRadius: 4,
                                          alignSelf: 'center',
                                      }}>
                        <View style={generalStyles.columnCenteredContainer}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../assets/img/switch-camera-icon.png')}
                                       style={{
                                           marginRight: 10,
                                           width: 13,
                                           height: 22
                                       }}
                                />
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontSize: 16,
                                    fontFamily: 'UniSansRegular'
                                }}>Cambiar teléfono a modo Cámara</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                    }}>
                        <TouchableOpacity style={{
                            width: 155,
                            height: 43,
                            backgroundColor: '#fff',
                            borderRadius: 4,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 3,
                        }}>
                            <View style={generalStyles.rowCenteredContainer}>
                                <Image source={require('../assets/img/dvr-cam-icon.png')}
                                       style={{
                                           width: 24,
                                           height: 24
                                       }}
                                />
                                <Text style={{
                                    fontFamily: 'UniSansRegular',
                                    color: '#92A0B1',
                                    fontSize: 14
                                }}>Nueva cámara DVR</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: 155,
                            height: 43,
                            backgroundColor: '#fff',
                            borderRadius: 4,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 3,
                        }}>
                            <View style={generalStyles.rowCenteredContainer}>
                                <Image source={require('../assets/img/cloud-play-icon.png')}
                                       style={{
                                           width: 24,
                                           height: 24,
                                           marginRight: 5
                                       }}
                                />
                                <Text style={{
                                    fontFamily: 'UniSansRegular',
                                    color: '#92A0B1',
                                    fontSize: 14
                                }}>Momentos</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginTop: 20
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                            <Title style={{
                                color: '#92A0B1',
                                fontFamily: 'UniSansRegular',
                                fontSize: 22,
                                textAlign: 'left'
                            }}>Cámaras</Title>
                            <Text style={{
                                fontFamily: 'UniSansRegular',
                                fontSize: 12,
                                color: '#D0282E',
                                marginLeft: 10
                            }}>8 activas</Text>
                        </View>


                        <ScrollView horizontal>
                            <Card style={{
                                width: 133,
                                height: 110,
                                borderRadius: 7
                            }}>
                                <CardItem style={{
                                    borderRadius: 7,
                                    paddingLeft: 0,
                                    paddingRight: 0
                                }}>
                                    <Left>
                                        <View style={{
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            flex: 1,
                                            justifyContent: 'flex-start',
                                            alignSelf: 'flex-start'
                                        }}>
                                            <Text style={{
                                                fontFamily: 'UniSansRegular',
                                                fontSize: 11,
                                                color: '#606A75',
                                                alignSelf: 'flex-start'
                                            }}>Sala 1</Text>
                                            <Text style={{
                                                fontSize: 7,
                                                fontFamily: 'UniSansRegular',
                                                color: '#92A0B1',
                                                alignSelf: 'flex-start'
                                            }}>Principal</Text>
                                        </View>
                                    </Left>
                                    <Right>
                                        <Icon type={'Ionicons'}
                                              name={'eye'}
                                              style={{
                                                  color: '#92A0B1',
                                                  fontSize: 11,
                                                  marginRight: 10
                                              }}
                                        />
                                    </Right>
                                </CardItem>
                                <CardItem cardBody
                                          style={{
                                              borderRadius: 7
                                          }}>
                                    <Image source={require('../assets/img/monitoring-test.jpg')}

                                    />
                                </CardItem>
                            </Card>
                            <Card style={{
                                width: 133,
                                height: 110,
                                borderRadius: 7
                            }}>
                                <CardItem style={{
                                    borderRadius: 7,
                                    paddingLeft: 0,
                                    paddingRight: 0
                                }}>
                                    <Left>
                                        <View style={{
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            flex: 1,
                                            justifyContent: 'flex-start',
                                            alignSelf: 'flex-start'
                                        }}>
                                            <Text style={{
                                                fontFamily: 'UniSansRegular',
                                                fontSize: 11,
                                                color: '#606A75',
                                                textAlign: 'left',
                                                alignSelf: 'flex-start'
                                            }}>Seleccionar</Text>
                                            <Text style={{
                                                fontSize: 7,
                                                fontFamily: 'UniSansRegular',
                                                color: '#92A0B1',
                                                alignSelf: 'flex-start'
                                            }}>Principal</Text>
                                        </View>
                                    </Left>
                                    <Right>
                                        <Icon type={'Ionicons'}
                                              name={'eye'}
                                              style={{
                                                  color: '#92A0B1',
                                                  fontSize: 11,
                                                  marginRight: 10
                                              }}
                                        />
                                    </Right>
                                </CardItem>
                                <CardItem cardBody
                                          style={{
                                              borderRadius: 7
                                          }}>
                                    <Image source={require('../assets/img/monitoring-test.jpg')}

                                    />
                                </CardItem>
                            </Card>
                            <Card style={{
                                width: 133,
                                height: 110,
                                borderRadius: 7
                            }}>
                                <CardItem style={{
                                    borderRadius: 7,
                                    paddingLeft: 0,
                                    paddingRight: 0
                                }}>
                                    <Left>
                                        <View style={{
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            flex: 1,
                                            justifyContent: 'flex-start',
                                            alignSelf: 'flex-start'
                                        }}>
                                            <Text style={{
                                                fontFamily: 'UniSansRegular',
                                                fontSize: 11,
                                                color: '#606A75',
                                                alignSelf: 'flex-start'
                                            }}>Seleccionar</Text>
                                            <Text style={{
                                                fontSize: 7,
                                                fontFamily: 'UniSansRegular',
                                                color: '#92A0B1',
                                                alignSelf: 'flex-start'
                                            }}>Principal</Text>
                                        </View>
                                    </Left>
                                    <Right>
                                        <Icon type={'Ionicons'}
                                              name={'eye'}
                                              style={{
                                                  color: '#92A0B1',
                                                  fontSize: 11,
                                                  marginRight: 10
                                              }}
                                        />
                                    </Right>
                                </CardItem>
                                <CardItem cardBody
                                          style={{
                                              borderRadius: 7
                                          }}>
                                    <Image source={require('../assets/img/monitoring-test.jpg')}

                                    />
                                </CardItem>
                            </Card>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Container>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        width: undefined,
        height: undefined,
        flex: 1,
        resizeMode: 'contain'
    },
    slide1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: 319,
        height: 181,
        alignSelf: 'center',
        position: 'relative',
        borderRadius: 10
    },
    slide2: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0282E',
        width: 319,
        height: 181,
        alignSelf: 'center',
        position: 'relative',
        borderRadius: 10
    },
    slide3: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D0282E',
        width: 319,
        height: 181,
        alignSelf: 'center',
        position: 'relative',
        borderRadius: 10
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});

export default HomeView;


{/*            <View style={{
                flex: 1
            }}>
                <ImageBackground style={homeStyles.imageBackground}
                                 source={require('../assets/img/home-background.png')}>
                    <Swiper style={styles.wrapper}
                            showsButtons={false}
                            paginationStyle={{
                                marginBottom: -20
                            }}
                            activeDotStyle={{
                                backgroundColor: '#D0282E'
                            }}
                    >
                        <View>
                            <Image source={require('../assets/img/slide-1.png')}
                                   style={{
                                       width,
                                       height: 231,
                                       resizeMode: 'cover',
                                       alignSelf: 'center'
                                   }}
                            />
                        </View>
                        <View>
                            <Image source={require('../assets/img/slide-2.png')}
                                   style={{
                                       width,
                                       height: 231,
                                       resizeMode: 'cover',
                                       alignSelf: 'center'
                                   }}
                            />
                        </View>
                    </Swiper>
                </ImageBackground>
                <View style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                    backgroundColor: '#F5F8FA'
                }}>
                    <TouchableOpacity style={{
                        width: '100%',
                        height: 53,
                        backgroundColor: '#D0282E',
                        borderRadius: 4,
                        alignSelf: 'center',
                    }}>
                        <View style={generalStyles.columnCenteredContainer}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../assets/img/switch-camera-icon.png')}
                                       style={{
                                           marginRight: 10,
                                           width: 13,
                                           height: 22
                                       }}
                                />
                                <Text style={{
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontSize: 16,
                                    fontFamily: 'UniSansRegular'
                                }}>Cambiar teléfono a modo Cámara</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                    }}>
                        <TouchableOpacity style={{
                            width: 155,
                            height: 43,
                            backgroundColor: '#fff',
                            borderRadius: 4,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 3,
                        }}>
                            <View style={generalStyles.rowCenteredContainer}>
                                <Image source={require('../assets/img/dvr-cam-icon.png')}
                                       style={{
                                           width: 24,
                                           height: 24
                                       }}
                                />
                                <Text style={{
                                    fontFamily: 'UniSansRegular',
                                    color: '#92A0B1',
                                    fontSize: 14
                                }}>Nueva cámara DVR</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: 155,
                            height: 43,
                            backgroundColor: '#fff',
                            borderRadius: 4,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 3,
                        }}>
                            <View style={generalStyles.rowCenteredContainer}>
                                <Image source={require('../assets/img/cloud-play-icon.png')}
                                       style={{
                                           width: 24,
                                           height: 24,
                                           marginRight: 5
                                       }}
                                />
                                <Text style={{
                                    fontFamily: 'UniSansRegular',
                                    color: '#92A0B1',
                                    fontSize: 14
                                }}>Momentos</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        marginTop: 20
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                        }}>
                            <Title style={{
                                color: '#92A0B1',
                                fontFamily: 'UniSansRegular',
                                fontSize: 22,
                                textAlign: 'left'
                            }}>Cámaras</Title>
                            <Text style={{
                                fontFamily: 'UniSansRegular',
                                fontSize: 12,
                                color: '#D0282E',
                                marginLeft: 10
                            }}>8 activas</Text>
                        </View>


                        <ScrollView horizontal>
                            <Card style={{
                                width: 133,
                                height: 110,
                                borderRadius: 7
                            }}>
                                <CardItem style={{
                                    borderRadius: 7,
                                    paddingLeft: 0,
                                    paddingRight: 0
                                }}>
                                    <Left>
                                        <View style={{
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            flex: 1,
                                            justifyContent: 'flex-start',
                                            alignSelf: 'flex-start'
                                        }}>
                                            <Text style={{
                                                fontFamily: 'UniSansRegular',
                                                fontSize: 11,
                                                color: '#606A75',
                                                alignSelf: 'flex-start'
                                            }}>Sala 1</Text>
                                            <Text style={{
                                                fontSize: 7,
                                                fontFamily: 'UniSansRegular',
                                                color: '#92A0B1',
                                                alignSelf: 'flex-start'
                                            }}>Principal</Text>
                                        </View>
                                    </Left>
                                    <Right>
                                        <Icon type={'Ionicons'}
                                              name={'eye'}
                                              style={{
                                                  color: '#92A0B1',
                                                  fontSize: 11,
                                                  marginRight: 10
                                              }}
                                        />
                                    </Right>
                                </CardItem>
                                <CardItem cardBody
                                style={{
                                    borderRadius: 7
                                }}>
                                    <Image source={require('../assets/img/monitoring-test.jpg')}

                                    />
                                </CardItem>
                            </Card>
                            <Card style={{
                                width: 133,
                                height: 110,
                                borderRadius: 7
                            }}>
                                <CardItem style={{
                                    borderRadius: 7,
                                    paddingLeft: 0,
                                    paddingRight: 0
                                }}>
                                    <Left>
                                        <View style={{
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            flex: 1,
                                            justifyContent: 'flex-start',
                                            alignSelf: 'flex-start'
                                        }}>
                                            <Text style={{
                                                fontFamily: 'UniSansRegular',
                                                fontSize: 11,
                                                color: '#606A75',
                                                textAlign: 'left',
                                                alignSelf: 'flex-start'
                                            }}>Seleccionar</Text>
                                            <Text style={{
                                                fontSize: 7,
                                                fontFamily: 'UniSansRegular',
                                                color: '#92A0B1',
                                                alignSelf: 'flex-start'
                                            }}>Principal</Text>
                                        </View>
                                    </Left>
                                    <Right>
                                        <Icon type={'Ionicons'}
                                              name={'eye'}
                                              style={{
                                                  color: '#92A0B1',
                                                  fontSize: 11,
                                                  marginRight: 10
                                              }}
                                        />
                                    </Right>
                                </CardItem>
                                <CardItem cardBody
                                          style={{
                                              borderRadius: 7
                                          }}>
                                    <Image source={require('../assets/img/monitoring-test.jpg')}

                                    />
                                </CardItem>
                            </Card>
                            <Card style={{
                                width: 133,
                                height: 110,
                                borderRadius: 7
                            }}>
                                <CardItem style={{
                                    borderRadius: 7,
                                    paddingLeft: 0,
                                    paddingRight: 0
                                }}>
                                    <Left>
                                        <View style={{
                                            flexDirection: 'column',
                                            alignItems: 'flex-start',
                                            flex: 1,
                                            justifyContent: 'flex-start',
                                            alignSelf: 'flex-start'
                                        }}>
                                            <Text style={{
                                                fontFamily: 'UniSansRegular',
                                                fontSize: 11,
                                                color: '#606A75',
                                                alignSelf: 'flex-start'
                                            }}>Seleccionar</Text>
                                            <Text style={{
                                                fontSize: 7,
                                                fontFamily: 'UniSansRegular',
                                                color: '#92A0B1',
                                                alignSelf: 'flex-start'
                                            }}>Principal</Text>
                                        </View>
                                    </Left>
                                    <Right>
                                        <Icon type={'Ionicons'}
                                              name={'eye'}
                                              style={{
                                                  color: '#92A0B1',
                                                  fontSize: 11,
                                                  marginRight: 10
                                              }}
                                        />
                                    </Right>
                                </CardItem>
                                <CardItem cardBody
                                          style={{
                                              borderRadius: 7
                                          }}>
                                    <Image source={require('../assets/img/monitoring-test.jpg')}

                                    />
                                </CardItem>
                            </Card>
                        </ScrollView>
                    </View>
                </View>
            </View>*/
}