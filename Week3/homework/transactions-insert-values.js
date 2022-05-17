var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'week3',


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



const insertIntoAccountSql = "INSERT INTO account (account_number, balance) VALUES (101, 3000), (102, 2500), (103, 1000)";
const insertIntoAccountChangesSql = "INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (101, 1000, NOW(), 'Transaction completed'), (102, 500, NOW(), 'Transaction completed')";


const allQueries = [
    insertIntoAccountSql,
    insertIntoAccountChangesSql
];