/**
 * Created by yingying on 16/9/2.
 * 可编辑 row  暂时只用作案场报表——关注（编辑）
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
import RCTDeviceEventEmitter from 'RCTDeviceEventEmitter'
var  CheckBoxData=[];
var  selectedData=[];

export default class CustomEditRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected:false,
            nianqianyuejine:'',
            shijidachenglv:'',
        }
    }

    initCheckBoxData(checkbox){
        if(checkbox!=null){
            CheckBoxData.push(checkbox);
        }
    }
    //全选
    selectedAll = ()=> {
       console.log('可编辑row 全选');
    // this.setState({
    //     selected:true
    // })
    };

    rowPressedAction=(rowData,rowID)=>{
        console.log('编辑与否:'+this.state.selected+'  '+rowData.code+'ID ==:'+rowID);
        this.setState({
            selected:this.state.selected=!this.state.selected
        });
        var dataRow =  {rowID:rowID,businessProjectCode:rowData.businessProjectCode,
            name:rowData.businessProjectName,
            parentCode:rowData.businessCode ,
            level:rowData.attentionType    };
        if(this.state.selected){
            selectedData.push(dataRow);
        }else{
            if(selectedData.length>0){
                for (var i=0;i<selectedData.length;i++){
                    if (selectedData[i].businessProjectCode === rowData.businessProjectCode){
                        selectedData.splice(i,1)
                    }
                }
            }
        }
        console.log('选中的数据:'+JSON.stringify(selectedData));
        this.props.finish(this, selectedData);
    };
    componentDidMount() {
        selectedData = [];
        this.loadData();
        this.listener = RCTDeviceEventEmitter.addListener('单选',(value)=>{
                // 接受到通知后的处理
            console.log('接收到通知***'+value)
            this.setState({
                selected:this.state.selected=false
            });
         });
        this.listener = RCTDeviceEventEmitter.addListener('全选',(value)=>{
            // 接受到通知后的处理
            console.log('接收到通知***'+value)
            this.setState({
                selected:this.state.selected=value
            });
        });
        this.listener = RCTDeviceEventEmitter.addListener('删除成功',(value)=>{
            // 接受到通知后的处理
            console.log('接收到通知***'+value)
            selectedData = [];
        });
    }

    componentWillUnmount(){
            // 移除 一定要写
        this.listener.remove();
    }
    loadData = ()=> {
        let pathUrl = GlobalSize.ProductURL + 'AnChangReportService/Interface_SaleSearchInterfaceService.service';
        let params;
        if (this.props.rowData.level === 0) {
            params = {OrgCode: '', CityCode: '', ProjectCode: '', TimeCategory: 'Year', DateStar: '', DateEnd: ''};
        }else if (this.props.rowData.level === 1) {
            params = {OrgCode: this.props.rowData.id, CityCode: '', ProjectCode: '', TimeCategory: 'Year', DateStar: '', DateEnd: ''};
        }else if (this.props.rowData.level === 2) {
            params = {OrgCode: this.props.rowData.parentCode, CityCode: this.props.rowData.id, ProjectCode: '', TimeCategory: 'Year', DateStar: '', DateEnd: ''};
        }else {
            params = {OrgCode: '', CityCode: '', ProjectCode: this.props.rowData.id, TimeCategory: 'Year', DateStar: '', DateEnd: ''};
        }
        console.log('loadData' + pathUrl);
        HTTPRequest.requestGetWithUrl(pathUrl, params,
            function (error, result, response) {
                console.log('loadData接口调用反馈');
                if (error) {
                    PublicToast.showMessage("请求失败");
                    if (response.status == 401) {
                        RefreshToken.refreshToken();
                    }
                    dispatch({
                        type: ActionConstants.CASE_REPORT_LOADING,
                        responseData:caseReportDS,
                        isLoading: false
                    });
                } else {
                    if (result) {
                        this.setState({
                            nianqianyuejine: '年度签约金额:'+result[0].ResultData.SignReached[0].Amount+'万元',
                            shijidachenglv:'实际达成率:'+(result[0].ResultData.SignReached[0].AmountRate*100)+'%',

                        });
                    } else {
                        console.log('loadData调用接口失败1111' + result);
                    }
                }
            }.bind(this));
    };
    render(){
        console.log('cus 是否选中:'+this.props.selected);
        return(
            <View style={{flexDirection:'column'}}>
                <TouchableOpacity onPress={() => this.rowPressedAction(this.props.rowData,this.props.rowID)}>
                <View style={[styles.row,{backgroundColor: 'white'}]} >
                        <CheckBox
                            ref={(c)=>this.initCheckBoxData(c)}
                            checked={this.state.selected}
                            containerStyle={{marginLeft:10,marginTop:20,width:20,height:20}}
                            checkedImage={require('../../resource/images/App/check_true.png')}
                            uncheckedImage={require('../../resource/images/App/check_false.png')}
                            onChange={() => this.rowPressedAction(this.props.rowData,this.props.rowID)}
                        />
                        <View style={[{marginLeft:10} ,styles.contentContainer]}>
                            <Text numberOfLines={1} style={[styles.text,{color:'black'}]}>
                                {this.props.businessProjectName}
                            </Text>
                            <Text numberOfLines={1} style={[styles.SubText,{color:'gray'}]}>
                                {this.state.nianqianyuejine + ' ' + this.state.shijidachenglv}
                            </Text>
                        </View>
                    <TouchableOpacity onPress={()=>{this.props.clickLookOver(this.props.rowData,this.props.rowID)}} style={styles.buttonGrayView}>
                            <View >
                                <Text style={[styles.seeGrayButton]}>{'查看'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
                <View style={{height:1,backgroundColor:GlobalSize.colorBgGray,flex:1}}></View>
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
