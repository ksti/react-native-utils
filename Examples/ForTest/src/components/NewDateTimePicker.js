const React = require('react')
const {
	PropTypes,
	TouchableOpacity,
	Text,
	View,
	StyleSheet,
	Modal,
	Dimensions,
	TouchableWithoutFeedback,
	Platform,
	PickerIOS

} = require('react-native')
let nextID = 1;
import PickerAndroid from 'react-native-picker-android';
let Picker = Platform.OS === 'ios' ? PickerIOS : PickerAndroid;
let PickerItem = Picker.Item;
const window = Dimensions.get('window');
const moment = require('moment');


const DateTimePicker = React.createClass({

	getInitialState() {
		return {
			dateData: this.createDateData(),
			openModal:'',
			modalName:this.makeName (),
			yearWheelData:[],
			yearSelectData:'',
			monthWheelData:[],
			monthSelectData:'',
			dayWheelData:[],
			daySelectData:'',
		}
	},
	componentDidMount () {
		var defaultData = {}
		if (this.props.selectData) {
			defaultData= this.returnDefaultData(this.props.selectData)
		} else {
			defaultData= this.returnDefaultData(moment().format('YYYY-MM-DD'))
		}
		console.log(defaultData)
		this.setState(defaultData)
	},

	componentWillReceiveProps(newProps){
		let newState = {}
		if (this.props.selectData!=newProps.selectData) {
			newState = this.returnDefaultData(newProps.selectData);
		}
		this.setState(newState);
	},

	returnDefaultData (selectData) {
		var reg = /(\d{4})-(\d{2})-(\d{2})/
		if (reg.test(selectData)) {
			return {
				yearWheelData: Object.keys(this.state.dateData),
				yearSelectData: RegExp.$1 + "年",
				monthSelectData: (RegExp.$2[0]==0?RegExp.$2[1]:RegExp.$2)+'月',
				daySelectData: (RegExp.$3[0]==0?RegExp.$3[1]:RegExp.$3)+'日',
				monthWheelData: Object.keys(this.state.dateData[(RegExp.$1 + "年")]),
				dayWheelData: this.state.dateData[(RegExp.$1 + "年")][((RegExp.$2[0]==0?RegExp.$2[1]:RegExp.$2)+'月')],
			}

		}
		return {}
	},

	openModal (menuName) {
		this.setState({openModal:menuName})
	},
	closeModal () {
		this.setState({openModal:''})
	},
	clickModal () {
		if (!this.props.keepShowModal) {
			this.closeModal()
		}
	},
	clickPicker () {

	},


	createDateData (){
		let date = {};
		for(let i=2016;i<2050;i++){
			let month = {};
			for(let j = 1;j<13;j++){
				let day = [];
				if(j === 2){
					if (((i % 4)==0) && ((i % 100)!=0) || ((i % 400)==0)){
						for(let k=1;k<30;k++){
							day.push(k+'日');
						}
					}else {
						for(let k=1;k<29;k++){
							day.push(k+'日');
						}
					}
				}
				else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
					for(let k=1;k<32;k++){
						day.push(k+'日');
					}
				}
				else{
					for(let k=1;k<31;k++){
						day.push(k+'日');
					}
				}
				month[j+'月'] = day;
			}
			date[i+'年'] = month;
		}
		return date;
	},

	toggleModal () {
		if (this.state.openModal==this.state.modalName) {
			this.closeModal();
		} else {
			this.openModal(this.state.modalName);
		}
		console.log('openModal.....',this.state.openModal)
	},
	makeName () {
		return `modal-${nextID++}`;
	},
	onPress (value) {
		this.props.onSelect(value);
	},
	getText () {
		return `${this.state.yearSelectData.replace(/[^0-9]/ig,"")}-${this.state.monthSelectData.replace(/[^0-9]/ig,"").length==1?('0'+this.state.monthSelectData.replace(/[^0-9]/ig,"")):this.state.monthSelectData.replace(/[^0-9]/ig,"")}-${this.state.daySelectData.replace(/[^0-9]/ig,"").length==1?('0'+this.state.daySelectData.replace(/[^0-9]/ig,"")):this.state.daySelectData.replace(/[^0-9]/ig,"")}`
	},

	_pickerFinish() {
		const dateText = this.getText();
		this.closeModal();
		this.onPress(dateText);

	},
	_pickerCancel () {
		this.closeModal()
	},

	returnDatePicker () {
		return (
			<View style={[Styles.pickerWrap]}>
				<View style={Styles.pickerWheel}>
					<Picker
						selectedValue={this.state.yearSelectData}
						onValueChange={value => {
                            this.setState({
                                yearSelectData: value,
                                dayWheelData:this.state.dateData[value][this.state.monthSelectData],
                                daySelectData:this.state.dateData[value][this.state.monthSelectData].findIndex((d)=>d==this.state.daySelectData)>-1?this.state.daySelectData:this.state.dateData[value][this.state.monthSelectData][this.state.dateData[value][this.state.monthSelectData].length-1],
                            });
                        }} >
						{
							this.state.yearWheelData.map((year,index)=>
								(
									<PickerItem
										key={index}
										value={year}
										label={year}
									/>
								)
							)
						}
					</Picker>
				</View>
				<View style={Styles.pickerWheel}>
					<Picker
						selectedValue={this.state.monthSelectData}
						onValueChange={value => {
                            this.setState({
                                monthSelectData: value,
                                dayWheelData:this.state.dateData[this.state.yearSelectData][value],
                                daySelectData:this.state.dateData[this.state.yearSelectData][value].findIndex((d)=>d==this.state.daySelectData)>-1?this.state.daySelectData:this.state.dateData[this.state.yearSelectData][value][this.state.dateData[this.state.yearSelectData][value].length-1],
                            });
                        }} >
						{
							this.state.monthWheelData.map((month,index)=>
								(
									<PickerItem
										key={index}
										value={month}
										label={month}
									/>
								)
							)
						}
					</Picker>
				</View>
				<View style={Styles.pickerWheel}>
					<Picker
						selectedValue={this.state.daySelectData}
						onValueChange={value => {
                            this.setState({
                                daySelectData:value
                            });
                        }} >
						{
							this.state.dayWheelData.map((day,index)=>
								(
									<PickerItem
										key={index}
										value={day}
										label={day}
									/>
								)
							)
						}
					</Picker>
				</View>
			</View>
		)
	},

	render () {
		const {openModal,modalName} = this.state;
		const {selectData,formater,cancleText,finishText,title,modalColor,pickerHeight,pickerColor,buttonColor} = this.props;
		const modalBackgroundStyle = {
			backgroundColor: (modalColor?modalColor:'rgba(0,0,0,0.4)'),
		};
		const pickerHeightStyle = pickerHeight?{height:pickerHeight}:{};
		const pickerColorStyle = pickerColor?{backgroundColor:pickerColor}:{};
		const buttonColorStyle = buttonColor?{color:buttonColor}:{};
		return (
			<View>
				<TouchableOpacity onPress={this.toggleModal}>
					<Text>{selectData?moment(selectData).format(formater||'YYYY-MM-DD'):"请选择日期"}</Text>
				</TouchableOpacity>
				{
					openModal==modalName?(
						<Modal animationType="slide" visible={true} transparent={true}>
							<TouchableOpacity style={[Styles.modal,modalBackgroundStyle]} activeOpacity={1} onPress={this.clickModal}>
								<View style={[Styles.picker,pickerHeightStyle]}>
									<TouchableWithoutFeedback style={[Styles.pickerView,pickerHeightStyle,pickerColorStyle]} onPress={this.clickPicker}>
										<View style={[Styles.pickerView]}>
											<View style={[Styles.pickerToolbar]}>
												<View style={Styles.pickerCancelBtn}>
													<Text style={[Styles.pickerFinishBtnText,buttonColorStyle]}
														  onPress={this._pickerCancel}>{cancleText?cancleText:"取消"}</Text>
												</View>
												<Text style={[Styles.pickerTitle]} numberOfLines={1}>
													{title?title:"请选择日期"}
												</Text>
												<View style={Styles.pickerFinishBtn}>
													<Text style={[Styles.pickerFinishBtnText,buttonColorStyle]}
														  onPress={this._pickerFinish}>{finishText?finishText:"确定"}</Text>
												</View>
											</View>
											{this.returnDatePicker()}
										</View>
									</TouchableWithoutFeedback>
								</View>
							</TouchableOpacity>
						</Modal>
					):null
				}
			</View>

		)
	}
})


const Styles = StyleSheet.create({
	modal: {
		width:window.width,
		height:window.height,
	},
	picker: {
		position:'absolute',
		bottom:0,
		left:0,
		height:300,
		width:window.width,
		backgroundColor:'rgba(255,255,255,0.8)',
	},
	pickerView: {
		height:300,
		width:window.width,
	},
	pickerWrap: {
		flexDirection: 'row',
		marginTop:20,
	},
	pickerWheel: {
		flex: 1
	},
	pickerToolbar: {
		height: 30,
		flexDirection: 'row',
		alignItems: 'center'
	},
	pickerCancelBtn: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginLeft: 20
	},
	pickerTitle: {
		flex: 4,
		color: 'black',
		textAlign: 'center'
	},
	pickerFinishBtn: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginRight: 20
	},
	pickerFinishBtnText: {
		fontSize: 16,
		color: '#FE751D'
	}
});





export default DateTimePicker