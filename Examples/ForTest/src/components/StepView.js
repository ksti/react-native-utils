/**
 * Created by Administrator on 2016-08-16.
 */

/**
 * <StepView
 type={1}
 bgstyle={{height:30,paddingLeft:10,paddingRight:10,backgroundColor:"#333333"}}
 rowStyle={{backgroundColor:"transparent"}}
 DefaultViewTvStyle={{color:'#A7A7A7',marginRight:5,marginLeft:5}}
 DefaultViewImgUrl={require('../../../resource/images/App/ic_flow_finished.png')}
 CompletedViewTvStyle={{color: '#36BC99',marginRight:5,marginLeft:5}}
 CompletedViewImgUrl={require('../../../resource/images/App/ic_gray_rightArrow.png')}
 SelectViewTvStyle={{color: '#FF5001',marginRight:5,marginLeft:5}}
 SelectViewImgUrl={require('../../../resource/images/App/ic_flow_finished.png')}
 CompletedindexData='流程2'
 click={(rowData)=>this.click(rowData)}
 dataSource={this.state.data}
 />

 <StepView
 type={1}
 bgstyle={{height:40}}
 rowStyle={{backgroundColor:"transparent",paddingLeft:5,paddingRight:5}}
 DefaultViewTvStyle={{color:'#A7A7A7',marginRight:10,}}
 DefaultViewImgUrl={require('../../../resource/images/App/ic_flow_finished.png')}
 CompletedViewTvStyle={{color: '#36BC99',marginRight:10,}}
 CompletedViewImgUrl={require('../../../resource/images/App/ic_gray_rightArrow.png')}
 SelectViewTvStyle={{color: '#FF5001',marginRight:10,}}
 SelectViewImgUrl={require('../../../resource/images/App/ic_flow_finished.png')}
 CompletedindexData='流程2'
 click={(rowData)=>this.click(rowData)}
 dataSource={this.state.data}
 />

 <StepView
 type={1}
 bgstyle={{height:50}}
 rowStyle={{backgroundColor:"transparent",paddingLeft:10,paddingRight:10}}
 DefaultViewTvStyle={{color: '#A7A7A7',marginRight:5,}}
 CompletedViewTvStyle={{color: '#36BC99',marginRight:5,}}
 SelectViewTvStyle={{color: '#FF5001',marginRight:5,}}
 DefaultViewIndicatorStyle={{color: '#A7A7A7',marginLeft:10,}}
 CompletedViewIndicatorStyle={{color: '#36BC99',marginLeft:10,}}
 SelectViewIndicatorStyle = {{color: '#A7A7A7',marginLeft:10,}}
 svindicatorTvData="-->"
 Completedindex={2}
 click={(rowData)=>this.click(rowData)}
 dataSource={this.state.data}
 />


 <StepView
 type={2}
 bgstyle={{height:50}}
 rowStyle={{backgroundColor:"transparent",paddingLeft:0,paddingRight:0,minWidth:60,minHeight:50}}
 DefaultViewTvStyle={{color: '#A7A7A7',}}
 CompletedViewTvStyle={{color: '#36BC99'}}
 SelectViewTvStyle={{color: '#FF5001'}}
 DefaultViewIndicatorStyle={{backgroundColor: '#A7A7A7'}}
 CompletedViewIndicatorStyle={{backgroundColor: '#36BC99'}}
 SelectViewIndicatorStyle = {{backgroundColor: '#FF5001'}}
 lineColor = {{backgroundColor:'#999999'}}
 Completedindex={2}
 click={(rowData)=>this.click(rowData)}
 dataSource={this.state.data}
 />


//带时间的
 <StepView
 type={3}
 bgstyle={{height:60,marginBottom:5,marginTop:5}}
 rowStyle={{backgroundColor:"transparent",paddingLeft:0,paddingRight:0,paddingTop:0,minWidth:90,minHeight:40}}
 DefaultViewTvStyle={{color: '#A7A7A7',}}
 CompletedViewTvStyle={{color: '#36BC99'}}
 SelectViewTvStyle={{color: '#FF5001'}}
 DefaultViewIndicatorStyle={{backgroundColor: '#A7A7A7'}}
 CompletedViewIndicatorStyle={{backgroundColor: '#36BC99'}}
 SelectViewIndicatorStyle={{backgroundColor: '#FF5001'}}
 lineColor={{backgroundColor:'#999999'}}
 Completedindex={2}
 click={(rowData)=>this.click(rowData)}
 dataSource={["验收","整改","监理","复验",]}
 timeStyle={{color: '#A7A7A7',}}
 timedata={["2016-08-18","2016-08-18","2016-08-18","2016-08-18",]}
 />


 */
