import React from 'react';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createDrawerNavigator
} from 'react-navigation';
import Login from '../containers/Login';



/*const MyDrawerNavigator = createDrawerNavigator({
        WelcomeScreen: {
            screen: Home,
            navigationOptions: {
                header: null
            }
        },
        NotificationsScreen: {
            screen: Notifications,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        contentComponent: props => {
            return <CustomDrawerContentComponent navigation={props.navigation}/>
        }
    }
);*/

/*const Tab = createBottomTabNavigator({
    WelcomeScreen: {
        screen: MyDrawerNavigator,
        navigationOptions: {
            tabBarAccessibilityLabel: 'home'
        }
    },
    MonitorScreen: {
        screen: Monitor,
        navigationOptions: {
            tabBarAccessibilityLabel: 'monitor'
        }
    },
    NotificationsScreen: {
        screen: Notifications,
        navigationOptions: {
            tabBarAccessibilityLabel: 'notifications'
        }
    }
}, {
    tabBarPosition: 'bottom',
    tabBarComponent: props => {
        return <FooterView navigation={props.navigation}/>
    },
});*/


const Routing = createStackNavigator({
    HomeScreen: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    initialRouteName: 'HomeScreen'
});

export default createAppContainer(Routing);
