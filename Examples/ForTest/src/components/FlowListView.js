/*
界面功能：流程列表
相关界面：首页－流程中心
props：无
*/

import React,{
    Component
} from 'react'
import {
    View,
    Text,
    ListView,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Image,
}from 'react-native'

import { Actions } from 'react-native-router-flux';
import GlobalSize from '../common/GlobalSize'
import GlobalStyle from '../common/GlobalStyle'
import {httpRequest} from 'react-native-utils-gjs'
let HTTPRequest = new httpRequest();

export default class FlowListView extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource : new ListView.DataSource({
                rowHasChanged:(row1,row2) => true,
            }),
            isLoading:true,
        };
    }
    componentDidMount(){
        this.fetchDataSource();
    }
    rowPressedAction=(data)=>{
        console.log("this.props.state:" + this.props.state);
        alert('点击row：'+data.title);
        Actions.flowDetail({
                title:"流程详情",
                flowData:data,
            },)
    }
    fetchDataSource=()=>{
        const { refreshTodosFromSever } = this.props.actions;
        refreshTodosFromSever(GlobalSize.ListTestURL,'0','5');
    }
    renderRow=(data)=>{
        console.log('data:'+data.title);
        return(
            <TouchableOpacity onPress={()=>{this.rowPressedAction(data)}}>
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                        <Image style={styles.imageIcon} source={require('../../resource/images/App/ic_flow_finished.png')} />
                        <Text style={[GlobalStyle.cellTitleText,styles.titleText]} numberOfLines={2}>{data.title}</Text>
                    </View>
                    <Text style={[GlobalStyle.cellMinText,styles.dateText]}>{data.year}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    render(){
        if (this.props.todos) {
            this.state.dataSource = this.state.dataSource.cloneWithRows(this.props.todos);
        };

        if (this.props.state.isLoading) {
            return(
                <View style={{flex:1}}>
                    <ActivityIndicator
                        style={[styles.centering, styles.gray]}
                        color={GlobalSize.colorTextDarkGray}
                    />
                </View>
            );
        }
        return(
            <View style={[this.props.style,{backgroundColor:GlobalSize.colorBgMain}]}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    enableEmptySections = {true}
                />
            </View>
        );
    }
}

var styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        padding:GlobalSize.cellPadding,
        marginBottom:1,
    },
    contentContainer:{
        flexDirection:'row',
    },
    imageIcon:{
        width:15,
        height:15,
    },
    titleText:{
        marginLeft:8,
        width:GlobalSize.DeviceWidth-15-2*GlobalSize.cellPadding-8
    },
    dateText:{
        alignSelf:'flex-end',

    }
})
