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
                }
                console.log(`Query number ${index} is done`);  
                }); 
         })
        

        connection.end();
    });



const dropDatabaseSql = "DROP DATABASE IF EXISTS week2";
const createDatabaseSql = "CREATE DATABASE week2";
const useDatabaseSql = "USE week2";
const createAuthorsTableSql = "CREATE TABLE authors(author_no INTEGER PRIMARY KEY AUTO_INCREMENT, author_name VARCHAR(256), university VARCHAR(256), date_of_birth DATE, h_index INTEGER, gender VARCHAR(256))";
const addMentorColumnSql = "ALTER TABLE authors ADD mentor INTEGER";
const alterMentorKeySql = "ALTER TABLE authors ADD CONSTRAINT FOREIGN KEY(mentor) REFERENCES authors(author_no)"

const allQueries = [
    dropDatabaseSql,
    createDatabaseSql,
    useDatabaseSql,
    createAuthorsTableSql,
    addMentorColumnSql,
    alterMentorKeySql
];