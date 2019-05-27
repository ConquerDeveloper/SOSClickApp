import React from 'react';
import {connect} from 'react-redux';
import PreviewVideoView from '../components/PreviewVideoView';
import {
    cleanUriAction
} from "../store/Actions";

class PreviewVideo extends React.Component {
    constructor(props) {
        super(props);
    }

    handleRedoVideo = () => {
        const {
            navigation
        } = this.props;
        this.props.handleCleanUri();
        navigation.goBack();
    };

    render() {
        const {
            navigation,
            uri,
            spinner
        } = this.props;
        return <PreviewVideoView navigation={navigation}
                                 uri={uri}
                                 spinner={spinner}
                                 handleRedoVideo={this.handleRedoVideo}
        />
    }
}

const mapDispatchToProps = dispatch => ({
    handleCleanUri: () => {
        dispatch(cleanUriAction());
    }
});

const mapStateToProps = state => ({
    uri: state.saveUriReducer,
    spinner: state.spinnerReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewVideo);