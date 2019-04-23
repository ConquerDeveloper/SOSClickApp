import React from 'react';
import {
    Text,
    Container,
    List,
    ListItem
} from 'native-base';
import {
    ScrollView,
    TouchableOpacity
} from "react-native";
import Spinner from '../includes/Spinner';
import {generalStyles} from "../includes/styles";

const SecurityNetworkView = props => {
    const {
        navigation,
        spinner
    } = props;
    return (
        <Container>
            <Spinner visible={spinner}/>
            <ScrollView contentContainerStyle={generalStyles.columnCenteredContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ContactsScreen')}>
                    <Text>Contactos</Text>
                </TouchableOpacity>
            </ScrollView>
        </Container>
    );
};

export default SecurityNetworkView;