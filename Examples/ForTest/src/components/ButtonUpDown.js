/*
界面功能：按钮，文字在下，图标在上，
相关界面：参考首页菜单图标
props：
    1.图片源,
    2.点击事件
    3.按钮文字
    4.按钮背景style
    5.文字样式
*/
import React,{Component} from 'react'
import {
    Image,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'

export default class ButtonUpDown extends Component{

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            image: props.image,
            text: props.text,
            styleText: props.styleText,
        };
      }

    componentWillMount() {
        if (this.props.initial) {
            this.autoChangeSelect();
        }
    }

    _onPress = () => {
        if (this.props.autoChangeSelect) {
            this.autoChangeSelect();
        }
        this.props.onPress();
    }

    autoChangeSelect = () => {
        this.setState({
            image: this.state.image===this.props.selectedImage?this.props.image:this.props.selectedImage,
            text: this.state.text===this.props.selectedText?this.props.text:this.props.selectedText,
            styleText: this.state.styleText===this.props.selectedStyleText?this.props.styleText:this.props.selectedStyleText,
        });
    }
    setSelected = (selected) => {
        this.setState({
            image: !selected?this.props.image:this.props.selectedImage,
            text: !selected?this.props.text:this.props.selectedText,
            styleText: !selected?this.props.styleText:this.props.selectedStyleText,
        });
    }
    render(){
        return(
             <TouchableOpacity onPress={this._onPress} style={[styles.itemContainer,this.props.styleBg]}>
                 <View style={[styles.itemContainer]}>
                     <Image source={this.state.image} style={styles.image}/>
                     <Text style={[styles.text,this.state.styleText]}>{this.state.text}</Text>
                 </View>
             </TouchableOpacity>
        );
    }
}
var styles=StyleSheet.create({
    itemContainer:{
        flex:1,
        alignItems:'center',
    },
    image:{
        width:30,
        height:30,
        marginTop:15,
    },
    text:{
        marginTop:5,
        height:20,
        textAlign:'center',
    }
})
