
import React,{Component} from 'react'
import {
  View,
  Image,
  StatusBar,
  ScrollView,
  StyleSheet,
  Navigator,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native'
import BaseContainer from '../containers/BaseContainer';

var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');

import PublicToast from '../components/PublicToast'

import ImagePickerCrop from 'react-native-image-crop-picker';


export default class testImagePicker extends BaseContainer{
  constructor(props){
    super(props);
    this.state={
      avatarSource: '',
    };
  }

  defaultNavigationTitle(){
      return{
          title:'测试imagePicker',
          tintColor:this.defaultTintColor()
      };
  }

  showImagePicker = () => {
    // More info on all the options is below in the README...just some common use cases shown here
    var options = {
      title: 'Select Avatar',
      customButtons: {
        'Choose Photo from Facebook': 'fb',
      },
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      PublicToast.showMessage("#############"+JSON.stringify(response));
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
         PublicToast.showMessage("==============="+response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // You can display the image using either data...
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

        // or a reference to the platform specific asset location
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  showSinglePicker = () => {
    ImagePickerCrop.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      console.log(image);
      PublicToast.showMessage('xxx：' + image);
      // You can display the image using either data...
      const source = {uri: 'data:image/jpeg;base64,' + image.data, isStatic: true};

      // or a reference to the platform specific asset location
      if (Platform.OS === 'ios') {
        const source = {uri: image.path.replace('file://', ''), isStatic: true};
      } else {
        const source = {uri: image.path, isStatic: true};
      }

      this.setState({
        avatarSource: source
      });
    }).catch(error => {
      console.log(error.message);
      PublicToast.showMessage('yyy：' + error.message);
    });
  }

  showMutiplePicker = () => {
    ImagePickerCrop.openPicker({
      multiple: true,
      includeBase64: true
    }).then(images => {
      console.log(images);
      PublicToast.showMessage('xxx：' + images);
    }).catch(error => {
      console.log(error.message);
      PublicToast.showMessage('yyy：' + error.message);
    });
  }

  selectFromCamera = () => {
    ImagePickerCrop.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      console.log(image);
      PublicToast.showMessage('xxx：' + image);
      // You can display the image using either data...
      const source = {uri: 'data:image/jpeg;base64,' + image.data, isStatic: true};

      // or a reference to the platform specific asset location
      if (Platform.OS === 'ios') {
        const source = {uri: image.path.replace('file://', ''), isStatic: true};
      } else {
        const source = {uri: image.path, isStatic: true};
      }

      this.setState({
        avatarSource: source
      });
    }).catch(error => {
      console.log(error.message);
      PublicToast.showMessage('yyy：' + error.message);
    });
  }

  render(){
    return(
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        {this.defaultRenderNavigationBar()}
        <StatusBar
           // barStyle="light-content"
           barStyle="default"
        />
        <Text style={[styles.text, {marginTop:20}]} onPress={() => this.showImagePicker()}> show imagePicker </Text>
        <Image source={this.state.avatarSource} style={{height: 100, resizeMode: Image.resizeMode.contain}} />
        <Text style={[styles.text, {marginTop:20}]} onPress={() => this.showSinglePicker()}> show single imagePicker </Text>
        <Text style={[styles.text, {marginTop:20}]} onPress={() => this.showMutiplePicker()}> show mutiple imagePicker </Text>
        <Text style={[styles.text, {marginTop:20}]} onPress={() => this.selectFromCamera()}> select from camera </Text>
      </View>  
    );
  }

}

var styles= StyleSheet.create({
  container:{
    flex:1,
    flexDirection:"column",
  },
  text:{
    color:'green',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8,
    fontWeight: 'bold',
  },
})

