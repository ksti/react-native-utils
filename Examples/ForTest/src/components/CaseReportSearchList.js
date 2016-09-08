/**
 * Created by yingying on 16/9/5.
 */
// 案场报表——搜索List

import React,{
    Component
} from 'react'
import {
    View,
    StyleSheet,
    Animated,
    ListView,
    Text,
    Easing,
    TouchableOpacity,
    Image,
    Alert,
    LayoutAnimation,
    UIManager,
    ActivityIndicator,
    InteractionManager,
}from 'react-native'

import ListRefreshControl from '../components/ListRefreshControl'
import ListFooter from '../components/ListFooter'
import GlobalSize from '../common/GlobalSize'
import CheckBox from 'react-native-checkbox';
import CaseReportSearchItem from '../components/CaseReportSearchItem'
var  CheckBoxData=[];
var editData = [];
var  rowEdit = false;


export default class CaseReportSearchList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        // editData = [{code:row.code,name:row.name, isOpen:false,isSelect:false}];
        console.log('回调值:'+this.props.selectedData)
    }
    
    clickLookOver = (rowData, rowID)=> {
        this.props.clickLookOver(rowData, rowID);
    };

    renderRow =(rowData, sectionID: number, rowID: number)=> {
        console.log('row数据Name:'+rowData.businessProjectName+'行数:'+rowID+'图片 code:'+rowData.businessProjectCode);
        return (
            <CaseReportSearchItem
                businessProjectName = {rowData.name}
                businessProjectCode = {rowData.code}
                rowData = {rowData}
                rowID = {rowID}
                clickLookOver={()=> {
                    this.clickLookOver(rowData, rowID)
                }}

            />
        );
    };
    fetchFooterMoreData=()=>{
        this.props.fetchFooterMoreData();
    };
    
    renderFooter=()=> {
        let numRow = this.props.dataSource.getRowCount();
        console.log('总行数:'+numRow);
        if (numRow == 0) {
            return (
                <View></View>
            )
        }
        return (
            <ListFooter
            onPress={() => this.fetchFooterMoreData() }
            isAllLoaded={this.props.isLoading}
            isLoading={this.state.isMoreLoading}
        />
        );
    };

    render(){
        console.log('编辑0数据源'+JSON.stringify(this.props.dataSource));
            return(
                <View style={{flex:1,backgroundColor:GlobalSize.colorBgGray}}>
                    <ListView
                        dataSource={this.props.dataSource}
                        renderRow={this.renderRow}
                        enableEmptySections = {true}
                        refreshControl={
                                    <ListRefreshControl
                                        refreshing={this.props.isLoading}
                                        onRefresh={this.props.fetchDataSource}
                                    />
                                }
                        renderFooter={this.renderFooter}
                    />
                </View>
            )
    }
}
var styles=StyleSheet.create({

    row: {
        height: 60,
        flex:1,
        flexDirection: 'row',
    },
    text: {
        marginLeft:6,
        marginTop:8,
        fontWeight:'bold',
        fontSize:14,
        color:'#3b3b3b',
        flex:1,
    },
    SubText: {
        fontSize:12,
        marginLeft:6,
        marginTop:8,
        color:'#3b3b3b',
        flex:1,
    },

    buttonGrayView:{
        marginRight:8,
        borderWidth:1,
        borderColor:'gray',
        borderRadius:5,
        width:80,
        height:35,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10
    },
    seeGrayButton:{
        color:'gray',
        fontSize:14,
        // marginRight:5,
        // marginLeft:5,
    },
    contentContainer:{
        flexDirection:'column',
        marginRight:10,
        flex:1
    },

});