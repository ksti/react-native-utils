/*
界面功能：选择问题
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
    Image,
}from 'react-native'

import {httpRequest} from 'react-native-utils-gjs'
import GlobalSize from '../common/GlobalSize'
import PublicToast from '../components/PublicToast'

let HTTPRequest = new httpRequest();


export default class DropDownMenu extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
          viewEvents:'none',
          ds,
          heightAnimated: new Animated.Value(0),
          fadeInOpacity: new Animated.Value(0),
          dataSourceOne: ds.cloneWithRows([]),
          dataSourceTwo: ds.cloneWithRows([{name:'全部'},{name:'未验收'},{name:'已验收未通过'},{name:'已验收已通过'}]),
          seletIndex:0,
          menuHeight:0,
        }
    }

    //点击菜单
    clickMenu=(index)=>{
      if(index==this.state.seletIndex){
        this.setState({seletIndex:0});
        Animated.timing(this.state.fadeInOpacity, {
           toValue: 0, // 目标值
           duration: 200, // 动画时间
           easing: Easing.linear // 缓动函数
       }).start();
       Animated.timing(this.state.heightAnimated, {
          toValue: 0, // 目标值
          duration: 200, // 动画时间
          easing: Easing.linear // 缓动函数
       }).start();
      }else{
        this.setState({seletIndex:index});
        Animated.timing(this.state.fadeInOpacity, {
           toValue: 0.4, // 目标值
           duration: 200, // 动画时间
           easing: Easing.linear // 缓动函数
       }).start();
        var downHeight=0;
        if(index==1){
          downHeight=this.state.menuHeight;
        }
        if(index==2){
          downHeight = 44*4;
        }
        if(downHeight>Dimensions.get('window').height-200){
          downHeight = Dimensions.get('window').height-200;
        }
        Animated.timing(this.state.heightAnimated, {
           toValue: downHeight, // 目标值
           duration: 200, // 动画时间
           easing: Easing.linear // 缓动函数
        }).start();
      }
    }

    //关闭菜单
    closeMenu=()=>{
        this.setState({seletIndex:0});
        Animated.timing(this.state.fadeInOpacity, {
           toValue: 0, // 目标值
           duration: 200, // 动画时间
           easing: Easing.linear // 缓动函数
       }).start();
       Animated.timing(this.state.heightAnimated, {
         toValue: 0, // 目标值
         duration: 200, // 动画时间
         easing: Easing.linear // 缓动函数
       }).start();
    }

    //选择后
    clickSelect=(rowData)=>{
      if(this.state.seletIndex==1){
        this.props.clickSelect(rowData['searchName']);
        this.closeMenu();
      }
      if(this.state.seletIndex==2){
        this.props.clickSelect(rowData['name']);
        this.closeMenu();
      }
    }

    //打开子节点
    openChildren=(rowData)=>{
      var dataCopy=[];
      for (var i = 0; i < this.props.menuData.length; i++) {
        dataCopy.push(this.props.menuData[i]);
        if(this.props.menuData[i]['name']===rowData['name']){
          for (var x = 0; x < rowData['children'].length; x++) {
            rowData['children'][x]['searchName']=this.props.menuData[i]['name']+'-'+rowData['children'][x]['name']+'室';
            dataCopy.push(rowData['children'][x]);
          }
        }
      }
      this.state.dataSourceOne = this.state.ds.cloneWithRows(dataCopy);
      var downHeight=44*dataCopy.length;
      if(downHeight>Dimensions.get('window').height-200){
        downHeight = Dimensions.get('window').height-200;
      }
      this.setState({menuHeight: downHeight});
      Animated.timing(this.state.heightAnimated, {
         toValue: downHeight, // 目标值
         duration: 50, // 动画时间
         easing: Easing.linear // 缓动函数
      }).start();

    }

    componentDidMount(){
      //数据源type
      const {menuData} = this.props;
      this.setState({menuHeight: 44*this.props.menuData.length});
      this.state.dataSourceOne = this.state.ds.cloneWithRows(this.props.menuData);
    }

    render(){
        return(
          <View
            style={{position:'relative',zIndex:888, height:44,backgroundColor:'#ffffff'}}>
            <View style={{flex:1,flexDirection:'row'}}>
              <TouchableOpacity style={{flex:1}} onPress={()=>{this.clickMenu(1)}}>
                <View style={{flex:1,flexDirection:'row'}}>
                  <Text numberOfLines={1} style={styles.text}>楼栋信息</Text>
                  <Image
                    style={{width:12,height:12,marginTop:24,marginRight:10}}
                    source={this.state.seletIndex==1?require('../../resource/images/App/triangleDownSelect.png'):require('../../resource/images/App/triangleDown.png')} />
                </View>
              </TouchableOpacity>
              <View style={{width:0.7,marginTop:5,marginBottom:5,backgroundColor:'#D0D0D0'}}/>
              <TouchableOpacity style={{flex:1}} onPress={()=>{this.clickMenu(2)}}>
                <View style={{flex:1,flexDirection:'row'}}>
                  <Text numberOfLines={1} style={styles.text}>验收状态</Text>
                  <Image
                    style={{width:12,height:12,marginTop:24,marginRight:10}}
                    source={this.state.seletIndex==2?require('../../resource/images/App/triangleDownSelect.png'):require('../../resource/images/App/triangleDown.png')} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{height:0.7,backgroundColor:'#D0D0D0'}}/>

            <TouchableWithoutFeedback onPress={this.closeMenu} >
              <Animated.View pointerEvents={this.state.seletIndex==0?'none':'auto'}
                style={[styles.containerblack, {opacity: this.state.fadeInOpacity}]}
              />
            </TouchableWithoutFeedback>

            <Animated.View
              style={[styles.container, {width: Dimensions.get('window').width,height:this.state.heightAnimated}]} >
              <ListView
                enableEmptySections={true}
                dataSource={this.state.seletIndex==0?this.state.ds.cloneWithRows([]):this.state.seletIndex==1?this.state.dataSourceOne:this.state.dataSourceTwo}
                renderRow={this._renderRow}
                />
            </Animated.View >
          </View>
        );
    }

    _renderRow=(rowData: string, sectionID: number, rowID: number) =>{
      if(this.state.seletIndex==1){
        if(rowData['children']){
          return (
            <TouchableOpacity onPress={()=>{this.openChildren(rowData)}}>
                <View style={styles.row}>
                  <Text style={{flex:1,fontSize:15,color:'#3b3b3b',marginLeft:40,marginTop:13}}>
                    {rowData['name']}
                  </Text>
                  <Text style={{fontSize:15,color:'#3b3b3b',marginRight:20,marginTop:13}}>
                    {rowData['children'].length+'>'}
                  </Text>
                </View>
                <View style={{width:Dimensions.get('window').width,height:0.7,backgroundColor:'#D0D0D0'}}/>
            </TouchableOpacity>
          );
        }
        return (
          <TouchableOpacity onPress={()=>{this.clickSelect(rowData)}}>
              <View style={{flex:1,height:44,flexDirection: 'row',overflow:'hidden',backgroundColor:'#efeff4'}}>
                <Text style={{fontSize:15,color:'#a7a7a7',marginLeft:40,marginTop:13}}>
                  {rowData['name']}
                </Text>
              </View>
              <View style={{width:Dimensions.get('window').width,height:0.7,backgroundColor:'#D0D0D0'}}/>
          </TouchableOpacity>
        );
      }
    return (
      <TouchableOpacity onPress={()=>{this.clickSelect(rowData)}}>
          <View style={styles.row}>
            <Text style={{fontSize:15,color:'#3b3b3b',marginLeft:40,marginTop:13}}>
              {rowData['name']}
            </Text>
          </View>
          <View style={{width:Dimensions.get('window').width,height:0.7,backgroundColor:'#D0D0D0'}}/>
      </TouchableOpacity>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    textAlign:'center',
    marginLeft:6,
    marginTop:13,
    flex:1,
    fontSize:15,
    color:'#3b3b3b',
  },
  containerblack:{
      position:'absolute',
      zIndex:998,
      backgroundColor:'black',
      top:44,
      left:0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
  },
  container:{
      position:'absolute',
      zIndex:999,
      backgroundColor:'#ffffff',
      top:44,
      left:0,
  },
  row: {
    flex:1,
    height:44,
    flexDirection: 'row',
    overflow:'hidden',
  },
})
