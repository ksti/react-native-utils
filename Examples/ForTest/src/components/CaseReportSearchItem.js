'use strict';
import React, {
    Component
} from 'react'
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
}from 'react-native'
import {httpRequest} from 'react-native-utils-gjs'
import GlobalSize from '../common/GlobalSize'

export default  class CaseReportSearchItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nianqianyuejine: '',
            shijidachenglv: '',
        };
    }
    componentDidMount() {
        this.loadData();
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
    }
    render(){
        return(
            <View style={{flexDirection:'column'}}>
                    <View style={[styles.row,{backgroundColor: 'white'}]} >
                        <View style={[{marginLeft:10} ,styles.contentContainer]}>
                            <Text numberOfLines={1} style={[styles.text,{color:'black'}]}>
                                {this.props.businessProjectName}
                            </Text>
                            <Text numberOfLines={1} style={[styles.SubText,{color:'gray'}]}>
                                {this.state.nianqianyuejine + '      ' + this.state.shijidachenglv}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={()=>{this.props.clickLookOver(this.props.rowData,this.props.rowID)}} style={styles.buttonGrayView}>
                            <View >
                                <Text style={[styles.seeGrayButton]}>{'查看'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                <View style={{height:1,backgroundColor:GlobalSize.colorBgGray,flex:1}}></View>
            </View>
        )
    }
}
var styles = StyleSheet.create({

    container:{
        flex:1
    },
    buttonGrayView:{
        marginRight:8,
        borderWidth:1,
        borderColor:'gray',
        borderRadius:5,
        width:70,
        height:30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10
    },
    seeGrayButton:{
        color:'gray',
        fontSize:14
    },
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
    contentContainer:{
        flexDirection:'column',
        marginRight:10,
        marginLeft:10,
        flex:1
    }
});
