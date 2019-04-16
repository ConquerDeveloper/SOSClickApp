import React from 'react';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createDrawerNavigator
} from 'react-navigation';
import Login from '../containers/Login';
import SignUp from '../containers/SignUp';
import Home from '../containers/Home';
import Auth from '../auth/Auth';



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
        screen: Auth,
        navigationOptions: {
            header: null
        }
    },
    SignUpScreen: {
        screen: SignUp,
        navigationOptions: {
            header: null
        }
    },
    SignInScreen: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    WelcomeScreen: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    initialRouteName: 'HomeScreen'
});

export default createAppContainer(Routing);
