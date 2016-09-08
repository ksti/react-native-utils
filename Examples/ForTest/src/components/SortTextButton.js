/*
界面功能：筛选列表
相关界面：会议室预定-职能中心选择按钮
props：点击事件，显示数据
*/

import React,{
    Component
} from 'react'
import {
    View,
    Text,
    StyleSheet,
}from 'react-native'

import { Actions } from 'react-native-router-flux';
import BaseContainer from '../containers/BaseContainer'

export default class FlowDetailPage extends BaseContainer{
    constructor(props){
        super(props);
        this.state={

        }
    }
    componentDidMount(){
        console.log(this.props.flowData);
        if (this.props.flowData) {
            //网络请求流程详情
        }else{
            alert('没有找到相关流程');
        }
    }
    defaultNavigationTitle(){
        return{
            title:this.props.title,
            tintColor:this.defaultTintColor()
        };
    }

    render(){
        return(
            <View style={styles.container}>

            </View>
        );
    }
}
var styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        height:60,
        backgroundColor:'orange',
    }
})
