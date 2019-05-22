import React from 'react';
import {connect} from 'react-redux';
import DVRCameraView from '../components/DVRCameraView';
import {
    toggleAlertDialogAction,
    sendAlertAction
} from "../store/Actions";


class DVRCamera extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            navigation,
            isAlertDialogVisible,
            spinner
        } = this.props;
        return (
            <DVRCameraView navigation={navigation}
                           isAlertDialogVisible={isAlertDialogVisible}
                           spinner={spinner}
                           handleSendAlert={this.props.handleSendAlert}
                           handleAlertDialog={this.props.handleAlertDialog}
            />
        )
    }

    componentWillUnmount(): void {
        this.props.handleAlertDialog(false);
    }
}

const mapDispatchToProps = dispatch => ({
    handleAlertDialog: bool => {
        dispatch(toggleAlertDialogAction(bool))
    },
    handleSendAlert: () => {
        dispatch(sendAlertAction());
    }
});

const mapStateToProps = state => ({
    isAlertDialogVisible: state.toggleAlertDialogReducer,
    spinner: state.spinnerReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(DVRCamera);