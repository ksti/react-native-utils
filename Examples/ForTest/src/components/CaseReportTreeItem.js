/**
 * Created by yingying on 16/8/2.
 界面功能：案场报表Tree第一级Item
 props：dataType:列表数据
 */

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
let HTTPRequest = new httpRequest(true);

export default  class CaseReportTreeItem extends Component {
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
        } else if (this.props.rowData.level === 1) {
            params = {
                OrgCode: this.props.rowData.id,
                CityCode: '',
                ProjectCode: '',
                TimeCategory: 'Year',
                DateStar: '',
                DateEnd: ''
            };
        } else if (this.props.rowData.level === 2) {
            params = {
                OrgCode: this.props.rowData.parentCode,
                CityCode: this.props.rowData.id,
                ProjectCode: '',
                TimeCategory: 'Year',
                DateStar: '',
                DateEnd: ''
            };
        } else {
            params = {
                OrgCode: '',
                CityCode: '',
                ProjectCode: this.props.rowData.id,
                TimeCategory: 'Year',
                DateStar: '',
                DateEnd: ''
            };
        }
        console.log('loadData' + pathUrl);
        HTTPRequest.requestGetWithUrl(pathUrl, params,
            function (error, result, response) {
                console.log('loadData接口调用反馈');
                if (error) {
                    //调用接口失败
                    console.log('loadData调用接口失败2222' + response.status + error.message);
                } else {
                    if (result) {
                        this.setState({
                            nianqianyuejine: '年度签约金额:' + result[0].ResultData.SignReached[0].Amount + '万元',
                            shijidachenglv: '实际达成率:' + (result[0].ResultData.SignReached[0].AmountRate * 100) + '%',

                        });
                    } else {
                        console.log('loadData调用接口失败1111' + result);
                    }
                }
            }.bind(this));
    }

    render() {
        // if (this.props.rowData.level === 0) {
        //背景色
        let backGroundColor = '';
        //名称字体颜色
        let nameFontColor = '';
        //内容字体颜色
        let contentFontColor = '';
        //收放图片样式
        let isOpenImagePath = '';
        //按钮样式
        let btnStyles;
        //按钮字体样式
        let btnTextStyles;
        if (this.props.rowData.level == 0) {
            backGroundColor = '#ffffff';
            nameFontColor = 'black';
            contentFontColor = 'gray';
            isOpenImagePath = this.props.rowData.isOpen ? require('../../resource/images/App/ic_gray_downArrow.png') : require('../../resource/images/App/ic_gray_rightArrow.png');
            btnStyles = styles.buttonGrayView;
            btnTextStyles = styles.seeGrayButton;
        } else if (this.props.rowData.level == 1) {
            backGroundColor = '#A6A6A6';
            nameFontColor = 'white';
            contentFontColor = 'white';
            isOpenImagePath = this.props.rowData.isOpen ? require('../../resource/images/App/ic_white_downArrow.png') : require('../../resource/images/App/ic_white_rightArrow.png');
            btnStyles = styles.buttonWhiteView;
            btnTextStyles = styles.seeWhiteButton;
        } else if (this.props.rowData.level == 2) {
            backGroundColor = '#D5D1D1';
            nameFontColor = 'white';
            contentFontColor = 'white';
            isOpenImagePath = this.props.rowData.isOpen ? require('../../resource/images/App/ic_white_downArrow.png') : require('../../resource/images/App/ic_white_rightArrow.png');
            btnStyles = styles.buttonWhiteView;
            btnTextStyles = styles.seeWhiteButton;
        } else if (this.props.rowData.level == 3) {
            backGroundColor = '#ffffff';
            nameFontColor = 'black';
            contentFontColor = 'gray';
            isOpenImagePath = this.props.rowData.isOpen ? require('../../resource/images/App/ic_gray_downArrow.png') : require('../../resource/images/App/ic_gray_rightArrow.png');
            btnStyles = styles.buttonGrayView;
            btnTextStyles = styles.seeGrayButton;
        }
        let height = 0;
        if (this.props.rowData.isStart) {
            height = 10;
        }

        return (
            <TouchableOpacity onPress={this.props.clickTreeNode}>
                <View>
                    <View style={{height: height, width: GlobalSize.DeviceWidth}}/>
                    <View style={{height: 1, width: GlobalSize.DeviceWidth}}/>
                    <View style={[styles.row, {backgroundColor: backGroundColor}]}>
                        <Image
                            source={isOpenImagePath}
                            style={[{width: 20}, {height: 20}, {marginLeft: 10}, {marginTop: 5}]}/>
                        <View style={styles.contentContainer}>
                            <Text numberOfLines={1} style={[styles.text, {color: nameFontColor}]}>
                                {this.props.rowData.name}
                            </Text>
                            <Text numberOfLines={1} style={[styles.SubText, {color: contentFontColor}]}>
                                {this.state.nianqianyuejine + '      ' + this.state.shijidachenglv}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={this.props.clickLookOver}>
                            <View style={btnStyles}>
                                <Text style={btnTextStyles}>{'查看'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
var styles = StyleSheet.create({

    contentContainer: {
        flexDirection: 'column',
        marginRight: 10,
        flex: 1
    },
    seeGrayButton: {
        color: 'gray',
        fontSize: 14
    },
    seeWhiteButton: {
        color: 'white',
        fontSize: 14
    },
    buttonGrayView: {
        marginRight: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        width: 80,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    buttonWhiteView: {
        marginRight: 8,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        width: 80,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10

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
});