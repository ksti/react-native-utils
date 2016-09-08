/**
 * Created by yingying on 16/8/4.
 */

'use strict';
import React,{
    Component
} from 'react'
import {
    View,
    TextInput,
    StyleSheet
}from 'react-native'
import GlobalSize from  '../../src/common/GlobalSize'
export default class SearchBar extends Component{
// class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state={
            placeholder: this.props.placeholder,
        }
    }
    render() {
        return (
            <View style={styles.searchRow}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="always"
                    placeholder="Please input your name..."
                    style={styles.searchTextInput}
                />
            </View>
        );
    }
}



var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchRow: {
        flex:1,
        backgroundColor: '#eeeeee',
        // paddingTop: 10,
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingBottom: 10,
        width:260,
        height:44,
        paddingTop:20
    },
    searchTextInput: {
        backgroundColor: 'white',
        borderColor: '#cccccc',
        borderRadius: 3,
        borderWidth: 1,
        height: 44,
        paddingLeft: 8,
    },
});

