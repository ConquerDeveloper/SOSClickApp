import React from 'react';
import {connect} from 'react-redux';
import SecurityNetworkView from '../components/SecurityNetworkView';

class SecurityNetwork extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            navigation,
            spinner
        } = this.props;
        return <SecurityNetworkView navigation={navigation}
                                    spinner={spinner}
        />
    }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
    spinner: state.spinnerReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(SecurityNetwork);