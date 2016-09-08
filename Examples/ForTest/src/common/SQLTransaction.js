import React,{

}from 'react';
import{
    Platform,
    ToastAndroid,
}from 'react-native';

var SQLite = require('react-native-sqlite-storage');
SQLite.DEBUG(true);
SQLite.enablePromise(true);
SQLite.enablePromise(false);

//ios 默认建表位置Library/LocalDataBase  android不知😄
var database_name = "Test.db";
var database_version = "1.0";
var database_displayname = "SQLite Test Database";
var database_size = 200000;
var db;
var isDBOpen=false;

//语法：executeSql(sqlStatement, arguments, callback, errorCallback)

var SQLTransation ={
    //打开数据库
    openDatabase(callback:Function){
        if (isDBOpen == false) {
            db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size,
                function(){
                    console.log('数据库已打开');
                    isDBOpen = true;
                    callback && callback(true,null);
                },
                function(error){
                    console.log('数据库打开失败:',error.message);
                    isDBOpen = false;
                    callback && callback(false,error.message);
                }
            );
        }else{
            console.log('数据库已打开');
            isDBOpen = true;
            callback && callback(true,null);
        }
    },
    //数据库关闭
    closeDatabase(callback:Function){
        if (db) {
            console.log("DataBase closing");
            db.close(
                function(){
                    console.log('数据库已关闭');
                    isDBOpen = false;
                    callback && callback(true,null);
                },
                function(error){
                    callback && callback(false,error.message);
                }
            );
        } else {
            console.log('no DataBase');
            callback && callback(false,'Do not found DataBase');
        }
    },
    //删除数据库
    deleteDatabase(callback:Function){
        SQLite.deleteDatabase(database_name,
            ()=>{
                callback && callback(true,null);
                isDBOpen = false;
            },
            (error)=>{
                callback && callback(false,error.message);
            }
        );
    },
    /*建表
        createSQL:建表的SQL语句
    */
    createTable(createSQL,callback:Function){
        if (!db) {
            callback && callback(false,'数据库不存在');
            return;
        }
        db.executeSql(createSQL,[],
            ()=>{
                callback && callback(true,null);
            },
            (error)=>{
                callback && callback(false,error.message);
            }
        );
    },
    /*删表
        tableName:表名称
    */
    deleteTable(tableName:string,callback:Function){
        if (!db) {
            callback && callback(false,'数据库不存在');
            return;
        }
        let sqlDrop = 'DROP TABLE IF EXISTS '+tableName+';';
        console.log('DROP TABLE:',sqlDrop);
        db.executeSql(sqlDrop,[],callback && callback(true,null),(error)=>callback && callback(false,error.message));
    },
    /*查表:返回表内所有数据
        selectSQL:查表语句
    */
    selectTable(tableName:string, callback:Function){
        if (!db) {
            callback && callback(false,'数据库不存在');
            return;
        }
        let sqlStr = 'SELECT * FROM '+tableName;
        db.executeSql(sqlStr, [],
            function(results){
                //成功
                callback && callback(true,results.rows)
            },
            function(error){
                //失败
                callback && callback(false,error.message)
            }
        );
    },
    /*插入数据*/
    insertData(tableName:string, data:Object,callback:Function){
        if (!db) {
            callback && callback(false,'数据库不存在');
            return;
        }
        var keyString='';
        var valueString = '';
        for (var key in data) {
            // console.log('插入:'+key+data[key]);
            keyString = keyString+key+',';
            if ( typeof(data[key]) == 'string' ) {
                valueString = valueString+'"'+data[key]+'",';
            }else {
                valueString = valueString+data[key]+',';
            }
        }
        // console.log('valueString:',valueString);
        keyString = keyString.slice(0,-1);
        valueString = valueString.slice(0,-1);
        // console.log('valueString:',valueString);
        var sqlString = 'INSERT INTO '+tableName+' ('+keyString+') VALUES ('+valueString+');'
        // console.log('插入数据:'+sqlString);
        db.executeSql(sqlString,[],
            function(){
                callback && callback(true,null);
            },
            function(error){
                callback && callback(false,error.message);
            }
        );
    },
    /*删除数据*/
    deleteAllDataFromTable(tableName:string,callback:Function){
        if (!db) {
            callback && callback(false,'数据库不存在');
            return;
        }
        db.executeSql('DELETE FROM '+tableName,[],
            function(){
                callback && callback(true,null);
            },
            function(error){
                callback && callback(false,error.message);
            }
        );
    },
    deleteData(deleteSQL,callback:Function){
        // var sqlString = 'DELETE FROM '+table+' WHERE '+;
        // for (var key in whereObj) {
        //     if (object.hasOwnProperty(key)) {
        //         var strValue = whereObj[key];
        //         if (typeof(strValue)==string) {
        //             strValue = '"'+strValue+'"';
        //         }
        //         sqlString = sqlString+key+'='+whereObj[key]+' AND ';
        //     }
        // }
        // sqlString = sqlString.slice(0,-4)+';';
        if (!db) {
            callback && callback(false,'数据库不存在');
            return;
        }
        db.executeSql(deleteSQL,[],
            function (){
                callback && callback(true,null);
            },
            function (error) {
                callback && callback(false,error.message);
            }
        )
    },
    /*获取查询数据
        selectedSQL:查询语句
    */
    selectData(selectedSQL:string,callback:Function){
        console.log('selectedSQL:',selectedSQL);
        if (!db) {
            callback && callback(false,'数据库不存在');
            return;
        }
        db.executeSql(selectedSQL,[],
            (results)=>{
                // console.log('database:'+database);
                console.log('results:'+results);
                var len = results.rows.length;

                for (let i = 0; i < len; i++) {
                  let row = results.rows.item(i);
                  console.log(`Empl Name: ${row.name}, Dept Name: ${row.department}`);
                }
                callback && callback(true,results.rows);
            },
            function(error){
                callback && callback(false,error.message);
            }
        )
    },
    /*更新数据*/
    updateData(updateSQL:string,callback:Function){
        if (!db) {
            callback && callback(false,'数据库不存在');
            return;
        }
        db.executeSql(updateSQL,[],
            function(){
                callback && callback(true,null);
            },
            function(error){
                callback && callback(error.message);
            }
        )
    },
}

module.exports = SQLTransation;
