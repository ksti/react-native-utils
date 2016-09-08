/*
    角标按钮
 */
import React,{
    Component
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
}from 'react-native'

import {httpRequest} from 'react-native-utils-gjs'
import PublicToast from '../components/PublicToast'
import GlobalSize from '../common/GlobalSize';

let HTTPRequest = new httpRequest();


// this.props.text //组件文字  必须
// this.props.textFontSize //组件文字的大小 用于计算角标显示的位置 必填
// this.props.dataType //组件类型 依据次判断是调用哪个接口
// this.props.textStyle //组件文字的样式 非必填
// this.props.countTextStyle //组件角标文字的样式 非必填
// this.props.style //组件的背景样式 非必填
export default class SubscriptButton extends Component{

    constructor(props){
        super(props);
        this.state={
            count:0
        }
}

    componentWillMount() {

    }

    componentDidMount() {
    }



    render(){
        if(this.props.textStyle==undefined)
        {
            this.props.textStyle=styles.textStyle;
        }
        if(this.props.countTextStyle==undefined)
        {
            this.props.countTextStyle=styles.countTextStyle;
        }
        let textlength = this.props.text.toString().length;

        let myWidth = textlength * this.props.textFontSize+20;

        let left = (myWidth/2)+ (this.props.textFontSize *textlength /4)+textlength;

        let wh = 0;
        if(this.props.count > 0){
            wh = 18;
        }
        return(
            <TouchableOpacity style={this.props.style} onPress={this.props.onPress}>
                <View style={[styles.viewStyle,{width:myWidth}]}>
                    <View style={[styles.countViewStyle,{marginLeft: left},{ width:wh, height:wh}]}>
                        <Text style={[styles.countTextStyle,this.props.countTextStyle]}>{this.props.count}</Text>
                    </View>
                    <Text style={[styles.textStyle,this.props.textStyle]}>{this.props.text}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
var styles = StyleSheet.create({
    countViewStyle :{
        backgroundColor:'red',
        position:'absolute',
        borderRadius:9,
        zIndex:999,
        alignItems:'center',
        justifyContent:'center',

        marginTop:5,
    },
    textStyle:{
        fontSize:18,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
        marginBottom:10,
        color:'white',
    },
    viewStyle:{
        justifyContent:'center',
        alignItems:'center',
    },
    countTextStyle:{
        color:'white',
        fontSize:12,
        overflow:'hidden',
        textAlign:'center'
    }
});
