import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Text,
  ListView,
  TouchableOpacity,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';

import NavigationBar from 'react-native-navbar';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { loadFlowCenterWaitDataHomeFromServer } from './reduxDataFlow/actions';
import ViewPager from 'react-native-viewpager'

import GlobalStyle  from '../../common/GlobalStyle'
import GlobalSize from '../../common/GlobalSize'
import BaseContainer  from '../../containers/BaseContainer'
import ListRefreshControl from '../../components/ListRefreshControl'
import ListFooter  from '../../components/ListFooter'
import Loading from '../../components/LoadingDialog'
import ButtonUpDown from '../../components/ButtonUpDown'
import PublicToast from '../../components/PublicToast'
// import ActionConstants from '../../reduxDataFlow/constants/ActionConstants';
import ActionConstants from './reduxDataFlow/actionConstants';
import {httpRequest} from 'react-native-utils-gjs'
let HTTPRequest = new httpRequest(true);
var pageIndex=0;
var pageSize = 10;
var cardMenu = [
    [
        {
            title:'测试1',
            image:require('../../../resource/images/App/qiandao.png'),
            key:"signIn",
        },{
            title:'测试2',
            image:require('../../../resource/images/App/nidan.png'),
            key:"makeFlow",
        },{
            title:'测试3',
            image:require('../../../resource/images/App/huiyishiyuding.png'),
            key:"meeting",
        },{
            title:'测试4',
            image:require('../../../resource/images/App/youxiang.png'),
            key:"email",
        },{
            title:'测试5',
            image:require('../../../resource/images/App/xinwenzhongxin.png'),
            key:"newsCenter",
        },{
            title:'测试6',
            image:require('../../../resource/images/App/tongzhijiyao.png'),
            key:"notice",
        },{
            title:'测试7',
            image:require('../../../resource/images/App/yuanyangxueyuan.png'),
            key:"learn",
        },{
            title:'测试8',
            image:require('../../../resource/images/App/tongxunlu.png'),
            key:"addressBook",
        },
    ],
    [
        {
            title:'测试9',
            image:require('../../../resource/images/App/fangwuyuyanshou.png'),
            key:'saleStatistic'
        },{
            title:'测试10',
            image:require('../../../resource/images/App/fangwuyuyanshou.png'),
            key:'hotSale'
        },{
            title:'测试11',
            image:require('../../../resource/images/App/fangwuyuyanshou.png'),
            key:'saleControl'
        },
    ],
    [
        {
            title:'GJS',
            image:require('../../../resource/images/App/fangwuyuyanshou.png'),
            key:'guojunshuai'
        },
    ]
]
class WorkHome extends BaseContainer {
    constructor(props) {
        super(props);
        _this = this;
        this.state=({
            dataSource: new ListView.DataSource({
                rowHasChanged:(r1,r2)=>r1!==r2
            }),
            isLoading :false,
        })
    }
    defaultRenderNavigationBarRightButton(){
       return {
            title: '帮助',
            tintColor: this.defaultTintColor(),
            handler: () => {
                // Actions.workHomeHelp({ title: "帮助" })
                PublicToast.showMessage('帮助中心!');
            },
            style:GlobalStyle.rightButton
        };
    }
    defaultRenderNavigationBarLeftButton(){
        return <View></View>
    }
    componentDidMount(){
        this.props.dispatch(loadFlowCenterWaitDataHomeFromServer({page:pageIndex,pagesize:pageSize}));
    }
    componentWillReceiveProps(nextProps){
        var flowCenterData = nextProps.flowState.flowHomeData;
        this.setState({
            isAllLoad:(nextProps.flowState.flowHomeData-this.state.dataSource.getRowCount())<pageSize}
        );
        if (nextProps.flowState.type == ActionConstants.FLOWCENTERHOME_FINISH) {
            // if (flowCenterData) {
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(flowCenterData),
                    isLoading:nextProps.flowState.isLoadingFlowCenter,
                })
            // }
        }else if (nextProps.flowState.type == ActionConstants.FLOWCENTERHOME_ERROE ) {
            console.log('首页列表请求失败');
            this.setState({
                isLoading:false,
            })
        }else if (nextProps.flowState.type == ActionConstants.FLOWCENTERHOME_LOADING) {
            this.setState({
                isLoading:true,
            })
        }else if (nextProps.flowState.type == ActionConstants.FLOWCENTERHOME_ERROE) {
            this.setState({
                isLoading:false,
            })
        }
    }
    pushToFlowCenterView=()=>{
        // Actions.flowCenter({title:'流程中心',showItem:'waitHandle'});
    };
    rowPressedAction=(data)=>{
        if (data.enabled) {
            // Actions.flowDetail({
            //     title:"流程详情",
            //     url:data.url
            // },)
            PublicToast.showMessage('查看详情!');
        }else {
            PublicToast.showMessage('该审批流还未在移动端上线');
        }
        console.log("this.props.state:" + this.props.state+data.taskTitle);
    };
    //初始数据
    fetchDataSource=()=>{
        pageIndex=0;
        console.log('页数==='+pageIndex);
        this.props.dispatch(loadFlowCenterWaitDataHomeFromServer({page:pageIndex,pagesize:pageSize}));
    };
    renderRow=(data)=>{
        //显示的日期:deliverTime
        var showTime = data.taskStartTime.split("T")[0];
        console.log('data:'+data.title+'时间=='+showTime);
        return (
            <TouchableOpacity onPress={()=>{this.rowPressedAction(data)}} style={{ width: GlobalSize.DeviceWidth ,backgroundColor:GlobalSize.colorBgGray}} >
                <View style={styles.rowContainer}>
                    <View style={styles.contentContainer}>
                        <Image style={styles.imageIcon} source={data.enabled ?require('../../../resource/images/App/ic_flow_on.png') :require('../../../resource/images/App/ic_flow_finished.png')} />
                        <Text style={data.enabled ?[styles.titleText]:[styles.titleTextUnTouch]} numberOfLines={2}>{data.taskTitle}</Text>
                    </View>
                    <Text style={[GlobalStyle.cellMinText,styles.dateText]}>{showTime}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    loadMore=()=>{
        pageIndex++;
        this.props.dispatch(loadFlowCenterWaitDataHomeFromServer({page:pageIndex,pagesize:pageSize}));
    };
    renderFooter=()=>{
        let numRow = this.state.dataSource.getRowCount();
        if (numRow == 0) {
            return (
                <View></View>
            )
        }
        return (
            <ListFooter
                onPress={this.loadMore}
                isAllLoaded ={this.state.isAllLoad}
                isLoading ={pageIndex>0 && this.state.isLoading}
            />
        );
    }
    _renderPage=(items: Object, pageID: number | string)=>{
        if (items.length==8) {
            return (
                <View style={{width:GlobalSize.DeviceWidth}}>
                    <View style={styles.lineBoxContainer}>
                        {this.renderItems(items.slice(0,4))}
                    </View>
                    <View style={styles.lineBoxContainer}>
                        {this.renderItems(items.slice(4,8))}
                    </View>
                </View>
            );
        }else {
            var itemViewes = new Array();
            var rowViewes = new Array();
            var rowMax = 4;
            var rows = Math.ceil(items.length / rowMax);
            for (var i = 0; i < rows; i++) {
                var tempItemViewes = new Array();
                var rowStart = i * rowMax;
                for (var j = rowStart; j < (rowStart + rowMax); j++) {
                    var itemView;
                    if (j >= items.length) {
                        // break;
                        itemView = (
                            <View style={{flex:1,backgroundColor:'white'}}>
                            </View>
                        );
                    } else {
                        var itemData = items[j];
                        itemView = (
                            <ButtonUpDown
                                onPress={() => {this.pushToNextPage(itemData)}}
                                image={itemData.image}
                                text={itemData.title}
                                styleBg={{backgroundColor:'white'}}
                                styleText={{color:GlobalSize.colorBlackText}}
                            />
                        );
                    }
                    
                    
                    tempItemViewes.push(itemView);
                };
                rowViewes.push(
                    <View style={styles.lineBoxContainer}>
                        {tempItemViewes}
                    </View>
                );
                itemViewes.push(rowViewes);
            };
            
            // return(
            //     <View style={{backgroundColor:'white'}}>
            //         <View style={[styles.lineBoxContainer,{width:GlobalSize.DeviceWidth}]}>
            //             <View style={{flex:1,flexDirection:'row'}}>
            //                 {itemViewes}
            //                 <View style={{flex:1,backgroundColor:'white'}}>
            //                 </View>
            //             </View>

            //         </View>
            //         <View style={[styles.lineBoxContainer,{width:GlobalSize.DeviceWidth}]}>
            //         </View>
            //     </View>
            // )
            
            return(
                <View style={{backgroundColor:'white', flex: 1}}>
                    {itemViewes}
                </View>
            )

        }

    }
    _onChangePage=(page: number | string)=>{
        // PublicToast.logMessage('Current page: ' + page);
    }
    renderItems=(dataArr)=>{
        return dataArr.map((items,i)=>{
            return(
                <ButtonUpDown
                    key={i}
                    onPress={()=>{this.pushToNextPage(items)}}
                    image={items.image}
                    text={items.title}
                    styleBg={{backgroundColor:'white'}}
                    styleText={{color:GlobalSize.colorBlackText}}
                />
            )
        });
    }
    pushToNextPage(item){
        let moduleStates = this.props.moduleStates
        switch (item.key) {
            case 'guojunshuai'://暂作为测试的入口
                Actions.test();
                break;

            default:
                PublicToast.showMessage('该功能还未上线,敬请期待');
                break;
        }
    }
    render() {
        return (
            <View style={[styles.container]}>
                {this.defaultRenderNavigationBar() }
                <View style={{height:160}}>
                    <ViewPager
                        dataSource={new ViewPager.DataSource({
                            pageHasChanged: (p1, p2) => p1 !== p2
                        }).cloneWithPages(cardMenu)}
                        renderPage={this._renderPage}
                        onChangePage={this._onChangePage}
                        autoPlay={false}
                        isLoop={false}
                        initialPage={0}
                    />
                </View>
                    <View style={[styles.container,{marginBottom:50}]}>
                        <View style={styles.header}>
                            <View style={[{flex:1},{flexDirection:'row'},{alignItems:'flex-start'}]}>
                                <Image source={require('../../../resource/images/App/daiban.png')} style={[{width:20},{height:20}]} />
                                <Text style={styles.headerTitle}>待办</Text>
                            </View>
                            <TouchableOpacity onPress={this.pushToFlowCenterView} style={[{flex:1},{alignItems:'flex-end'}]}>
                                <View style={[{flex:1},{flexDirection:'row'},{alignItems:'center'}]}>
                                    <Text style={styles.headerAccessory}>流程中心</Text>
                                    <Image source={require('../../../resource/images/App/ic_right_line.png')} style={[{width:20},{height:20}]} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow.bind(this)}
                            enableEmptySections = {true}
                            onEndReachedThreshold={10}
                            refreshControl={
                                <ListRefreshControl
                                    refreshing={this.state.isLoading}
                                    onRefresh={this.fetchDataSource}
                                />
                            }
                            renderFooter={this.renderFooter}
                        />
                    </View>
            </View>
        );
    }
}

