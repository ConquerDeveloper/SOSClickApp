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
    },
    forgotPasswordBackground: {
        flex: 1,
        width: undefined,
        height: 350,
        resizeMode: 'cover'
    }
});

export const loginStyles = StyleSheet.create({
    loginContainer: {
        backgroundColor: '#D0282E'
    },
    logo: {
        width: 260,
        height: 260,
        flex: 1
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
        width: undefined,
        height: '80%',
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
    },
    editButton: {
        width: 40,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 40 / 2,
        alignSelf: 'flex-end',
        marginTop: 20,
        marginRight: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 2.84,
        elevation: 2,
    },
    editIcon: {
        fontSize: 20,
        color: '#606A75'
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

export const BroadcastingStyles = StyleSheet.create({
    disconnect: {
        width: 104,
        height: 26,
        borderRadius: 34,
        borderWidth: 1,
        borderColor: '#fff'
    },
    disconnectText: {
        fontFamily: 'UniSansRegular',
        color: '#fff',
        fontSize: 14
    },
    bambuserContainer: {
        width,
        height,
        ...StyleSheet.absoluteFillObject,
        zIndex: -1
    },
    buttonContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 50,
        paddingRight: 50
    },
    configIcon: {
        width: 48,
        height: 48
    }
});