import React from 'react';
import ComplaintView from '../components/ComplaintView';
import {connect} from 'react-redux';
import {cleanUriAction, sendComplaintAction} from "../store/Actions";

class Complaint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoMessage: ''
        };
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (prevProps.uri !== this.props.uri) {
            if (this.props.uri) {
                this.setState({
                    videoMessage: 'Tu grabación está lista para ser enviada.'
                });
            } else {
                this.setState({
                    videoMessage: ''
                });
            }
        }
    }

    render() {
        const {
            navigation,
            userInfo,
            spinner
        } = this.props;
        return <ComplaintView navigation={navigation}
                              userInfo={userInfo}
                              spinner={spinner}
                              videoMessage={this.state.videoMessage}
                              handleSendComplaint={this.props.handleSendComplaint}
        />;
    }

    componentWillUnmount(): void {
        this.props.handleCleanUri();
    }
}

const mapDispatchToProps = dispatch => ({
    handleCleanUri: () => {
        dispatch(cleanUriAction());
    },
    handleSendComplaint: () => {
        dispatch(sendComplaintAction());
    }
});

const mapStateToProps = state => ({
    userInfo: state.userInfoReducer,
    uri: state.saveUriReducer,
    spinner: state.spinnerReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Complaint);