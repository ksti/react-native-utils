/*
界面功能：筛选组件
相关界面：新闻中心...
props：dataType:1通知纪要,2新闻中心
*/

import React,{
    Component
} from 'react'
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    ListView,
    Text,
    Easing,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Platform,
}from 'react-native'

import {httpRequest} from 'react-native-utils-gjs'
import GlobalSize from '../common/GlobalSize'
import PublicToast from '../components/PublicToast'
import RefreshToken from './RefreshToken'
let HTTPRequest = new httpRequest();

export default class SearchSelectView extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
          viewEvents:'none',
          heightAnimated: new Animated.Value(0),
          heightValue: 0,
          fadeInOpacity: new Animated.Value(0),
          dataSource: ds.cloneWithRows([]),
        }
    }
    showOrClose = () => {
      if(this.state.viewEvents==="none"){
        this.setState({viewEvents:"auto"});
          Animated.timing(this.state.fadeInOpacity, {
             toValue: 0.4, // 目标值
             duration: 300, // 动画时间
             easing: Easing.linear // 缓动函数
         }).start();

         Animated.timing(this.state.heightAnimated, {
            toValue: this.state.heightValue, // 目标值
            duration: 300, // 动画时间
            easing: Easing.linear // 缓动函数
         }).start();
      }else{
        this.setState({viewEvents:"none"});
         Animated.timing(this.state.fadeInOpacity, {
            toValue: 0, // 目标值
            duration: 300, // 动画时间
            easing: Easing.linear // 缓动函数
         }).start();

         Animated.timing(this.state.heightAnimated, {
           toValue: 0, // 目标值
           duration: 300, // 动画时间
           easing: Easing.linear // 缓动函数
         }).start();
      }

    }

    clickSelect=(rowData)=>{
      this.setState({viewEvents:"none"});
      Animated.timing(this.state.fadeInOpacity, {
            toValue: 0, // 目标值
            duration: 300, // 动画时间
            easing: Easing.linear // 缓动函数
      }).start();

      Animated.timing(this.state.heightAnimated, {
           toValue: 0, // 目标值
           duration: 300, // 动画时间
           easing: Easing.linear // 缓动函数
      }).start();
      this.props.clickSelect(rowData);
    }

    componentDidMount(){
      //数据源type
      const {dataType} = this.props;
      var thisOb = this;
      if(this.props.dataType==1){
        global.storageUtil.getValue('searchNoticeType').then((searchNoticeType)=>{
          thisOb.initData(searchNoticeType);
          HTTPRequest.requestGetWithUrl(GlobalSize.ProductURL+"yuanxinApi/Notification/Category",'',
              function(error,responseData,response){
                  if (error) {
                      if (response.status == 401) {
                          RefreshToken.refreshToken();
                          return;
                        }
                  }else {
                      if (responseData) {
                        if(responseData.toString()!=searchNoticeType.toString()){
                          thisOb.initData(responseData);
                          global.storageUtil.setKeyValue('searchNoticeType',responseData);
                        }
                      }
                  }
          });
        })
        .catch(()=>{
          HTTPRequest.requestGetWithUrl(GlobalSize.ProductURL+"yuanxinApi/Notification/Category",'',
              function(error,responseData){
                  if (error) {
                    PublicToast.showMessage('请求失败');
                    thisOb.setState({heightValue: 60});
                  }else {
                      if (responseData) {
                        thisOb.initData(responseData);
                        global.storageUtil.setKeyValue('searchNoticeType',responseData);
                      }else {
                        PublicToast.showMessage('请求失败');
                        thisOb.setState({heightValue: 60});
                      }
                  }
          });
        })
      }
      if(this.props.dataType==2){
        global.storageUtil.getValue('searchNewsType').then((searchNewsType)=>{
          thisOb.initData(searchNewsType);
          HTTPRequest.requestGetWithUrl(GlobalSize.ProductURL+"yuanxinApi/News/NewsCategory",'',
              function(error,responseData,response){
                  if (error) {
                      if (response.status == 401) {
                          RefreshToken.refreshToken();
                          return;
                        }
                  }else {
                      if (responseData) {
                        if(responseData.toString()!=searchNewsType.toString()){
                          thisOb.initData(responseData);
                          global.storageUtil.setKeyValue('searchNewsType',responseData);
                        }
                      }
                  }
          });
        })
        .catch(()=>{
          HTTPRequest.requestGetWithUrl(GlobalSize.ProductURL+"yuanxinApi/News/NewsCategory",'',
              function(error,responseData,response){
                  if (error) {
                    PublicToast.showMessage('请求失败');
                    if (response.status == 401) {
                        RefreshToken.refreshToken();
                        return;
                      }
                    thisOb.setState({heightValue: 60});
                  }else {
                      if (responseData) {
                        thisOb.initData(responseData);
                        global.storageUtil.setKeyValue('searchNewsType',responseData);
                      }else {
                        PublicToast.showMessage('请求失败');
                        thisOb.setState({heightValue: 60});
                      }
                  }
          });
        })
      }
    }

    initData = (data) => {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.setState({dataSource: ds.cloneWithRows(data)});
      switch (data.length) {
        case 0:
          this.setState({heightValue: 60});
          break;
        case 1:
          this.setState({heightValue: 60});
          break;
        case 2:
          this.setState({heightValue: 60});
          break;
        case 3:
          this.setState({heightValue: 100});
          break;
        case 4:
          this.setState({heightValue: 100});
          break;
        case 5:
          this.setState({heightValue: 140});
          break;
        case 6:
          this.setState({heightValue: 140});
          break;
        case 7:
          this.setState({heightValue: 180});
          break;
        case 8:
          this.setState({heightValue: 180});
          break;
        case 9:
          this.setState({heightValue: 220});
          break;
        case 10:
          this.setState({heightValue: 220});
          break;
        case 11:
          this.setState({heightValue: 260});
          break;
        case 12:
          this.setState({heightValue: 260});
          break;
        default:
          this.setState({heightValue: 260});
      }
    }

    render(){
        return(
          <View
            pointerEvents={this.state.viewEvents}
            style={[styles.containerbg,{top:Platform.OS === 'ios'?64:44}]}>
            <TouchableWithoutFeedback
                onPress={this.showOrClose}>
              <Animated.View
                style={[styles.containerblack, {opacity: this.state.fadeInOpacity}]}
              />
            </TouchableWithoutFeedback>

            <Animated.View
              style={[styles.container, {width: Dimensions.get('window').width,height:this.state.heightAnimated}]} >
              <ListView
                enableEmptySections={true}
                contentContainerStyle={styles.list}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                />
            </Animated.View >
          </View>
        );
    }

    _renderRow=(rowData: string, sectionID: number, rowID: number) =>{
    return (
      <TouchableOpacity onPress={()=>{this.clickSelect(rowData)}}>
          <View style={styles.row}>
            <Text style={styles.text}>
              {rowData.cnName}
            </Text>
          </View>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
    container:{
        position:'absolute',
        backgroundColor:'#efeff4',
        top:0,
        left:0,
        overflow:'hidden',
    },
    containerblack:{
        backgroundColor:'black',
        top:0,
        left:0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    containerbg:{
        position:'absolute',
        left:0,
        zIndex:999,
        overflow:'hidden',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
  list: {
    marginTop:10,
    marginBottom:10,
    marginLeft:(Dimensions.get('window').width-220)/2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 220,
    alignItems: 'center',
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 5,
    width: 100,
    height: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  text: {
    fontSize:14,
    color:'#3b3b3b',
  },
})
