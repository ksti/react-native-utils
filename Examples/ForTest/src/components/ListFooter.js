/*
    列表表尾：加载更多
    属性:
        1.allLoaded-是否加载完毕
        2.onPress 点击方法
        3.isLoading 是否是正在加载
*/

import React,{Component} from 'react'
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import GlobalSize from '../common/GlobalSize'

export default class ListFooter extends Component{
    constructor(props){
        super(props);
    }
    render(){
        console.log('footer-加载完毕:',this.props.isAllLoaded);
        if (this.props.isAllLoaded) {
            return(
                <View style={{justifyContent:'center',height:50,backgroundColor:GlobalSize.colorBgGray}}>
                    <Text style={{textAlign:'center'}}>
                        加载完毕
                    </Text>
                </View>
            );
        }else if(this.props.isLoading){
            return(
                <TouchableOpacity style={{backgroundColor:GlobalSize
                .colorBgGray}}>
                    <View style={{flex:1,height:50}}>
                        <View style={{flex:1, justifyContent:'center'}}>
                            <ActivityIndicator
                                animating={true}
                                size='small'
                                color={GlobalSize.colorGrayText}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }else {
            return(
                <TouchableOpacity onPress={()=>this.props.onPress()} style={{backgroundColor:GlobalSize
                .colorBgGray}}>
                    <View style={{flex:1,height:50}}>
                        <View style={{flex:1, justifyContent:'center'}}>
                            <Text style={{textAlign:'center',height:20}}>加载更多</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
    }
}