import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Animated,
    Dimensions,
    ListView,
    Text,
    TouchableOpacity,
    Platform,
    Image,
    ScrollView,
   ToastAndroid,
} from "react-native";
export default class StepView extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(this.props.dataSource),
            data: this.props.dataSource
        }
    }


    componentDidMount() {
        // <ListView
        //     enableEmptySections={true}
        //     contentContainerStyle={styles.list}
        //     dataSource={this.state.dataSource}
        //     renderRow={this._renderRow}
        //     horizontal ={true}
        // />
        // <ScrollView
        //     automaticallyAdjustContentInsets={false}
        //     horizontal={true}
        //     style={{backgroundColor:'#ffffff'}}
        //      showsHorizontalScrollIndicator={false}
        //   >
        //     {this.getItems(data)}
        // </ScrollView>
    }


    /**
     * 类型1
     * @returns {XML}
     * @private
     */
    _renderTypeOne = () => {
        return (
            <View  {...this.props} >
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={true}
                    style={[{overflow:'hidden'}]}
                    contentContainerStyle={[this.props.bgstyle]}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                >
                    {this.getItemsOne(this.state.data)}
                </ScrollView>
            </View>
        );
    }

    /**
     * 类型2
     * @returns {XML}
     * @private
     */
    _renderTypeTwo = () => {
        return (
            <View  {...this.props} >
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={true}
                    style={[{overflow:'hidden'}]}
                    contentContainerStyle={[{ justifyContent: 'center', backgroundColor: '#ffffff', alignItems: 'center',},this.props.bgstyle]}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}
                >
                    {this.getItemsTwo(this.state.data)}
                </ScrollView>
            </View>
        );
    }


    /**
     * 类型3
     * @returns {XML}
     * @private
     */
    _renderTypeThree = () => {
        return (
            <View  {...this.props} >
                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    horizontal={true}
                    style={[{overflow:'hidden'}]}
                    contentContainerStyle={[{ justifyContent: 'center', backgroundColor: '#ffffff', alignItems: 'center',},this.props.bgstyle]}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={true}

                >
                    {this.getItemsThree(this.state.data)}
                </ScrollView>

            </View>
        );
    }




    render() {

        if (this.props.type == 1) {
            return (
                <View {...this.props}>
                    {this._renderTypeOne()}
                </View>
            );
        } else if (this.props.type == 2) {
            return (
                <View {...this.props}>
                    {this._renderTypeTwo()}
                </View>
            );
        }    else if (this.props.type == 3) {
                        return (
                    <View {...this.props}>
                    {this._renderTypeThree()}
                    </View>
                    );
                    }
        else {
            return (
                <View {...this.props}>
                    {this._renderTypeOne()}
                </View>
            );
        }


    }


    click = (rowData)=> {
        if(this.props.click){
            this.props.click(rowData);
        }
    }




    getItemsOne = (rowData)=> {
        var viewArr = [];
        for (let i = 0; i < rowData.length; i++) {
            //在流程中已经完成的样式
            let CompletedViewTvStyle = this.props.CompletedViewTvStyle;
            let CompletedViewIndicatorStyle = this.props.CompletedViewIndicatorStyle;
            let CompletedViewImgUrl = this.props.CompletedViewImgUrl;


            //选中的样式
            let SelectViewTvStyle = this.props.SelectViewTvStyle;
            let SelectViewIndicatorStyle = this.props.SelectViewIndicatorStyle;
            let SelectViewImgUrl = this.props.SelectViewImgUrl;


            //默认样式
            let DefaultViewTvStyle = this.props.DefaultViewTvStyle;
            let DefaultViewIndicatorStyle = this.props.DefaultViewIndicatorStyle;
            let DefaultViewImgUrl = this.props.DefaultViewImgUrl;//   流程图中间 图片的url

            let Completedindex = this.props.Completedindex;//完成到哪个节点位置
            if (Completedindex) {//如果没有返回完成到那个节点 就返回一个节点的数据 在数据源查找位置  用来判断已经完成的节点的位置
                if (Completedindex === 0) {
                    Completedindex = -1
                }
            } else {
                let CompletedindexData = this.props.CompletedindexData;
                Completedindex = this.props.dataSource.indexOf(CompletedindexData);
            }

            var svindicatorTvData = this.props.svindicatorTvData;//流程图中间的文字

            if (i === rowData.length - 1) {
                if(this.props.click){
                    viewArr.push(
                        <TouchableOpacity onPress={()=>{this.click(rowData[i])}} underlayColor='transparent' key={i}>
                            <View style={[styles.row,this.props.rowStyle,{marginRight:10}]}>
                                <Text
                                    style={[Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle]}>
                                    {rowData[i]}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }else{
                    viewArr.push(
                        <View key={i}>
                            <View style={[styles.row,this.props.rowStyle,{marginRight:10}]}>
                                <Text
                                    style={[Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle]}>
                                    {rowData[i]}
                                </Text>
                            </View>
                        </View>
                    );
                }

            } else {
                if (DefaultViewImgUrl) {
                    if(this.props.click){
                        viewArr.push(
                            <TouchableOpacity onPress={()=>{this.click(rowData[i])}} underlayColor='transparent' key={i}>
                                <View style={[styles.row,this.props.rowStyle]}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                    <Image
                                        style={{width:20,height:20,resizeMode:'contain',justifyContent:'center',alignItems:'center',}}
                                        source={Completedindex> i ?CompletedViewImgUrl: Completedindex == i?SelectViewImgUrl:DefaultViewImgUrl}/>
                                </View>
                            </TouchableOpacity>
                        );
                    }else{
                        viewArr.push(
                            <View  key={i}>
                                <View style={[styles.row,this.props.rowStyle]}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                    <Image
                                        style={{width:20,height:20,resizeMode:'contain',justifyContent:'center',alignItems:'center',}}
                                        source={Completedindex> i ?CompletedViewImgUrl: Completedindex == i?SelectViewImgUrl:DefaultViewImgUrl}/>
                                </View>
                            </View>
                        );
                    }

                } else {
                    if(this.props.click){
                        viewArr.push(
                            <TouchableOpacity onPress={()=>{this.click(rowData[i])}} underlayColor='transparent' key={i}>
                                <View style={[styles.row,this.props.rowStyle]}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex ==i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                    <Text
                                        style={Completedindex > i ?CompletedViewIndicatorStyle  : Completedindex == i? SelectViewIndicatorStyle: DefaultViewIndicatorStyle}>
                                        {svindicatorTvData}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    }else{
                        viewArr.push(
                            <View key={i}>
                                <View style={[styles.row,this.props.rowStyle]}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex ==i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                    <Text
                                        style={Completedindex > i ?CompletedViewIndicatorStyle  : Completedindex == i? SelectViewIndicatorStyle: DefaultViewIndicatorStyle}>
                                        {svindicatorTvData}
                                    </Text>
                                </View>
                            </View>
                        );
                    }

                }
            }
        }
        return (
            viewArr
        );
    }


    getItemsTwo = (rowData)=> {
        var viewArr = [];

        for (let i = 0; i < rowData.length; i++) {
            //在流程中已经完成的样式
            let CompletedViewTvStyle = this.props.CompletedViewTvStyle;
            let CompletedViewIndicatorStyle = this.props.CompletedViewIndicatorStyle;
            //选中的样式
            let SelectViewTvStyle = this.props.SelectViewTvStyle;
            let SelectViewIndicatorStyle = this.props.SelectViewIndicatorStyle;
            //默认样式
            let DefaultViewTvStyle = this.props.DefaultViewTvStyle;
            let DefaultViewIndicatorStyle = this.props.DefaultViewIndicatorStyle;

            //中间线的颜色
            let lineColor = this.props.lineColor;

            let Completedindex = this.props.Completedindex;//完成到哪个节点位置
            if (Completedindex) {//如果没有返回完成到那个节点 就返回一个节点的数据 在数据源查找位置  用来判断已经完成的节点的位置
                if (Completedindex === 0) {
                    Completedindex = -1
                }
            } else {
                let CompletedindexData = this.props.CompletedindexData;
                Completedindex = this.props.dataSource.indexOf(CompletedindexData);
            }

            var svindicatorTvData = this.props.svindicatorTvData;//流程图中间的文字




            if (i === 0) {
                if(this.props.click){
                    viewArr.push(
                        <TouchableOpacity onPress={()=>{this.click(rowData[i])}} underlayColor='transparent' key={i}>
                            <View style={[styles.rowtwo,this.props.rowStyle]}>
                                <View
                                    style={{height:20,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <View style={{flex:1,height:1,backgroundColor:'#ffffff',}}/>
                                    <View
                                        style={[{height:10,width:10,borderRadius:5},Completedindex > i ? CompletedViewIndicatorStyle: Completedindex == i? SelectViewIndicatorStyle:DefaultViewIndicatorStyle]}/>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                </View>

                                <View
                                    style={{flex: 1,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }else{
                    viewArr.push(
                        <View key={i}>
                            <View style={[styles.rowtwo,this.props.rowStyle]}>
                                <View
                                    style={{height:20,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <View style={{flex:1,height:1,backgroundColor:'#ffffff',}}/>
                                    <View
                                        style={[{height:10,width:10,borderRadius:5},Completedindex > i ? CompletedViewIndicatorStyle: Completedindex == i? SelectViewIndicatorStyle:DefaultViewIndicatorStyle]}/>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                </View>

                                <View
                                    style={{flex: 1,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                }

            } else if (i === rowData.length - 1) {
                if(this.props.click){
                    viewArr.push(
                        <TouchableOpacity onPress={()=>{this.click(rowData[i])}} underlayColor='transparent' key={i}>
                            <View style={[styles.rowtwo,this.props.rowStyle]}>
                                <View
                                    style={{height:20,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                    <View
                                        style={[{height:10,width:10,borderRadius:5},Completedindex > i ? CompletedViewIndicatorStyle: Completedindex == i? SelectViewIndicatorStyle:DefaultViewIndicatorStyle]}/>
                                    <View style={{flex:1,height:1,backgroundColor:'#ffffff',}}/>
                                </View>
                                <View
                                    style={{flex: 1,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }else{
                    viewArr.push(
                        <View  key={i}>
                            <View style={[styles.rowtwo,this.props.rowStyle]}>
                                <View
                                    style={{height:20,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                    <View
                                        style={[{height:10,width:10,borderRadius:5},Completedindex > i ? CompletedViewIndicatorStyle: Completedindex == i? SelectViewIndicatorStyle:DefaultViewIndicatorStyle]}/>
                                    <View style={{flex:1,height:1,backgroundColor:'#ffffff',}}/>
                                </View>
                                <View
                                    style={{flex: 1,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                }

            } else {
                if(this.props.click){
                    viewArr.push(
                        <TouchableOpacity onPress={()=>{this.click(rowData[i])}} underlayColor='transparent' key={i}>
                            <View style={[styles.rowtwo,this.props.rowStyle]}>
                                <View
                                    style={{height:20,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                    <View
                                        style={[{height:10,width:10,borderRadius:5},Completedindex > i ? CompletedViewIndicatorStyle: Completedindex == i? SelectViewIndicatorStyle:DefaultViewIndicatorStyle]}/>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                </View>
                                <View
                                    style={{flex: 1,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }else{
                    viewArr.push(
                        <View key={i}>
                            <View style={[styles.rowtwo,this.props.rowStyle]}>
                                <View
                                    style={{height:20,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                    <View
                                        style={[{height:10,width:10,borderRadius:5},Completedindex > i ? CompletedViewIndicatorStyle: Completedindex == i? SelectViewIndicatorStyle:DefaultViewIndicatorStyle]}/>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                </View>
                                <View
                                    style={{flex: 1,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    );
                }

            }


        }

        return (
            viewArr
        );

    }



    getItemsThree= (rowData)=> {
        var viewArr = [];

        for (let i = 0; i < rowData.length; i++) {
            //在流程中已经完成的样式
            let CompletedViewTvStyle = this.props.CompletedViewTvStyle;
            let CompletedViewIndicatorStyle = this.props.CompletedViewIndicatorStyle;
            //选中的样式
            let SelectViewTvStyle = this.props.SelectViewTvStyle;
            let SelectViewIndicatorStyle = this.props.SelectViewIndicatorStyle;
            //默认样式
            let DefaultViewTvStyle = this.props.DefaultViewTvStyle;
            let DefaultViewIndicatorStyle = this.props.DefaultViewIndicatorStyle;

            //中间线的颜色
            let lineColor = this.props.lineColor;

            let Completedindex = this.props.Completedindex;//完成到哪个节点位置
            if (Completedindex) {//如果没有返回完成到那个节点 就返回一个节点的数据 在数据源查找位置  用来判断已经完成的节点的位置
                if (Completedindex === 0) {
                    Completedindex = -1
                }
            } else {
                let CompletedindexData = this.props.CompletedindexData;
                Completedindex = this.props.dataSource.indexOf(CompletedindexData);
            }

            var svindicatorTvData = this.props.svindicatorTvData;//流程图中间的文字

            var timedatas = this.props.timedata;//时间
            var timeStyle= this.props.timeStyle;//时间样式
            var timedata;
            if(i>=timedatas.length){
                timedata="  ";
            }else{
                timedata = timedatas[i];
            }



            if (i === 0) {
                if(this.props.click){
                    viewArr.push(
                        <TouchableOpacity onPress={()=>{this.click(rowData[i])}} underlayColor='transparent' key={i} >
                            <View style={[styles.rowtwo,this.props.rowStyle]}>
                                <View
                                    style={{height:20,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <View style={{flex:1,height:1,backgroundColor:'#ffffff',}}/>
                                    <View
                                        style={[{height:10,width:10,borderRadius:5},Completedindex > i ? CompletedViewIndicatorStyle: Completedindex == i? SelectViewIndicatorStyle:DefaultViewIndicatorStyle]}/>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                </View>

                                <View
                                    style={{flex: 1,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                </View>
                                <View style={{justifyContent :'center',alignItems:'center'}}>
                                    <Text style={[{fontSize:12},timeStyle]}>{timedata}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );



                }else{
                    viewArr.push(
                        <View key={i} >
                            <View style={[styles.rowtwo,this.props.rowStyle]}>
                                <View
                                    style={{height:20,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <View style={{flex:1,height:1,backgroundColor:'#ffffff',}}/>
                                    <View
                                        style={[{height:10,width:10,borderRadius:5},Completedindex > i ? CompletedViewIndicatorStyle: Completedindex == i? SelectViewIndicatorStyle:DefaultViewIndicatorStyle]}/>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                </View>

                                <View
                                    style={{flex: 1,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                </View>
                                <View style={{justifyContent :'center',alignItems:'center'}}>
                                    <Text style={[{fontSize:12},timeStyle]}> {timedata}</Text>
                                </View>
                            </View>
                        </View>
                    );

                }

            } else if (i === rowData.length - 1) {
                if(this.props.click){
                    viewArr.push(
                        <TouchableOpacity onPress={()=>{this.click(rowData[i])}} underlayColor='transparent' key={i}>
                            <View style={[styles.rowtwo,this.props.rowStyle]}>
                                <View
                                    style={{height:20,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                    <View
                                        style={[{height:10,width:10,borderRadius:5},Completedindex > i ? CompletedViewIndicatorStyle: Completedindex == i? SelectViewIndicatorStyle:DefaultViewIndicatorStyle]}/>
                                    <View style={{flex:1,height:1,backgroundColor:'#ffffff',}}/>
                                </View>
                                <View
                                    style={{flex: 1,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                </View>
                                <View style={{justifyContent :'center',alignItems:'center'}}>
                                    <Text style={[{fontSize:12},timeStyle]}>{timedata}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }else{
                    viewArr.push(
                        <View key={i}>
                            <View style={[styles.rowtwo,this.props.rowStyle]}>
                                <View
                                    style={{height:20,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                    <View
                                        style={[{height:10,width:10,borderRadius:5},Completedindex > i ? CompletedViewIndicatorStyle: Completedindex == i? SelectViewIndicatorStyle:DefaultViewIndicatorStyle]}/>
                                    <View style={{flex:1,height:1,backgroundColor:'#ffffff',}}/>
                                </View>
                                <View
                                    style={{flex: 1,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                </View>
                                <View style={{justifyContent :'center',alignItems:'center'}}>
                                    <Text style={[{fontSize:12},timeStyle]}>{timedata}</Text>
                                </View>
                            </View>
                        </View>
                    );

                }

            } else {
                if(this.props.click){
                    viewArr.push(
                        <TouchableOpacity onPress={()=>{this.click(rowData[i])}} underlayColor='transparent' key={i}>
                            <View style={[styles.rowtwo,this.props.rowStyle]}>
                                <View
                                    style={{height:20,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                    <View
                                        style={[{height:10,width:10,borderRadius:5},Completedindex > i ? CompletedViewIndicatorStyle: Completedindex == i? SelectViewIndicatorStyle:DefaultViewIndicatorStyle]}/>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                </View>
                                <View
                                    style={{flex: 1,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                </View>
                                <View style={{justifyContent :'center',alignItems:'center'}}>
                                    <Text style={[{fontSize:12},timeStyle]}>{timedata}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }else{
                    viewArr.push(
                        <View key={i}>
                            <View style={[styles.rowtwo,this.props.rowStyle]}>
                                <View
                                    style={{height:20,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                    <View
                                        style={[{height:10,width:10,borderRadius:5},Completedindex > i ? CompletedViewIndicatorStyle: Completedindex == i? SelectViewIndicatorStyle:DefaultViewIndicatorStyle]}/>
                                    <View style={[{flex:1,height:1},lineColor]}/>
                                </View>
                                <View
                                    style={{flex: 1,justifyContent :'center',alignItems:'center',flexDirection:'row'}}>
                                    <Text
                                        style={Completedindex > i ? CompletedViewTvStyle : Completedindex == i? SelectViewTvStyle:DefaultViewTvStyle}>
                                        {rowData[i]}
                                    </Text>
                                </View>
                                <View style={{justifyContent :'center',alignItems:'center'}}>
                                    <Text style={[{fontSize:12},timeStyle]}>{timedata}</Text>
                                </View>
                            </View>
                        </View>
                    );

                }

            }


        }

        return (
            viewArr
        );

    }



}

var styles = StyleSheet.create({

    list: {

        overflow: 'hidden',
        flex: 1,
        height: 40,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    row: {
        overflow: 'hidden',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        minHeight: 30,
        flexDirection: 'row'
    },
    rowtwo: {
        overflow: 'hidden',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        minHeight: 30,
    },

})