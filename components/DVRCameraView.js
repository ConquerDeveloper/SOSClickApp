import React from 'react';
import {
    Body,
    Container,
    Header,
    Left,
    Right,
    Text,
    Button,
    Icon
} from "native-base";
import {VlcSimplePlayer} from "react-native-yz-vlcplayer";
import Orientation from "react-native-orientation";
import {
    DVRStyles,
    generalStyles
} from "../includes/styles";
import {
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import DialogAlert from '../includes/modals/DialogAlert';
import Spinner from '../includes/Spinner';

const DVRCameraView = props => {
    const {
        navigation,
        isAlertDialogVisible,
        spinner
    } = props;
    return (
        <Container style={{backgroundColor: '#000'}}>
            <Spinner visible={spinner}/>
            <DialogAlert visible={isAlertDialogVisible}
                         handleSendAlert={props.handleSendAlert}
                         handleAlertDialog={props.handleAlertDialog}
            />
            <Header style={generalStyles.headerContainer}
                    androidStatusBarColor="#822120"
                    noShadow>
                <Left style={{flex: 1}}>
                    <Button transparent
                            onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'}/>
                    </Button>
                </Left>
                <Body style={{flex: 1}}>
                    <Text style={{
                        alignSelf: 'center',
                        fontFamily: 'UniSansBold',
                        color: '#fff'
                    }}>SOS <Text style={{
                        fontFamily: 'UniSansLight',
                        color: '#fff'
                    }}>Click</Text></Text>
                </Body>
                <Right style={{flex: 1}}/>
            </Header>
            <View style={generalStyles.columnCenteredContainer}>
                <VlcSimplePlayer
                    style={DVRStyles.camera}
                    url={"rtsp://admin:caco0458@190.196.70.170:554/onvif1"}
                    autoplay={true}
                    Orientation={Orientation}
                    onStartFullScreen={this.onStartFullScreen}
                    onCloseFullScreen={this.onCloseFullScreen}
                />
            </View>
            <TouchableOpacity onPress={() => props.handleAlertDialog(true)}
                              style={{
                                  alignItems: 'center',
                                  justifyContent: 'flex-end',
                              }}>
                <Image source={require('../assets/img/alert-btn.png')}
                       style={{
                           width: 150,
                           height: 150
                       }}
                />
            </TouchableOpacity>
        </Container>
    )
};

export default DVRCameraView;