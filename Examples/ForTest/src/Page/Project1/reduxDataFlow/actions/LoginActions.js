
import ActionConstants from '../actionConstants';
import {httpRequest} from 'react-native-utils-gjs'
import GlobalSize from '../../../../common/GlobalSize'
import PublicToast from '../../../../components/PublicToast'
import RefreshToken from '../../../../components/RefreshToken'

HTTPRequest = new httpRequest();

export function loginIn(parameter){
    return(dispatch)=>{
        dispatch({'type':ActionConstants.LOGIN_DOING});
        let urlStr = GlobalSize.BaseURL+'passport/oauth/token';
        HTTPRequest.contentType = 'form';
        HTTPRequest.setRequestHeader({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        HTTPRequest.requestPostWithUrl(urlStr,parameter,function(error,responseData, response){
            if (error) {
                PublicToast.showMessage('登录失败,请重试');
                dispatch({
                    'type':ActionConstants.LOGIN_ERROR,
                })
            }else {
                if (responseData) {
                    if (responseData.message && responseData.message.length>0) {
                        PublicToast.showMessage('登录失败,请重试');
                        PublicToast.logMessage('登录失败,请重试' + response.status);

                        dispatch({
                            'type':ActionConstants.LOGIN_ERROR,
                        })
                    }else {
                        PublicToast.showMessage('登录成功');
                        dispatch({
                            'type':ActionConstants.LOGIN_IN,
                            userInfo:responseData,
                        })
                    }
                }else {
                    PublicToast.showMessage('登录失败:'+responseData);
                    PublicToast.logMessage('response' + response.status);
                    dispatch({
                        'type':ActionConstants.LOGIN_ERROR,
                    })
                }
            }
        })
    }
}


module.exports = {
    loginIn,
};
