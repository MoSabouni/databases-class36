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
                console.log(`Query number ${index} is done`);  
                }); 
         })
        

        connection.end();
    });




const createResearchPapersTableSql = "CREATE TABLE Research_Papers (paper_id INTEGER PRIMARY KEY AUTO_INCREMENT, paper_title VARCHAR(256), conference VARCHAR(256), publish_date DATE)";
const createAuthorsPapersTableSql = "CREATE TABLE Authors_Papers (author_no INT NOT NULL,paper_id INT NOT NULL,FOREIGN KEY(author_no) REFERENCES authors(author_no), FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id))";
const setForeignKeyChecks0 = "SET foreign_key_checks = 0";
const insertAuthors = "INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor) VALUES ('Taddeo Taill','Hatyai University','1969-02-16',7,'Male', 5),('Modestia Reoch','Hatyai University','1974-05-08',1,'Genderfluid',6),('Vlad Schroter','Zhengzhou University of Technology','1971-11-15',5,'Male',1),('Genny Odhams','Perm State University','1974-06-06',8,'Female',1),('Amberly Hinzer','Perm State University','1962-03-18',2,'Female',15), ('Bartolemo Roja','Universidad de Zaragoza','1973-07-18',1,'Male',4), ('Adara Biagi','Mahamakut Buddhist University','1980-06-23',3,'Female',2), ('Mollie Marle','Hatyai University','1961-06-20',3,'Female',4), ('Brittni Quincey','Instituto Universitario Aeronáutico','1951-08-20',3,'Female',15), ('Blakelee Richmont','University of Maine','1983-06-02',6,'Female',5),('Roxie Volant','Henderson State Univerisity','1956-02-24',8,'Female',7), ('Brier Ferronier','Universidad Pedagógica Veracruzana','1968-09-17',9,'Female',4), ('Jarad Foux','Universidad de Zaragoza','1966-12-31',5,'Male',2), ('Allix Guidini','Pebble Hills University','1961-01-22',1,'Female',1), ('Worthington Bende','Universidad de Zaragoza','1957-02-25',1,'Male',1);";
const setForeignKeyChecks1 = "SET foreign_key_checks = 1";
const insertResearchPapers = "INSERT INTO research_papers (paper_title, conference, publish_date) VALUES ('Doxycycline Hyclate','Baima','2002-09-22'), ('Active Sport','Dobryatino','2016-07-24'), ('Sandbur Ragweed Pollen','Tagasilay','2005-09-07'), ('ADVATE','Iporã','2009-02-28'), ('SOUR DOCK SHEEP SORREL POLLEN','Banawang','2013-04-05'), ('Viscum Crataegus','Przecław','2003-02-06'), ('NEXIUM','Moss','2016-06-09'), ('bisoprolol fumarate and hydrochlorothiazide','Bystřice nad Pernštejnem','2004-09-13'), ('Tretinoin Gel Microsphere','Sedatiagung','2015-12-29'), ('Dove Men plus Care','Kampunglistrik','2006-01-04'), ('Mouth Sore Medication','Loukhi','2007-04-08'), ('MORUS RUBRA POLLEN','Tuojiang','2005-07-26'), ('hemorrhoidal','Verdun','2015-08-18'), ('L-Trans','Weitian','2013-02-18'), ('UV Shield SPF 42','Anaheim','2018-02-02'), ('Hydroxyzine Hydrochloride','Pereiros','2009-08-22'), ('Head and Shoulders 2in1','Parque','2012-03-28'), ('GAMMAGARD','Solna','2012-05-28'), ('Betamethasone Dipropionate','Mporokoso','2005-04-17'), ('Antibacterial Foaming Hand','Cambará','2004-10-08'), ('Topiramate','Nanshi','2003-10-01'), ('Sweet Olive Leaf Antibacterial Foaming Hand Wash','Miskolc','2002-07-15'), ('Quetiapine fumarate','Rychwał','2010-05-13'), ('Brevicon','Sampagar','2007-09-13'), ('Tussin Cough Long Acting','La Tola','2004-04-15'), ('Glofil-125','Lechinkay','2007-11-20'), ('Relief','Hetai','2006-05-04'), ('XANTHIUM STRUMARIUM VAR CANADENSE POLLEN','Tomohon','2009-06-14'), ('EXOTEN-C','Dolna','2000-08-12'), ('Treatment Set TS332509','Seara','2000-08-06')";
const insertAuthorsPapers = "INSERT INTO authors_papers (author_no, paper_id) VALUES (10,1),(13,2),(9,3),(14,4),(4,5),(9,6),(2,7),(9,8),(9,9),(1,10),(10,11),(15,12),(3,13),(12,14),(6,15),(6,16),(10,17),(9,18),(1,19),(13,20),(1,21),(14,22),(15,23),(13,24),(4,25),(4,26),(7,27),(12,28),(13,29),(15,30)";

const allQueries = [
    createResearchPapersTableSql,
    createAuthorsPapersTableSql,
    setForeignKeyChecks0,
    insertAuthors,
    setForeignKeyChecks1,
    insertResearchPapers,
    insertAuthorsPapers
];