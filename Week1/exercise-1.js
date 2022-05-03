var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'meetup',

});

// This is only an example of creating database, usually it is put in another file and used create connection but with out line 6 { database : 'meetup', } because our database is not created yet.

// connection.connect((error) => {
//     if (error) throw error;
//     console.log('MySql connected ...')
// });

// connection.query("CREATE DATABASE meetup", function (error, result) {  
//     if (error) throw error;  
//     console.log("Database created");  
//     });  

connection.connect(function(err) {  
    if (err) throw err;  
    console.log("MySql connected ...");  

    // function to create tables
    const createTable = (sql, tableName) => {
        connection.query(sql, function (error, result) {  
            if (error) throw error;  
            console.log(`${tableName} table has been created.`);  
        });  
    };


    
    const inviteeTableSql = "CREATE TABLE Invitee(invitee_no integer PRIMARY KEY AUTO_INCREMENT, invitee_name TEXT, invited_by TEXT)"
    createTable(inviteeTableSql, 'invitee');

    const roomTableSql = "CREATE TABLE Room(room_no integer PRIMARY KEY AUTO_INCREMENT, room_name TEXT, floor_number integer)"
    createTable(roomTableSql, 'room');

    const meetingTableSql = "CREATE TABLE Meeting (meeting_no integer PRIMARY KEY AUTO_INCREMENT, meeting_title TEXT, starting_time text, ending_time text, room_no integer)"
    createTable(meetingTableSql, 'meeting');


    // function to insert data into tables that takes 3 parameters
    const insertIntoTable = (sql, values, tableName) => {
        connection.query(sql, [values], function (error, result) {  
            if (error) throw error;  
            console.log(result.affectedRows + ` rows has been added to ${tableName} table.`);  
            });  
    };

    
    const inviteeSql = "INSERT INTO Invitee (invitee_name, invited_by) VALUES ?"
    const inviteeValues = [
        ['John','Recardo'],
        ['Ali','Brigitte'],
        ['Leo','Brigitte'],
        ['Camila','Recardo'],
        ['Layla','Recardo']
    ];

    insertIntoTable(inviteeSql, inviteeValues, 'invitee');


    const roomSql = "INSERT INTO Room (room_name, floor_number) VALUES ?"
    const roomValues = [
        ['Manager office', 04],
        ['Meetings room', 03],
        ['Meetings room', 03],
        ['Manager office', 04],
        ['Manager office', 04]
    ];

    insertIntoTable(roomSql, roomValues, 'room');
  

    const MeetingSql = "INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES ?"
    const meetingValues = [
        ['project meeting', '11:00AM', '12:00PM', 4],
        ['internship interview', '11:00AM', '12:00PM', 3],
        ['work interview', '12:00PM', '13:00PM', 3],
        ['business meeting', '12:00PM', '13:00PM', 4],
        ['project meeting', '14:00PM', '15:00PM', 4]
       ];

    insertIntoTable(MeetingSql, meetingValues, 'meeting');
    

    connection.end();
});  


