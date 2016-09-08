import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ToastAndroid,
    Navigator,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    Alert,
    AlertIOS
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import BaseContainer from '../../containers/BaseContainer'
import {httpRequest} from 'react-native-utils-gjs'
import GlobalSize from "../../common/GlobalSize";
import RefreshToken from '../../components/RefreshToken'
import PublicToast from '../../components/PublicToast'

let HTTPRequest = new httpRequest();
export default class ProfilePage extends BaseContainer {
    constructor(props) {
        super(props);
        this.state = {
            // userimgurl: '../../../resource/images/App/wode2.png',
            userimgurl: '../../../resource/images/App/wode2.png',
            name: '姓名 : GJS',
            email: '邮箱 : 1353990812@qq.com',
            userInfo:{},
        }
    }
    componentDidMount() {

        global.storageUtil.getValue('').then((ProfilePage_userimgurl)=>{
            // console.log('profile:',ProfilePage_userimgurl);
            this.setState({
                userimgurl: ProfilePage_userimgurl.file
            });
        })

        global.storageUtil.getValue('ProfilePageuserinfo').then((ProfilePage_userinfo)=>{
            // console.log('profile:',ProfilePage_userinfo);

            this.setState({
                name: ProfilePage_userinfo.displayName,
                email: ProfilePage_userinfo.property.e_mail,
            });
        })

        // this.fetchUserImage();
        // this.onFetchUserInfo();
    }

    //标题
    defaultNavigationTitle() {
        return {
            title: "我",
            tintColor: this.defaultTintColor()
        };
    }

    fetchUserImage() {
        HTTPRequest.requestGetWithUrl(GlobalSize.ProductURL+"yuanxinApi/Employee/LoadEmployee", [],
            function (error, responseData,response) {
                if (error) {
                    console.log('error' + error.message);
                    PublicToast.showMessage('请求失败');
                    if (response.status == 401) {
                       RefreshToken.refreshToken();
                   }
                } else {
                    if (responseData) {
                        var userInfo = this.state.userInfo;
                        userInfo['photo']=responseData.file;
                        this.setState({
                            userimgurl: responseData.file,
                            userInfo:userInfo,
                        });
                        // global.storageUtil.setKeyValue('ProfilePageuserimgurl',responseData);

                    } else {
                        // alert('请求失败');
                        PublicToast.showMessage('请求失败');
                    }
                }
            }.bind(this));
    }

