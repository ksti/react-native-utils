
import React,{Component} from 'react'
import {StyleSheet} from 'react-native'
import {Scene} from 'react-native-router-flux';


import TabIcon from '../../components/TabIcon'
import WorkHomeContainer from './WorkHome'
import BusinessHomeContainer from '../../containers/BusinessHomeContainer'
import ProfilePage from './ProfilePage'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
    navigationBar:{  //头部标题文字
        backgroundColor: '#333333'
    },
    navigationTitle: { //头部导航
        color: '#ffffff',
        fontSize: 15
    }
});
module.exports =
(
    /*
        注意，在这个分支里，入口只能从最外层Scene的key开始进入，,
        当前Scence内的所有路由中默认都以第一个默认页面为根路由，
        内部路由能互相跳转，但是不能被外部直接访问
        只有根路由可以被外部通过外部 Scence的key访问到，例Actions.myTask
    */
    <Scene key="tabbar" type='reset' hideNavBar={true}>
        <Scene key="main" tabs={true} tabBarStyle={{backgroundColor:'#fff', borderTopColor:'#efeff4',borderTopWidth:2 }}>
            <Scene key="home" hideNavBar={true} initial={true} title="工作通" icon={TabIcon} component={WorkHomeContainer} navigationBarStyle={styles.navigationBar} titleStyle={styles.navigationTitle}  Image={require('../../../resource/images/TabBar/workhome.png') } selectImage={require('../../../resource/images/TabBar/workhomeselected.png') }>
            </Scene>
            <Scene key="project" hideNavBar={true} title="企业圈" icon={TabIcon} component={BusinessHomeContainer} navigationBarStyle={styles.navigationBar} titleStyle={styles.navigationTitle} Image={require('../../../resource/images/TabBar/businesshome.png') } selectImage={require('../../../resource/images/TabBar/businesshomeselected.png') }>
            </Scene>
            <Scene key="Profile" hideNavBar={true} component={ProfilePage} title="我" icon={TabIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.navigationTitle} Image={require('../../../resource/images/TabBar/profile.png') } selectImage={require('../../../resource/images/TabBar/profileselected.png') } />
        </Scene>
    </Scene>

);
