'use strict';
import React, { Component } from 'react';
import  {
	View,
	Text,
	TouchableOpacity,
	Dimensions
} from 'react-native';

import Picker from 'react-native-picker';
var TimeSource = require('./TimeSource');

export default class DatePicker extends React.Component {

	_onPressHandle(){
		this.picker.toggle();
	}

	render(){
		return (
			<View style={{height: Dimensions.get('window').height}}>
				<TouchableOpacity style={{marginTop: 20,backgroundColor:'red'}} onPress={this._onPressHandle.bind(this)}>
					<Text>点我</Text>
				</TouchableOpacity>
				<Picker
					ref={picker => this.picker = picker}
					style={{height: 320}}
					showDuration={300}
					pickerData={TimeSource}
					selectedValue={['12时', '12分']}
					onPickerDone={(pickedValue) => {
						console.log(pickedValue);
					}}
				/>
			</View>
		);
	}
};