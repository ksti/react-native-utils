/**
 * Created by yingying on 16/8/24.
 * 单元选择组件(只有2级,用section)
 */
import React ,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Image,
    TouchableOpacity,
    ListView,
    LayoutAnimation,
    UIManager
} from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class CaseReportTree extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state= {
            dataSource: ds.cloneWithRows([]),
            dataCopy:[],
            ds,
            showLevel:9999,
            buildNum:''

        };
        // const {dispatch} = props;
        // this.actions = bindActionCreators(caseReportAction, dispatch);
    }
// 节点
    // this.state.dataCopy.splice(Number(rowID)+1,0,{id:'1',name:rowData['level']+1==1?'1单元':'',level:rowData['level']+1,isEnd:rowData['level']+1==1?true:false,isOpen:false,countNum:''},);

    clickTreeNode=(rowData,rowID)=>{
        this.setState({
            buildNum:rowData.name
        });
        console.log('isEnd=='+rowData['isEnd']+'rowID'+rowID);
        if(rowData['isEnd']){
            this.props.clickTreeNode(rowData);
        }else{
            this.state.showLevel=9999;

            if(rowData['isOpen']){
                rowData['isOpen']=false;
                this.setState({dataSource: this.state.ds.cloneWithRows(this.state.dataCopy)});
            }else{
                rowData['isOpen']=true;
                if(Number(rowID)+1<this.state.dataCopy.length && this.state.dataCopy[Number(rowID)+1]['level']>rowData['level']){
                }else{
                    this.state.dataCopy.splice(Number(rowID)+1,0,{id:'1',name:rowData['level']+1==1?'1单元':'北京市',level:rowData['level']+1,countNum:'',isEnd:rowData['level']+1==1?true:false,isOpen:false},);
                    this.state.dataCopy.splice(Number(rowID)+1,0,{id:'2',name:rowData['level']+1==1?'2单元':'天津市',level:rowData['level']+1,countNum:'',isEnd:rowData['level']+1==1?true:false,isOpen:false},);
                    this.state.dataCopy.splice(Number(rowID)+1,0,{id:'4',name:rowData['level']+1==1?'3单元':'廊坊',level:rowData['level']+1,countNum:'',isEnd:rowData['level']+1==1?true:false,isOpen:false},);
                    this.state.dataCopy.splice(Number(rowID)+1,0,{id:'5',name:rowData['level']+1==1?'4单元':'秦皇岛',level:rowData['level']+1,countNum:'',isEnd:rowData['level']+1==1?true:false,isOpen:false},);
                    this.state.dataCopy.splice(Number(rowID)+1,0,{id:'6',name:rowData['level']+1==1?'5单元':'唐山',level:rowData['level']+1,countNum:'',isEnd:rowData['level']+1==1?true:false,isOpen:false},);
                }
                this.setState({dataSource: this.state.ds.cloneWithRows(this.state.dataCopy)});
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
    //跳转页面 选择楼层
    selectFloor=(rowData,rowID)=>{
        console.log('打印参数 '+this.state.buildNum+' ddddddd '+rowData.name);
        Actions.projectAcceptanceFloorSelect({title:"实测实量范围",buildNum:this.state.buildNum,unitNum:rowData.name})
    };
    renderRow=(rowData: object, sectionID: number, rowID: number) => {
        console.log('行ID'+rowID+'  '+rowData['level']);

        if (this.state.showLevel >= rowData['level']) {
            if (rowData['isOpen']) {
                this.state.showLevel = 9999;
            } else {
                this.state.showLevel = rowData['level'];
            }
            // FF4915
            if (rowData['level'] === 0) {
                return (
                    <TouchableOpacity onPress={()=>{this.clickTreeNode(rowData,rowID)}}>
                        <View style={[styles.row,{backgroundColor: '#ffffff'}]}>
                            <Text numberOfLines={1} style={[styles.text,{color:'black'},{flex:1},{marginLeft:15}]}>
                                {rowData['name']}
                            </Text>
                            <View style={styles.level0}>
                                <Image source={require('../../resource/images/Comm/arrowl.png')} style={[{width:20},{height:20},{marginRight:10},{marginTop:5}]} />
                                <Text numberOfLines={1} style={[{color:'red'}]}>
                                    {rowData['countNum']}
                            </Text>
                        </View>
                        </View>
                    </TouchableOpacity>
                );
            } else if(rowData['level']=== 1){ //F19029
                return (
                    <TouchableOpacity onPress={()=>{this.selectFloor(rowData,rowID)}}>
                        <View style={[styles.row,{flexDirection: 'row'}]}>
                                <View style={{flex:1}}>
                                    <Text numberOfLines={1} style={[styles.text,{color:'black'},{marginLeft:15}]}>
                                        {rowData['name']}
                                    </Text>
                                </View>
                               <Image source={require('../../resource/images/Comm/arrowl.png')}
                                       style={[{width:20},{height:20},{marginRight:10},{marginTop:5}]} />
                    </View>
                    </TouchableOpacity>
                );
            } else {
            return (
                <View style={{flex:1}}>

                </View>
            );
        }
    }else{
            return null
        }

};
    componentDidMount() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        // this.state.dataCopy = [{id:'00',name:'1#', countNum:'3', level:0,isEnd:false,isOpen:false,isSelect:false}
        // ,{id:'01',name:'2#', countNum:'5', level:0,isEnd:false,isOpen:false,isSelect:false}
        // ];
        this.state.dataCopy = [{id:'00',name:'#1', countNum:'4', level:0,isEnd:false,isOpen:false,isSelect:false}
        ,{id:'01',name:'#2', countNum:'5', level:0,isEnd:false,isOpen:false,isSelect:false}
        ];
        console.log('dataCopy'+this.state.dataCopy);
        this.setState({dataSource: this.state.ds.cloneWithRows(this.state.dataCopy)});
    }
    render(){
        return(
            <View style={{flex:1 , backgroundColor:'white'}}>
                <ListView
                    style={styles.list}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    pageSize={30}
                />
            </View>
        );
    }

}
var styles = StyleSheet.create({
    sectionStyle:{
        flexDirection:'row',
        height:44
    },
    rowsStyle: {
        flexDirection:'row',
        height:44
    },
    sectionRightStyle:{
        flexDirection:'row-reverse'
    },
    floorStyle:{
        flex:1,
        marginLeft:10
    },
    level0:{
        flexDirection:'row-reverse'
    },
    row: {
        height: 60,
        flex:1,
        flexDirection: 'row',
    },
    list:{
        flex:1,
        paddingTop:10,
        zIndex:1
    },


});
