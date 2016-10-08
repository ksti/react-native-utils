
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
import Orientation from 'react-native-orientation'
import BaseContainer from '../containers/BaseContainer';
import {httpRequest} from 'react-native-utils-gjs'

import PopupPage from 'react-native-utils-gjs'
import PopupListViewPage from '../components/customPopupPage/PopupListViewPage'


let HTTPRequest = new httpRequest();
// let strURL = 'https://moa.sinooceanland.com:10086/AnChangReportService/Interface_GetOrgInstitutionCodeService.service?userName=liming'
let strURL = 'http://wxtest.sinooceanland.net:10086/ImplementWebApi/AcceptanceApi/TenderListApi/'
// let parameter = {};
// let parameter = {UserCode: '5e03356b-0d68-4f58-82c3-900d2cb55feb'}; // liming
let parameter = {UserCode: 'eb55938c-ba97-4dda-ba8f-8bf8914ea245'}; // WML

export default class testPopupPage extends BaseContainer{
  constructor(props){
    super(props);
    this.state={
      animateType: 'none'
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

    //
    // this.testHandleResponse();
    // this.testPost();
  }

  componentWillUnmount() {
    Orientation.getOrientation((err,orientation)=> {
      console.log("Current Device Orientation: ", orientation);
    });
    Orientation.removeOrientationListener(this._orientationDidChange);
  }

  defaultNavigationTitle(){
      return{
          title:'测试popupPage',
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

  popupPage = (animateType) => {
    this.setState({
      animateType,
    })
    this.basePopupPage.show(null, 200, 100);
  }

  testHandleResponse = () => {
    HTTPRequest.handleResponse = true;
    HTTPRequest.requestGetWithUrl(strURL,parameter,
      function(error,responseData,response){
          if (error) {
              console.log('error: --> ' + error.message + 'response: --> ' + response);
              response.text().then((text) => {
                console.log('response text: --> ' + text);
              }).catch( err => {
                console.log('catch error: --> ' + err.message);
              });
          }else {
              if (responseData) {
                  console.log('responseData: --> ' + responseData);
              }else {
                  console.log('response: --> ' + response);
                  response.text().then((text) => {
                    console.log('response text: --> ' + text);
                  }).catch( err => {
                    console.log('catch error: --> ' + err.message);
                  });
              }
          }
    });
  }

  testPost = () => {
    HTTPRequest.contentType = 'form';
    HTTPRequest.normal = true;
    HTTPRequest.requestPostWithUrl(strURL,parameter,
      function(error,responseData,response){
          if (error) {
              console.log('error: --> ' + error.message + 'response: --> ' + response);
          }else {
              if (responseData) {
                  console.log('responseData: --> ' + responseData);
              }else {
                  console.log('response: --> ' + response);
              }
          }
    });
  }

  testFetch = (requestUrl) => {
    fetch(requestUrl, {
      method: 'GET',
    }).then((response) => {
      return response.json();
    },
    err => {
      return Promise.reject(err);
    })
    .then((responseData) => {
      console.log('***responseData: ' + responseData);
    },
    err => {
      console.log('***error: ' + err);
    })
    .done();
  }

  _renderFullScreen = () => {
    return(
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        {this.defaultRenderNavigationBar()}
        <StatusBar
           // barStyle="light-content"
           barStyle="default"
        />
        <PopupListViewPage
          animateType={this.state.animateType} 
          ref={(basePopupPage) => {this.basePopupPage = basePopupPage}}
          // height={200}
          position='absolute'
          // position='relative'
        />
        <ScrollView>
          <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('none')}> 'none' </Text>
          
          <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('popup')}> 'popup' </Text>
          <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('dropdown')}> 'dropdown' </Text>
          <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('bottomup')}> 'bottomup' </Text>
          <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('ltr')}> 'ltr' </Text>
          <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rtl')}> 'rtl' </Text>
          <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('ltrtop')}> 'ltrtop' </Text>
          <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('ltrbottom')}> 'ltrbottom' </Text>
          <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rtltop')}> 'rtltop' </Text>
          <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rtlbottom')}> 'rtlbottom' </Text>
          <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('openup')}> 'openup' </Text>
          <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rowcenter')}> 'rowcenter' </Text>
          <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rowtop')}> 'rowtop' </Text>
          <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rowbottom')}> 'rowbottom' </Text>
        </ScrollView>
      </View>  
    );
  }

  _renderFullView = () => {
    return(
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        {this.defaultRenderNavigationBar()}
        <StatusBar
           // barStyle="light-content"
           barStyle="default"
        />
        <View style={{flex: 1}}>
          <PopupListViewPage
            animateType={this.state.animateType} 
            ref={(basePopupPage) => {this.basePopupPage = basePopupPage}}
            // height={200}
            position='absolute'
            // position='relative'
          />
          <ScrollView>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('none')}> 'none' </Text>
            
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('popup')}> 'popup' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('dropdown')}> 'dropdown' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('bottomup')}> 'bottomup' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('ltr')}> 'ltr' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rtl')}> 'rtl' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('ltrtop')}> 'ltrtop' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('ltrbottom')}> 'ltrbottom' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rtltop')}> 'rtltop' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rtlbottom')}> 'rtlbottom' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('openup')}> 'openup' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rowcenter')}> 'rowcenter' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rowtop')}> 'rowtop' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rowbottom')}> 'rowbottom' </Text>
          </ScrollView>
        </View>
      </View>  
    );
  }

  _renderFullViewRelative = () => {
    return(
      <View style={[styles.container, {backgroundColor: 'white'}]}>
        {this.defaultRenderNavigationBar()}
        <StatusBar
           // barStyle="light-content"
           barStyle="default"
        />
        <View style={{flex: 1}}>
          <ScrollView >
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('none')}> 'none' </Text>
            <View 
              pointerEvents='box-none'
              // style={{
              //   flex: 1, 
              //   position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, 
              //   zIndex: 888,
              //   overflow: 'hidden',
              // }}
              style={{
                flex: 1, 
                height: 1, 
                zIndex: 888,
                overflow: 'visible',
              }}
            >
              <PopupListViewPage
                animateType={this.state.animateType} 
                ref={(basePopupPage) => {this.basePopupPage = basePopupPage}}
                // height={200}
                // position='absolute'
                position='relative'
              />
            </View>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('popup')}> 'popup' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('dropdown')}> 'dropdown' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('bottomup')}> 'bottomup' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('ltr')}> 'ltr' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rtl')}> 'rtl' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('ltrtop')}> 'ltrtop' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('ltrbottom')}> 'ltrbottom' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rtltop')}> 'rtltop' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rtlbottom')}> 'rtlbottom' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('openup')}> 'openup' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rowcenter')}> 'rowcenter' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rowtop')}> 'rowtop' </Text>
            <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('rowbottom')}> 'rowbottom' </Text>
          </ScrollView>
        </View>
      </View>  
    );
  }

  render(){
    return(
      this._renderFullView()
    );

    // return(
    //   <View style={[styles.container, {backgroundColor: 'white'}]}>
    //     {this.defaultRenderNavigationBar()}
    //     <StatusBar
    //        // barStyle="light-content"
    //        barStyle="default"
    //     />
    //     <Text style={[styles.text, {marginTop:2}]} onPress={() => this.popupPage('none')}> 'none' </Text>
    //     <CustomPopupPage
    //       animateType={this.state.animateType} 
    //       ref={(basePopupPage) => {this.basePopupPage = basePopupPage}}
    //       height={200}
    //       position='absolute'
    //     />
    //   </View>  
    // );
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