const flowCenterState=(state)=>{
    return{
        flowState: state.flowCenterState
    }
};

export default connect(flowCenterState)(WorkHome)

const styles = StyleSheet.create({
    container: {
        backgroundColor:GlobalSize.colorBgGray,
        flex:1
    },
    rowContainer:{
        backgroundColor:'white',
        padding:GlobalSize.cellPadding,
        marginBottom:1
    },
    webViewStyle: {
        flex: 1
    },
    header:{
        flexDirection:'row',
        marginTop:10,
        height:40,
        paddingLeft:GlobalSize.cellPadding,
        paddingRight:GlobalSize.cellPadding,
        backgroundColor:"#f6f6f6",
        alignItems:'center'
    },
    headerTitle:{
        flex:1,
        fontSize:GlobalSize.FontSizeTitle,
        marginLeft:5,
        justifyContent:'center'
    },
    headerAccessory:{
        fontSize:14,
        color:GlobalSize.colorTextDarkGray,
        textAlign:'right'
    },
    listContainer:{
        flex:1,
        backgroundColor:'white',
        padding:GlobalSize.cellPadding,
        marginBottom:1
    },
    contentContainer:{
        flexDirection:'row'
    },
    lineBoxContainer:{
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:GlobalSize.colorBgMain,
        height:80,
    },
    itemContainer:{
        flex:1,
        alignItems:'center',
        backgroundColor:'white',
        // marginRight:1,
        // marginBottom:1,
    },
    imageIcon:{
        width:15,
        height:15
    },
    titleText:{
        marginLeft:8,
        width:GlobalSize.DeviceWidth-15-2*GlobalSize.cellPadding-8
    },
    dateText:{
        alignSelf:'flex-end'
    },
    titleTextUnTouch:{
        color:GlobalSize.colorGrayText,
        marginLeft:8,
        width:GlobalSize.DeviceWidth-15-2*GlobalSize.cellPadding-8
    }
});
