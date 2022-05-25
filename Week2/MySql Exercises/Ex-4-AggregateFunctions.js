var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "week2",
});

connection.connect((error) => {
  if (error) throw error;
  console.log("MySql connected ...");

  allQueries.forEach((query, index) => {
    connection.query(query, function (error, result) {
      if (error) {
        console.log(`Error at ${index}: `, error);
      }
      console.log(result);
    });
  });

  connection.end();
});

const numberAuthorsPaper =
  " SELECT research_papers.paper_title, COUNT(authors_papers.author_no) FROM authors_papers JOIN research_papers ON research_papers.paper_id = authors_papers.paper_id GROUP BY authors_papers.author_no;";
const numberFemaleAuthors =
  "SELECT COUNT(DISTINCT authors.author_no) as Totale_Female_Authors FROM authors JOIN authors_papers ON authors.author_no = authors_papers.author_no WHERE authors.gender='Female';";
const averageIndexPerUni =
  "SELECT university, AVG(h_index) AS index_average FROM authors GROUP BY university;";
const papersPerUni =
  "SELECT authors.university, COUNT(authors.author_no) AS Total_papers FROM authors JOIN authors_papers ON authors.author_no = authors_papers.author_no GROUP BY authors.university;";
const minMaxIndexPerUni =
  "SELECT university, MIN(h_index) AS Minimum_Index, MAX(h_index) AS Maximum_Index FROM authors GROUP BY university;";

const allQueries = [
  numberAuthorsPaper,
  numberFemaleAuthors,
  averageIndexPerUni,
  papersPerUni,
  minMaxIndexPerUni,
];
