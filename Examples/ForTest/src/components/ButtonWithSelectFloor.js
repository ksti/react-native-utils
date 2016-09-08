/**
 * Created by yingying on 16/8/31.
 * 选择楼层按钮
 */
import React,{
    Component
} from 'react'
import {
    View,
    StyleSheet,
    Animated,
    ListView,
    Text,
    Easing,
    TouchableOpacity,
    Image,
    Alert,
    LayoutAnimation,
    UIManager,
    ActivityIndicator,
    InteractionManager,
}from 'react-native'


import GlobalSize from '../common/GlobalSize'


export default class ButtonWithSelectFloor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit:false,
            floorNum: props.floorNum,
            needDeleteNum:'',
            stylesRowButton: props.stylesRowButton,
            rowText:props.rowText

        }
    }
    _onPress = () => {
       console.log('组件 单击')
        this.props.onPress();
    }
    _onLongPress = () => {
        console.log('组件 长按')
        this.setState({
            edit:this.state.edit=!this.state.edit
        });
        this.props.onLongPress();
    };
    deleteRow(){
      // alert("删除");
    }
    testAAA = () => {
        alert('test')
    };
    componentWillMount() {
        if (this.props.initial) {
            this.testAAA();
        }
    }
    render(){
        return(
            <TouchableOpacity onPress={this._onPress} onLongPress={this._onLongPress}
                              style={this.props.floorNum!==''?this.props.stylesRowButton:''}>
                <View>
                    <View style={this.props.rowText}>
                        <Text style={this.props.floorNum!==''?styles.text:''}>{this.state.floorNum}</Text>
                    </View>
                    <TouchableOpacity onPress={this.deleteRow()} style={[{position: 'absolute', top: -5,right: -7},
                           this.state.edit? {width:8,height:8}:{width:0,height:0}]}>
                         <Image
                                source={this.state.edit?require('../../resource/images/App/ic_delete_small.png'):require('../../resource/images/App/empty.png')}
                         />
                    </TouchableOpacity>
                </View>
           </TouchableOpacity>
        )
    }
}
var styles=StyleSheet.create({
    
    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold' ,
    },

});