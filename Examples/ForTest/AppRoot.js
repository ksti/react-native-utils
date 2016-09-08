import React from 'react';

import {AppRegistry, Navigator, StyleSheet, Text, Image, View, ToastAndroid,BackAndroid} from 'react-native'

import {Scene, Reducer, Router, Switch, TabBar, Modal, Schema, Actions} from 'react-native-router-flux'

//当前面面所需的组件
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//所需的页面容器
import WebViewContainer from './src/containers/WebViewContainer'
import ErrorContainer from './src/containers/ErrorContainer'
import Login from './src/Page/Login'
import InitialRoot from './src/Page/InitialRoot'

const reducerCreate = params => {
    const defaultReducer = Reducer(params);
    return (state, action) => {
        console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};
// const backAndroidHandler=()=>{
//     ToastAndroid.show('收到点击返回键信息...backAndroidHandler',ToastAndroid.SHORT);
//     return true
// }
//
//
// const onBackAndroid=()=>{
//     ToastAndroid.show('收到点击返回键信息...onBackAndroid',ToastAndroid.SHORT);
// }
//
// const onExitApp=()=>{
//     ToastAndroid.show('收到点击返回键信息...onExitApp',ToastAndroid.SHORT);
//     return true
// }
//
// function onback() {
//     ToastAndroid.show('收到点击返回键信息...',ToastAndroid.SHORT);
//     return true
// }
// BackAndroid.addEventListener('hardwareBackPress',function(){
//      ToastAndroid.show('收到点击返回键信息...',ToastAndroid.SHORT);
//     // if(global.myActions){
//     //     global.myActions.pop();
//     // }
//     Actions.projectAcceptanceMeasuredPage()
//       return true;
// });

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#333333'
    };
    return style;
};
export default class AppRoot extends React.Component {
    componentDidMount() {
        // global.myActions = Actions;
    }
    render() {
        // return <Router createReducer={reducerCreate} scenes={scenes} />
        //   //   <Router createReducer={reducerCreate} backAndroidHandler={backAndroidHandler} onBackAndroid ={onBackAndroid}  onExitApp={onExitApp} >
        return (
           <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}  >
                <Scene key="modal" component={Modal}>
                    {require('./Scenes')}
                    <Scene key="error" component={ErrorContainer}  hideNavBar={true}/>
                </Scene>
            </Router>
        );
    }
}
