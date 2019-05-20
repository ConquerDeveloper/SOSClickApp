import React from 'react';
import {connect} from 'react-redux';
import { VLCPlayer, VlcSimplePlayer } from 'react-native-yz-vlcplayer';
import Orientation from 'react-native-orientation';
import {
    Container
} from 'native-base';


class DVRCamera extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <VlcSimplePlayer
                    style={{width:'100%'}}
                    url={"rtsp://admin:camdie00@190.196.70.170:554/onvif1"}
                    Orientation={Orientation}
                    onStartFullScreen={this.onStartFullScreen}
                    onCloseFullScreen={this.onCloseFullScreen}
                />
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DVRCamera);