import {
    StyleSheet,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

export const generalStyles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'cover'
    },
    columnCenteredContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    textWhite: {
        color: '#fff'
    },
    alignRow: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    textCenter: {
        textAlign: 'center'
    },
    cardBordered: {
        borderRadius: 10
    },
    inputContainer: {
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 45
    },
    headerContainer: {
        backgroundColor: '#D0282E'
    },
    headerTitle: {
        textAlign: 'center',
        fontFamily: 'UniSansBold'
    },
    headerTitleLight: {
        fontFamily: 'UniSansLight',
        color: '#fff',
        fontSize: 20
    }
});

export const loginStyles = StyleSheet.create({
    loginContainer: {
        backgroundColor: '#D0282E',
    },
    logo: {
        width: 260,
        height: 260
    },
    signInForm: {
        flex: 1,
        width,
        alignSelf: 'center',
        paddingRight: 25,
        paddingLeft: 25,
    },
    inputLabel: {
        color: 'rgba(255, 255, 255, .6)',
        fontSize: 14
    },
    signInButton: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, .6)',
        borderRadius: 10,
        marginTop: 40
    },
    signInText: {
        color: '#fff',
        fontFamily: 'UniSansSemiBold',
        fontSize: 16
    },
    input: {
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    createAccountText: {
        fontSize: 14,
        fontFamily: 'UniSansLight'
    },
    createAccountTextBold: {
        fontFamily: 'UniSansBold',
        fontSize: 14
    },
    inputIcon: {
        width: 33,
        height: 33
    },
    lockIcon: {
        color: '#8F9EBC',
        fontSize: 44
    },
    forgotPasswordText: {
        fontSize: 14,
        marginTop: 15,
        fontFamily: 'UniSansLight'
    }
});

export const signUpStyles = StyleSheet.create({
    signUpForm: {
        flex: 1,
        width,
        alignSelf: 'center',
        paddingRight: 30,
        paddingLeft: 30,
        marginTop: -40
    }
});

export const footerStyles = StyleSheet.create({
    background: {
        backgroundColor: '#EDEDED'
    },
    footerText: {
        color: '#92A0B1',
        fontFamily: 'UniSansRegular',
        fontSize: 10
    },
    icon: {
        fontSize: 30,
        color: '#92A0B1'
    },
    iconImg: {
        width: 30,
        height: 30
    }
});

export const homeStyles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: undefined,
        height: 220,
        resizeMode: 'cover'
    }
});

export const menuStyles = StyleSheet.create({
    menuHeader: {
        width: undefined,
        height: 213,
        backgroundColor: '#D0282E'
    },
    username: {
        fontSize: 25,
        fontFamily: 'UniSansBold'
    },
    email: {
        fontFamily: 'UniSansRegular',
        fontSize: 12,
        color: '#fff'
    },
    avatar: {
        width: 115,
        height: 115,
        borderRadius: 115 / 2,
        marginBottom: 10
    }
});