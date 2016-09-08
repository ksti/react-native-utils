/**
 * Created by yingying on 16/7/25.
 */

import ActionConstants from '../actionConstants';
import {httpRequest} from 'react-native-utils-gjs'
import GlobalSize from '../../../../common/GlobalSize'
import PublicToast from '../../../../components/PublicToast'
import RefreshToken from '../../../../components/RefreshToken'

let HTTPRequest = new httpRequest();

/*
 * http request   流程中心
 */
var myFlowDS = [];// 流转
var waitFlowDS = []; // 待办
var doneFlowDS =[]; // 办结
var myFlowIndex=0;  //流转页码
var waitFlowIndex=0;    //待办页码
var doneFlowIndex=0;    //办结页码

/**
 *
 * 待办  yuanxinApi/UserTask/LoadUserTask?page=0&pagesize=5
 * 流转中和已办结  yuanxinApi/UserTask/LoadUserTasksProcessStatus?page=0&pagesize=10&processStatus=Running
 * processStatus:请求的是已办结还是流转中，Running流转中，Completed已办结
 */


//待办列表
export function loadFlowCenterWaitDataFromServer(parameter){
    console.log('待办参数:'+parameter);
    return (dispatch,getState) => {
        dispatch({
            type: ActionConstants.FLOWCENTER_LOADING,
            isLoading: true
        });
        console.log('触发fetchFlow方法：flowCenter_loadings');
        let urlStr = GlobalSize.BaseURL+'yuanxinApi/UserTask/LoadUserTask';
        // let urlStr = GlobalSize.ProductURL+'yuanxinApi/UserTask/LoadUserTask';

        HTTPRequest.requestGetWithUrl(urlStr, parameter,
            function (error, responseData,response) {
                if (error) {
                    PublicToast.showMessage("待办请求失败——",error.message);
                    if (response.status == 401) {
                        RefreshToken.refreshToken();
                    }
                    dispatch({
                        type: ActionConstants.FLOWCENTER_ERROE,
                        responseData:waitFlowDS,
                        isLoading: false
                    });
                } else {
                    if (responseData && responseData.message && responseData.message.length>0) {
                        PublicToast.showMessage("待办请求失败"+responseData.message);
                        // waitFlowDS=[];
                        dispatch({
                            type: ActionConstants.FLOWCENTER_ERROE,
                            responseData:waitFlowDS,
                            isLoading: false,
                        });
                    }else if (responseData) {
                        if(parameter.page == 0){
                            waitFlowDS = []
                        }

                        let waitFlowDSlength = waitFlowDS.length;
                        let responseList = responseData;
                         for (var x = 0; x < responseList.length; x++) {
                             waitFlowDS[x + waitFlowDS.length] = responseList[x];
                            //  console.log(x + waitFlowDS.length + '==waitFlowDSlength==' + waitFlowDS.length);
                            //  console.log(x + waitFlowDS.length + '==waitFlowDS[x]==' + waitFlowDS[x + waitFlowDS.length].title);
                         }
                         rows = waitFlowDS;
                         waitFlowIndex = parameter.page;

                         console.log('待办 FromSever---responseData==' + {responseList}+'rows'+{rows});
                         dispatch({
                             type: ActionConstants.FLOWCENTER_FINISH,
                             responseData: rows,
                             isLoading: false
                         });
                    }else {
                        dispatch({
                            type: ActionConstants.FLOWCENTER_ERROE,
                            responseData:waitFlowDS,
                            isLoading: false
                        });
                    }
                }
            }.bind(this));
    };
}


