'use strict';
import React, { Component } from 'react';
import  {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	StyleSheet,
	ToastAndroid,
} from 'react-native';

import Picker from 'react-native-picker';
var DateTimeSource = require('./DateTimeSource');

export default class DatePicker extends React.Component {
	constructor(props){
		super(props);
		this.state={
			loadText:'',
		}
	}

	_onPres1sHandle(){
		this.picker.toggle();
	}



	render(){
		return (
			<View style={{height: Dimensions.get('window').height}}>
	<TouchableOpacity style={{marginTop: 20,backgroundColor:'red'}} onPress={this._onPres1sHandle.bind(this)}>
	<Text>点我1</Text>
		</TouchableOpacity>
		<Text >{this.state.loadText}</Text>
		<Picker
		ref={picker => this.picker = picker}
		style={{height: 320}}
		showDuration={300}
		pickerData={DateTimeSource}
		selectedValue={['2015年12月', '12日', '1时30分']}
		onValueChange={(pickedValue) => {
			console.log(pickedValue);
			// ToastAndroid.show("onValueChange日期"+pickedValue,1000);
			this.setState({loadText:pickedValue});
		}}
		/>

	</View>
	);
	}
};

var styles = StyleSheet.create({
	flexContainer: {
		// 容器需要添加direction才能变成让子元素flex
		flexDirection: 'row',
		height:320
	},
});