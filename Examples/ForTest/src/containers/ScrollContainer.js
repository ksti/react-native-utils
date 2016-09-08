
import React, { Component } from 'react';
import {
    StyleSheet,
    Platform,
    View,
    Text,
    ListView,
    TouchableOpacity,
    Image,
} from 'react-native';

import PageContainer from './PageContainer'

export default class ScrollContainer extends Component {
    constructor(props) {
        super(props);

    }
    render()
    {
        return (
            <PageContainer
              // title={this.props.navigator ? null : '<FormContainer>'}
              // noScroll={true}
              noSpacer={true}
              {...this.props}>
                <View {...this.props}>
                  {this.props.children}
                </View>
            </PageContainer>
            
        );
    }

}