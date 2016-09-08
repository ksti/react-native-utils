/*
界面功能：按钮，文字靠左，图标靠右，
相关界面：参考会议室选择部门的按钮
props：
    1.accessoryImg图片源,
    2.onPress点击事件
    3.title按钮文字
    4.btnWidth 按钮宽度
*/
import React,{Component} from 'react'
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native'

import GlobalSize from '../common/GlobalSize'

export default class ButtonWithAccessory extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <TouchableOpacity
               onPress={this.props.onPress}
               >
               <View style={styles.btnBorder}>
                     <Text style={[styles.btnTitle,{width:this.props.btnWidth-2*10-20-5}]} numberOfLines={1}>{this.props.title}</Text>
                     <View style={{width:20,alignItems:'flex-end'}}>
                        <Image
                            source={this.props.accessoryImg}
                            style={{height:15,width:15,marginRight:5}} />
                     </View>
                </View>
             </TouchableOpacity>
        );
    }
}

var styles=StyleSheet.create({
    btnBorder:{
        height:40,
        marginLeft:10,
        marginRight:10,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        borderColor:GlobalSize.colorBorderGray,
        borderRadius:5
    },
    btnTitle:{
        height:18,
        marginLeft:5,
        // width:GlobalSize.DeviceWidth-2*10-20-5,
    }
})
