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
    }

    setRef = ref => {
        this.camera = ref;
    };

    recordVideo = async () => {
        const {
            navigation
        } = this.props;
        this.props.handleToggleRecord(true);
        const options = {quality: RNCamera.Constants.VideoQuality["480p"], maxDuration: 10};
        const data = await this.camera.recordAsync(options);
        console.log(data.uri);
        this.props.handleSaveVideoUri(data.uri);
        navigation.navigate('PreviewVideoScreen');
    };

    stopVideo = async () => {
        this.props.handleToggleRecord(false);
        await this.camera.stopRecording();
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