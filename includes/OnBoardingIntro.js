import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import {
    Button,
    Icon
} from "native-base";
import {
    Image
} from 'react-native';
import {generalStyles} from "../includes/styles";

export default class OnBoardingIntro extends React.Component {
    constructor(props) {
        super(props);
        console.warn('props', this.props);
    }

    Ok = props => {
        return (
            <Button transparent
                    {...props}
                    style={{
                        marginLeft: 'auto',
                        marginRight: 10
                    }}>
                <Icon type='Ionicons'
                      name='md-checkmark' style={{
                    color: '#fff'
                }}/>
            </Button>
        );
    };

    render() {
        return (
            <Onboarding
                nextLabel='Siguiente'
                skipLabel='Saltar'
                DoneButtonComponent={this.Ok}
                imageContainerStyles={{
                    paddingBottom: 0,
                    backgroundColor: '#D0282E',
                    width: 286,
                    height: 495,
                    borderRadius: 10,
                    alignSelf: 'center',
                    ...generalStyles.columnCenteredContainer,
                    flex: 0,
                    paddingLeft: 10,
                    paddingRight: 10
                }}
                containerStyles={{
                    backgroundColor: '#B7282D'
                }}
                titleStyles={{
                    position: 'relative',
                    top: -450,
                    fontSize: 25,
                    fontFamily: 'UniSansSemiBold'
                }}
                subTitleStyles={{
                    position: 'relative',
                    top: -150,
                    fontSize: 16,
                    width: 250,
                    height: undefined,
                    fontFamily: 'UniSansRegular'
                }}
                pages={[
                    {
                        backgroundColor: '#B7282D',
                        image: <Image
                            style={{
                                width: 222,
                                height: 206
                            }}
                            source={require('../assets/img/onbrd-1.png')}/>,
                        title: 'Monitoreo web',
                        subtitle: 'Si sólo tienes un dispositivo a mano, también podrás ver tus cámaras en directo desde tu ordenador.',
                    },
                    {
                        backgroundColor: '#B7282D',
                        image: <Image
                            style={{
                                width: 176,
                                height: 216
                            }}
                            source={require('../assets/img/onbrd-2.png')}/>,
                        title: 'Cámaras SOS Phone',
                        subtitle: 'Convierte cualquier smartphone en una cámara de seguridad, y manten monitoreando cada momento.',
                    },
                    {
                        backgroundColor: '#B7282D',
                        image: <Image
                            style={{
                                width: 176,
                                height: 176
                            }}
                            source={require('../assets/img/onbrd-3.png')}/>,
                        title: 'Red de Seguridad',
                        subtitle: 'Convierte cualquier smartphone en una cámara de seguridad, y manten monitoreando cada momento.',
                    }
                ]}
                onDone={() => this.props.navigation.navigate('WelcomeScreen')}
                onSkip={() => this.props.navigation.navigate('WelcomeScreen')}
            />

        );
    }
}