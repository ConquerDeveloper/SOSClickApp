import React from 'react';
import {
    View
} from 'react-native';
import {
    Text
} from 'native-base';
import {generalStyles} from "../includes/styles";

const PreviewVideoView = props => {
    const {
        uri
    } = props;
    return (
        <View style={generalStyles.columnCenteredContainer}>
            <Text>{`Hola mundo, ${uri}`}</Text>
        </View>
    )
};

export default PreviewVideoView;