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
import OnBoardingIntro from "../includes/OnBoardingIntro";
import FooterView from '../includes/FooterView';
import CustomDrawerContentComponent from '../includes/CustomDrawerContentComponent';
import logOut from '../containers/logOut';
import Broadcast from '../containers/Broadcast';
import Broadcasting from '../containers/Broadcasting';
import SecurityNetwork from '../containers/SecurityNetwork';
import ContactsNetwork from '../containers/ContactsNetwork';
import UserProfile from '../containers/UserProfile';
import RemoveSecurityNetwork from '../containers/RemoveSecurityNetwork';
import DVRCamera from '../containers/DVRCamera';
import Complaint from '../containers/Complaint';
import ComplaintCamera from '../containers/ComplaintCamera';
import PreviewVideo from '../containers/PreviewVideo';

const MyDrawerNavigator = createDrawerNavigator({
        WelcomeScreen: {
            screen: Home,
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
);

const Tab = createBottomTabNavigator({
    WelcomeScreen: {
        screen: MyDrawerNavigator,
        navigationOptions: {
            tabBarAccessibilityLabel: 'home'
        }
    },
    BroadcastScreen: {
        screen: Broadcast,
        navigationOptions: {
            tabBarAccessibilityLabel: 'home'
        }
    },
}, {
    tabBarPosition: 'bottom',
    tabBarComponent: props => {
        return <FooterView navigation={props.navigation}/>
    },
});

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
        screen: Tab,
        navigationOptions: {
            header: null
        }
    },
    OnBoardingScreen: {
        screen: OnBoardingIntro,
        navigationOptions: {
            header: null
        }
    },
    logOutScreen: {
        screen: logOut,
        navigationOptions: {
            header: null
        }
    },
    SecurityNetworkScreen: {
        screen: SecurityNetwork,
        navigationOptions: {
            header: null
        }
    },
    ContactsScreen: {
        screen: ContactsNetwork,
        navigationOptions: {
            header: null
        }
    },
    UserProfileScreen: {
        screen: UserProfile,
        navigationOptions: {
            header: null
        }
    },
    BroadcastingScreen: {
        screen: Broadcasting,
        navigationOptions: {
            header: null
        }
    },
    RemoveSecurityNetworkScreen: {
        screen: RemoveSecurityNetwork,
        navigationOptions: {
            header: null
        }
    },
    DVRCameraScreen: {
        screen: DVRCamera,
        navigationOptions: {
            header: null
        }
    },
    ComplaintScreen: {
        screen: Complaint,
        navigationOptions: {
            header: null
        }
    },
    ComplaintCameraScreen: {
        screen: ComplaintCamera,
        navigationOptions: {
            header: null
        }
    },
    PreviewVideoScreen: {
        screen: PreviewVideo,
        navigationOptions: {
            header: null
        }
    },
    initialRouteName: 'HomeScreen'
});

export default createAppContainer(Routing);
