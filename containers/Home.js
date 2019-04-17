import React from 'react';
import {connect} from 'react-redux';
import HomeView from '../components/HomeView';
import {
    userInfoAction
} from '../store/Actions';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(): void {
        this.props.handleUserInfo();
    }

    render() {
        const {
            navigation,
            spinner
        } = this.props;
        return <HomeView navigation={navigation}
                         spinner={spinner}
        />
    }
}

const mapDispatchToProps = dispatch => ({
    handleUserInfo: () => {
        dispatch(userInfoAction());
    }
});

const mapStateToProps = state => ({
    isAuthenticated: state.isAuthenticatedReducer,
    spinner: state.spinnerReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);