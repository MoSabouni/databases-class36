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
             // What are the names of countries with population greater than 8 million?
             {sql: "SELECT name FROM country WHERE population > 8000000"},
             // What are the names of countries that have “land” in their names?
             {sql: "SELECT name FROM country WHERE name LIKE '%land%'"},
             // What are the names of the cities with population in between 500,000 and 1 million?
             {sql: "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000"},
             // What's the name of all the countries on the continent ‘Europe’?
             {sql: "SELECT name FROM country WHERE continent = 'Europe'"},
             // List all the countries in the descending order of their surface areas.
             {sql: "SELECT name FROM country ORDER BY SurfaceArea DESC"},
             // What are the names of all the cities in the Netherlands?
             {sql: "SELECT name FROM city WHERE countrycode = 'NLD'"},
             // What is the population of Rotterdam?
             {sql: "SELECT population FROM city WHERE name = 'Rotterdam'"},
             // What's the top 10 countries by Surface Area?
             {sql: "SELECT name FROM country ORDER BY SurfaceArea DESC LIMIT 10"},
             // What's the top 10 most populated cities?
             {sql: "SELECT name FROM city ORDER BY population DESC LIMIT 10"},
             // What is the population number of the world?
             {sql: "SELECT SUM(Population) FROM country"},
         ];

         sqlQueries.forEach((query) => {
            connection.query(query.sql, function (error, result) {  
                if (error) throw error;  
                console.log(result);  
                }); 
         })
 
        

        connection.end();
    });

