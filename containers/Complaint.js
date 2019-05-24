import React from 'react';
import ComplaintView from '../components/ComplaintView';
import {connect} from 'react-redux';

class Complaint extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            navigation,
            userInfo
        } = this.props;
        return <ComplaintView navigation={navigation}
                              userInfo={userInfo}
        />;
    }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
    userInfo: state.userInfoReducer
});

export default connect(mapStateToProps, mapDispatchToProps)(Complaint);