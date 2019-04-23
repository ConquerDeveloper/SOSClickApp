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
    rowCenteredContainer: {
        flex: 1,
        flexDirection: 'row',
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
        height: 40
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
    },
    label: {
        fontFamily: 'UniSansRegular',
        fontSize: 12,
        color: '#3B5575'
    }
});

export const loginStyles = StyleSheet.create({
    loginContainer: {
        backgroundColor: '#D0282E'
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
        marginTop: 40,
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
        width,
        height: 200,
        resizeMode: 'cover',
        alignSelf: 'center',
        zIndex: -1,
        backgroundColor: '#F5F8FA'
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

export const securityNetworkStyles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F8FA',
        flex: 1,
    },
    logoContainer: {
        width: 116,
        height: 116,
        borderRadius: 116 / 2,
        backgroundColor: '#fff',
        marginTop: 20,
        alignSelf: 'center'
    },
    logo: {
        width: 83,
        height: 83
    },
    title: {
        fontFamily: 'UniSansRegular',
        color: '#606A75',
        fontSize: 24,
        textAlign: 'center',
        width,
        marginTop: 10,
        alignSelf: 'center'
    },
    subtitle: {
        fontFamily: 'UniSansRegular',
        fontSize: 14,
        color: '#92A0B1',
        textAlign: 'center',
        marginTop: 20
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginLeft: 15
    },
    listContacts: {
        marginTop: 20,
        paddingLeft: 0,
        marginLeft: 0
    }
});

export const userProfileStyles = StyleSheet.create({
    header: {
        width,
        height: 125,
        backgroundColor: '#F6F8FA'
    },
    photo: {
        width: 78,
        height: 78,
        borderRadius: 9,
        alignSelf: 'center'
    },
    photoText: {
        fontFamily: 'UniSansRegular',
        fontSize: 12,
        color: '#3B5575',
        marginTop: 5
    },
    formContainer: {
        marginTop: 30
    }
});