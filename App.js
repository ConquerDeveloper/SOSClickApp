import React from 'react';
import Routing from './routing/Routing';
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import Store from './store/Store';

//console.disableYellowBox = true;

export default class App extends React.Component {
    render() {
        return (
            <Root>
                <Provider store={Store}>
                    <Routing/>
                </Provider>
            </Root>
        );
    }
}