import React from 'react';
import {connect} from 'react-redux';
import PreviewVideoView from '../components/PreviewVideoView';

class PreviewVideo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            navigation,
            uri
        } = this.props;
        return <PreviewVideoView navigation={navigation}
                                 uri={uri}
        />
    }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
    uri: state.saveUriReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewVideo);