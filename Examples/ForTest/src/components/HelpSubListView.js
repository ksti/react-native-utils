/**
 * Created by yingying on 16/7/25.
 */
//帮助子页面 listview 集成
import React,{
    Component
} from 'react'

//noinspection JSUnresolvedVariable
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Image,
    TouchableHighlight,
    ListView,
    Linking,
}from 'react-native'

import BaseContainer from '../containers/BaseContainer'
import GlobalSize from '../common/GlobalSize'
// import GlobalStyle from '../common/GlobalStyle'

export default class ServicePage extends BaseContainer {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        this.state = {
            dataSource: dataSource,
            isLoading: true
        };
    }
    componentWillMount() {

        console.log(dataAll);

        //用setState来完成对state的修改
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(this.props),
            loaded: true
        });
    }

    rowPressedAction=(rowData,rowID:number)=>{
        if(rowData.rowType === 'email'){
            // alert('发邮件');

            Linking.openURL('mailto://'+rowData.rowTitle);

        }else  if(rowData.rowType === 'tele'){
            Linking.openURL('tel://'+rowData.rowTitle);
        }
    }
    renderSectionHeader(sectionData, sectionID){
        console.log('分区数据==='+{sectionData});
        return (
            <View style={[styles.sectionStyle,{backgroundColor : 'white'}]}>
                <Text style={styles.rowText}>{}</Text>
            </View>
        )
    }

    renderRow=(rowData, sectionID: number, rowID: number)=>{
        console.log('row数据'+rowData.prompt+'行数:'+rowID);
        // return (
        //     <TouchableOpacity onPress={()=>{this.rowPressedAction(rowData,rowID)}} style={[{flex:1,height:45}]} >
        //         <View style={{flex:1,justifyContent:'center',flexDirection:'row',marginTop:10}}>
        //             <Text style={{fontSize:GlobalSize.FontSizeTitle,width:alertWidth-20-15*2,textAlign:'left'}} numberOfLines={2}>{rowData.title}</Text>
        //         </View>
        //     </TouchableOpacity>
        // );
        // return ;
        if(rowData.rowType === 'name'|| rowData.rowType === 'detName'){
            return (
                <TouchableHighlight onPress={()=>{this.rowPressedAction(rowData,rowID)}}>
                    <View style={styles.rowStyle}>
                        <Text style={styles.rowTextPrompt}>{rowData.prompt}</Text>
                        <Text style={styles.rowTextBlack}>{rowData.rowTitle}</Text>
                    </View>
                </TouchableHighlight>
            );
        }else if(rowData.rowType === 'tele'){
            return (
                <TouchableHighlight onPress={()=>Alert.alert(
                rowData.rowTitle,
                alertMessage,
                [
                    {text:'取消',onPress: () => console.log('cancel Pressed!')},
                    {text:'呼叫',onPress:()=>{this.rowPressedAction(rowData,rowID)}}   //onPress:()=>{this.rowPressedAction(rowData,rowID)}
                 ]
                )}>
                    <View style={styles.rowStyle}>
                        <Text style={styles.rowTextPrompt}>{rowData.prompt}</Text>
                        <Text style={styles.rowText}>{rowData.rowTitle}</Text>
                    </View>
                </TouchableHighlight>
            );
        }else if (rowData.rowType === 'email'){
            return (
                <TouchableHighlight onPress={()=>Alert.alert(
                '发邮件给:',
                rowData.rowTitle,
                [
                  {text:'取消',onPress: () => console.log('cancel Pressed!')},
                  {text:'确定',onPress:()=>{this.rowPressedAction(rowData,rowID)}}
                ]
                )}>
                    <View style={styles.rowStyle}>
                        <Text style={styles.rowTextPrompt}>{rowData.prompt}</Text>
                        <Text style={styles.rowText}>{rowData.rowTitle}</Text>
                    </View>
                </TouchableHighlight>
            );
        }else{
            return (
                <TouchableHighlight onPress={()=>{this.rowPressedAction(rowData,rowID)}}>
                    <View style={styles.rowStyle}>
                        <Text style={styles.rowTextPrompt}>{rowData.prompt}</Text>
                        <Text style={styles.rowText}>{rowData.rowTitle}</Text>
                    </View>
                </TouchableHighlight>
            );
        }
    };

    render() {
        return (
            <View style={{flex:1}}>
                {this.defaultRenderNavigationBar()}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader = {this.renderSectionHeader}
                />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom:1
    },
    firstLineContainer:{
        flex:1,
        flexDirection:'row',
        marginTop:GlobalSize.cellPadding,
        marginLeft:GlobalSize.cellPadding
    },
    sectionStyle:{
        flex:1
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        height:40,
        alignItems:'center'
    },

    titleShow:{
        marginLeft:10
    },
    rowStyle:{
        flex:1,
        flexDirection: 'row',
        alignItems:'center',
        padding:GlobalSize.cellPadding,
        backgroundColor:'white',
        height:40,
        borderBottomWidth:1,
        borderBottomColor:'#e4e4e4'
    },
    rowText0:{
        color:'black'
    },
    rowText:{
        color:'blue'
    },
    rowTextPrompt:{
        width:70,
        color:'#999999'
    },
    rowTextBlack:{
        color:'#333333'
    }
});

