/**
 * 横向滚动菜单
 * Created by Mike on 2016/8/17.
 *
 *
 *   <HorizontalMenu menuList={['基本信息','验收信息']} menuOnPress={[this.goPageone,this.goPagetwo]}
     showIndex={this.state.pageindex-1}
     marginLeft={30} marginRight={30} checkColor={'#ff5001'} notCheckColor={'#3B3B3B'}
     width={GlobalSize.DeviceWidth}
     lineStyle={{width:1,backgroundColor:'#dedede'}}
     />
 *
 *
 *
 */
import React,{
    Component
} from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity
}from 'react-native'
import GlobalSize from '../common/GlobalSize'


export default class HorizontalMenu extends Component{
    constructor(props){
        super(props);
    }

    renderMenu=()=>{
        var arr=[];
        for(let i=0;i<this.props.menuList.length;i++)
        {
            if(this.props.showIndex==i){
                arr.push(

                    <TouchableOpacity underlayColor="white" onPress={this.props.menuOnPress[i]} style={styles.tab} key={i}>
                        <View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',}} >

                            <View style={i===0?{width:0,}:[{width:0,height:30,justifyContent:'center',alignItems:'center',backgroundColor:'#dedede'},this.props.lineStyle]}></View>


                           <View style={styles.viewStyle} >

                            <Text style={[styles.text1Style,{color:this.props.checkColor}]} >{this.props.menuList[i]}</Text>
                            <View height={2} style={{ backgroundColor:this.props.checkColor,marginLeft:this.props.marginLeft,marginRight:this.props.marginRight}}></View>
                           </View>


                        </View>
                    </TouchableOpacity>
                );
            }else
            {
                arr.push(

                    <TouchableOpacity underlayColor="white" onPress={this.props.menuOnPress[i]} style={styles.tab}  key={i}>
                        <View style={{flexDirection:'row',flex:1,justifyContent:'center',alignItems:'center',}} >

                            <View style={i===0?{width:0,}:[{width:0,height:30,justifyContent:'center',alignItems:'center',backgroundColor:'#dedede'},this.props.lineStyle]}></View>

                        <View style={styles.viewStyle} >
                            <Text style={[styles.text2Style,{color:this.props.notCheckColor}]} >{this.props.menuList[i]}</Text>
                            <View height={0} style={{ backgroundColor:this.props.notCheckColor}}></View>
                         </View>


                        </View>
                    </TouchableOpacity>
                );
            }
        }
        return (
            arr
        );
    }
    render(){
        return(
            <ScrollView horizontal={true} showsHorizontalScrollIndicator ={false}
                 style={[{flex:1,overflow:'hidden'}]}
                 contentContainerStyle={[{ justifyContent: 'center', backgroundColor: '#ffffff', alignItems: 'center',}]}
                >
                <View style={[{width:GlobalSize.DeviceWidth,flexDirection:'row'},this.props.bgstyle]}>
                    {this.renderMenu()}
                </View>
            </ScrollView>
        );
    }
};
var styles = StyleSheet.create({
    tab:{
        flex:1,
        height:44,
    },
    text1Style:{
        flex:1,
        marginTop:12,
        textAlign: 'center',
        alignItems:'center',
        justifyContent:'center',
        fontSize:16,
        color:GlobalSize.colorOrangeIcon,
    },
    text2Style:{
        flex:1,
        marginTop:12,
        textAlign: 'center',
        alignItems:'center',
        justifyContent:'center',
        fontSize:16,
        color:GlobalSize.colorTextDarkGray,
    },
    viewStyle:{
        height:44,
        flex:1,
    },
});