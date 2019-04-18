import {
    Button,
    FooterTab,
    Footer,
    Icon,
    Text
} from "native-base";
import React from "react";
import {
    Image
} from 'react-native';
import {footerStyles} from '../includes/styles';

const FooterView = props => {
    const {
        navigation
    } = props;
    return (
        <Footer>
            <FooterTab style={footerStyles.background}>
                <Button vertical
                        onPress={() => navigation.navigate('WelcomeScreen')}>
                    <Icon name="home"
                          style={footerStyles.icon}
                    />
                    <Text style={footerStyles.footerText}>INICIO</Text>
                </Button>
                <Button vertical
                        onPress={() => navigation.navigate('BroadcastScreen')}>
                    <Image source={require('../assets/img/broadcast-icon.png')}
                           style={footerStyles.iconImg}/>
                    <Text style={footerStyles.footerText}>TRANSMITIR</Text>
                </Button>
                <Button vertical>
                    <Image source={require('../assets/img/monitor-icon.png')}
                           style={footerStyles.iconImg}/>
                    <Text style={footerStyles.footerText}>MONITOR</Text>
                </Button>
                <Button vertical>
                    <Image source={require('../assets/img/notif-icon.png')}
                           style={footerStyles.iconImg}/>
                    <Text style={footerStyles.footerText}>NOTIF.</Text>
                </Button>
            </FooterTab>
        </Footer>
    )
};

export default FooterView;
