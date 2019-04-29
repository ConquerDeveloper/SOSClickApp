import React from 'react';
import {connect} from 'react-redux';
import RemoveSecurityNetworkView from '../components/RemoveSecurityNetworkView';
import {
    cleanSelectedAction,
    isSelectedRemove,
    toggleSelectedAction,
    removeNetworkAction, goBackAction
} from "../store/Actions";

class RemoveSecurityNetwork extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        this.props.handleSelectedRemove();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (prevProps.isGoBack !== this.props.isGoBack) {
            const {navigation} = this.props;
            navigation.goBack();
        }
    }

    render() {
        const {
            navigation,
            spinner,
            securityNetwork,
            isSelected
        } = this.props;
        return <RemoveSecurityNetworkView navigation={navigation}
                                          spinner={spinner}
                                          securityNetwork={securityNetwork}
                                          isSelected={isSelected}
                                          handleSelected={this.props.handleSelected}
                                          handleRemoveNetwork={this.props.handleRemoveNetwork}
        />
    }

    componentWillUnmount(): void {
        this.props.handleCleanSelected();
        this.props.handleGoBack(false);
    }
}

const mapDispatchToProps = dispatch => ({
    handleSelectedRemove: () => {
        dispatch(isSelectedRemove());
    },
    handleSelected: (array, index) => {
        dispatch(toggleSelectedAction(array, index));
    },
    handleCleanSelected: () => {
        dispatch(cleanSelectedAction());
    },
    handleRemoveNetwork: () => {
        dispatch(removeNetworkAction());
    },
    handleGoBack: bool => {
        dispatch(goBackAction(bool));
    }
});

const mapStateToProps = state => ({
    spinner: state.spinnerReducer,
    securityNetwork: state.securityNetworkReducer,
    isSelected: state.isSelectedReducer,
    isGoBack: state.goBackReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(RemoveSecurityNetwork);