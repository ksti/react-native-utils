/**
 * Created by yingying on 16/7/25.
 */

//流程中心

import React, {
    ListView
} from 'react-native';

import ActionConstants from '../actionConstants';

var  flowCenterState = (state, action) => {

    state = state || {
            isLoading:false,
            flowData:{},
            flowHomeData:{},
            type:'',
            error:false
        };

    switch(action.type) {
        case ActionConstants.FLOWCENTER_LOADING: {
            return Object.assign({},state,{   //object.assign  用于对象的合并, 第一个参数是目标对象，后面的参数都是源对象
                ...state,
                type:ActionConstants.FLOWCENTER_LOADING,
                flowData:action.responseData,
                isLoadingFlowCenter:action.isLoading
            });
        }
            break;
        case ActionConstants.FLOWCENTER_FINISH:{
            console.log('flowCenter列表：'+action.responseData);
            return Object.assign({},state,{
                ...state,
                type:ActionConstants.FLOWCENTER_FINISH,
                flowData:action.responseData,
                isLoadingFlowCenter:action.isLoading
            });
            break;
        }
        case ActionConstants.FLOWCENTER_ERROE:{
            return Object.assign({},state,{
                ...state,
                type:ActionConstants.FLOWCENTER_ERROE,
                flowData:action.responseData,
                error:true,
                isLoadingFlowCenter:action.isLoading
            });
            break;
        }
        case ActionConstants.FLOWCENTERHOME_LOADING: {
            return Object.assign({},state,{   //object.assign  用于对象的合并, 第一个参数是目标对象，后面的参数都是源对象
                ...state,
                type:ActionConstants.FLOWCENTERHOME_LOADING,
                flowHomeData:action.responseData,
                isLoadingFlowCenter:action.isLoading
            });
        }
            break;
        case ActionConstants.FLOWCENTERHOME_FINISH:{
            console.log('flowCenter列表：'+action.responseData);
            return Object.assign({},state,{
                ...state,
                type:ActionConstants.FLOWCENTERHOME_FINISH,
                flowHomeData:action.responseData,
                isLoadingFlowCenter:action.isLoading
            });
            break;
        }
        case ActionConstants.FLOWCENTERHOME_ERROE:{
            return Object.assign({},state,{
                ...state,
                type:ActionConstants.FLOWCENTERHOME_ERROE,
                flowHomeData:action.responseData,
                isLoadingFlowCenter:action.isLoading
            });
            break;
        }

            break;
        default: return {
            ...state
        }
    }
};

module.exports = {flowCenterState};
