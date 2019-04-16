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