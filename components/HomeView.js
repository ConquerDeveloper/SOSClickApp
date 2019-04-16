import React from 'react';
import {
    View
} from 'react-native';
import {
    Text
} from 'native-base';
import {generalStyles} from "../includes/styles";

const HomeView = props => {
    return (
        <View style={generalStyles.columnCenteredContainer}>
            <Text>Hola mundo</Text>
        </View>
    )
};

export default HomeView;