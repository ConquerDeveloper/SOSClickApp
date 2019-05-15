import React from 'react';
import {
    Modal,
    View,
    StyleSheet,
    Dimensions
} from "react-native";
import {generalStyles} from "../styles";

const {height} = Dimensions.get('window');

const ModalBlockedScreen = props => {
    const {
        visible
    } = props;
    return (
        <Modal
            animationType="fade"
            transparent={false}
            visible={visible}>
            <View style={{
                backgroundColor: '#000',
                ...StyleSheet.absoluteFillObject,
                height
            }} onStartShouldSetResponder={() => props.handleToggleBlock(false)}/>
        </Modal>
    )
};

export default ModalBlockedScreen;