/*
界面功能：时间选择
相关界面：会议室预定-时间选择器
props：
    1.mode时间类型(选择年月日date／时分time)
    2.date 当前时间
    3.onDateChange 选中某行后的回调方法
    4.onBackSelected 点击背景的回调方法
    5.visible 是否显示
*/


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
}from 'react-native'

import { Actions } from 'react-native-router-flux';

import GlobalSize from '../common/GlobalSize'
import Picker from 'react-native-picker'

var alertWidth=GlobalSize.DeviceWidth-40;
var alertHeight=300;

var modePicker = "date";
var DateTypeDay='DateTypeDay';//年月日
var DateTypeTimeStart='DateTypeTimeStart';//时分
var DateTypeTimeEnd='DateTypeTimeEnd';//时分

// var dateSelected = new Date();
export default class ModalList extends Component{
    constructor(props){
        super(props);
        this.state={
            dateSelected:new Date(),
        }

    }
    componentDidMount(){
        if (this.props.date) {
            this.setState({
                dateSelected:this.props.date,
            });
        }
    }
    rowSelected=(dateSelect)=>{
        this.setState({
            dateSelected:dateSelect,
        });
    }
    doneSelected=()=>{
        this.props.onDateChange(this.state.dateSelected);
    }
    render(){
        var modeType= this.props.mode==DateTypeDay ?'date' :'time';
        return(
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.visible}
                >
                    <View style={styles.container}>
                        <View style={styles.contentContainer}>
                            <DatePickerIOS
                                date={this.state.dateSelected}
                                mode={modeType}
                                onDateChange={this.rowSelected}
                                minuteInterval={10}
                                minimumDate={this.props.minimumDate}
                                style={{flex:1}}
                            />
                            <View style={{height:60,flexDirection:'row',padding:10,}}>
                                <TouchableOpacity style={{flex:1,width:50,marginRight:10,justifyContent:'center',backgroundColor:'gray'}}
                                    onPress={this.doneSelected.bind(this)}>
                                    <Text style={{textAlign:'center',fontSize:18}}>确认</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flex:1,width:50,backgroundColor:'gray',justifyContent:'center'}}
                                    onPress={this.props.onBackSelected}>
                                    <Text style={{textAlign:'center',fontSize:18}}>取消</Text>
                                </TouchableOpacity>
                            </View>

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
        backgroundColor:'rgba(0,1,0,0.4)',
    },
    contentContainer:{
        backgroundColor:GlobalSize.colorBgGray,
        width:alertWidth,
        height:alertHeight,
        borderRadius:10,
        borderWidth:1,
        borderColor:'black'
    },
})
