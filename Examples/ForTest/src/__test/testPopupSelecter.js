
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

import PublicToast from '../components/PublicToast'
import Orientation from 'react-native-orientation'
import BaseContainer from '../containers/BaseContainer';
import {httpRequest} from 'react-native-utils-gjs'

import {PopupSelecter} from 'react-native-utils-gjs'
import PopupFormPageDetail1 from '../components/PopupView/PopupFormPageDetail1'

export default class testPopupSelecter extends BaseContainer{
  constructor(props){
    super(props);
    this.state={
      animateType: 'none',
      dataSource: [
        {text: 'hello'},
        {text: 'world'},
        {text: 'hello'},
        {text: 'little'},
      ],
      imageSource: [
        // {
        //   name: '加号',
        //   // uri: require('../../../images/App/jiahao.png'),
        //   uri: 'file:../../images/App/jiahao.png',
        //   local: require('../../images/App/jiahao.png'),
        // }
      ],
    };
  }

  componentWillMount() {
    //The getOrientation method is async. It happens sometimes that
    //you need the orientation at the moment the js starts running on device.
    //getInitialOrientation returns directly because its a constant set at the
    //beginning of the js code.
    var initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      //do stuff
    } else {
      //do other stuff
    }
  }

  componentDidMount() {
    // Orientation.lockToPortrait(); //this will lock the view to Portrait
    //Orientation.lockToLandscape(); //this will lock the view to Landscape
    Orientation.unlockAllOrientations(); //this will unlock the view to all Orientations

    Orientation.addOrientationListener(this._orientationDidChange);
  }

  componentWillUnmount() {
    Orientation.getOrientation((err,orientation)=> {
      console.log("Current Device Orientation: ", orientation);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  defaultNavigationTitle(){
      return{
          title:'测试 PopupSelector',
          tintColor:this.defaultTintColor()
      };
  }

   _orientationDidChange = (orientation) => {
    if (orientation == 'LANDSCAPE') {
      //do something with landscape layout
    } else {
      //do something with portrait layout
    }
  }

  popupPage = (animateType, identifier) => {
    this.setState({
      animateType,
    })
    // this.basePopupPage.show(null, 200, 250);
    // this.basePopupPage.show();
    // this[identifier].show(null, Dimensions.get('window').width - 50, (this.state.dataSource.length + 1) * 44);
    this[identifier].show();
  }

  _onClose = (savedData, identifier) => {
    this[identifier].dismiss();
  }

  _onSelect = (rowData, sectionID, rowID, identifier) => {
    PublicToast.showMessage('U selected : ' + rowData.text);
    this[identifier].dismiss();
  }
        

  render(){

    return(
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        {this.defaultRenderNavigationBar()}
        <StatusBar
           // barStyle="light-content"
           barStyle="default"
        />
        <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('popup', 'PopupSelecterRelative')}> 'PopupSelecterRelative' </Text>
        <PopupSelecter
          // animateType={this.state.animateType}
          animateType='popup' 
          ref={(PopupSelecter) => {this.PopupSelecterRelative = PopupSelecter}}
          // width={200}
          // height={(this.state.dataSource.length + 1) * 44}
          position='relative'
          headerLeftText='左边标题'
          headerRightText='右边按钮'
          dataSource={this.state.dataSource}
        />
        <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('popup', 'PopupSelecterRelative2')}> 'PopupSelecterRelative2' </Text>
        <View 
          pointerEvents='box-none'
          // style={{
          //   flex: 1, 
          //   position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, 
          //   zIndex: 888,
          //   overflow: 'hidden',
          // }}
          style={{
            // flex: 1, 
            height: 1, 
            zIndex: 888,
            overflow: 'visible',
          }}
        >
          <PopupSelecter
            // animateType={this.state.animateType}
            animateType='popup' 
            ref={(PopupSelecter) => {this.PopupSelecterRelative2 = PopupSelecter}}
            // width={200}
            // height={(this.state.dataSource.length + 1) * 44}
            position='relative'
            headerLeftText='左边标题'
            headerRightText='右边按钮'
            dataSource={this.state.dataSource}
          />
        </View>
        <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('popup', 'PopupSelecter')}> 'PopupSelector' </Text>
        <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('popup', 'PopupSelecter2')}> 'PopupSelector2' </Text>
        <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('popup', 'PopupFormPageDetail1')}> 'PopupFormPageDetail1' </Text>
        <PopupSelecter
          // animateType={this.state.animateType}
          animateType='popup' 
          ref={(PopupSelecter) => {this.PopupSelecter = PopupSelecter}}
          // width={200}
          // height={(this.state.dataSource.length + 1) * 44}
          position='absolute'
          headerLeftText='左边标题'
          headerRightText='右边按钮'
          dataSource={this.state.dataSource}
        />
        <PopupSelecter
          // animateType={this.state.animateType}
          animateType='popup' 
          ref={(PopupSelecter) => {this.PopupSelecter2 = PopupSelecter}}
          // width={200}
          // height={(this.state.dataSource.length + 1) * 44}
          headerLeftText='左边标题'
          headerRightText='右边按钮'
          closeButton={(
            <Image source={require('../../resource/images/App/ic_delete.png')} style={[{width: 20, height: 20}]} />
          )}
          onClose={(savedData) => this._onClose(savedData, 'PopupSelecter2')}
          onSelect={(rowData, sectionID, rowID) => this._onSelect(rowData, sectionID, rowID, 'PopupSelecter2')}
          dataSource={this.state.dataSource}
        />
        <PopupFormPageDetail1
          // animateType={this.state.animateType}
          animateType='popup'
          ref={(PopupFormPageDetail1) => {this.PopupFormPageDetail1 = PopupFormPageDetail1}}
          width={Dimensions.get('window').width}
          height={300}
          leftWidth={85}
          headerLeftText='钢筋笼'
          headerRightText='保存'
          onClose={(savedData) => this._onClose(savedData, 'PopupFormPageDetail1')}
          inspectionStandard='的嘎嘎国家来看楼兰古国军绿色偶几个垃圾费啦；房间的熟老地方；安抚；啊'
          max={9}
          hiddenWhenMax={true}
          imageSource={this.state.imageSource}
        />

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
