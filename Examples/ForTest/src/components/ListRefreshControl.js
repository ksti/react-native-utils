/*
    列表表尾：加载更多
    属性:
        1.allLoaded-是否加载完毕
        2.onPress 点击方法
*/

import React,{Component} from 'react'
import {
    RefreshControl,
} from 'react-native'

export default class ListRefreshControl extends Component{
    constructor(props){
        super (props)
    }
    render(){
        return(
            <RefreshControl
              {...this.props}
              refreshing={this.props.refreshing}
              onRefresh={this.props.onRefresh}
              tintColor="#000000"
              title={this.props.refreshing? "正在刷新...":"下拉刷新"}
              titleColor="#000000"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffffff"
             />
        );
    }
}
