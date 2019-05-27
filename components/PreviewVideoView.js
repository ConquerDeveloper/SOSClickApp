import React from 'react';
import {
    View,
    StatusBar,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';
import {
    Container, Icon,
    Text
} from 'native-base';
import Video from 'react-native-video';
import Spinner from '../includes/Spinner';


const {width, height} = Dimensions.get('window');

const PreviewVideoView = props => {
    const {
        uri,
        navigation,
        spinner
    } = props;
    return (
        <Container style={{
            backgroundColor: '#000',
            flex: 1
        }}>
            <Spinner visible={spinner}/>
            {/*   <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'flex-start'
            }}>
                <View style={ComplaintStyles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'}
                              style={ComplaintStyles.arrowIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>*/}
            <Video source={{uri}}
                   ref={(ref) => {
                       this.player = ref
                   }}
                   repeat={true}
                   onBuffer={this.onBuffer}
                //onError={this.videoError}
                   style={{
                       width,
                       height: '90%'
                   }}/>
            <View style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                flexDirection: 'row',
                marginBottom: 10
            }}>
                <TouchableOpacity onPress={props.handleRedoVideo}
                                  style={{
                                      borderRadius: 23,
                                      borderWidth: 1,
                                      borderColor: '#fff',
                                      paddingVertical: 10,
                                      width: 150
                                  }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Icon type={'Ionicons'}
                              name={'redo'}
                              style={{
                                  color: '#fff',
                                  fontSize: 12,
                                  textAlign: 'center',
                                  marginRight: 5
                              }}
                        />
                        <Text style={{color: '#fff', textAlign: 'center', fontSize: 12}}>VOLVER A GRABAR</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ComplaintScreen')}
                                  style={{
                                      borderRadius: 23,
                                      paddingVertical: 10,
                                      width: 150,
                                      backgroundColor: '#D0282E'
                                  }}>
                    <Text style={{color: '#fff', textAlign: 'center', fontSize: 12}}>ENVIAR</Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
};

export default PreviewVideoView;