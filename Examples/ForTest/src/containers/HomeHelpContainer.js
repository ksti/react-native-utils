import { Actions } from 'react-native-router-flux';

import React, { Component } from 'react';


import GlobalStyle  from '../common/GlobalStyle'
import GlobalSize from '../common/GlobalSize'
import BaseContainer  from './BaseContainer'
import HelpHome from '../Page/BaseConstruct/HelpHome'

export default class ProfileContainer extends BaseContainer {
    constructor(props) {
        super(props);
    }
    render()
    {
        return (
            <HelpHome />
        );
    }

}