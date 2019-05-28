import React from 'react';
import ComplaintView from '../components/ComplaintView';
import {connect} from 'react-redux';
import {
    cleanUriAction,
    sendComplaintAction, showDialogConfirmationAction
} from "../store/Actions";

class Complaint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoMessage: '',
            complaint: ''
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
            spinner,
            isDialogVisible
        } = this.props;
        return <ComplaintView navigation={navigation}
                              userInfo={userInfo}
                              spinner={spinner}
                              videoMessage={this.state.videoMessage}
                              complaint={this.state.complaint}
                              handleSendComplaint={() => this.props.handleSendComplaint(this.state.complaint)}
                              handleTextChange={complaint => this.setState({complaint})}
                              isDialogVisible={isDialogVisible}
                              handleToggleDialogConfirmation={this.props.handleToggleDialogConfirmation}
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
    handleSendComplaint: complaint => {
        dispatch(sendComplaintAction(complaint));
    },
    handleToggleDialogConfirmation: bool => {
        dispatch(showDialogConfirmationAction(bool));
    }
});

const mapStateToProps = state => ({
    userInfo: state.userInfoReducer,
    uri: state.saveUriReducer,
    spinner: state.spinnerReducer,
    isDialogVisible: state.toggleDialogConfirmationReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Complaint);