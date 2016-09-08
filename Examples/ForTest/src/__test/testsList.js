
import React,{Component} from 'react'

// import React from 'react';

import {
  Navigator,
  StyleSheet,
  Text,
  Image,
  View,
  Dimensions,
  StatusBar,
  ToastAndroid,
  BackAndroid
} from 'react-native'

import {
  Scene,
  Reducer,
  Router,
  Switch,
  TabBar,
  Modal,
  Schema,
  Actions
} from 'react-native-router-flux'

import Orientation from 'react-native-orientation'
import BaseContainer from '../containers/BaseContainer';
import {httpRequest} from 'react-native-utils-gjs'


// test list
import TestsListView from './testsListView'
// test pages
// import TestFile from './testFile'
import TestImagePicker from './testImagePicker'
import TestPopupPage from './testPopupPage'
import TestPopupSelecter from './testPopupSelecter'

let HTTPRequest = new httpRequest();
// let strURL = 'https://moa.sinooceanland.com:10086/AnChangReportService/Interface_GetOrgInstitutionCodeService.service?userName=liming'
let strURL = 'https://moa.sinooceanland.com:10086/AnChangReportService/Interface_SaleSearchInterfaceService.service'
// let parameter = {};
parameter = {OrgCode: '', CityCode: '', ProjectCode: '', TimeCategory: 'Year', DateStar: '', DateEnd: ''};


let scenes = [
        {
            key: 'TestImagePicker',
            comp: TestImagePicker,
        },
        {
            key:'TestPopupPage',
            comp:TestPopupPage,
        },
        {
            key: 'TestPopupSelecter',
            comp: TestPopupSelecter,
        },
    ];

// --- Create it via Actions.create(), or it will be re-created for each render of your Router
// const routerScenes = Actions.create(
//     require("./scenesForTest")
//     // <Scene key="test">
//     //   <Scene key='testsListView' /*initial={true}*/ hideNavBar={true} component={TestsListView} />
//     //   {
//     //       scenes.map(item =>
//     //           <Scene key={item.key} component={item.comp} />)
//     //   }
//     // </Scene>
// );

const routerScenes = Actions.create(
    require("./scenesForTest"),
);

const reducerCreate = params => {
    const defaultReducer = Reducer(params);
    return (state, action) => {
        return defaultReducer(state, action);
    }
};

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#333333'
    };
    return style;
};


export default class testsList extends BaseContainer {
  constructor(props){
    super(props);
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
    this.testRouter();
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
          title:'测试 testsList',
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

  testRouter = () => {
    console.log('Router: ' + Router);
  }


  // render() {
  //     // return <Router createReducer={reducerCreate} scenes={scenes} />
  //     //   //   <Router createReducer={reducerCreate} backAndroidHandler={backAndroidHandler} onBackAndroid ={onBackAndroid}  onExitApp={onExitApp} >
  //     return (
  //        <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}  >
  //             <Scene key="modal" component={Modal}>
  //                 <Scene key="root" hideNavBar={true}>
  //                     <Scene key='initialRoot' component={InitialRoot}/>
  //                     <Scene key='loginIn' type='reset' initial={true} component={Login}/>
  //                     <Scene key="tabbar" type='reset' >
  //                         <Scene key="main" tabs={true} tabBarStyle={{backgroundColor:'#fff', borderTopColor:'#efeff4',borderTopWidth:2 }}>
  //                             <Scene key="home" hideNavBar={true} initial={true} title="工作通" icon={TabIcon} component={WorkHomeContainer} navigationBarStyle={styles.navigationBar} titleStyle={styles.navigationTitle}  Image={require('./resource/images/TabBar/workhome.png') } selectImage={require('./resource/images/TabBar/workhomeselected.png') }>
  //                             </Scene>
  //                             <Scene key="project" hideNavBar={true} title="企业圈" icon={TabIcon} component={BusinessHomeContainer} navigationBarStyle={styles.navigationBar} titleStyle={styles.navigationTitle} Image={require('./resource/images/TabBar/businesshome.png') } selectImage={require('./resource/images/TabBar/businesshomeselected.png') }>
  //                             </Scene>
  //                             <Scene key="Profile" hideNavBar={true} component={ProfilePage} title="我" icon={TabIcon} navigationBarStyle={styles.navigationBar} titleStyle={styles.navigationTitle} Image={require('./resource/images/TabBar/profile.png') } selectImage={require('./resource/images/TabBar/profileselected.png') } />
  //                         </Scene>
  //                     </Scene>
  //                     {
  //                         routers.pages.map(item =>
  //                             <Scene key={item.key} component={item.comp} />)
  //                     }
  //                 </Scene>
  //                 <Scene key="error" component={ErrorContainer}  hideNavBar={true}/>
  //             </Scene>
  //         </Router>
  //     );
  // }

  render() {
    // return (
    //    <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}  >
    //         <Scene key="testModal" component={Modal}>
    //             <Scene key="testRoot" hideNavBar={true}>
    //                 <Scene key='testsListView' component={TestsListView}/>
    //                 {
    //                     scenes.map(item =>
    //                         <Scene key={item.key} component={item.comp} />)
    //                 }
    //             </Scene>
    //         </Scene>
    //     </Router>
    // );

    // 写法可以，但是返回不了
    // return (
    //   <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle} >
    //     <Scene key='testsListView' /*initial={true}*/ hideNavBar={true} component={TestsListView} />
    //     {
    //         scenes.map(item =>
    //             <Scene key={item.key} component={item.comp} />)
    //     }
    //   </Router>
    // );

    // 写法可以，和上面一样
    // return (
    //   <Router>
    //           {require("./scenesForTest")}
    //   </Router>
    // );

    //
    return (
      <Router scenes={routerScenes}>
      </Router>
    );

    // 尝试失败
    // return (
    //   <View
    //     style={[styles.container, {backgroundColor: 'white'}]}
    //   >
    //     {this.defaultRenderNavigationBar()}
    //     <StatusBar
    //        // barStyle="light-content"
    //        barStyle="default"
    //     />
    //     <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}  >
    //       <Scene key='testsListView' initial={true} hideNavBar={true} component={TestsListView}/>
    //       {
    //           routers.pages.map(item =>
    //               <Scene key={item.key} component={item.comp} />)
    //       }
    //     </Router>
    //   </View>
    // );

  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        // alignItems: "center", // 这句会破坏包在其中的 {this.defaultRenderNavigationBar()} 布局
    },
    navigationBar:{  //头部标题文字
        backgroundColor: '#333333'
    },
    navigationTitle: { //头部导航
        color: '#ffffff',
        fontSize: 15
    }
});
