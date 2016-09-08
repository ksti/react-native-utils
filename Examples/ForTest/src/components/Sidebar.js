/*
 侧边栏
 props：
 width  宽度属性，  必须给
 toglie 方法自动显示隐藏
 */

import React,{
    Component
} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableHighlight,
    PanResponder,
    Animated,
    Easing,
    ToastAndroid,
    Dimensions
}from 'react-native'

import GlobalSize from '../common/GlobalSize'

export default class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state={
            anim:new Animated.Value(0),
            isShow:false
        }
    }
    componentDidMount(){

        // Animated.timing(this.state.anim, {
        //     toValue: 1, // 目标值
        //     duration: 2500, // 动画时间
        //     easing: Easing.linear // 缓动函数
        // }).start();
    }
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
            onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderEnd,
            onPanResponderTerminate: this._handlePanResponderEnd,
        });
    }

    _handleStartShouldSetPanResponder=(e: Object, gestureState: Object)=>{
    // Should we become active when the user presses down on the circle?
        return true;
    }

    _handleMoveShouldSetPanResponder=(e: Object, gestureState: Object)=>{
        // Should we become active when the user moves a touch over the circle?
        return true;
    }

    _handlePanResponderGrant=(e: Object, gestureState: Object) =>{
    }
    _handlePanResponderMove=(e: Object, gestureState: Object) =>{

    }
    _handlePanResponderEnd=(e: Object, gestureState: Object) =>{
        if(gestureState.dx>10)
        {
            this.toggle();
        }
    }

    toggle(){
        let myValue ;
        if(this.state.isShow){
            myValue = 0;
            this.setState({isShow:false});
        }else{
            myValue = 1;
            this.setState({isShow:true});
        }
        Animated.timing(this.state.anim, {
            toValue: myValue, // 目标值
            duration: 1000, // 动画时间
            easing: Easing.linear // 缓动函数
        }).start();
    }


    render(){
        var  myHeight = GlobalSize.DeviceHeight-(Platform.OS === 'ios'?64:44);
        return(
            <Animated.View
                style={[styles.SideBar, {
                    opacity: this.state.anim,height :myHeight,width: this.props.width
                    },{left: this.state.anim.interpolate({
                        inputRange: [0,1],
                        outputRange: [GlobalSize.DeviceWidth,GlobalSize.DeviceWidth-this.props.width]})}]}
                {...this._panResponder.panHandlers}>
                {this.props.children}
            </Animated.View>
        );
    }
}
var styles = StyleSheet.create({
    SideBar :{
        position:'absolute',
        marginTop:(Platform.OS === 'ios'?64:44),
        backgroundColor:GlobalSize.colorBgGray,
    },
});