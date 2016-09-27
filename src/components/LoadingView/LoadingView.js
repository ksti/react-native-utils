/**
 * Created by Administrator on 2016-08-03.
 */
'use strict';

import React, {
    Component
} from 'react'
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet
}from 'react-native'

export default class LoadingView extends Component {
    render() {
        return (
            <View style={styles.loadingContainer}>
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator
                        animating={true}
                        size='small'
                        color="#fff"
                    />
                </View>
                <Text style={styles.loadingText}>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    loadingContainer: {
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loadingText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
    },

    spinnerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        marginTop: 4,
    },


});

