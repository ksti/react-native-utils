import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    ScrollView,
    TouchableHighlight,
    ListView,
    Navigator,
    Platform,
    Alert,
    AlertIOS,
    Dimensions,
    Animated,
    Easing,
    InteractionManager,
} from 'react-native';
import PublicToast from '../components/PublicToast'
import BaseContainer from '../containers/BaseContainer';
import GlobalStyle from '../common/GlobalStyle';
import GlobalSize from '../common/GlobalSize';
import ListFooter from '../components/ListFooter';
import WeeklyAlert from '../components/WeeklyAlert';
import NavBarButton from '../components/NavBarButton';
import TimerUtils from '../common/TimerUtils';
import { Actions } from 'react-native-router-flux';
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var clickTag = 0;
var isStartTime = true;//是否选择的开始时间
var userCode = "5e03356b-0d68-4f58-82c3-900d2cb55feb";
var timerStart;//固定的时间开头 如：2016-8-29 周一 
var week_day = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
let defaultStartTime, defaultEndTime, defaultTimeLong;
var n = 0;
var weekOfYearArr;
var nameUnEditable=["个人","阅处事务","差旅","市内交通"];
var typeUnEditable=["市内交通"];
var dutyUnEditable=["个人","市内交通"];
export default class WeeklyEditForm extends Component {
    constructor(props) {
        super(props);
        this.initBaseData(); 
        this.state =
        {
                isAdd: false,
                unEditableDefault:'不可编辑',
                nameUnEditable:false,//人员不可编辑
                typeUnEditable:false,//计划不可编辑
                dutyUnEditable:false,//职责不可编辑
                inputDefault: '请输入',
                checkDefault: '请选择输入',
                workDutyName: '',//职责
                workDutyCode: '',//职责code
                workDetailDutyName: '',//职责明细
                workDetailDutyCode: '',//职责明细code
                workOfStartTime: '',
                workOfEndTime: '',
                itemName: '',//事项
                userName: '',//人员
                workStyleName: '',//形式
                workStyleCode: '',//形式code
                itemsStatus: '',//事项状态
                itemsStatusID: '',//事项状态
                workTypeCode: '3',//计划
                workTypeName: '',
                useTime: '', 
                isEdit: this.props.isEdit,//是否编辑
        };
    } 
    /**详情获取数据后刷新**/
    onRenderForm = (itemRowsData, isEdit) => {
        if (itemRowsData) {
            let workOfStartTime;
            let workOfEndTime;
            if (itemRowsData.workOfStartTime && itemRowsData.workOfStartTime.indexOf(":") > 0) {
                let hourArr = itemRowsData.workOfStartTime.split(":");
                workOfStartTime = timerStart + " " + this.getTimeAreaByHour(hourArr[0]) + itemRowsData.workOfStartTime;
            }
            if (itemRowsData.workOfEndTime && itemRowsData.workOfEndTime.indexOf(":") > 0) {
                let hourArr = itemRowsData.workOfEndTime.split(":");
                workOfEndTime = timerStart + " " + this.getTimeAreaByHour(hourArr[0]) + itemRowsData.workOfEndTime;
            }
            
            this.setState({
                superiorCode: itemRowsData.superiorCode,
                code: itemRowsData.code,
                unEditableDefault:'不可编辑',
                nameUnEditable:this.isExistArray(nameUnEditable,itemRowsData.workStyleName),
                dutyUnEditable:this.isExistArray(dutyUnEditable,itemRowsData.workStyleName),
                typeUnEditable:this.isExistArray(typeUnEditable,itemRowsData.workStyleName),
                workDutyName: itemRowsData.workDutyName,
                workDutyCode: itemRowsData.workDutyCode,
                workDetailDutyName: itemRowsData.workDetailDutyName,
                workDetailDutyCode: itemRowsData.workDetailDutyCode,
                workOfStartTime: workOfStartTime, 
                workOfEndTime: workOfEndTime,
                itemName: itemRowsData.itemName,//事项
                userName: itemRowsData.userName,//人员
                workStyleName: itemRowsData.workStyleName,//形式
                workStyleCode: itemRowsData.workStyleCode.toString(),//形式
                workImportanceName: itemRowsData.workImportanceName,//事项状态
                workImportanceCode: itemRowsData.workImportanceCode,//事项状态
                workTypeCode: itemRowsData.workTypeCode.toString(),//计划
                workTypeName: itemRowsData.workTypeName,//计划
                useTime: itemRowsData.useTime.toString(),
                status: 1,
                isEdit: isEdit//是否编辑 
            });
        }
    }
    /**添加活动**/
    onPressAddItem = () => {
        if (this.onValidateForm()) { 
            // this.onGetParams();
              this.props.onPressAddItem(this.props.formIndex,this.onGetParams()); 
        }
    }
    onGetParams=()=>
    {
            let workTypeName = "无"; 
            if (this.state.workTypeCode.toString() ==='1') {
                workTypeName = "计划内";
            } else if (this.state.workTypeCode.toString()==='2') {
                workTypeName = "计划外";
            }
            let jsonObj = {
                "SuperiorCode":this.props.selectSeniorCode,
                "SuperiorName":this.props.selectSeniorName,
                "CreatorName":global.userName,
                "Year":weekOfYearArr[0],
                "WeekOfYear": TimerUtils.getWeekNumber(weekOfYearArr[0], weekOfYearArr[1], weekOfYearArr[2]).toString(),
                "WorkOfDay": this.props.workOfDay,
                "WorkDutyCode": this.state.dutyUnEditable?"":this.state.workDutyCode,
                "WorkDutyName": this.state.dutyUnEditable?"":this.state.workDutyName,
                "WorkDetailDutyCode": this.state.dutyUnEditable?"":this.state.workDetailDutyCode,
                "WorkDetailDutyName": this.state.dutyUnEditable?"":this.state.workDetailDutyName,
                "WorkOfStartTime": TimerUtils.getSubTime(this.state.workOfStartTime),
                "WorkOfEndTime": TimerUtils.getSubTime(this.state.workOfEndTime),
                "ItemName": this.state.itemName,
                "UserName": this.state.nameUnEditable?"":this.state.userName,
                "WorkStyleCode": this.state.workStyleCode.toString(),
                "WorkStyleName": this.state.workStyleName,
                "WorkTypeCode": this.state.typeUnEditable?"3":this.state.workTypeCode,
                "WorkTypeName":workTypeName,
                "UseTime": this.state.useTime.toString()
            }
            // PublicToast.showMessage(JSON.stringify(jsonObj));
            return jsonObj;
    }
    /**编辑提交数据**/
    onPressSubmit = () =>{
        if (this.onValidateForm()) {
            let workTypeName = "无";
           
            if (this.state.workTypeCode.toString()=== '1') {
                workTypeName = "计划内";
            } else if (this.state.workTypeCode.toString()=== '2') {
                workTypeName = "计划外";
            }
            let jsonObj = {
                "Code": this.state.code,
                "SuperiorCode": this.state.superiorCode, 
                "SuperiorName":this.props.selectSeniorName,
                "CreatorName":global.userName, 
                "WeekOfYear": TimerUtils.getWeekNumber(weekOfYearArr[0], weekOfYearArr[1], weekOfYearArr[2]).toString(),
                "WorkOfDay": this.props.workOfDay,
                "WorkDutyCode": this.state.dutyUnEditable?"":this.state.workDutyCode,
                "WorkDutyName": this.state.dutyUnEditable?"":this.state.workDutyName,
                "WorkDetailDutyCode": this.state.dutyUnEditable?"":this.state.workDetailDutyCode,
                "WorkDetailDutyName": this.state.dutyUnEditable?"":this.state.workDetailDutyName,
                "WorkOfStartTime": TimerUtils.getSubTime(this.state.workOfStartTime),
                "WorkOfEndTime": TimerUtils.getSubTime(this.state.workOfEndTime),
                "ItemName": this.state.itemName,
                "UserName": this.state.nameUnEditable?"":this.state.userName,
                "WorkStyleCode": this.state.workStyleCode,
                "WorkStyleName": this.state.workStyleName,
                "WorkTypeCode": this.state.typeUnEditable?"":this.state.workTypeCode,
                "WorkTypeName": this.state.typeUnEditable?"":workTypeName,
                "UseTime": this.state.useTime
            }
            // PublicToast.showMessage(JSON.stringify(jsonObj));
            this.props.onPressSubmit(jsonObj);
        }
    }
    /**验证表单**/
    onValidateForm = () => {
        if (!this.state.workOfStartTime) {
            PublicToast.showMessage("请选择开始时间");
            return false;
        } 
        if (!this.state.workOfEndTime) {
            PublicToast.showMessage("请选择结束时间");
            return false;
        }
        let startTime = this.replaceChinaWord(this.state.workOfStartTime);
        let endTime = this.replaceChinaWord(this.state.workOfStartTime);
        if (!TimerUtils.compareTime(startTime, endTime)) {
            PublicToast.showMessage("结束时间不能小于开始时间");
        }
        if (!this.state.workStyleName) {
            PublicToast.showMessage("请选择形式");
            return false;
        }
        if (!this.state.userName && !this.state.nameUnEditable) {
            PublicToast.showMessage("请输入人员");
            return false;
        }
        if (!this.state.itemName) {
            PublicToast.showMessage("请输入事项");
            return false;
        }
        if (!this.state.workDutyName && !this.state.dutyUnEditable) {
            PublicToast.showMessage("请选择职责");
            return false;
        }
        if (!this.state.workDetailDutyName && !this.state.dutyUnEditable) {
            PublicToast.showMessage("请选择职责明细");
            return false;
        }
        if (!this.state.useTime) {
            PublicToast.showMessage("请输入时长");
            return false;
        }
        return true;
    }
    //初始化基础数据
    initBaseData = () => {
        //存储当前对象 
        this.props.weeklyEditForms[this.props.formIndex] = this;
        weekOfYearArr = this.props.workOfDay.split("-"); 
        let sendDate = new Date(Date.parse(this.props.workOfDay.replace(/-/g, "/")));//把选择的日期字符串转为日期
        let day = sendDate.getDay();
        timerStart = this.props.workOfDay + " " + week_day[day - 1];

        if (this.props.isEdit == 0) {
            let currentDate = new Date();
            let hour = currentDate.getHours();
            let minute = currentDate.getMinutes();
            defaultStartTime = timerStart + " " + this.getHourAndMinute(hour, minute);
            let subTime = defaultStartTime.substring(defaultStartTime.indexOf("午") + 1);
            let subTimeArr = subTime.split(":");
            defaultEndTime = timerStart + " " + this.getNextHourAndMinute(subTimeArr[0], subTimeArr[1]);
            defaultTimeLong = this.onGetTimeLong(defaultStartTime, defaultEndTime, false);
        } 
    }
    //判断上午下午
    getHourAndMinute = (hour, minute) => {
        let minArea = "00";
        if (minute < 15) { minArea = "15"; }
        else if (minute < 30) { minArea = "30"; }
        else if (minute < 45) { minArea = "45"; }
        else {
            if (hour < 23) {
                hour = (Number(hour) + 1);
            }
        }
        let amp = this.getTimeAreaByHour(hour);
        return amp + hour + ":" + minArea;
    }
    //动态获取结束时间
    getNextHourAndMinute = (previousHour, previousMinute) => {
        // PublicToast.showMessage("小时：" + previousHour);
        // PublicToast.showMessage("分钟：" + previousMinute);
        let nextMinute = "00";
        let nextHour = previousHour;
        if (previousMinute == "00" || previousMinute == "0") {
            nextMinute = "15";
        } else if (previousMinute == "15") {
            nextMinute = "30";
        } else if (previousMinute == "30") {
            nextMinute = "45";
        } else if (previousMinute == "45") {
            //当前时间小于22点时延时15分钟：
            if (previousHour < 23) {
                nextHour = (Number(previousHour) + 1);
            }
            nextMinute = "00";
        }
        let amp = this.getTimeAreaByHour(nextHour);
        return amp + nextHour + ":" + nextMinute;
    }
    //按照小时判断上下午
    getTimeAreaByHour = (hour) => {
        let apm = "上午";
        if (hour > 12) {
            apm ="下午";
        }
        return apm;
    } 
    componentDidMount() {
    }
    onCheckInputValue = (type) => {
        clickTag = type;
        if (this.props.onCheckInputValue) {
            this.props.onCheckInputValue(this);
        }
    } 
    //时间选择
    onShowPicker = (type) => {
        isStartTime = type;
        let newTime;
        if (isStartTime) {
            newTime = this.state.workOfStartTime;
        } else {
            newTime = this.state.workOfEndTime;
        }
        if (this.props.onShowPicker) {
            this.props.onShowPicker(this, this.onSubstringTime(newTime));
        }
    }
    //截取处理时间