    onFetchUserInfo() {
        HTTPRequest.requestGetWithUrl(GlobalSize.ProductURL+"yuanxinApi/Organization/getuserinfo", [],
            function (error, responseData,response) {
                if (error) {
                    console.log('error' + error.message);
                    PublicToast.showMessage('请求失败');
                    if (response.status == 401) {
                       RefreshToken.refreshToken();
                   }
                } else {
                    if (responseData) {
                        this.setState({
                            name: responseData.displayName,
                            email: responseData.property.e_mail,
                            userInfo: Object.assign({}, this.state.userInfo, responseData),
                        });
                        // global.storageUtil.setKeyValue('ProfilePageuserinfo',responseData);
                    } else {
                        // alert('请求失败');

                    }
                }
            }.bind(this));
    }
    defaultRenderNavigationBarLeftButton() {
        return <View></View>
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:GlobalSize.colorBgGray}}>
                {this.defaultRenderNavigationBar()}
                <ScrollView showsVerticalScrollIndicator={true}
                            contentContainerStyle={styles.contentContainer}>
                    <View style={styles.container}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                                <View style={{ backgroundColor:'#ffffff',height:120 ,flexDirection: 'row'}}>
                                    <View style={{justifyContent: 'center',marginLeft:20}}>
                                        <Image defaultSource={require('../../../resource/images/App/wode2.png')}
                                               source={{uri:this.state.userimgurl}}
                                               style={{width:80,height:80,resizeMode:'cover' , alignSelf:'center',justifyContent: 'center',backgroundColor:'#ffffff',}}/>
                                    </View>
                                    <View style={{justifyContent: 'center',marginLeft:20}}>
                                        <Text
                                            style={{color:'#000000',fontSize: 18, textAlign: 'left',width:GlobalSize.DeviceWidth-120-10}}>{this.state.name}</Text>
                                        <Text
                                            style={{color:'#000000',fontSize: 16, textAlign: 'left',marginTop: 30,marginRight:10,width:GlobalSize.DeviceWidth-120-10}} numberOfLines={2}>
                                            {this.state.email}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{flex: 1,height:10,backgroundColor:'#eeeeee'}}>
                        </View>

                        <TouchableHighlight

                            style={{ backgroundColor:"#ffffff",paddingTop: 10,paddingBottom:10,paddingLeft:10,paddingRight:10, borderBottomWidth: StyleSheet.hairlineWidth,
                             borderBottomColor: '#cdcdcd',borderTopColor:'#cdcdcd',borderTopWidth:StyleSheet.hairlineWidth,justifyContent: 'center'}}
                            underlayColor="#ffffff"
                            // onPress={ ()=>
                            //    Actions.profileSet({
                            //        title:'个人设置',
                            //        userInfo:this.state.userInfo
                            //    })
                            // }
                        >
                            <View style={{ flexDirection: 'row'}}>
                                <View style={{justifyContent: 'center'}}>
                                    <Image source={require('../../../resource/images/App/shezhi.png')}
                                           style={{width:25,height:25}}/>
                                </View>
                                <View style={{flex: 1,justifyContent: 'center'}}>
                                    <Text
                                        style={{ color:'#000000',textAlign: 'left',fontSize:16, justifyContent: 'center',marginLeft:10}}>个人设置</Text>
                                </View>
                                <View style={{justifyContent: 'center'}}>
                                    <Image source={require('../../../resource/images/App/youjiantou.jpg')}
                                           style={{ justifyContent: 'center',marginRight:10}}/>
                                </View>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{  
                                backgroundColor:"#ffffff", 
                                paddingTop: 10,
                                paddingBottom:10,
                                paddingLeft:10,paddingRight:10, 
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                borderBottomColor: '#cdcdcd'
                            }}
                            underlayColor="#ffffff"
                            onPress={ ()=>
                                showMessage('该功能还未上线，敬请期待！')
                            }
                        >

                            <View style={{ flexDirection: 'row'}}>
                                <View style={{justifyContent: 'center'}}>
                                    <Image source={require('../../../resource/images/App/kaoqin.png')}
                                           style={{width:25,height:25}}/>
                                </View>
                                <View style={{flex: 1,justifyContent: 'center'}}>
                                    <Text
                                        style={{ color:'#000000',textAlign: 'left',fontSize:16, justifyContent: 'center',marginLeft:10}}>我的考勤</Text>
                                </View>
                                <View style={{justifyContent: 'center'}}>
                                    <Image source={require('../../../resource/images/App/youjiantou.jpg')}
                                           style={{ justifyContent: 'center',marginRight:10}}/>
                                </View>
                            </View>
                        </TouchableHighlight>


                        <TouchableHighlight
                            style={{  
                                backgroundColor:"#ffffff",
                                paddingTop: 10,
                                paddingBottom:10,
                                paddingLeft:10,
                                paddingRight:10, 
                                borderBottomWidth: StyleSheet.hairlineWidth,
                                borderBottomColor: '#cdcdcd',
                            }}
                            underlayColor="#ffffff"
                            onPress={ ()=>
                               showMessage('该功能还未上线，敬请期待！')
                            }
                        >


                            <View style={{ flexDirection: 'row'}}>
                                <View style={{justifyContent: 'center'}}>
                                    <Image source={require('../../../resource/images/App/wodehuiyishi.png')}
                                           style={{width:25,height:25}}/>
                                </View>
                                <View style={{flex: 1,justifyContent: 'center'}}>
                                    <Text
                                        style={{ color:'#000000',textAlign: 'left',fontSize:16, justifyContent: 'center',marginLeft:10}}>我的会议室</Text>
                                </View>
                                <View style={{justifyContent: 'center'}}>
                                    <Image source={require('../../../resource/images/App/youjiantou.jpg')}
                                           style={{ justifyContent: 'center',marginRight:10}}/>
                                </View>
                            </View>
                        </TouchableHighlight>


                        <TouchableHighlight
                            style={{ backgroundColor:"#ffffff",paddingTop: 10,paddingBottom:10,paddingLeft:10,paddingRight:10, borderBottomWidth: StyleSheet.hairlineWidth,
                                   borderBottomColor: '#cdcdcd',}}
                            underlayColor="#ffffff"
                            onPress={ ()=>
                               showMessage('该功能还未上线，敬请期待！')
                            }
                        >

                            <View style={{ flexDirection: 'row'}}>
                                <View style={{justifyContent: 'center'}}>
                                    <Image source={require('../../../resource/images/App/wodehuodong.png')}
                                           style={{width:25,height:25}}/>
                                </View>
                                <View style={{flex: 1,justifyContent: 'center'}}>
                                    <Text
                                        style={{ color:'#000000',textAlign: 'left',fontSize:16, justifyContent: 'center',marginLeft:10}}>我的活动</Text>
                                </View>
                                <View style={{justifyContent: 'center'}}>
                                    <Image source={require('../../../resource/images/App/youjiantou.jpg')}
                                           style={{ justifyContent: 'center',marginRight:10}}/>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        );

    }
}

//提示信息
function showMessage(msg) {
    // if (Platform.OS === 'android') {
    //     ToastAndroid.show(msg, ToastAndroid.SHORT)
    //     // Alert.alert(msg);
    // } else {
    //     AlertIOS.alert(msg);
    // }
    PublicToast.showMessage(msg);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    navBar: {
        height: 44,
        backgroundColor: '#333333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarTitle: {
        color: '#ffffff',
        fontSize: 18,
        justifyContent: 'center',

    },
    contentContainer: {
        backgroundColor: "#ffffff",
    }
    ,
    row: {
        padding: 10,
        height: 44,
    },
});
