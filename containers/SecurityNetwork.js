import React from 'react';
import {connect} from 'react-redux';
import SecurityNetworkView from '../components/SecurityNetworkView';
import {
    loadSecurityNetworkAction
} from '../store/Actions';

class SecurityNetwork extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        this.props.handleSecurityNetwork();
    }

    render() {
        const {
            navigation,
            spinner,
            securityNetwork
        } = this.props;
        return <SecurityNetworkView navigation={navigation}
                                    spinner={spinner}
                                    securityNetwork={securityNetwork}
        />
    }
}

const mapDispatchToProps = dispatch => ({
    handleSecurityNetwork: () => {
        dispatch(loadSecurityNetworkAction());
    }
});

const mapStateToProps = state => ({
    spinner: state.spinnerReducer,
    securityNetwork: state.securityNetworkReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(SecurityNetwork);