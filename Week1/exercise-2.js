var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'hyfuser',
  password : 'hyfpassword',
  database : 'world',

});

connection.connect((error) => {
   if (error) throw error;
        console.log('MySql connected ...');
       
         const sqlQueries = [
             {sql: "SELECT name FROM country WHERE population > 8000000", text: "What are the names of countries with population greater than 8 million?"},
             {sql: "SELECT name FROM country WHERE name LIKE '%land%'", text: "What are the names of countries that have “land” in their names?"},
             {sql: "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000", text: "What are the names of the cities with population in between 500,000 and 1 million?"},
             {sql: "SELECT name FROM country WHERE continent = 'Europe'", text: "What's the name of all the countries on the continent Europe?"},
             {sql: "SELECT name FROM country ORDER BY SurfaceArea DESC", text: "List all the countries in the descending order of their surface areas."},
             {sql: "SELECT name FROM city WHERE countrycode = 'NLD'", text: "What are the names of all the cities in the Netherlands?"},
             {sql: "SELECT population FROM city WHERE name = 'Rotterdam'", text: "What is the population of Rotterdam?"},
             {sql: "SELECT name FROM country ORDER BY SurfaceArea DESC LIMIT 10", text: "What's the top 10 countries by Surface Area?"},
             {sql: "SELECT name FROM city ORDER BY population DESC LIMIT 10", text: "What's the top 10 most populated cities?"},
             {sql: "SELECT SUM(Population) FROM country", text: "What is the population number of the world?"},
         ];

         sqlQueries.forEach((query) => {
            connection.query(query.sql, function (error, result) {  
                if (error) throw error;  
                console.log(`The result of ${query.text} is:`)
                console.log(result);  
                }); 
         })
 
        

     connection.end();
});

