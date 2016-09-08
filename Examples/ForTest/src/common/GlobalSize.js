
/**
存放公用的属性值：字体，颜色，间距等
*/
import React,{
    Component
} from 'react'
import {
    Dimensions
} from 'react-native'

module.exports = {
    //BaseURL 列表测试接口（取自官网MovieDemo）
    ListTestURL:'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json',
    BaseURL :'http://wxtest.sinooceanland.net:10086/',
    ProductURL:'https://moa.sinooceanland.com:10086/',
    MeetingURL:'http://wxuat.sinooceanland.net:10086/',
    BaseWebURL:'http://wxtest.sinooceanland.net/',

    DeviceWidth: Dimensions.get("window").width,
    DeviceHeight: Dimensions.get("window").height,

    heightBtnMain:40,
    heightLitBtn:26,//二级按钮
    heightSubBtn:22,//小按钮
    heightScroll:160,//轮播图高度
    heightPortrait:78,//头像

    FontSizeTitle:14,
    FontSizeSubTitle:12,

    cellTitleFont:14,
    cellSubTitleFont:12,

    cellPadding:10, //左右留白

    colorBgGray:'#efeff4',//主背景色
    colorBorderGray:'#eaeaea',//边框分割线
    colorTextDarkGray:'#686868',

    colorRedMain:'#ff5001',//页面主题色
    colorOrangeMain:'#e89311',//页面主题色
    colorBlackText:'#3b3b3b',
    colorGrayText:'#a7a7a7',
    //顶部导航
    colorNavBar:'#333333',
    //按钮
    colorRedButton:'#ff5001',
    //其他图标用色
    colorLightRed:'#f96268',//红色
    colorBlueIcon:'#35b5e9',//淡蓝
    colorYellowIcon:'#edc917',//鹅黄色
    colorOrangeIcon:'#ffb359',//橘色
    colorGreenIcon:'#36bc99',//绿色
    colorGrayIcon:'#a7a7a7',//灰色

    // ModalListType={
        ModalListTypeCompany:'ListTypeCompany',    //会议申请-公司
        ModalListTypeCostCenter:'ListTypeCostCenter', //成本中心
        ModalListTypeDepartment:'ListTypeDepartment', //会议列表－部门
        ModalListTypeDate:'ListTypeDate', //统计
        ModalListTypeUserList:'ListTypeUserList',
    // }
    
    Global_IsFirstLaunch:'isFirstLaunch',
    Global_RefreshToken:'refreshToken',
    Global_AccessToken:'accessToken',//登录以后也可通过global.access_token读取
    Global_UserName:'userName', //登录后也可通过global.userName读取
    Global_IsOpenGesVerify:'gestureVerifyOpen',//global.isOpenGesPwd
    Global_IntervalTime:'gesturePwdIntervalTime',//global.intervalTime,单位分
};
