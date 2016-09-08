
var keyMirror = require('keymirror');

module.exports = keyMirror({

    //Login
    LOGIN_DOING: null,//loading
    LOGIN_IN: null,//logined in
    LOGIN_ERROR: null,//login error
    LOGIN_OUT: null,//exit out

    //流程中心
    FLOWCENTER_LOADING: null,
    FLOWCENTER_FINISH: null,//请求完成
    FLOWCENTER_ERROE: null,

    FLOWCENTERHOME_LOADING: null,
    FLOWCENTERHOME_FINISH: null,//请求完成
    FLOWCENTERHOME_ERROE: null,
})
