const MongoClient = require("mongodb").MongoClient;
const env = require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



async function main() {
    try {
        await client.connect();
        await populationPerCountryAllYears(client, "Netherlands");
        await totalPopulationPerContinent(client, "2020", "0-4")

    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
  };

  // Function for exercise 1.2
  const populationPerCountryAllYears = async (client, country) => {
    const database = client.db("databaseWeek4").collection("population_pyramid");
      const pipeline = [
        {
          '$match': {
            'Country': `${country}`
          }
        }, {
          '$group': {
            '_id': '$Year', 
            'CountPopulation': {
              '$sum': {
                '$add': [
                  '$M', '$F'
                ]
              }
            }
          }
        }, {
          '$sort': {
            '_id': 1
          }
        }
      ];

    const aggCursor = await database.aggregate(pipeline);
    await aggCursor.forEach(result => console.log(result))
  };

  //Function for exercise 1.3
  const totalPopulationPerContinent = async (client, year, age) => {
    const database = client.db("databaseWeek4").collection("population_pyramid");
      const pipeline = [
        {
          '$match': {
            'Year': `${year}`, 
            'Age': `${age}`, 
            'Country': {
              '$in': [
                'AFRICA', 'ASIA', 'EUROPE', 'LATIN AMERICA AND THE CARIBBEAN', 'NORTHERN AMERICA', 'OCEANIA'
              ]
            }
          }
        }, {
          '$addFields': {
            'TotalPopulation': {
              '$add': [
                '$M', '$F'
              ]
            }
          }
        }
      ];

    const aggCursor = await database.aggregate(pipeline);
    await aggCursor.forEach(result => console.log(result))
  };

  main();