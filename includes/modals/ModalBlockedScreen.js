import React from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import {generalStyles} from "../styles";

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
                ...StyleSheet.absoluteFillObject
            }} onStartShouldSetResponder={() => props.handleToggleBlock(false)}/>
        </Modal>
    )
};

export default ModalBlockedScreen;