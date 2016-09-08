/*
界面功能：菜单
相关界面：首页－头部菜单
props：无（目前只有此处用到如此菜单类型，若有他处用到，可修改代码，传入数据源）
*/
import React,{ Component } from 'react'
import{ View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'

import { Actions } from 'react-native-router-flux';
import ButtonUpDown from './ButtonUpDown';
import GlobalSize from '../common/GlobalSize'

import PublicToast from './PublicToast'

var cardMenu = [{
    title:'签到',
    image:require('../../resource/images/App/qiandao.png'),
    key:"signIn",
},{
    title:'我要拟单',
    image:require('../../resource/images/App/nidan.png'),
    key:"makeFlow",
},{
    title:'会议室',
    image:require('../../resource/images/App/huiyishiyuding.png'),
    key:"meeting",
},{
    title:'邮箱',
    image:require('../../resource/images/App/youxiang.png'),
    key:"email",
},{
    title:'新闻中心',
    image:require('../../resource/images/App/xinwenzhongxin.png'),
    key:"newsCenter",
},{
    title:'通知纪要',
    image:require('../../resource/images/App/tongzhijiyao.png'),
    key:"notice",
},{
    title:'远洋学院',
    image:require('../../resource/images/App/yuanyangxueyuan.png'),
    key:"learn",
},{
    title:'通讯录',
    image:require('../../resource/images/App/tongxunlu.png'),
    key:"addressBook",
},{
    title:'案场报表',
    image:require('../../resource/images/App/fangwuyuyanshou.png'),
    key:'caseReport'
},{
    title:'房屋预验收',
    image:require('../../resource/images/App/fangwuyuyanshou.png'),
    key:'housePreAcceptance'
},
]
export default class HEMenuCard extends Component {
    constructor(props){
        super(props);
        this.state={
        }
    }
    pushToNextPage(item){
        let moduleStates = this.props.moduleStates
        switch (item.key) { 
            case "signIn": 
                Actions.signIn({ title: "签到" });              
            case "makeFlow":
                Actions.makeFlowPage({title:"我要拟单"});
                break;
            case "meeting":
                Actions.meeting({title:"会议室"})
                break;
            case "email":
                // PublicToast.showMessage('该功能还未上线,敬请期待');
                Actions.SQLiteDemo({title:"sql存储demo"}); //暂作为案场报表的入口
                break;
            case "newsCenter":
            {
                Actions.newsCenter({title:"新闻中心", actions: this.props.actions})
                break;
            }
            case "notice":
                Actions.notice({title:"通知纪要"})
                break;
            case "learn":
                Actions.learn({title:'远洋学院',url:GlobalSize.BaseWebURL+'MobileWebApp/CareerLearning/PersonalCenter/LearningPassports?t='})
                break;
            case "addressBook":
                Actions.addressBook({title:"通讯录"})
                break;
            case 'caseReport':
                Actions.caseReport({title:"案场报表",actions:this.props.actions}); //暂作为案场报表的入口
                break;
            case 'housePreAcceptance':
                Actions.myTaskPage();
                break;
            default:
                alert("尚未开通");
        }
    }
    renderItems=(dataArr)=>{
        return dataArr.map((items,i)=>{
            return(
                <ButtonUpDown
                    key={i}
                    onPress={()=>{this.pushToNextPage(items)}}
                    image={items.image}
                    text={items.title}
                    styleBg={{backgroundColor:'white'}}
                    styleText={{color:GlobalSize.colorBlackText}}
                />
            )
        });
    }
    //数组中的.slice(start,end)方法，表示从数组group中返回选定的从start到end的元素
    render(){
        return(
            <View style={this.props.style} >
                <View style={styles.lineBoxContainer}>
                    {this.renderItems(cardMenu.slice(0,4))}
                </View>
                <View style={styles.lineBoxContainer}>
                    {this.renderItems(cardMenu.slice(4,8))}
                </View>
                <View style={styles.lineBoxContainer}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <ButtonUpDown
                            onPress={()=>{this.pushToNextPage(cardMenu[8])}}
                            image={cardMenu[8].image}
                            text={cardMenu[8].title}
                            styleBg={{backgroundColor:'white'}}
                            styleText={{color:GlobalSize.colorBlackText}}
                        />
                        <ButtonUpDown
                            onPress={()=>{this.pushToNextPage(cardMenu[9])}}
                            image={cardMenu[9].image}
                            text={cardMenu[9].title}
                            styleBg={{backgroundColor:'white'}}
                            styleText={{color:GlobalSize.colorBlackText}}
                        />
                    </View>
                    <View style={{flex:1,backgroundColor:'white'}}>
                    </View>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container:{
    },
    lineBoxContainer:{
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:GlobalSize.colorBgMain,
        height:80,
    },
    itemContainer:{
        flex:1,
        alignItems:'center',
        backgroundColor:'white',
        // marginRight:1,
        // marginBottom:1,
    },
    image:{
        width:30,
        height:30,
        marginTop:15,
    },
    text:{
        marginTop:5,
        height:20,
        textAlign:'center',
    }

});
