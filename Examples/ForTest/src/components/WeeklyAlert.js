import React,{Component} from 'react'
import {
    Image,
    View,
    Text,
    Animated,
    Easing,
    Dimensions,
    ListView,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native'
import GlobalSize from '../common/GlobalSize'
import PublicToast from '../components/PublicToast'
import {httpRequest} from 'react-native-utils-gjs'
let HTTPRequest = new httpRequest(true);

//职责
var workDuty=GlobalSize.BaseURL+"SecretaryServiceApi/WorkWrite/LoadWorkDuty";
//职责明细
var workDetailDuty=GlobalSize.BaseURL+"SecretaryServiceApi/WorkWrite/LoadWorkDetailDuty";
//形式
var workStyle=GlobalSize.BaseURL+"SecretaryServiceApi/WorkWrite/LoadWorkStyle";

var data=[];
const {width, height} = Dimensions.get('window');  
const itemHeight = 50; 
const itemWidth=width/3;
const cellpadding=5;
const [aWidth, aHeight] = [width-50, itemHeight];  
const [left, top] = [0, 0];  
const [middleLeft, middleTop] = [(width - aWidth) / 2, (height - aHeight) / 2];  
var _weeklyEditForm;
export default class WeeklyAlert extends Component
{
   
    constructor(props) {  
    super(props);  
    this.state = { 
      contentHeight:itemHeight, 
      offset: new Animated.Value(0),  
      opacity: new Animated.Value(0),  
      dataSources: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
      allLoaded: false,
      isLoading:0,
      title:"职责",   
    };  
  }   
  render() {  
     if(this.state.isLoading===0)return (<View/>);
     if(this.state.isLoading===1)return (<View style={styles.loading}><Text style={{color:'white',fontSize:14}}>loading。。。。</Text></View>);
     if(this.state.isLoading===2)return (<View style={styles.container}>  
          <Animated.View style={ styles.mask } >  
          </Animated.View>  
          <Animated.View style={[styles.tip ,{ height: this.state.contentHeight}, {transform: [{  
                translateY: this.state.offset.interpolate({  
                 inputRange: [0, 1],  
                 outputRange: [height,(height-aHeight)/2]  
                }),  
              }]  
            }]}>  
            <View style={{height:51,width:width}}>
            
              <View style={{height:50,width:width,flexDirection:'row', justifyContent: 'center',alignItems:'center'}}>
                  
                  <Text style={{flex:1,margin:5,marginLeft:40,fontSize:16}}>{this.state.title}</Text>
            
              <TouchableHighlight style={{height:20,width:20,marginRight:20}} underlayColor='#f0f0f0'   onPress={this.iknow.bind(this)}>  
                   
                   <Image style={{height:20,width:20}}
                      source={require('../../resource/images/App/ic_delete.png') }>
                   </Image>
               
              </TouchableHighlight>   
              </View> 
            <View style={{height:1,width:width,backgroundColor:'#DDD'}}>
            </View>
 
            </View>
            <ListView
                    style={{flex:1,overflow:'hidden'}}
                    showsVerticalScrollIndicator={false}
                    dataSource={this.state.dataSources}
                    renderRow={this.renderRowView}
                    contentContainerStyle={styles.list} 
                    pageSize={30}
                    initialListSize={30}
                    /> 
          </Animated.View>  
        </View>); 
  }  
  //显示动画  
  in=()=> {  
   
   //  this.onFetch(); 
     
    Animated.parallel([  
      Animated.timing(  
        this.state.opacity,  
        {  
          easing: Easing.linear,  
          duration: 300,  
          toValue: 0.5,  
        }  
      ),  
      Animated.timing(  
        this.state.offset,  
        {  
          easing: Easing.linear,  
          duration: 300,  
          toValue: 1,  
        }  
      )  
    ]).start(); 
  }  
  
  //隐藏动画  
  out(){  
    Animated.parallel([  
      Animated.timing(  
        this.state.opacity,  
        {  
          easing: Easing.linear,  
          duration: 300,  
          toValue: 0,  
        }  
      ),  
      Animated.timing(  
        this.state.offset,  
        {  
          easing: Easing.linear,  
          duration: 300,  
          toValue: 0,  
        }  
      )  
    ]).start();  
  
    setTimeout(  
      () => this.setState({isLoading: 0}),  
      300  
    );  
  }  
  
  //取消  
  iknow(event) {  
    if(this.state.isLoading===2){  
      this.out();  
    }  
  }    


  //选择  
  choose=(rowData)=> {  
    
    if(this.state.isLoading===2){  
     
     this._weeklyEditForm.setCheckValue(rowData);
      this.out();  
      //this.parent.setState({sex:msg});  
    } 
  }
  //显示选择框
  show=(form)=> {  
    this._weeklyEditForm=form;  
    this.setState({title:this._weeklyEditForm.getSelectTitle(),isLoading: 1});  
    this.onFetch();
     
  }  
  renderRowView=(rowData: string,sectionID: number, rowID: number) =>{ 
    return ( 
      <TouchableOpacity
       onPress={()=>this.choose(rowData)}>
          <View style={styles.row}>
            <Text style={styles.text}
                  numberOfLines={2}>
              {rowData.name}
            </Text>
          </View>
      </TouchableOpacity>  
    );
  }
  //获取对应数据
  // onFetch = () =>
  // { 
  //       fetch('https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json')
  //               .then((response) => response.json())
  //               .then((responseData) => { 
  //                this.data = [...this.state.dataSources, responseData.movies]; 
  //                 for(let i=0;i<1;i++)
  //                 {
  //                    this.data[i]='单元格'+i;
  //                 } 
  //                 let rowsNum=Math.ceil( this.data.length/2);
                  
  //                 aHeight=rowsNum*(itemHeight+cellpadding*2);
                   
  //                 if(aHeight>=height){aHeight=height/2+50} 
                  
  //                 this.setState({ 
  //                   isLoading:2,
  //                   contentHeight:aHeight+51,
  //                   dataSources: this.state.dataSources.cloneWithRows( this.data), 
  //                 }); 
  //                  setTimeout(  
  //                       () => this.in(),  
  //                       300);   
  //                 })
  //               .done(); 
  //   }
    //获取选择对象
    onFetch = () =>{
         let parameter;
         let url;
         let urlTag=this._weeklyEditForm.getClickTag();
         if(urlTag==0)
         {
            parameter={};
            url=workStyle; 
         }else if(urlTag==1)
         {
            parameter={
              UserCode:this._weeklyEditForm.getSecretaryCode(),
            }
            url=workDuty; 
         }else{
            parameter={
              ParetCode:this._weeklyEditForm.state.workDutyCode
            }
            url=workDetailDuty;
         }
        // PublicToast.showMessage("请求链接："+url);
        // PublicToast.showMessage("请求参数链接："+JSON.stringify(parameter));
        HTTPRequest.requestGetWithUrl(url, parameter,
            function (error, responseData,response) {  
                if (error) {
                    PublicToast.showMessage("数据请求失败",);
                    if (response.status == 401) {
                        RefreshToken.refreshToken();
                        return;
                      }
                       this.setState({ 
                          isLoading:0 
                        }); 
                } else {
                  // PublicToast.showMessage("返回"+JSON.stringify(responseData));
                    if (responseData  && responseData.message && responseData.message.length>0) {
                        PublicToast.showMessage("数据请求失败:"+responseData.message);
                        this.setState({ 
                          isLoading:0 
                         }); 
                    }else if (responseData) {
                        this.data =responseData;   
                        let rowsNum=Math.ceil( this.data.length/2);
                        aHeight=rowsNum*(itemHeight+cellpadding*2);
                        if(aHeight>=height){aHeight=height/2+50}  
                        this.setState({ 
                          isLoading:2,
                          contentHeight:aHeight+51,
                          dataSources: this.state.dataSources.cloneWithRows(this.data), 
                        });

                        setTimeout(  
                        () => this.in(),  
                        300);  
                    }else {
                        this.setState({ 
                          isLoading:0 
                        }); 
                        PublicToast.showMessage('数据请求失败，请稍后重试');
                    }
                }
            }.bind(this));
    }
}


const styles = StyleSheet.create({  
  container: {  
    position:"absolute",  
    width:width,  
    height:height,  
    left:left,  
    top:top,
  },  

   loading: {
    alignItems:'center',
    justifyContent:'center', 
    position:"absolute",  
    width:width-180,  
    height:120,  
    left:(width - (width-180)) / 2,  
    top:(height -120) / 2,
   }, 

  mask: {  
    justifyContent:"center",  
    backgroundColor:"#383838",  
    opacity:0.5,  
    position:"absolute",  
    width:width,  
    height:height,  
    left:left,  
    top:top,  
  },
 
  tip: {  
    width:width,  
    backgroundColor:"white",  
    alignItems:"center", 
  }, 
  list: {  
    
    justifyContent: 'space-between',  
    flexDirection: 'row',  
    flexWrap: 'wrap', 
    width:aWidth, 
    alignItems:'center',
  },  
   bigrow: { 
     backgroundColor: 'red',  
    justifyContent: 'center', 
    width: aWidth/2, 
    alignItems:'center', 
    
  },  

  row: {  
    padding: cellpadding,
    margin:cellpadding,
    width: itemWidth,  
    height: itemHeight,  
    alignItems: 'center',  
    justifyContent: 'center',  
    borderWidth: 1,  
    borderRadius: cellpadding,  
    borderColor: '#B5B5B5'
  }, 
  text: {
    alignItems:'center',
    fontSize:14, 
    justifyContent:'center',
    color:'#B5B5B5',  
  },  
}); 