    onSubstringTime = (newTime) => {
        let subTimeArr;
        if (newTime && newTime.indexOf("午") > 0) {
            let subTime = newTime.substring(newTime.indexOf("午") + 1);
            subTimeArr = subTime.split(":");
            subTimeArr[0] = subTimeArr[0] + "时";
            subTimeArr[1] = subTimeArr[1] + "分";
        } else {
            subTimeArr = new Array();
            subTimeArr[0] = "8时";
            subTimeArr[1] = "00分";
        }
        return subTimeArr;
    } 
    //替换中文
    replaceChinaWord = (str) => {
        return str.replace(/([^\u0000-\u00FF])/g, "");
    }
    //设置开始时间
    onSetTimeStartOrEnd = (pickedValue) => {
        var _pickedValue = new Array().concat(pickedValue);
        let newTime = timerStart
            + " " + this.getTimeAreaByHour(this.replaceChinaWord(_pickedValue[0]))
            + this.replaceChinaWord(_pickedValue[0])
            + ":" + this.replaceChinaWord(_pickedValue[1]);

        if (isStartTime) {
            this.onGetTimeLong(newTime, this.state.workOfEndTime, true);
        } else {
            this.onGetTimeLong(this.state.workOfStartTime, newTime, true);
        }
    }
    //计算时长
    onGetTimeLong = (startTime, endTime, isSetState) => {
        let start = new Date(Date.parse(this.replaceChinaWord(startTime).replace(/-/g, "/")));//把选择的日期字符串转为日期this.replaceChinaWord(this.state.startTime);
        let end = new Date(Date.parse(this.replaceChinaWord(endTime).replace(/-/g, "/")));
        let differ = end.getTime() - start.getTime();  //时间差的毫秒数 
        // PublicToast.showMessage("start:" + start);
        // PublicToast.showMessage("end:" + end);
        if (differ <= 0) {
            PublicToast.showMessage("结束时间不能小于开始时间");
        } else {
            // PublicToast.showMessage("differ:" + differ);
            //计算出小时数
            let leave1 = differ % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
            let hours = Math.floor(leave1 / (3600 * 1000));
            //计算相差分钟数
            let leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
            let minutes = Math.floor(leave2 / (60 * 1000));
            let useTime = (hours + minutes / 60);
            if (isSetState) {
                this.setState({
                    useTime: (isNaN(useTime) ? "" : (useTime.toString())),
                    workOfStartTime: startTime,
                    workOfEndTime: endTime
                });

            } else {
                return (isNaN(useTime) ? "" : (useTime.toString()));
            }
        }
    }
    /**编辑按钮*/
    onPressEditData = () => {
        this.setState({ isEdit: 1 });
    }
    setCheckValue = (checkValue) => {
        switch (clickTag) {
            case 0: 
                this.setState({ 
                    workStyleName: checkValue.name,
                    workStyleCode: checkValue.code,
                    nameUnEditable:this.isExistArray(nameUnEditable,checkValue.name),
                    dutyUnEditable:this.isExistArray(dutyUnEditable,checkValue.name),
                    typeUnEditable:this.isExistArray(typeUnEditable,checkValue.name)
                    });
                break;
            case 1:
                this.setState({ workDutyName: checkValue.name, workDutyCode: checkValue.code });
                break;
            case 2:
                this.setState({ workDetailDutyName: checkValue.name, workDetailDutyCode: checkValue.code });
                break;
            case 3:
                break;
            case 4:
                break;
            case 5:
                break;
        }
    } 
    //获取高管ID
    getSecretaryCode = () => {
        return userCode;
    }
    getSelectTitle = () => {
        let title = "";
        switch (clickTag) {
            case 0:
                title = "形式选择";
                break;
            case 1:
                title = "职责选择";
                break;
            case 2:
                title = "职责明细选择";
                break;
            case 3:
                title = "重要紧急程度选择";
                break;
            case 4:
                break;
            case 5:
                break;
        }
        return title;
    }
    //获取tag
    getClickTag = () => {
        return clickTag;
    }
    //点击获取计划check
    getCheckPlan(isPlan) {
    }
    //渲染View
    render() {
        var container;
        switch (this.state.isEdit) {
            case 0:
                container = this.getEmptyView();
                break;
            case 1:
                container = this.getEditView();
                break;
            case 2:
                container = this.getDetailView();
                break;
        }
        return container;
    }
    isExistArray=(array,elm)=>
    {
        let exist=false;
        for (let key in array) {
             let element=array[key]; 
            if(element===elm)
            {
                exist=true;
                break;
            }
        }
        return exist;
    }
    //填报
    getEmptyView = () => {
        if (this.props.formStatus === 0) {
            return (<View style={{backgroundColor: 'green',height:0}} />);
        } else {
            var buttonContainer = (this.props.formStatus === 3) ? (<View style={{ flexDirection: 'row' }}>
                <TouchableHighlight
                    underlayColor='#FE7801'
                    onPress={() => this.props.onPressDeleteItem() }
                    style={styles.btnBackground}>
                    <Text
                        style={{ color: '#FFFFFF', fontSize: GlobalSize.cellTitleFont }} >
                        删除
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor='#FE7801'
                    onPress={() => this.onPressAddItem() }
                    style={[styles.btnBackground, { marginLeft: 25 }]}>
                    <Text
                        style={{ color: '#FFFFFF', fontSize: GlobalSize.cellTitleFont }} >
                        继续添加
                    </Text>
                </TouchableHighlight>
            </View>) : (<TouchableHighlight
                underlayColor='#FE7801'
                onPress={() => (this.props.formStatus == 2) ? this.props.onPressDeleteItem() : this.onPressAddItem() }
                style={styles.btnBackground}>
                <Text
                    style={{ color: '#FFFFFF', fontSize: GlobalSize.cellTitleFont }} >
                    {(this.props.formStatus == 2) ? "删除" : "继续添加"}
                </Text>
            </TouchableHighlight>);

            return (<View style={{ flex: 1 }}>
                <TouchableHighlight
                    underlayColor='#FE7801'
                    onPress={() => this.onShowPicker(true) } >
                    <View
                        style={styles.itemInnerRow}>
                        <Text
                            style={styles.itemInnerLeft}>
                            开始时间：
                        </Text>
                        <Text
                            style={this.state.workOfStartTime.length == 0 ? styles.itemInnerRightHint : styles.itemInnerRight}>
                            {this.state.workOfStartTime.length == 0 ? this.state.checkDefault : this.state.workOfStartTime}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.splitLine} />
                <TouchableHighlight
                    underlayColor='#FE7801'
                    onPress={() => this.onShowPicker(false) } >
                    <View
                        style={styles.itemInnerRow}>
                        <Text
                            style={styles.itemInnerLeft} >
                            结束时间：
                        </Text>
                        <Text  style={this.state.workOfEndTime.length == 0 ? styles.itemInnerRightHint : styles.itemInnerRight}>
                            {this.state.workOfEndTime.length == 0 ? this.state.checkDefault : this.state.workOfEndTime}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.splitLine} />
                <TouchableHighlight
                    underlayColor='#FE7801'
                    onPress={() => this.onCheckInputValue(0) } >
                    <View
                        style={styles.itemInnerRow}>
                        <Text
                            style={styles.itemInnerLeft} >
                            形式：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </Text>
                        <Text
                            style={this.state.workStyleName.length == 0 ? styles.itemInnerRightHint : styles.itemInnerRight}>
                            {this.state.workStyleName.length == 0 ? this.state.checkDefault : this.state.workStyleName}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.splitLine} />
                <View style={this.state.nameUnEditable?styles.itemInnerRowUnEditable:styles.itemInnerRow}>
                    <Text style={styles.itemInnerLeft} >
                        人员：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </Text>
                    <TextInput
                        style={[styles.itemInnerRight, { backgroundColor: '#00000000', paddingTop: 5, paddingBottom: 5,color:(this.state.nameUnEditable?'#797979':'#2F2F2F')}]}
                        placeholder={this.state.inputDefault}
                        editable={!this.state.nameUnEditable}
                        placeholderTextColor='#797979'
                        multiline={true}
                        onChangeText={(text) => this.setState({ userName: text }) }
                        value={this.state.nameUnEditable?this.state.unEditableDefault:this.state.userName}>
                    </TextInput>
                </View>
                <View style={styles.splitLine} />
                <View style={styles.itemInnerRow}>
                    <Text
                        style={styles.itemInnerLeft} >
                        事项：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </Text>
                    <TextInput
                        style={[styles.itemInnerRight, { backgroundColor: '#00000000', paddingTop: 5, paddingBottom: 5 }]}
                        placeholder={this.state.inputDefault}
                        editable={true}
                        placeholderTextColor='#797979'
                        onChangeText={(text) => this.setState({ itemName: text }) }
                        value={this.state.itemName}>
                    </TextInput>
                </View>
                <View style={styles.splitLine} />
                <TouchableHighlight
                    underlayColor='#FE7801'
                    disabled={this.state.dutyUnEditable}
                    onPress={() => this.onCheckInputValue(1) } >
                    <View style={this.state.dutyUnEditable?styles.itemInnerRowUnEditable:styles.itemInnerRow}>
                        <Text style={styles.itemInnerLeft} >
                            职责：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </Text>
                        <Text style={this.state.workDutyName.length == 0 ? styles.itemInnerRightHint : styles.itemInnerRight}>
                            {this.state.dutyUnEditable?this.state.unEditableDefault:(this.state.workDutyName.length == 0 ? this.state.checkDefault : this.state.workDutyName)}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.splitLine}/>
                <TouchableHighlight
                    underlayColor='#FE7801'
                    disabled={this.state.dutyUnEditable}
                    onPress={() => this.onCheckInputValue(2) } >
                    <View style={this.state.dutyUnEditable?styles.itemInnerRowUnEditable:styles.itemInnerRow}>
                        <Text style={styles.itemInnerLeft} >
                            职责明细：
                        </Text>
                        <Text style={this.state.workDetailDutyName.length == 0 ? styles.itemInnerRightHint : styles.itemInnerRight}>
                            {this.state.dutyUnEditable?this.state.unEditableDefault:(this.state.workDetailDutyName.length == 0 ? this.state.checkDefault : this.state.workDetailDutyName)}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.splitLine}/>
                <TouchableHighlight
                    underlayColor='#FE7801'
                    onPress={() => this.onCheckInputValue(3) }
                    style={{ height: 0, overflow: 'hidden' }}>
                    <View  style={styles.itemInnerRow}>
                        <Text style={styles.itemInnerLeft} >
                            重要紧急程度：
                        </Text>
                        <Text></Text>
                    </View>
                </TouchableHighlight>
                <View style={this.state.typeUnEditable?styles.itemInnerRowUnEditable:styles.itemInnerRow}>
                    <Text style={styles.itemInnerLeft} >计划：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </Text>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <TouchableHighlight
                            underlayColor='#FE7801'
                            disabled={this.state.typeUnEditable}
                            onPress={() => this.setState({ workTypeCode: '1' }) } >
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ height: 25, width: 25 }}
                                    source={
                                        this.state.workTypeCode === '1' ?
                                            require('../../resource/images/App/check_true.png') :
                                            require('../../resource/images/App/check_false.png')
                                    }>
                                </Image>
                                <Text>
                                    计划内
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor='#FE7801'
                             disabled={this.state.typeUnEditable}
                            onPress={() => this.setState({ workTypeCode: '2' }) } >
                            <View style={{ flexDirection: 'row', marginLeft: 20 }}>

                                <Image style={{ height: 25, width: 25 }}
                                    source={
                                        this.state.workTypeCode === '2' ?
                                            require('../../resource/images/App/check_true.png') :
                                            require('../../resource/images/App/check_false.png')
                                    }>
                                </Image>
                                <Text>
                                    计划外
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.splitLine} />
                <View style={styles.itemInnerRow}>
                    <Text style={styles.itemInnerLeft} >
                        时长：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </Text>
                    <TextInput
                        style={[styles.itemInnerRight, { backgroundColor: '#00000000', paddingTop: 5, paddingBottom: 5 }]}
                        placeholder={'开始时间-结束时间'}
                        placeholderTextColor='#797979'
                        value={this.state.useTime} >
                    </TextInput>
                </View>
                <View style={styles.splitLine} />
                {buttonContainer}
            </View>);
        }
    }
    //填报编辑
    getEditView = () => {
        return (<View style={{ flex: 1 }}>
            <TouchableHighlight
                underlayColor='#FE7801'
                onPress={() => this.onShowPicker(true) } >
                <View style={styles.itemInnerRow}>
                    <Text
                        style={styles.itemInnerLeft}>
                        开始时间：
                    </Text>
                    <Text
                        style={this.state.workOfStartTime.length == 0 ? styles.itemInnerRightHint : styles.itemInnerRight}>
                        {this.state.workOfStartTime.length == 0 ? this.state.checkDefault : this.state.workOfStartTime}
                    </Text>
                </View>
            </TouchableHighlight>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <TouchableHighlight
                underlayColor='#FE7801'
                onPress={() => this.onShowPicker(false) } >
                <View
                    style={styles.itemInnerRow}>
                    <Text
                        style={styles.itemInnerLeft} >
                        结束时间：
                    </Text>
                    <Text  style={this.state.workOfEndTime.length == 0 ? styles.itemInnerRightHint : styles.itemInnerRight}>
                        {this.state.workOfEndTime.length == 0 ? this.state.checkDefault : this.state.workOfEndTime}
                    </Text>
                </View>
            </TouchableHighlight>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <TouchableHighlight
                underlayColor='#FE7801'
                onPress={() => this.onCheckInputValue(0) } >
                <View
                    style={styles.itemInnerRow}>
                    <Text
                        style={styles.itemInnerLeft} >
                        形式：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </Text>
                    <Text
                        style={this.state.workStyleName.length == 0 ? styles.itemInnerRightHint : styles.itemInnerRight}>
                        {this.state.workStyleName.length == 0 ? this.state.checkDefault : this.state.workStyleName}
                    </Text>
                </View>
            </TouchableHighlight>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
             <View style={this.state.nameUnEditable?styles.itemInnerRowUnEditable:styles.itemInnerRow}>
                    <Text style={styles.itemInnerLeft} >
                        人员：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    </Text>
                    <TextInput
                        style={[styles.itemInnerRight, { backgroundColor: '#00000000', paddingTop: 5, paddingBottom: 5,color:(this.state.nameUnEditable?'#797979':'#2F2F2F')}]}
                        placeholder={this.state.inputDefault}
                        editable={!this.state.nameUnEditable}
                        placeholderTextColor='#797979'
                        multiline={true}
                        onChangeText={(text) => this.setState({ userName: text }) }
                        value={this.state.nameUnEditable?this.state.unEditableDefault:this.state.userName}>
                    </TextInput>
                </View>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <View style={styles.itemInnerRow}>
                <Text style={styles.itemInnerLeft} >
                    事项：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Text>
                <TextInput
                    style={[styles.itemInnerRight, { backgroundColor: '#00000000', paddingTop: 5, paddingBottom: 5 }]}
                    placeholder={this.state.inputDefault}
                    editable={true}
                    onChangeText={(text) => this.setState({ itemName: text }) }
                    placeholderTextColor='#797979'
                    value={this.state.itemName}>
                </TextInput>
            </View>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
           <TouchableHighlight
                    underlayColor='#FE7801'
                    disabled={this.state.dutyUnEditable}
                    onPress={() => this.onCheckInputValue(1) } >
                    <View style={this.state.dutyUnEditable?styles.itemInnerRowUnEditable:styles.itemInnerRow}>
                        <Text style={styles.itemInnerLeft} >
                            职责：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        </Text>
                        <Text style={this.state.workDutyName.length == 0 ? styles.itemInnerRightHint : styles.itemInnerRight}>
                            {this.state.dutyUnEditable?this.state.unEditableDefault:(this.state.workDutyName.length == 0 ? this.state.checkDefault : this.state.workDutyName)}
                        </Text>
                    </View>
            </TouchableHighlight>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <TouchableHighlight
                    underlayColor='#FE7801'
                    disabled={this.state.dutyUnEditable}
                    onPress={() => this.onCheckInputValue(2) } >
                    <View style={this.state.dutyUnEditable?styles.itemInnerRowUnEditable:styles.itemInnerRow}>
                        <Text style={styles.itemInnerLeft} >
                            职责明细：
                        </Text>
                        <Text style={this.state.workDetailDutyName.length == 0 ? styles.itemInnerRightHint : styles.itemInnerRight}>
                            {this.state.dutyUnEditable?this.state.unEditableDefault:(this.state.workDetailDutyName.length == 0 ? this.state.checkDefault : this.state.workDetailDutyName)}
                        </Text>
                    </View>
                </TouchableHighlight>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
                <View style={this.state.typeUnEditable?styles.itemInnerRowUnEditable:styles.itemInnerRow}>
                    <Text style={styles.itemInnerLeft} >计划：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </Text>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <TouchableHighlight
                            underlayColor='#FE7801'
                            disabled={this.state.typeUnEditable}
                            onPress={() => this.setState({ workTypeCode: '1' }) } >
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ height: 25, width: 25 }}
                                    source={
                                        this.state.workTypeCode === '1' ?
                                            require('../../resource/images/App/check_true.png') :
                                            require('../../resource/images/App/check_false.png')
                                    }>
                                </Image>
                                <Text>
                                    计划内
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor='#FE7801'
                             disabled={this.state.typeUnEditable}
                            onPress={() => this.setState({ workTypeCode: '2' }) } >
                            <View style={{ flexDirection: 'row', marginLeft: 20 }}>

                                <Image style={{ height: 25, width: 25 }}
                                    source={
                                        this.state.workTypeCode === '2' ?
                                            require('../../resource/images/App/check_true.png') :
                                            require('../../resource/images/App/check_false.png')
                                    }>
                                </Image>
                                <Text>
                                    计划外
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <View style={styles.itemInnerRow}>
                <Text style={styles.itemInnerLeft} >时长：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </Text>
                <TextInput style={[styles.itemInnerRight, { backgroundColor: '#00000000', paddingTop: 5, paddingBottom: 5 }]}
                    placeholder={'开始时间-结束时间'}
                    placeholderTextColor='#797979'
                    value={this.state.useTime}>
                </TextInput>
            </View>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <TouchableHighlight
                underlayColor='#FE7801'
                onPress={() => this.onPressSubmit() }
                style={styles.saveBtnBackground}>
                <Text  style={{ color: '#FFFFFF', fontSize: GlobalSize.cellTitleFont }} >保存</Text>
            </TouchableHighlight>
        </View>);
    }
    //详情
    getDetailView = () => {
        return (<View style={{ flex: 1 }}>

            <View  style={styles.itemInnerRow}>
                <Text style={styles.itemInnerLeft} >开始时间：</Text>
                <Text style={styles.itemInnerRight}>
                    {this.state.workOfStartTime}
                </Text>
            </View>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <View  style={styles.itemInnerRow}>
                <Text style={styles.itemInnerLeft} >
                    结束时间：
                </Text>
                <Text style={styles.itemInnerRight}>
                    {this.state.workOfEndTime}
                </Text>
            </View>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <View  style={styles.itemInnerRow}>
                <Text style={styles.itemInnerLeft} >
                    形式：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Text>
                <Text style={styles.itemInnerRight}>
                    {this.state.workStyleName}
                </Text>
            </View>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <View style={styles.itemInnerRow}>
                <Text style={styles.itemInnerLeft} >
                    人员：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Text>
                <Text style={styles.itemInnerRight}>
                    {this.state.userName}
                </Text>
            </View>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <View style={styles.itemInnerRow}>
                <Text style={styles.itemInnerLeft} >
                    事项：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Text>
                <Text style={styles.itemInnerRight}>
                    {this.state.itemName}
                </Text>
            </View>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <View style={styles.itemInnerRow}>
                <Text style={styles.itemInnerLeft} >
                    职责：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Text>
                <Text style={styles.itemInnerRight}>
                    {this.state.workDutyName}
                </Text>
            </View>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <View  style={styles.itemInnerRow}>
                <Text style={styles.itemInnerLeft} >
                    职责明细：
                </Text>
                <Text style={styles.itemInnerRight}>
                    {this.state.workDetailDutyName}
                </Text>
            </View>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <View style={styles.itemInnerRow}>
                <Text style={styles.itemInnerLeft} >
                    计划：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Text>
                <Text style={styles.itemInnerRight}>
                    {this.state.workTypeName ? this.state.workTypeName:"无"}
                </Text>
            </View>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <View style={styles.itemInnerRow}>
                <Text style={styles.itemInnerLeft} >
                    时长：&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Text>
                <Text style={styles.itemInnerRight}>
                    {this.state.useTime}
                </Text>
            </View>
            <View style={{ width: deviceWidth, height: 1, backgroundColor: '#DDDDDD' }} />
            <View style={{ flexDirection: 'row' }}>
                <TouchableHighlight
                    underlayColor='#FE7801'
                    onPress={() => this.onPressEditData() }
                    style={styles.btnBackground}>
                    <Text  style={{ color: '#FFFFFF', fontSize: GlobalSize.cellTitleFont }} >
                        编辑
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor='#FE7801'
                    onPress={() => this.props.onPressDeleteData() }
                    style={[styles.btnBackground, { marginLeft: 25 }]}>
                    <Text  style={{ color: '#FFFFFF', fontSize: GlobalSize.cellTitleFont }} >删除</Text>
                </TouchableHighlight>
            </View>
        </View>);
    }  
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        backgroundColor: 'white',

    },
    itemInnerRow:
    {
        //flex:1,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    itemInnerRowUnEditable:
    {
        //flex:1,
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor:'#EDEFF0'
    },   
    itemInnerLeft:
    {
        flex: 1,
        fontSize: GlobalSize.cellTitleFont,
        color: 'black',
    },
    itemInnerRight:
    {
        flex: 2,
        flexWrap: 'wrap', 
        justifyContent: 'center',
        fontSize: GlobalSize.cellTitleFont,
        color: '#2F2F2F',
    },
    itemInnerRightHint:
    {
        flex: 2,
        justifyContent: 'center',
        fontSize: GlobalSize.cellTitleFont,
        color: '#797979',
    },
    itemFontInnerRight:
    {
        fontSize: GlobalSize.cellTitleFont,
        color: '#2F2F2F',
    },
    splitLine:
    {
        flex: 1,
        height: 1,
        backgroundColor: '#DDDDDD',
    },
    btnBackground:
    {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#FE5201',
        flex: 1.5,
        height: 40,
        borderRadius: 8,
        marginLeft: 8,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveBtnBackground:
    {
        margin: 10,
        backgroundColor: '#FE5201',
        width: deviceWidth - 20,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

