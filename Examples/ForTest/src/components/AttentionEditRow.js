/**
 * Created by yingying on 16/9/1.
 * 关注——编辑 row
 */

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


import GlobalSize from '../common/GlobalSize'
import CheckBox from 'react-native-checkbox';
import CustomEditRow from '../components/CustomEditRow'
import ListRefreshControl from '../components/ListRefreshControl'
import ListFooter from '../components/ListFooter'
var  CheckBoxData=[];
var editData = [];
var  rowEdit = false;


export default class AttentionEditRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowEdit:false,
            floorNum: props.floorNum,
            needDeleteNum:'',
            stylesRowButton: props.stylesRowButton,
            rowText:props.rowText
        }
    }
    rowPressedAction = (rowData,highlightRow) => {
        console.log('单击' + this.state.rowEdit);
        this.setState({
            rowEdit:this.state.rowEdit=!this.state.rowEdit,
        });
    };

    componentWillMount() {
        // editData = [{code:row.code,name:row.name, isOpen:false,isSelect:false}];
        console.log('回调值:'+this.props.selectedData)
    }
    selectedData=(parent, selectedData)=>{
      console.log('****'+selectedData)
        this.props.finish(this, selectedData);
    };
    clickLookOver = (rowData, rowID)=> {
        this.props.clickLookOver(rowData, rowID);
    };

    // selectedAll = ()=> {
    //     console.log('全选&*&*&*&');
    //     this.customEditRow.selectedAll();
    // };

    renderEditRow =(rowData, sectionID: number, rowID: number)=> {
        console.log('row数据Name:'+rowData.businessProjectName+'行数:'+rowID+'图片 code:'+rowData.businessProjectCode);
        return (
                <CustomEditRow
                    businessProjectName = {rowData.businessProjectName}
                    businessProjectCode = {rowData.code}
                    rowData = {rowData}
                    rowID = {rowID}
                    ref={customEditRow =>this.customEditRow = customEditRow}
                    finish={(xx, yy)=>{this.selectedData(xx, yy)}}
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
                isAllLoaded={this.state.isAllLoaded}
                isLoading={this.state.isMoreLoading}
            />
        );
    };
    render(){
        console.log('编辑0数据源'+this.props.dataSource);
        console.log('selected:'+this.state.rowEdit);

        return(
                <View style={{flex:1}}>
                    <ListView
                        dataSource={this.props.dataSource}
                        renderRow={this.renderEditRow}
                        enableEmptySections = {true}
                        refreshControl={
                                <ListRefreshControl
                                    refreshing={this.props.isLoading}
                                    onRefresh={this.props.fetchDataSource}
                                />
                            }
                        // renderFooter={this.renderFooter}
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