
import ActionConstants from '../actionConstants';

function Login(state,action){
    //初始化state
    state = state || {
		isLoggedIn:false,
        userInfo:{},
        status:null,
	}
    switch (action.type) {
        case ActionConstants.LOGIN_DOING:
            return{
                ...state,
                status:'doing',
            };
            break;
        case ActionConstants.LOGIN_IN:{
            console.log('action.userinfo',action.userInfo.access_token);
            return{
                ...state,
                status:'done',
                isLoggedIn:true,
                userInfo:action.userInfo,
            }
            break;
        }
        case ActionConstants.LOGIN_ERROR:
            return{
                ...state,
                status:null,
                user:{},
                isLoggedIn:false,
            }
            break;
        default:
            return state;
    }
}

module.exports = {Login};