//待办列表首页
export function loadFlowCenterWaitDataHomeFromServer(parameter) {
    console.log('待办参数:' + parameter);
    return (dispatch, getState) => {
        dispatch({
            type: ActionConstants.FLOWCENTERHOME_LOADING,
            isLoading: true
        });
        console.log('触发fetchFlow方法：flowCenter_loadings');
        let urlStr = GlobalSize.BaseURL + 'yuanxinApi/UserTask/LoadUserTask';
        // let urlStr = GlobalSize.ProductURL+'yuanxinApi/UserTask/LoadUserTask';

        HTTPRequest.requestGetWithUrl(urlStr, parameter,
            function (error, responseData,response) {
                if (error) {
                    PublicToast.showMessage("待办请求失败", error.message);
                    if (response.status == 401) {
                        RefreshToken.refreshToken();
                    }
                    dispatch({
                        type: ActionConstants.FLOWCENTERHOME_ERROE,
                        responseData: waitFlowDS,
                        isLoading: false
                    });
                } else {
                    if (responseData && responseData.message && responseData.message.length > 0) {
                        PublicToast.showMessage("待办请求失败==" + responseData.message);
                        // waitFlowDS=[];
                        dispatch({
                            type: ActionConstants.FLOWCENTERHOME_ERROE,
                            responseData: waitFlowDS,
                            isLoading: false,
                        });
                    } else if (responseData) {
                        if (parameter.page == 0) {
                            waitFlowDS = []
                        }

                        let waitFlowDSlength = waitFlowDS.length;
                        let responseList = responseData;
                        for (var x = 0; x < responseList.length; x++) {
                            waitFlowDS[x + waitFlowDS.length] = responseList[x];
                            //  console.log(x + waitFlowDS.length + '==waitFlowDSlength==' + waitFlowDS.length);
                            //  console.log(x + waitFlowDS.length + '==waitFlowDS[x]==' + waitFlowDS[x + waitFlowDS.length].title);
                        }
                        rows = waitFlowDS;
                        waitFlowIndex = parameter.page;

                        console.log('待办 FromSever---responseData==' + {responseList} + 'rows' + {rows});
                        dispatch({
                            type: ActionConstants.FLOWCENTERHOME_FINISH,
                            responseData: rows,
                            isLoading: false
                        });
                    } else {
                        dispatch({
                            type: ActionConstants.FLOWCENTERHOME_ERROE,
                            responseData: waitFlowDS,
                            isLoading: false
                        });
                    }
                }
            }.bind(this));
    };
}
//http request 流转中／已办结
export function loadOtherFlowFromServer(parameter){
    console.log('流转中／已办结参数:'+parameter);
    var newRows=[];
    if (parameter.processStatus=='Running') {
        //流转中
        newRows=myFlowDS;
    }else {
        //已办结
        newRows=doneFlowDS;
    }
    return (dispatch,getState) => {
        dispatch({
            type: ActionConstants.FLOWCENTER_LOADING,
            isLoading: true
        });
        console.log('触发fetchFlow方法：flowCenter_loadings');
        let urlStr = GlobalSize.BaseURL+'yuanxinApi/UserTask/LoadUserTasksProcessStatus';
        HTTPRequest.requestGetWithUrl(urlStr, parameter,
            function (error, responseData,response) {
                if (error) {
                    PublicToast.showMessage("流转中请求失败 errer 11=",error.message);
                    newRows = [];
                    if (response.status == 401) {
                        RefreshToken.refreshToken();
                    }
                    dispatch({
                        type: ActionConstants.FLOWCENTER_LOADING,
                        responseData:newRows,
                        isLoading: false
                    });
                } else {
                    if (responseData && responseData.message && responseData.message.length>0) {
                        // PublicToast.showMessage("流转中请求失败 非error"+responseData.message);
                        newRows=[];
                        dispatch({
                            type: ActionConstants.FLOWCENTER_LOADING,
                            responseData:newRows,
                            isLoading: false
                        });
                    }else if (responseData) {
                        if(parameter.page == 0){newRows = []}

                        let responseList = responseData;
                        var newRowslength = newRows.length;

                        for (var x = 0; x < responseList.length; x++) {
                             newRows[x + newRows.length] = responseList[x];
                         }
                         rows = newRows;
                         if (parameter.processStatus == 'Running') {
                             myFlowDS=rows;
                             myFlowIndex=parameter.page;
                         }else {
                             doneFlowDS=rows;
                             doneFlowIndex=parameter.page;
                         }

                        console.log('流转中和已办结 FromSever---responseData==' + {responseData}+'rows'+{rows});
                         dispatch({
                             type: ActionConstants.FLOWCENTER_FINISH,
                             responseData: rows,
                             isLoading: false
                         });
                    }else {
                        newRows = [];
                        dispatch({
                            type: ActionConstants.FLOWCENTER_ERROE,
                            responseData:newRows,
                            isLoading: false
                        });
                    }
                }
            }.bind(this));
    };
}
module.exports = {
    loadFlowCenterWaitDataFromServer,
    loadOtherFlowFromServer,
    loadFlowCenterWaitDataHomeFromServer
};
