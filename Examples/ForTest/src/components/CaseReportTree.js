/**
 * Created by yingying on 16/8/2.
 界面功能：案场报表 左Tree
 props：dataType:列表数据
 */

'use strict';
import React, {
    Component
} from 'react'
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    ListView,
    Text,
    Easing,
    TouchableOpacity,
    Image,
    RecyclerViewBackedScrollView,
    LayoutAnimation,
    UIManager,
}from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Actions} from 'react-native-router-flux';
import * as allAction from '../reduxDataFlow/actions';
import {loadCaseReportListDataFromServer} from '../reduxDataFlow/actions';
import CaseReportDept  from './CaseReportDept'
import CaseReportTreeItem from './CaseReportTreeItem'
var rowTree = [];
export class CaseReportTree extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            ds,
            showLevel: 9999,
            selectNodeM: [],
        };
        const {dispatch} = props;
        this.actions = bindActionCreators(allAction, dispatch);
        console.log('CaseReportDate初始化数据');
        CaseReportDept.initDept(this.callBack);
    }

    callBack = (results)=> {
        console.log('回调方法' + results);
        for (let i = 0; i < results.length; i++) {
            let row = results.item(i);
            console.log('查询结果' + row.code + '==' + row.name + '==' + row.parentCode);
            if (i===0) {
                rowTree = [{
                    id: row.code,
                    parentCode: row.parentCode,
                    name: row.name,
                    subName: '年度签约金额:??',
                    subFinished: '实际达成率:??%',
                    level: row.level,
                    isStart: true,
                    isOpen: false,
                    isSelect: false
                }];
            } else {
                rowTree = [{
                    id: row.code,
                    parentCode: row.parentCode,
                    name: row.name,
                    subName: '年度签约金额:??',
                    subFinished: '实际达成率:??%',
                    level: row.level,
                    isStart: false,
                    isOpen: false,
                    isSelect: false
                }];
            }
        }
        this.setState({dataSource: this.state.ds.cloneWithRows(rowTree)});

    }


// 节点
    clickTreeNode = (rowData, rowID)=> {
        this.hiddenOther(rowData['level'], rowID, rowData);
        if (rowData['level'] == 3) {
            // this.props.clickTreeNode(rowData);
        } else {
            this.state.showLevel = 9999;
            if (rowData['isOpen']) {
                rowData['isOpen'] = false;
                console.log('不明白这里是干什么的这里应该清理');
                this.setState({dataSource: this.state.ds.cloneWithRows(rowTree)});
            } else {
                rowData['isOpen'] = true;
                if (Number(rowID) + 1 < rowTree.length && rowTree[Number(rowID) + 1]['level'] > rowData['level']) {
                    console.log('不明白这里是干什么的true');
                    this.setState({dataSource: this.state.ds.cloneWithRows(rowTree)});
                } else {
                    console.log('不明白这里是干什么的false');
                    CaseReportDept.queryChildDept(rowData['id'], (results)=> {
                        console.log('子节点回调方法' + results);
                        for (let i = 0; i < results.length; i++) {
                            let row = results.item(i);
                            console.log('查询结果' + row.code + '==' + row.name + '==' + row.parentCode);
                            if (i===0) {
                                rowTree.splice(Number(rowID) + i + 1, 0, {
                                    id: row.code,
                                    name: row.name,
                                    parentCode: row.parentCode,
                                    subName: '年度签约金额:??',
                                    subFinished: '实际达成率:??%',
                                    level: row.level,
                                    isStart: true,
                                    isOpen: false,
                                    isSelect: false
                                });
                            } else {
                                rowTree.splice(Number(rowID) + i + 1, 0, {
                                    id: row.code,
                                    name: row.name,
                                    parentCode: row.parentCode,
                                    subName: '年度签约金额:??',
                                    subFinished: '实际达成率:??%',
                                    level: row.level,
                                    isStart: false,
                                    isOpen: false,
                                    isSelect: false
                                });
                            }
                        }
                        this.setState({dataSource: this.state.ds.cloneWithRows(rowTree)});
                    });
                }
                // this.setState({dataSource: this.state.ds.cloneWithRows(this.state.dataCopy)});

            }
        }
        LayoutAnimation.configureNext({
            duration: 80,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'linear',
                property: 'opacity'
            }
        });
    };

    hiddenOther(level, rowID, rowData) {  //同一level下只能有一个open
        for (var i = 0; i < rowTree.length; i++) {
            if (rowTree[i]['level'] === level && rowData['id'] !== rowTree[i]['id']) {
                rowTree[i]['isOpen'] = false;
                this.setState({
                    dataSource: this.state.ds.cloneWithRows(rowTree)
                })
            } else {

            }
        }
    }

    //数据入口
    componentWillReceiveProps(nextProps) {
        // var caseReportData = nextProps.caseReportState.caseReportData;
        // alert('willReceiveProps:将要接收到props'+caseReportData);
        // if (caseReportData){
        //     this.setState({
        //         dataSource:this.state.dataSource.cloneWithRows(caseReportData),
        //         isLoading:nextProps.flowState.isLoadingCaseReport
        //     });
        // }
        // if(nextProps.caseReportState.error==true){
        // }
    }

    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // this.props.dispatch(loadCaseReportListDataFromServer({page:pageIndex,pagesize:pageSize}));


    }

    render() {
        return (
            <ListView
                style={styles.list}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                pageSize={30}
            />
        );
    }

    clickLookOver = (rowData, rowID)=> {
        this.props.clickLookOver(rowData, rowID);
    };

    _renderRow = (rowData: object, sectionID: number, rowID: number) => {
        if (this.state.showLevel >= rowData['level']) {
            if (rowData['isOpen']) {
                this.state.showLevel = 9999;
            } else {
                this.state.showLevel = rowData['level'];
            }
            return (
                <CaseReportTreeItem clickTreeNode={()=> {
                    this.clickTreeNode(rowData, rowID)
                }} clickLookOver={()=> {
                    this.clickLookOver(rowData, rowID)
                }} rowData={rowData}/>
            );
        }
        else {
            return null;
        }
    }
}
;
const caseReportStore = (state)=> {
    return {
        caseReportState: state.caseReportState
    }
};
export default CaseReportTree = connect(caseReportStore)(CaseReportTree);
var styles = StyleSheet.create({
    list: {
        flex: 1,
        zIndex: 1
    },
    contentContainer: {
        flexDirection: 'column',
        marginRight: 10,
        flex: 1
    },
    row: {
        height: 60,
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        marginLeft: 6,
        marginTop: 8,
        fontWeight: 'bold',
        fontSize: 14,
        color: '#3b3b3b',
        flex: 1,
    },
    SubText: {
        fontSize: 12,
        marginLeft: 6,
        marginTop: 8,
        color: '#3b3b3b',
        flex: 1,
    },
    imageIcon: {
        width: 16,
        height: 16,
        margin: 1,
        marginTop: 7,
    }
});