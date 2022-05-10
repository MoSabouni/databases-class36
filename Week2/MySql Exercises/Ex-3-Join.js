var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'week2',

});

connection.connect((error) => {
        if (error) throw error;
        console.log('MySql connected ...');
       
       
        allQueries.forEach((query, index) => {
            connection.query(query, function (error, result) {  
                if (error) {
                    console.log(`Error at ${index}: `, error);  
                }
                console.log(result);  
                }); 
         })
        

        connection.end();
    });



const selfJoinAuthorsMentors = "SELECT author.author_name AS Author, mentor.author_name as Mentor FROM authors author JOIN authors Mentor on Author.mentor = Mentor.author_no";
const joinAuthorsTitle = "SELECT authors.*, research_papers.paper_title FROM authors LEFT JOIN authors_papers ON authors.author_no = authors_papers.author_no LEFT JOIN research_papers ON research_papers.paper_id = authors_papers.paper_id;";

const allQueries = [
    selfJoinAuthorsMentors,
    joinAuthorsTitle 
];