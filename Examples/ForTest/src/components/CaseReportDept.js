/**
 * Created by Mike on 2016/8/30.
 */
'use strict';
import React  from 'react'
import {httpRequest} from 'react-native-utils-gjs'
import SQLTransation from '../common/SQLTransaction'
import GlobalSize from '../common/GlobalSize'
import DBStorage from '../common/DBStorage'
let HTTPRequest = new httpRequest(true);

var CallBack;
var CaseReportDept = {

    //初始化数据库，判断是否调用接口，回调返回登录人所在部门数据
    initDept(callBack: Function){
        CallBack = callBack;
        console.log('打开数据库');
        SQLTransation.openDatabase((bol, msg)=> {
            console.log('打开数据库' + bol);
            if (bol) {
                console.log('打开数据库成功');
                this.populateDatabase();
            } else {
                //创建数据失败
                console.log('打开数据库失败');
                CallBack('创建数据库失败');
            }
        });
    },

    //根据父级编码查询子集部门
    queryChildDeptData(parentCode: string, callBack: Function){
        console.log('打开数据库queryDeptData');
        CallBack = callBack;
        SQLTransation.openDatabase((bol, msg)=> {
            console.log('打开数据库' + bol);
            if (bol) {
                this.queryChildDept(parentCode);
            } else {
                //创建数据失败

            }
        });
    },

    queryMyDept() {
        console.log('查询数据');
        let sql = "select code ,name,level,parentCode from Dept where code = '" + global.deptCode + "'";
        console.log('查询数据' + sql);
        SQLTransation.selectData(sql, (bol, results)=> {
            console.log('查询数据是否成功' + bol + '==' + results);
            if (bol) {
                //查询成功
                if (CallBack) {
                    CallBack(results);
                } else {
                    CallBack('查询结果失败');
                }
            } else {
                CallBack('查询结果失败');
            }
        });
    },

    queryChildDept(parentCode: string, callBack: Function) {
        CallBack = callBack;
        console.log('子节点查询数据' + parentCode);
        let sql = "select code ,name,level,parentCode from Dept where parentCode = '" + parentCode + "'";
        console.log('子节点查询数据' + sql);
        SQLTransation.selectData(sql, (bol, results)=> {
            console.log('子节点查询数据是否成功' + bol + '==' + results);
            if (bol) {
                //查询成功
                CallBack(results);
            } else {
                CallBack('子节点查询结果失败');
            }
        });
    },

    populateDatabase(){
        console.log('检查表结构是否存在');
        SQLTransation.selectData("select 1 from sqlite_master where name = 'Dept' and type = 'table'", (bol, result)=> {
            console.log('检查表结构是否成功' + bol);
            if (bol) {
                if (result.length > 0) {
                    this.checkLoadDept();
                } else {
                    SQLTransation.createTable('CREATE TABLE IF NOT EXISTS Dept( '
                        + 'code VARCHAR(50) NOT NULL, '
                        + 'name VARCHAR(50) NOT NULL, '
                        + 'parentCode VARCHAR(50) NOT NULL,'
                        + 'level INT NOT NULL) ; ', (bol1, result1)=> {
                        console.log('创建表结构' + bol1);
                        if (bol1) {
                            this.loadHttpDeptSource();
                        } else {
                            CallBack('创建表结构失败');
                        }
                    });
                }
            } else {
                CallBack('创建表结构失败');
            }
        });
    },

    checkLoadDept() {
        console.log('CaseReportDate开始检查');
        // global.storageUtil.getValue('CaseReportDate')
        //     .then((CaseReportDate)=> {
        //         console.log('CaseReportDate11==>' + CaseReportDate);
        //         console.log('CaseReportDate22==>' + new Date().toDateString());
        //         if (CaseReportDate === new Date().toDateString()) {
        //             console.log('CaseReportDate11今天已经刷新了数据');
        //             this.queryMyDept();
        //         } else {
        //             console.log('CaseReportDate11今天还没有刷新数据');
        //             this.loadHttpDeptSource();
        //         }
        //     }).catch((err) => {
        //     console.log('CaseReportDate11第一次打开还没有存储过时间标记');
        //     this.loadHttpDeptSource();
        // });

        DBStorage.getValue('CaseReportDate', (CaseReportDate)=> {
            if (CaseReportDate) {
                if (CaseReportDate === new Date().toDateString()) {
                    console.log('CaseReportDate11今天已经刷新了数据');
                    this.queryMyDept();
                } else {
                    console.log('CaseReportDate11今天还没有刷新数据');
                    this.loadHttpDeptSource();
                }
            } else {
                console.log('CaseReportDate11第一次打开还没有存储过时间标记');
                this.loadHttpDeptSource();
            }
        });
    },

    loadHttpDeptSource(){
        let pathUrl = GlobalSize.ProductURL + 'AnChangReportService/Interface_SaleDimensionInterfaceService.service';
        console.log('loadHttpDeptSource接口地址' + pathUrl);
        HTTPRequest.requestGetWithUrl(pathUrl, "",
            function (error, result, response) {
                console.log('loadHttpDeptSource接口调用反馈');
                if (error) {
                    //调用接口失败
                    console.log('loadHttpDeptSource调用接口失败2222' + error.message);
                    CallBack('调用接口失败');
                } else {
                    if (result) {
                        SQLTransation.deleteAllDataFromTable('Dept', (bol, msg)=> {
                            if (bol) {
                                console.log('删除成功');
                            } else {
                                console.log('删除失败' + msg);
                            }
                        });
                        console.log('loadHttpDeptSource调用接口成功' + result);
                        let object = {code: result[0].GroupCode, name: result[0].GroupName, parentCode: '', level: 0};
                        SQLTransation.insertData('Dept', object, null)
                        let responseData = result[0].OrgList;
                        for (let i = 0; i < responseData.length; i++) {
                            let object = {
                                code: responseData[i].OrgCode,
                                name: responseData[i].OrgName,
                                parentCode: result[0].GroupCode,
                                level: 1
                            };
                            SQLTransation.insertData('Dept', object, null)
                            for (let j = 0; j < responseData[i].CityList.length; j++) {
                                let object = {
                                    code: responseData[i].CityList[j].CityCode,
                                    name: responseData[i].CityList[j].CityName,
                                    parentCode: responseData[i].OrgCode,
                                    level: 2
                                };
                                SQLTransation.insertData('Dept', object, null)
                                for (let k = 0; k < responseData[i].CityList[j].ProjectList.length; k++) {
                                    let object = {
                                        code: responseData[i].CityList[j].ProjectList[k].ProjectCode,
                                        name: responseData[i].CityList[j].ProjectList[k].ProjectName,
                                        parentCode: responseData[i].CityList[j].CityCode,
                                        level: 3
                                    };
                                    SQLTransation.insertData('Dept', object, null)
                                }
                            }
                        }
                        // global.storageUtil.setKeyValue('CaseReportDate', new Date().toDateString());
                        DBStorage.setKeyValue('CaseReportDate', new Date().toDateString(),(bol)=>{
                            console.log('保存'+bol)
                        });
                        this.queryMyDept();
                    } else {
                        console.log('loadHttpDeptSource调用接口失败1111' + result);
                        CallBack('调用接口失败');
                    }
                }
            }.bind(this));
    },

};

module.exports = CaseReportDept;