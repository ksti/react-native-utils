/*
 界面功能：点击后显示下划线，点击一组
 相关界面：通知纪要 首页
 props：默认时间，
 */

import React,{
    Component
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
}from 'react-native'

import { Actions } from 'react-native-router-flux';
import GlobalSize from '../common/GlobalSize';

export default class CheckDownLineGroup extends Component{
    constructor(props){
        super(props);
        this.state={
            line1Visible : 2,
            line2Visible : 0,
            line3Visible : 0,
        }
    }
    componentDidMount(){
    }

    update1Visible=() =>{
        this.setState({
            line1Visible : 2,
            line2Visible : 0,
            line3Visible : 0,
        });
        this.props.clickSelect(1);
    }
    update2Visible=() =>{
        this.setState({
            line1Visible : 0,
            line2Visible : 2,
            line3Visible : 0,
        });
        this.props.clickSelect(2);
    }
    update3Visible=() =>{
        this.setState({
            line1Visible : 0,
            line2Visible : 0,
            line3Visible : 2,
        });
        this.props.clickSelect(3);
    }


    render(){
        return(
            <View style={styles.groupStyle} >
                <TouchableHighlight underlayColor="white" onPress={this.update1Visible} style={styles.tab}>
                    <View style={styles.viewStyle} >
                        <Text style={this.state.line1Visible===2?styles.text1Style:styles.text2Style} >单位通知</Text>
                        <View height={this.state.line1Visible} style={{ backgroundColor:GlobalSize.colorOrangeIcon}}></View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="white" onPress={this.update2Visible} style={styles.tab}>
                    <View style={styles.viewStyle} >
                        <Text style={this.state.line2Visible===2?styles.text1Style:styles.text2Style} >部门通知</Text>
                        <View height={this.state.line2Visible} style={{ backgroundColor:GlobalSize.colorOrangeIcon}}></View>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor="white" onPress={this.update3Visible} style={styles.tab}>
                    <View style={styles.viewStyle} >
                        <Text style={this.state.line3Visible===2?styles.text1Style:styles.text2Style} >会议纪要</Text>
                        <View height={this.state.line3Visible} style={{ backgroundColor:GlobalSize.colorOrangeIcon}}></View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    groupStyle :{
        flexDirection:'row',
        height:44,
    },
    tab:{
        flex:1,
        height:44,
    },
    text1Style:{
        flex:1,
        marginTop:12,
        textAlign: 'center',
        alignItems:'center',
        justifyContent:'center',
        fontSize:16,
        color:GlobalSize.colorOrangeIcon,
    },
    text2Style:{
        flex:1,
        marginTop:12,
        textAlign: 'center',
        alignItems:'center',
        justifyContent:'center',
        fontSize:16,
        color:GlobalSize.colorTextDarkGray,
    },
    viewStyle:{
        height:44,
        flex:1,
    },
});
