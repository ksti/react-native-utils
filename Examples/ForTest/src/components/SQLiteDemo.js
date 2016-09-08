/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    TouchableOpacity,
    ListView
} from 'react-native';

var SQLite = require('react-native-sqlite-storage');
SQLite.DEBUG(true);
SQLite.enablePromise(true);
SQLite.enablePromise(false);

var database_name = "Test.db";
var database_version = "1.0";
var database_displayname = "SQLite Test Database";
var database_size = 200000;
var db;

export default class SQLiteDemo extends Component {

  runDemo=()=>{
    this.state.progress = ["Starting SQLite Demo"];
    this.setState(this.state);
    this.loadAndQueryDB();
  }

  loadAndQueryDB=()=>{
    this.state.progress.push("Opening database ...");
    this.setState(this.state);
    db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size, this.openCB, this.errorCB);
    this.populateDatabase(db);
  }

  constructor(props){
    super(props);
    this.state={
      progress: [],
      dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2,})
    }
  }

  componentWillUnmount=()=>{
    this.closeDatabase();
  }

  errorCB=(err)=> {
    console.log("error: ",err);
    this.state.progress.push("Error: "+ (err.message || err));
    this.setState(this.state);
    return false;
  }

  successCB=()=> {
    console.log("SQL executed ...");
  }

  openCB=()=> {
    this.state.progress.push("Database OPEN");
    this.setState(this.state);
  }

  closeCB=()=> {
    this.state.progress.push("Database CLOSED");
    this.setState(this.state);
  }

  deleteCB=()=> {
    console.log("Database DELETED");
    this.state.progress.push("Database DELETED");
    this.setState(this.state);
  }

  populateDatabase=(db)=>{
    var that = this;
    that.state.progress.push("Database integrity check");
    that.setState(that.state);
    db.executeSql('SELECT 1 FROM Version LIMIT 1', [],
        function () {
          that.state.progress.push("Database is ready ... executing query ...");
          that.setState(that.state);
          db.transaction(that.queryEmployees,that.errorCB,function() {
            that.state.progress.push("Processing completed");
            that.setState(that.state);
          });
        },
        function (error) {
          console.log("received version error:", error);
          that.state.progress.push("Database not yet ready ... populating data");
          that.setState(that.state);
          db.transaction(that.populateDB, that.errorCB, function () {
            that.setState(that.state);
            db.transaction(that.queryEmployees,that.errorCB, function () {
              that.state.progress.push("Processing completed");
              that.setState(that.state);
              that.closeDatabase();
            });
          });
        });
  }

  populateDB=(tx)=> {
    this.state.progress.push("Executing DROP stmts");
    this.setState(this.state);

    tx.executeSql('DROP TABLE IF EXISTS Employees;');
    tx.executeSql('DROP TABLE IF EXISTS Offices;');
    tx.executeSql('DROP TABLE IF EXISTS Departments;');

    this.state.progress.push("Executing CREATE stmts");
    this.setState(this.state);

    tx.executeSql('CREATE TABLE IF NOT EXISTS Version( '
        + 'version_id INTEGER PRIMARY KEY NOT NULL); ', [], this.successCB, this.errorCB);

    tx.executeSql('CREATE TABLE IF NOT EXISTS Departments( '
        + 'department_id INTEGER PRIMARY KEY NOT NULL, '
        + 'name VARCHAR(30) ); ', [], this.successCB, this.errorCB);

    tx.executeSql('CREATE TABLE IF NOT EXISTS Offices( '
        + 'office_id INTEGER PRIMARY KEY NOT NULL, '
        + 'name VARCHAR(20), '
        + 'longtitude FLOAT, '
        + 'latitude FLOAT ) ; ', [], this.successCB, this.errorCB);

    tx.executeSql('CREATE TABLE IF NOT EXISTS Employees( '
        + 'employe_id INTEGER PRIMARY KEY NOT NULL, '
        + 'name VARCHAR(55), '
        + 'office INTEGER, '
        + 'department INTEGER, '
        + 'FOREIGN KEY ( office ) REFERENCES Offices ( office_id ) '
        + 'FOREIGN KEY ( department ) REFERENCES Departments ( department_id ));', []);

    this.state.progress.push("插入数据开始");
    this.setState(this.state);

    //插入:tx.executeSql('INSERT INTO Departments (name) VALUES ("军情六处");', []);
    let initDepartmentArr = [
        {
            name:'军情六处',
        },{
            name:'克格勃',
        },{
            name:'CIA',
        },{
            name:'啥东西',
        }
    ];
    initDepartmentArr.map((object,index)=>{
        this.sqlInsert('Departments',object);
    });
    // tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("中国", 59.8,  34.);', []);
    let initOfficeArr = [
        {
            name:'陕西',
            longtitude:59.8,
            latitude:34,
        },{
            name:'河南',
            longtitude:59.8,
            latitude:34,
        },{
            name:'四川',
            longtitude:59.8,
            latitude:34,
        },{
            name:'山西',
            longtitude:59.8,
            latitude:34,
        },{
            name:'北京',
            longtitude:59.8,
            latitude:34,
        },
    ]
    initOfficeArr.map((object,index)=>{
        this.sqlInsert('Offices',object);
    });
    // tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("王庆", 2,  4);', []);
    let initEmployeeArr = [
        {
            name:'王高',
            office:1,
            department:1,
        },{
            name:'王瑞华',
            office:1,
            department:2,
        },{
            name:'赵立峰',
            office:1,
            department:3,
        },{
            name:'阙凯',
            office:1,
            department:4,
        },{
            name:'郭军帅',
            office:1,
            department:1,
        },
    ]
    initEmployeeArr.map((object,index)=>{
        this.sqlInsert('Employees',object);
    });
    console.log("all config SQL done");
    this.state.progress.push("插入数据结束");
  }
  sqlCreateTable=(table)=>{
      tx.executeSql('CREATE TABLE IF NOT EXISTS Employees( '
          + 'employe_id INTEGER PRIMARY KEY NOT NULL, '
          + 'name VARCHAR(55), '
          + 'office INTEGER, '
          + 'department INTEGER, '
          + 'FOREIGN KEY ( office ) REFERENCES Offices ( office_id ) '
          + 'FOREIGN KEY ( department ) REFERENCES Departments ( department_id ));', []);
  }
  sqlInsert=(table,object)=>{
      var keyString='';
      var valueString = '';
      for (var key in object) {
          keyString = keyString+key+',';
          if ( typeof(object[key]) == 'string' ) {
              valueString = valueString+'"'+object[key]+'",';
          }else {
              valueString = valueString+object[key]+',';
          }
      }
      keyString = keyString.slice(0,-1);
      valueString = valueString.slice(0,-1);
      var sqlString = 'INSERT INTO '+table+' ('+keyString+') VALUES ('+valueString+');'
      console.log('插入数据:'+sqlString);
      return db.executeSql(sqlString,[]);
  }

  queryEmployees=(tx)=> {
    this.state.progress.push("查询员工数据queryEmployees");
    tx.executeSql('SELECT a.name, b.name as deptName FROM Employees a, Departments b WHERE a.department = b.department_id ', [],
        this.queryEmployeesSuccess,this.errorCB);
    //tx.executeSql('SELECT a.name, from TEST', [],() => {},this.errorCB);
    tx.executeSql('SELECT a.name,b.name as deptName FROM Employees a,Departments b WHERE a.name="王花花" and a.department=b.department_id ',[],this.queryEmployeesSuccess,this.errorCB);
  }

  queryEmployeesSuccess=(tx,results)=> {
    this.state.progress.push("Query completed");
    this.setState(this.state);
    var len = results.rows.length;
    for (let i = 0; i < len; i++) {
      let row = results.rows.item(i);
      this.state.progress.push(`Empl Name: ${row.name}, Dept Name: ${row.deptName}`);

    }
    this.setState(this.state);
  }

  deleteDatabase=()=>{
    this.state.progress = ["Deleting database"];
    this.setState(this.state);
    SQLite.deleteDatabase(database_name, this.deleteCB, this.errorCB);
  }

  closeDatabase=()=>{
    var that = this;
    if (db) {
      console.log("Closing database ...");
      that.state.progress.push("Closing database");
      that.setState(that.state);
      db.close(that.closeCB,that.errorCB);
    } else {
      that.state.progress.push("Database was not OPENED");
      that.setState(that.state);
    }
  }

  renderProgressEntry=(entry)=>{
    return (
        <View style={listStyles.li}>
          <View>
            <Text style={listStyles.title}>{entry}</Text>
          </View>
        </View>
    )
  }

  render=()=>{
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return (
        <View style={styles.mainContainer}>
          <View style={styles.toolbar}>
            <Text style={styles.toolbarButton} onPress={this.runDemo}>
              Run Demo
            </Text>
            <Text style={styles.toolbarButton} onPress={this.closeDatabase}>
              Close DB
            </Text>
            <Text style={styles.toolbarButton} onPress={this.deleteDatabase}>
              Delete DB
            </Text>
          </View>
          <ListView
            dataSource={ds.cloneWithRows(this.state.progress)}
            renderRow={this.renderProgressEntry}
            style={listStyles.liContainer}/>
        </View>
    );
  }
};

var listStyles = StyleSheet.create({
  li: {
    borderBottomColor: '#c8c7cc',
    borderBottomWidth: 0.5,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
  liContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingLeft: 15,
  },
  liIndent: {
    flex: 1,
  },
  liText: {
    color: '#333',
    fontSize: 17,
    fontWeight: '400',
    marginBottom: -3.5,
    marginTop: -3.5,
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  toolbar: {
    backgroundColor: '#51c04d',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  toolbarButton: {
    color: 'blue',
    textAlign: 'center',
    flex: 1
  },
  mainContainer: {
    flex: 1
  }
});
