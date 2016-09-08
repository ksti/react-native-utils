import SQLTransaction from './SQLTransaction'
var CallBack;
var key;
var value;
var DBStorage = {

    getValue(myKey: string, callBack: Function){
        key = myKey;
        CallBack = callBack;
        SQLTransaction.openDatabase((bol, msg)=> {
            console.log('DBStorage=getValue=打开数据库' + bol);
            if (bol) {
                console.log('DBStorage=getValue=打开数据库成功');
                this.populateDatabase();
            } else {
                //创建数据失败
                console.log('DBStorage=getValue=打开数据库失败');
                if (CallBack) {
                    CallBack(null);
                }
            }
        });
    },
    populateDatabase(){
        console.log('DBStorage=getValue=检查表结构是否存在');
        // select 1 from sqlite_master where name = 'person' and type = 'table'
        SQLTransaction.selectData("select 1 from sqlite_master where name = 'KEYVALUE' and type = 'table'", (bol, result)=> {
            console.log('DBStorage=getValue=检查表结构是否成功' + bol + result);
            if (bol) {
                if (result && result.length > 0) {
                    this.queryValue();
                } else {
                    SQLTransaction.createTable('CREATE TABLE IF NOT EXISTS KEYVALUE( MY_KEY VARCHAR(200) NOT NULL,MY_VALUE VARCHAR(500) NOT NULL)', (bol1, result1)=> {
                        console.log('DBStorage=getValue=创建表结构' + bol1);
                        if (bol1) {
                            this.queryValue();
                        } else {
                            if (CallBack) {
                                CallBack(null);
                            }
                        }
                    });
                }
            } else {
                if (CallBack) {
                    CallBack(null);
                }
            }
        });
    },
    queryValue() {
        let sql = "select MY_VALUE from KEYVALUE where MY_KEY = '" + key + "'";
        SQLTransaction.selectData(sql, (bol, results)=> {
            console.log('DBStorage=getValue=' + bol + '==' + results);
            if (bol) {
                if(results.length>0){
                    if (CallBack)CallBack(results.item(0).MY_VALUE);
                }else{
                    if (CallBack)CallBack(null);
                }
            } else {
                if (CallBack) {
                    CallBack(null);
                }
            }
        });
    },

    setKeyValue(myKey: string, myValue: object, callBack: Function)
    {
        key = myKey;
        value = myValue;
        CallBack = callBack;
        SQLTransaction.openDatabase((bol, msg)=> {
            console.log('DBStorage=setKeyValue=打开数据库' + bol);
            if (bol) {
                console.log('DBStorage=setKeyValue=打开数据库成功');
                this.checkTable();
            } else {
                //创建数据失败
                console.log('DBStorage=setKeyValue=打开数据库失败');
                if (CallBack) {
                    CallBack(false);
                }
            }
        });
    }
    ,
    checkTable()
    {
        console.log('DBStorage=setKeyValue=检查表结构是否存在');
        // select 1 from sqlite_master where name = 'person' and type = 'table'
        SQLTransaction.selectData("select 1 from sqlite_master where name = 'KEYVALUE' and type = 'table'", (bol, result)=> {
            console.log('DBStorage=setKeyValue=检查表结构是否成功' + bol);
            if (bol) {
                console.log('DBStorage=setKeyValue=检查表结构是否成功' + bol+result.length);
                if (result && result.length > 0) {
                    this.checkKeyValue();
                } else {
                    SQLTransaction.createTable('CREATE TABLE IF NOT EXISTS KEYVALUE( MY_KEY VARCHAR(200) NOT NULL,MY_VALUE VARCHAR(500) NOT NULL)', (bol1, result1)=> {
                        console.log('DBStorage=setKeyValue=创建表结构' + bol1);
                        if (bol1) {
                            this.insertKeyValue();
                        } else {
                            if (CallBack) {
                                CallBack(false);
                            }
                        }
                    });
                }
            } else {
                if (CallBack) {
                    CallBack(false);
                }
            }
        });
    }
    ,
    checkKeyValue()
    {
        SQLTransaction.selectData("select 1 from KEYVALUE where MY_KEY = '" + key + "'", (bol, result)=> {
            console.log('DBStorage=setKeyValue=检查是否存在' + bol);
            if (bol) {
                if (result.length > 0) {
                    this.updateKeyValue();
                } else {
                    this.insertKeyValue();
                }
            } else {
                if (CallBack) {
                    CallBack(false);
                }
            }
        });
    }
    ,
    insertKeyValue()
    {
        SQLTransaction.selectData("insert into KEYVALUE values('" + key + "','" + value + "')", (bol, result)=> {
            console.log('DBStorage=setKeyValue=插入数据结果' + bol);
            if (CallBack) {
                CallBack(bol);
            }
        });
    }
    ,
    updateKeyValue()
    {
        SQLTransaction.selectData("update KEYVALUE set MY_VALUE = '" + value + "' where MY_KEY = '" + key + "'", (bol, result)=> {
            console.log('DBStorage=setKeyValue=修改数据结果' + bol);
            if (CallBack) {
                CallBack(bol);
            }
        });
    }
}

module.exports = DBStorage;
