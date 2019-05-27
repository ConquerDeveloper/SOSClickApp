import React from 'react';
import {connect} from 'react-redux';
import ComplaintCameraView from '../components/ComplaintCameraView';
import {RNCamera} from 'react-native-camera';
import {
    toggleRecordAction,
    saveUriAction
} from "../store/Actions";

class ComplaintCamera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countdown: '05:00'
        };
        this.countdown = null;
    }

    setRef = ref => {
        this.camera = ref;
    };

    recordVideo = async () => {
        this.startTimer(60 * 5, this.countdown);
        const {
            navigation
        } = this.props;
        this.props.handleToggleRecord(true);
        const options = {quality: RNCamera.Constants.VideoQuality["480p"], maxDuration: 5000};
        const data = await this.camera.recordAsync(options);
        console.log(data.uri);
        if (data.uri) {
            this.setState({countdown: '05:00'});
            this.props.handleSaveVideoUri(data.uri);
            navigation.navigate('PreviewVideoScreen');
        }
    };

    stopVideo = async () => {
        this.props.handleToggleRecord(false);
        await this.camera.stopRecording();
        clearTimeout(this.timer);
    };

    startTimer = (duration, display) => {
        let timer = duration, minutes, seconds;
        this.timer = setInterval(() => {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display = `${minutes}:${seconds}`;

            console.log('display', display);

            this.setState({countdown: display});

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    };

    render() {
        const {
            navigation,
            isRecording
        } = this.props;
        return <ComplaintCameraView navigation={navigation}
                                    setRef={this.setRef}
                                    recordVideo={this.recordVideo}
                                    stopVideo={this.stopVideo}
                                    isRecording={isRecording}
                                    startTimer={this.startTimer}
                                    countdown={this.state.countdown}
        />
    }
}

const mapDispatchToProps = dispatch => ({
    handleToggleRecord: bool => {
        dispatch(toggleRecordAction(bool));
    },
    handleSaveVideoUri: uri => {
        dispatch(saveUriAction(uri));
    }
});

const mapStateToProps = state => ({
    isRecording: state.isRecordingReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintCamera);