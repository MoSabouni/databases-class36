var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',


});

connection.connect((error) => {
        if (error) throw error;
        console.log('MySql connected ...');


        allQueries.forEach((query, index) => {
            connection.query(query, function (error, result) {  
                if (error) {
                    console.log(`Error at ${index}: `, error);  
                } else {
                console.log(`Query number ${index} is done`);  
                }
            }); 
         })


        connection.end();
    });



const dropDatabaseSql = "DROP DATABASE IF EXISTS week3";
const createDatabaseSql = "CREATE DATABASE week3";
const useDatabaseSql = "USE week3";
const createAccountTableSql = "CREATE TABLE account (account_number INTEGER PRIMARY KEY, balance INTEGER)";
const createAccountChangesTableSql = "CREATE TABLE account_changes (change_number INTEGER PRIMARY KEY AUTO_INCREMENT, account_number INTEGER, amount INTEGER, changed_date DATE, remark VARCHAR(256))";
const alterForeigkey = "ALTER TABLE account_changes ADD CONSTRAINT FOREIGN KEY(account_number) REFERENCES account (account_number)"

const allQueries = [
    dropDatabaseSql,
    createDatabaseSql,
    useDatabaseSql,
    createAccountTableSql,
    createAccountChangesTableSql,
    alterForeigkey
];