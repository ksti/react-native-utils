/*
界面功能：导航按钮
相关界面：首页右上角按钮
props：图片源
*/
import React,{Component} from 'react'
import {Image,View,Text,TouchableOpacity} from 'react-native'


export default class NavBarButton extends Component{
    render(){
        if(this.props.image){
            return(
                <TouchableOpacity onPress={this.props.handler} style={this.props.style}>
                    <View style={{width:40,height:40,justifyContent:'center',alignItems:'center'}}>
                        <Image source={this.props.image} style={[{width:25,height:25},]}
                        />
                    </View>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity onPress={this.props.handler} style={this.props.style}>
                    <View style={{height:40,justifyContent:'center',alignItems:'center'}}>
                        <Text style={this.props.tvStyle}>{this.props.text}</Text>
                        
                    </View>
                </TouchableOpacity>
            )
        }
       
    }
}
