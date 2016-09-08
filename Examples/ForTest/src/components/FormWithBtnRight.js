/**
 * Created by zhangbo on 16/8/12.
 */

'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import GlobalSize from '../common/GlobalSize'

export default class FirstC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placeholderText: props.placeholderText,
            value:props.value,
        };
    }

    render() {
        let {text, image1, image2, _onPress1, _onPress2} = this.props;
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.textView}>
                        <Text>
                            {text}
                        </Text>
                    </View>
                    <View style={styles.textInputView}>
                        <TextInput style={styles.textInput}
                                ref = 'textInput'
                                   placeholder={this.state.placeholderText}
                                   onChangeText ={this.props.onChangeText}
                                   keyboardType='email-address'
                                   selectTextOnFocus={true}
                                   onChange ={this.props.onChange}
                                   keyboardAppearance="default"
                                   value = {this.state.value}
                        />
                    </View>
                    <View style={{flexDirection: 'row',marginRight:10,width:100}}>
                        <TouchableOpacity style={styles.touchableOpacity} onPress={_onPress1}>
                            <Image style={styles.image} source={image1}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.touchableOpacity]} onPress={_onPress2}>
                            <Image style={[styles.image]} source={image2}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.borderView}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        // margin: 10
        height:40,
    },
    textView: {
        // flexDirection: 'row',
        // alignItems: 'center',
        justifyContent:'center',
        marginLeft: 4,
        width: 80,
        height: 30
    },
    textInputView: {
        marginLeft: 5
    },
    touchableOpacity: {
        marginLeft: 5,
    },
    image: {
        width: 29,
        height: 29
    },
    textInput: {
        width: GlobalSize.DeviceWidth-30*2-75-4*5-10,
        height: 30,
        marginTop:2,
        marginBottom:2,
        borderWidth: 1,
        borderColor: GlobalSize.colorBorderGray,
        borderRadius: 5,
        paddingLeft: 5,
        fontSize:13,
        textShadowRadius: 20,
        backgroundColor:'transparent',
        paddingBottom:0,
        paddingTop:0,
        paddingRight:5,
    },
    borderView:{
        marginLeft:5,
        marginRight:5,
        height:1,
        backgroundColor:GlobalSize.colorBorderGray,
    }
});
