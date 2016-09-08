import React,{
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    TextInput,
    AsyncStorage,
}from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginIn } from '../reduxDataFlow/actions';
import Orientation from 'react-native-orientation'

import { Actions } from 'react-native-router-flux';
import GlobalSize from '../common/GlobalSize'
import BaseContainer from '../containers/BaseContainer'
import PublicToast from '../components/PublicToast'
import ModalLoading from '../components/ModalLoading'
import RefreshToken from '../components/RefreshToken'

var isFirst = false;
class Login extends BaseContainer {
    constructor(props){
        super(props);
        this.state={
            username:'liming',
            password:'123',
            loading:false,
        }
    }
    componentWillMount() {
        // 只允许竖屏
        Orientation.lockToPortrait();
        this.getGlobalValue();
    }

    getGlobalValue = () => {
        //
        global.storageUtil.getValue(GlobalSize.Global_IsFirstLaunch)
        .then((isFirstLaunch:bool)=>{
            // PublicToast.showMessage('是否是第一次登录:'+isFirst?'是':'否');
            if (isFirst) {
                isFirst = isFirstLaunch;
            }else {
                isFirst = false;
            }
        })
        .catch((error)=>{
            PublicToast.showMessage('error:'+error.message);
            isFirst = false;
        })
        //先获取accessToken，看是否存在，如果存在，刷新token
        global.storageUtil.getValue('refreshToken')
        .then((refreshToken)=>{
            //refreshToken存在，刷新token
            global.refreshToken = refreshToken;
            RefreshToken.refreshToken();
            isFirst = false;
        })
        .catch((error)=>{
            console.log('get value of refreshToken: ' + error.message);
            isFirst = true;
        });
        //
        global.storageUtil.getValue(GlobalSize.Global_UserName)
        .then((userName)=>{
            global.userName = userName;
        }).catch(error => {
            console.log('error: ' + error.message);
        });
        //
        global.storageUtil.getValue(GlobalSize.Global_IsOpenGesVerify)
        .then((isOpen)=>{
            global.isOpenGesPwd = isOpen;
        }).catch(error => {
            console.log('error: ' + error.message);
        });
    }

    defaultNavigationTitle(){
      return {
            title:'远薪移动办公',
            tintColor:this.defaultTintColor()
        };
    }
    defaultRenderNavigationBarLeftButton(){
        return <View></View>
    }
    componentWillReceiveProps(nextProps){
        PublicToast.logMessage('willReceiveProps:将要接收到props');
        PublicToast.logMessage('this.props.status',nextProps.status);

        if (nextProps.status == this.props.status) {
            console.log('状态没有改变');
            this.setState({
                loading:false,
            })
            return;
        }else if (nextProps.status == 'doing') {
            this.setState({
                loading:true,
            })
        }else if(nextProps.status=='done'){
            this.setState({
                loading:false,
            })
            this.pushToMain();
            this.saveLoginInfo(nextProps.userInfo);
        }else{
            this.setState({
                loading:false,
            })
        }
    }
    loginRequest=()=>{
        if(!this.state.username || !this.state.password){
            PublicToast.showMessage('请输入用户名和密码');
            return;
        }
        console.log('发出登录请求');
        let login={
            username:this.state.username,
            // username:'liming',
            // password:this.state.password,
            grant_type:'password',
        };
        this.props.dispatch(loginIn(login));
    }
    saveLoginInfo=(userInfo)=>{
        console.log('userInfo.accessToken:'+userInfo.access_token);

        global.accessToken=userInfo.access_token;
        global.refreshToken=userInfo.refresh_token;
        console.log('global.refreshToken:'+global.refreshToken);
        global.userName = this.state.username;
        global.storageUtil.setKeyValue('accessToken',userInfo.access_token).then((ret) => {
            console.log('save success: ' + ret);
        }).catch(error => {
            console.log('save error: ' + error.message);
        });
        global.storageUtil.setKeyValue('intervalTime',this.state.username).then((ret) => {
            console.log('save success: ' + ret);
        }).catch(error => {
            console.log('save error: ' + error.message);
        });
        global.storageUtil.setKeyValue('refreshToken',userInfo.refresh_token).then((ret) => {
            console.log('save success: ' + ret);
        }).catch(error => {
            console.log('save error: ' + error.message);
        });
    }
    pushToMain=()=>{
        //设置非第一次登录
        global.storageUtil.setKeyValue(GlobalSize.Global_IsFirstLaunch,false);
        //如果是第一次登录，去设置手势密码，否则去首页
        // if (isFirst == true) {
        //     Actions.setGesturePwd();
        // }else {
            Actions.tabbar();
        // }

    }
    onChangeName(text){
        this.setState({'username': text});
    }
    onChangePswd(text){
        this.setState({'password': text});
    }
    render(){
        return(
            <View style={{flex:1,backgroundColor:GlobalSize.colorBgGray}}>
                {this.defaultRenderNavigationBar() }
                    <View style={styles.loginMainCon}>
                        <View style={styles.formStyle}>
                            <View style={[styles.formInput,styles.formInputSplit]}>
                                <TextInput
                                    ref="login_name"
                                    placeholder='请输入域账户'
                                    style={styles.loginInput}
                                    onChangeText={this.onChangeName.bind(this)}
                                    value={this.state.username}
                                />
                            </View>
                            <View style={styles.formInput}>
                                <TextInput
                                    ref="login_psw"
                                    style={styles.loginInput}
                                    secureTextEntry={true}
                                    placeholder='请输入域密码'
                                    onChangeText={this.onChangePswd.bind(this)}
                                    value={this.state.password}
                                    />
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>this.loginRequest()} activeOpacity={0.8}>
                            <View style={styles.btn}>
                                <Text style={styles.loginBtn1}>登录</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ModalLoading
                        visible={this.state.loading}
                    />
            </View>
        );
    }
}

const loginState=(state)=>{
    return{
        status:state.Login.status,
        isLoggedIn:state.Login.isLoggedIn,
        userInfo:state.Login.userInfo,
        loginState:state.Login,
    }
}
export default Login = connect(loginState)(Login);

var styles = StyleSheet.create({
    loginMainCon: {
        marginTop: GlobalSize.cellPadding,
        height: 330,
    },
    formStyle: {
        backgroundColor:'white',
        marginTop: 30,
        height: 80,
    },
    formInput:{
        flexDirection:'row',
        height: 40,
        justifyContent:'center',
    },
    formInputSplit:{
        borderBottomWidth:1,
        borderBottomColor:GlobalSize.colorBorderGray,
    },
    loginInput: {
        borderColor: '#000',//black
        paddingLeft: 10,
        paddingRight:10,
        marginRight:10,
        fontSize:15,
        flex: 1,
        color:'#000000',
        backgroundColor:'transparent',
        paddingTop:0,
        paddingBottom:0,

    },
    btn: {
      height:40,
      justifyContent:'center',
      marginTop:20,
      marginLeft:GlobalSize.cellPadding,
      width: GlobalSize.DeviceWidth-2*GlobalSize.cellPadding,
      backgroundColor: GlobalSize.colorRedButton,
      borderRadius:5,
    },
    loginBtn1: {
        textAlign: 'center',
        color:'white',
        fontSize:GlobalSize.FontSizeTitle,
      },
})
