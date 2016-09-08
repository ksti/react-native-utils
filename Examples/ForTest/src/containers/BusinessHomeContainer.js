import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  WebView,
  ActivityIndicator,
  Dimensions,
  Text,
  Image,
} from 'react-native';

import BaseContainer  from './BaseContainer'
import {httpRequest} from 'react-native-utils-gjs'
import PublicToast from '../components/PublicToast'
import GlobalSize from '../common/GlobalSize'
import RefreshToken from '../components/RefreshToken'
import ButtonUpDown from '../components/ButtonUpDown'
import ViewPager from 'react-native-viewpager'

let HTTPRequest = new httpRequest();

let imageSources=[
    {
        image:require('../../resource/images/App/img_busItem1.jpg'),
    },{
        image:require('../../resource/images/App/img_busItem2.jpg'),
    }
];
let btnMenu=[
    {
        title:'活动',
        image:require('../../resource/images/App/ic_huodong.png'),
        key:"signIn",
    },{
        title:'热议',
        image:require('../../resource/images/App/ic_reyi.png'),
        key:"signIn",
    },{
        title:'会议',
        image:require('../../resource/images/App/ic_huiyi.png'),
        key:"signIn",
    }
]
export default class BusinessHomeContainer extends BaseContainer {

    constructor(props){
        super(props);
        this.state={
          url: '',
          loadEnd:false,
        }
    }
      /*
      HTTPRequest.requestGetWithUrl(GlobalSize.ProductURL+"passport/Shim/GetPreviousVersionTicket",'',
          function(error,responseData,response){
              if (error) {
                PublicToast.showMessage('请求失败');
                if (response.status == 401) {
                   RefreshToken.refreshToken();
                }
              }else {
                if (responseData) {
                  thisOb.setState({url: GlobalSize.BaseWebURL+'MobileWebApp/Blog/Article/ArticleList?t='+encodeURIComponent(responseData)});
                }else {
                  PublicToast.showMessage('请求失败');
                }
              }
      });
    }
    */

    defaultRenderNavigationBarLeftButton(){
        return <View></View>
    }

    //加载完成
    loadEnd=()=>{
      this.setState({ loadEnd: true });
    }
    _renderPage=(item)=>{
        return(
            <View style={{width:GlobalSize.DeviceWidth,height:GlobalSize.DeviceWidth/2.0,alignItems:'center',justifyContent:'center',backgroundColor:GlobalSize.colorBgGray}}>
                <Image source={item.image} style={{width:GlobalSize.DeviceWidth,height:GlobalSize.DeviceWidth/2}}resizeMode='stretch'></Image>
            </View>
        )
    }
    render() {
        return(
            <View style={{flex:1,backgroundColor:GlobalSize.colorBgGray}}>
                {this.defaultRenderNavigationBar() }
                <View>
                    <ViewPager
                        dataSource={new ViewPager.DataSource({
                            pageHasChanged: (p1, p2) => p1 !== p2,
                        }).cloneWithPages(imageSources)}
                        renderPage={this._renderPage}
                        autoPlay={true}
                        isLoop={true}
                        initialPage={0} //默认显示的page
                    />
                </View>
                <View style={{flexDirection:'row',height:80}}>
                    {
                        btnMenu.map((items,index)=>{
                            return(
                                <ButtonUpDown
                                    key={index}
                                    onPress={()=>{PublicToast.showMessage('该功能还未上线，敬请期待')}}
                                    image={items.image}
                                    text={items.title}
                                    styleBg={{backgroundColor:'white'}}
                                    styleText={{color:GlobalSize.colorBlackText}}
                                    style={{flex:1}}
                                />
                            )
                        })
                    }
                </View>
                <View>
                </View>
            </View>
        )
        /*
        return (
                <View style={[{flex:1, paddingBottom:50}, this.props.style]}>
                    {this.defaultRenderNavigationBar()}
                    <WebView style={[{flex:1}]}
                        automaticallyAdjustContentInsets={false}
                        source={this.state.url?{uri:this.state.url}:{}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        decelerationRate="normal"
                        onLoadEnd={this.loadEnd}
                        scalesPageToFit={true}
                        />
                    <View pointerEvents='none' style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,justifyContent: 'center',position:'absolute',top:0,left:0,zIndex:999}}>
                          <ActivityIndicator
                            animating={!this.state.loadEnd}
                            style={{flex:1}}
                            size="small"
                          />
                    </View>
                </View>
        );
        */
    }
}
