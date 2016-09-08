import React , { PropTypes }  from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const tabIconStyles = StyleSheet.create({
    tabIconItem:{
        flex: 1,
        height: 56,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor:'transparent',
    },
    tabIconImage:{
        width:24,
        height:24
    },
    titleText:{
        marginTop:5,
        textAlign: 'center',
        fontSize:11
    },
    titleTextDefaultColor: {
        color:'#3b3b3b'
    },
    titleTextSelectColor: {
        color:'#e89311'
    },
    tabItemRow:{
        flexDirection:'row'
    },
});
 

export default class TabIcon extends React.Component {
    render() {
        return (
            <View style={tabIconStyles.tabIconItem}>
                <Image style={tabIconStyles.tabIconImage} source={this.props.selected ? this.props.selectImage : this.props.Image}/>
                <View style={tabIconStyles.tabItemRow}>
                    <Text allowFontScaling={false}
                        style={[tabIconStyles.titleText,this.props.selected ?  tabIconStyles.titleTextSelectColor : tabIconStyles.titleTextDefaultColor]}>
                        {this.props.title}
                    </Text>
                </View>
            </View>
        );
    }
}
