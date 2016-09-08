/*
界面功能：筛选列表
相关界面：会议室预定-职能中心列表
props：
    1.dataSource 职能列表数据源
    2.selectedRow 被选项
    3.onValueChange 选中某行后的回调方法
    4.onBackSelected 点击背景的回调方法
    5.visible 是否显示
    6.modalListType 列表类型 GlobalSize.ModalListTypeCompan等
*/


import React,{
    Component
} from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Modal,
    Image,
    ListView,
    StyleSheet,
    Alert,
}from 'react-native'

import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux'
import ActionConstants from '../reduxDataFlow/constants/ActionConstants';

import PublicToast from '../components/PublicToast'
import GlobalSize from '../common/GlobalSize'

var alertWidth=260;
var alertHeight=300;

export default class ModalList extends Component{
    constructor(props){
        super(props);
        // this.state={
        //     dataSource:new ListView.dataSource.rowHasChanged:(row1,row2)=>{row1 !== row2},
        // }
    }

    rowSelected=(rowData)=>{
        this.props.onValueChange(rowData);
    }
    renderRow=(rowData)=>{
        var isSelected = false;
        // if (this.props.selectedRow) {
        //     isSelected = this.props.selectedRow.title == rowData.title;
        // }
        let selectedData=this.props.selectedRow;
        var strTitle='';
        var strSelectedTitle='';
        // PublicToast.showMessage('modalListType:',this.props.modalListType);
        switch (this.props.modalListType) {
            case GlobalSize.ModalListTypeCompany:
                strTitle = rowData.cnName;
                strSelectedTitle =this.props.selectedRow.cnName;
                break;
            case GlobalSize.ModalListTypeCostCenter:
                strTitle = rowData.cnName;
                strSelectedTitle = this.props.selectedRow.cnName;
                break;
            case GlobalSize.ModalListTypeDepartment:
                strTitle = rowData.text;
                strSelectedTitle =this.props.selectedRow.text;
                break;
            case GlobalSize.ModalListTypeDate:
                strTitle = rowData;
                strSelectedTitle =this.props.selectedRow;
                break;
            case GlobalSize.ModalListTypeUserList:
                strTitle = rowData.displayName;
                strSelectedTitle = '';
                break;
            default:
        }
        if (strTitle == strSelectedTitle) {
            isSelected = true;
        }else {
            isSelected = false;
        }
        return (
            <TouchableOpacity onPress={()=>{this.rowSelected(rowData)}} style={[{flex:1,height:45}]} >
                <View style={{flex:1,justifyContent:'center',flexDirection:'row'}}>
                    <Text style={{fontSize:GlobalSize.FontSizeTitle,width:alertWidth-20-15*2,textAlign:'left'}} numberOfLines={2}>{strTitle}</Text>
                    <Image style={{height:20,width:20,alignItems:'flex-end',}} source={isSelected?require('../../resource/images/App/ic_btn_selected.png') :require('../../resource/images/App/ic_btn_default.png')} />
                </View>
            </TouchableOpacity>
        );
    }
    render(){
        console.log('renderModalListSource',this.props.dataSource.getRowCount());
        return(
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.visible}
            >
                <TouchableOpacity onPress={this.props.onBackSelected} style={{flex:1}}>
                    <View style={styles.container}>
                        <View style={styles.contentContainer}>
                            <ListView
                                dataSource={this.props.dataSource}
                                renderRow= {this.renderRow}
                                enableEmptySections = {true}
                                showsVerticalScrollIndicator={false}
                             />
                        </View>
                    </View>
                </TouchableOpacity>
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
        padding:15,
        borderRadius:10,
        borderWidth:1,
        borderColor:'black'
    },
    titleText:{
        height:18,

    }
})
