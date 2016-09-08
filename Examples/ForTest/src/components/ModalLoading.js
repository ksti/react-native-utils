import React,{
    Component
} from 'react'

import {
    View,
    TouchableOpacity,
    Modal,
    Text,
    DatePickerIOS,
    StyleSheet,
    Image,
    ActivityIndicator,
}from 'react-native'

import { Actions } from 'react-native-router-flux';

import GlobalSize from '../common/GlobalSize'

export default class ModalLoading extends Component{
    constructor(props){
        super(props);
        // this.state={
        //     visible:false,
        // }
    }
    render(){
        console.log('加载modal是否显示'+this.props.visible);
        return(
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.visible}
                onRequestClose={() => {}}
                >
                    <View style={styles.container}>
                        <View style={styles.contentContainer}>
                            <ActivityIndicator
                                animation={true}
                                size='large'
                            />
                            <Text style={{textAlign:'center'}}>
                                {this.props.loadingText?this.props.loadingText :"正在加载..."}
                            </Text>
                        </View>
                    </View>
            </Modal>
        );
    }
}

var styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,1,0,0.2)',
    },
    contentContainer:{
        height:60,
    },
})
