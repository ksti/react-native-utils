/*
界面功能：通讯录Tree
props：dataType:1通讯录,2单选,3多选
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
    TouchableOpacity,
    Image,
    RecyclerViewBackedScrollView,
    LayoutAnimation,
    UIManager,
    ActivityIndicator,
    InteractionManager,
}from 'react-native'



import {httpRequest} from 'react-native-utils-gjs'
import GlobalSize from '../common/GlobalSize'
import PublicToast from '../components/PublicToast'

let HTTPRequest = new httpRequest();

export default class AddressBookTree extends Component{
    constructor(props){
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
          dataSource: ds.cloneWithRows([]),
          ds,
          dataCopy:[],
          showLevel:9999,
          selectNodeM:[],
          renderPlaceholderOnly: true,
        }
    }

    clickTreeNode=(rowData,rowID)=>{

      if(rowData['isEnd']){
        if(this.props.dataType==1){
          this.props.clickTreeNode(rowData);
        }
        if(this.props.dataType==2){
          this.props.clickTreeNode(rowData);
        }
        if(this.props.dataType==3){
          for (var i = 0; i < this.state.selectNodeM.length; i++) {
            if(this.state.selectNodeM[i]["id"]==rowData["id"]){
              this.state.selectNodeM.splice(i,1);
              rowData['name']=rowData['name'].replace(/\（已选择）/g, "");
              this.setState({dataSource: this.state.ds.cloneWithRows(this.state.dataCopy)});
              this.props.clickTreeNode(this.state.selectNodeM);
              return;
            }
          }
          rowData['name']=rowData['name'].replace(/\（已选择）/g, "");
          var cloneNode = new Object();
          cloneNode['id']=rowData['id'];
          cloneNode['name']=rowData['name'];
          this.state.selectNodeM.push(cloneNode);
          rowData['name']="（已选择）"+rowData['name'];
          this.setState({dataSource: this.state.ds.cloneWithRows(this.state.dataCopy)});
          this.props.clickTreeNode(this.state.selectNodeM);
        }
      }else{
        this.state.showLevel=9999;
        if(rowData['isOpen']){
          rowData['isOpen']=false;
          this.setState({dataSource: this.state.ds.cloneWithRows(this.state.dataCopy)});
          LayoutAnimation.configureNext({
                      duration: 80,   //持续时间
                      create: {
                          type: 'linear',
                          property: 'opacity'
                      },
                      update: {
                          type: 'linear',
                          property: 'opacity'
                      }
                  });
        }else{
          if(Number(rowID)+1<this.state.dataCopy.length && this.state.dataCopy[Number(rowID)+1]['level']>rowData['level']){
            rowData['isOpen']=true;
            this.setState({dataSource: this.state.ds.cloneWithRows(this.state.dataCopy)});
            LayoutAnimation.configureNext({
                        duration: 80,   //持续时间
                        create: {
                            type: 'linear',
                            property: 'opacity'
                        },
                        update: {
                            type: 'linear',
                            property: 'opacity'
                        }
                    });
          }else{
            rowData['isLoading']=true;
            this.setState({dataSource: this.state.ds.cloneWithRows(this.state.dataCopy)});
            var thisOb = this;
            HTTPRequest.requestGetWithUrl(GlobalSize.ProductURL+"yuanxinApi/AddressBook/LoadChild",{parentid:rowData['id']},
                function(error,responseData,response){
                    rowData['isLoading']=false;
                    if (error) {
                            PublicToast.showMessage("请求失败,请重试");
                            if (response.status == 401) {
                                RefreshToken.refreshToken();
                            }
                            thisOb.setState({dataSource: thisOb.state.ds.cloneWithRows(thisOb.state.dataCopy)});
                    }else {
                      if (responseData) {
                        rowData['isOpen']=true;
                        for (var i = 0; i < responseData.length; i++) {
                            thisOb.state.dataCopy.splice(Number(rowID)+i+1,0,{id:responseData[i]['id'],name:responseData[i]['displayName'],level:rowData['level']+1,isEnd:responseData[i]['objectType']==="Users",isOpen:false,isSelect:false,isLoading:false},);
                        }
                        thisOb.setState({dataSource: thisOb.state.ds.cloneWithRows(thisOb.state.dataCopy)});
                        LayoutAnimation.configureNext({
                                    duration: 80,   //持续时间
                                    create: {
                                        type: 'linear',
                                        property: 'opacity'
                                    },
                                    update: {
                                        type: 'linear',
                                        property: 'opacity'
                                    }
                                });
                      }else {
                        thisOb.setState({dataSource: thisOb.state.ds.cloneWithRows(thisOb.state.dataCopy)});
                        PublicToast.showMessage('请求失败');
                    }
                }
            });
          }
        }
      }
    }

    componentDidMount(){
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
      const {dataType} = this.props;
      InteractionManager.runAfterInteractions(() => {
        var thisOb = this;
        global.storageUtil.getValue('addressBookData').then((addressBookData)=>{
          thisOb.state.dataCopy = addressBookData;
          thisOb.setState({dataSource: thisOb.state.ds.cloneWithRows(thisOb.state.dataCopy)});
          thisOb.setState({renderPlaceholderOnly: false});
          HTTPRequest.requestGetWithUrl(GlobalSize.ProductURL+"yuanxinApi/AddressBook/LoadChild",'',
              function(error,responseData,response){
                  if (error) {
                    PublicToast.showMessage("请求失败,请重试");
                    if (response.status == 401) {
                       RefreshToken.refreshToken();
                    }
                  }else {
                    if (responseData) {
                      var copyNode = [{id:'00',name:'远洋地产',level:0,isEnd:false,isOpen:true,isSelect:false,isLoading:false}];
                      for (var i = 0; i < responseData.length; i++) {
                          copyNode.push({id:responseData[i]['id'],name:responseData[i]['displayName'],level:1,isEnd:responseData[i]['objectType']==="Users",isOpen:false,isSelect:false,isLoading:false});
                      }
                      if(copyNode.toString()!=thisOb.state.dataCopy.toString()){
                        thisOb.state.dataCopy = copyNode;
                        thisOb.setState({dataSource: thisOb.state.ds.cloneWithRows(thisOb.state.dataCopy)});
                        global.storageUtil.setKeyValue('addressBookData',thisOb.state.dataCopy);
                      }
                  }
              }
          });
        })
        .catch(()=>{
          HTTPRequest.requestGetWithUrl(GlobalSize.ProductURL+"yuanxinApi/AddressBook/LoadChild",'',
              function(error,responseData,response){
                  if (error) {
                    PublicToast.showMessage("请求失败,请重试");
                    if (response.status == 401) {
                        RefreshToken.refreshToken();
                    }
                  }else {
                    if (responseData) {
                      thisOb.state.dataCopy = [{id:'00',name:'远洋地产',level:0,isEnd:false,isOpen:true,isSelect:false,isLoading:false}];
                      for (var i = 0; i < responseData.length; i++) {
                          thisOb.state.dataCopy.push({id:responseData[i]['id'],name:responseData[i]['displayName'],level:1,isEnd:responseData[i]['objectType']==="Users",isOpen:false,isSelect:false,isLoading:false});
                      }
                      thisOb.setState({dataSource: thisOb.state.ds.cloneWithRows(thisOb.state.dataCopy)});
                      thisOb.setState({renderPlaceholderOnly: false});
                      global.storageUtil.setKeyValue('addressBookData',thisOb.state.dataCopy);
                    }else {
                        PublicToast.showMessage('请求失败');
                  }
              }
          });
        })
      });
    }

    render(){
      if (this.state.renderPlaceholderOnly) {
        return (
          <View style={{flex:1,backgroundColor:'#efeff4'}}>
            <View style={{flex:1,justifyContent: 'center',}}>
              <ActivityIndicator
                animating={true}
                style={[{flex:1}]}
                size="small"
              />
            </View>
          </View>
        );
      }
      return(
            <ListView
                style={styles.list}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                pageSize={20}
                keyboardDismissMode={'on-drag'}
                removeClippedSubviews={true}
            />
      );
    }

    //创建树的线
    createLeftLine=(rowData)=>{
        var lineArr=[];
        for (var i = 1; i < rowData['level']; i++) {
          lineArr.push(<Image
            key={i}
            style={{width:18,height:30,marginLeft:6}}
            source={require('../../resource/images/App/l.png')} />);
        }
        lineArr.push(<Image
          key={"t"}
          style={{marginLeft:rowData['level']==0?6:0,width:rowData['level']==0?0:30,height:30}}
          source={rowData['level']==0?null:require('../../resource/images/App/t.png')} />);
        if(rowData['isEnd']){
          lineArr.push(<Image
                  key={"s"}
                  style={{width:30,height:30}}
                  source={require('../../resource/images/App/s.png')}/>);
        }
        return (
            lineArr
        );
    }

    //创建节点图标
    createNodeIcon=(rowData)=>{
        var IconArr=[];
        if(!rowData['isEnd']){
          IconArr.push(<Image
                key={0}
                style={styles.imageIcon}
                source={rowData['isOpen']?require('../../resource/images/App/jianhao.png'):require('../../resource/images/App/jiahao.png')} />);
          if(rowData['isOpen']){
            IconArr.push(<Image
                  key={1}
                  style={{width:17,height:17,margin:1,marginTop:6}}
                  source={require('../../resource/images/App/folder_open.png')} />);
          }else{
            IconArr.push(<Image
                  key={2}
                  style={styles.imageIcon}
                  source={require('../../resource/images/App/folder_close.png')} />);
          }
        }
        return (
            IconArr
        );
    }

    _renderRow=(rowData: object, sectionID: number, rowID: number) =>{
      if(this.state.showLevel>=rowData['level']){
        if(rowData['isOpen']){
          this.state.showLevel=9999;
        }else{
          this.state.showLevel=rowData['level'];
        }
        return (
            <View style={styles.row}>
              {
                this.createLeftLine(rowData)
              }
              <TouchableOpacity
                style={{height: 30,flexDirection: 'row',flex:1}}
                onPress={()=>{this.clickTreeNode(rowData,rowID)}}>
                {
                  this.createNodeIcon(rowData)
                }
                <ActivityIndicator
                  animating={rowData['isLoading']}
                  style={[{width:rowData['isLoading']?30:0,height: 30}]}
                  size="small"
                />
                <Text numberOfLines={1} style={[styles.text,{marginLeft:rowData['isLoading']?0:6}]}>
                  {rowData['name']}
                </Text>
              </TouchableOpacity>
            </View>
        );
      }else{
        return null;
      }
  }
}

var styles = StyleSheet.create({
  list:{
    flex:1,
    paddingTop:10,
    overflow:'hidden',
  },
  row: {
    paddingLeft: 5,
    paddingRight: 5,
    height: 30,
    flexDirection: 'row',
    overflow:'hidden',
  },
  text: {
    flex:1,
    marginTop:8,
    fontWeight:'bold',
    fontSize:14,
    color:'#3b3b3b',
  },
  imageIcon:{
      width:16,
      height:16,
      margin:1,
      marginTop:7,
  },
})
