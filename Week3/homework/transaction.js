const util = require('util');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'week3',

});

const execQuery = util.promisify(connection.query.bind(connection));

async function transaction() {
    connection.connect();

    try {
        await execQuery(startTransactionSql);
    
        await execQuery(deductFromAccountSql);
        await execQuery(addToAccountSql);
        await execQuery(deductChangeSql);
        await execQuery(addChangeSql);
    
        await execQuery(commitSql);
      } catch (error) {
        console.error(error);
        await execQuery(rollbackSql);
        connection.end();
      }

    connection.end();
};


const startTransactionSql = "START TRANSACTION;";
const deductFromAccountSql = "UPDATE account SET balance = balance - 1000 WHERE account_number = 101";
const addToAccountSql = "UPDATE account SET balance = balance + 1000 WHERE account_number = 102";
const deductChangeSql = "INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (101, -1000, NOW(), 'Deduction completed')";
const addChangeSql = "INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (102, +1000, NOW(), 'Transaction completed')";
const commitSql = "COMMIT";
const rollbackSql = "ROLLBACK";


transaction();