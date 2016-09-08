import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView,
    BackAndroid,
    ToastAndroid,
    Platform,
} from 'react-native';

/**
 * 全局样式
 */
import GlobalStyle  from '../common/GlobalStyle'

/**
 * Navigation Bar
 */
import NavigationBar from 'react-native-navbar';
import NavBarButton from '../components/NavBarButton';
import Orientation from 'react-native-orientation';
/**
 * router
 */
import { Actions } from 'react-native-router-flux';


// BackAndroid.addEventListener('hardwareBackPress',function(){
//     ToastAndroid.show('收到点击返回键信息...',ToastAndroid.SHORT);
//     if (_this.props.navigator && _this.props.navigator.getCurrentRoutes().length > 1) {
//         _this.props.navigator.pop();
//         ToastAndroid.show('收到点击返回键信息...2',ToastAndroid.SHORT);
//         return true;
//     }
//     return false;
// });
//
// var _this;


export default class BaseContainer extends Component {

    constructor(props)
    {
        Orientation.lockToPortrait();
        super(props);
        _this = this;
    }


    // componentWillMount() {
    //     if (Platform.OS === 'android') {
    //         BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    //     }
    // }
    // componentWillUnmount() {
    //     if (Platform.OS === 'android') {
    //         BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    //     }
    // }
    //
    // onBackAndroid = () => {
    //     ToastAndroid.show('点击返回键',ToastAndroid.SHORT);
    //     Actions.pop();
    //     return true;
    // }



    //默认导航上的Title
    defaultNavigationTitle()
    {
      return {
            title:this.props.title,
            tintColor:this.defaultTintColor()
        };
    }

    //默认状态
    defaultAppStatusBar()
    {
        return {
            style: 'light-content',
            tintColor: '#333333'
        }
    }

    defaultTintColor()
    {
        return '#ffffff';
    }

    defaultRenderNavigationBar()
    {
        return  <NavigationBar style={[GlobalStyle.navigationBar]}
                    title={this.defaultNavigationTitle()}
                    tintColor = {this.defaultTintColor()}
                    statusBar = {this.defaultAppStatusBar()}
                    leftButton = {this.defaultRenderNavigationBarLeftButton()}
                    rightButton = {this.defaultRenderNavigationBarRightButton()}
                    />;
    }

   defaultRenderNavigationBarRightButton()
   {
       return <View />;
   }
   
   defaultRenderNavigationBarLeftButton()
   {
       return(
           <NavBarButton
              style={GlobalStyle.leftButton}
              image={require('../../resource/images/App/ic_nav_back.png') }
              handler={() => Actions.pop() }
           />
        )
    //    return {
    //        title: '返回',
    //        tintColor: this.defaultTintColor(),
    //        handler: () => Actions.pop(),
    //        style: GlobalStyle.leftButton
    //    }
   }
}
