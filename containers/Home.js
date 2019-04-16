import React from 'react';
import {connect} from 'react-redux';
import HomeView from '../components/HomeView';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navigation} = this.props;
        return <HomeView navigation={navigation}/>
    }
}

export default connect()(Home);