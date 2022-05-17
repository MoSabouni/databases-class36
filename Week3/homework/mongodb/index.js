const { MongoClient, ServerApiVersion } = require("mongodb");

require('dotenv').config()
//console.log(process.env) // remove this after you've confirmed it working


const { seedDatabase } = require("./seedDatabase.js");


async function createEpisodeExercise(client) {
  
  try {
    const result = await client.db('databaseWeek3').collection('bob_ross_episodes').insertOne({ 
      episode: 'S09E13',
      title: "MOUNTAIN HIDE-AWAY",
      elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
    });
    console.log(
      `Created season 9 episode 13 and the document got the id ${result.insertedId}`
    );
    } catch (error) {
    console.log(`Failed to create episode, Error: ${error}`);
  }

};

async function findEpisodesExercises(client) {
  
  const clientDatabase = client.db('databaseWeek3').collection('bob_ross_episodes');
  // Find the title of episode 2 in season 2 [Should be: WINTER SUN]
  try {
    const result = await clientDatabase.findOne({episode:"S02E02"});
    console.log(`The title of episode 2 in season 2 is ${result.title}`);

  } catch(error) {
    console.log(`Episode 2 in season 2 is not found!, Error:${error}`);
  }

  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]
  try {
    const result = await clientDatabase.findOne({title:"BLACK RIVER"});
    console.log(`The season and episode number of the "BLACK RIVER" episode is ${result.episode}`);

  } catch(error) {
    console.log(`The season and episode number of the "BLACK RIVER" are not found!, Error:${error}`);
  }
 

  // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]
  try {
    const result = await clientDatabase.find({elements:"CLIFF"}).toArray();
    const episodes = result.map(collection => collection.title).join(", ");
    console.log(`The episodes that Bob Ross painted a CLIFF are ${episodes}`);

  } catch(error) {
    console.log(`The episodes that Bob Ross painted a CLIFF are not found!, Error:${error}`);
  }
 

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]
  try {
    const result = await clientDatabase.find({elements: {$all: ['CLIFF', 'LIGHTHOUSE']}}).toArray();
    const episodes = result.map(collection => collection.title).join(", ");
    console.log(`The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${episodes}`);

  } catch(error) {
    console.log(`The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are not found!, Error:${error}`);
  }

}

async function updateEpisodeExercises(client) {
  
   const clientDatabase = client.db('databaseWeek3').collection('bob_ross_episodes');
  // Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that
  try {
    const result = await clientDatabase.updateOne({episode: "S30E13"}, {$set: {title: "BLUE RIDGE FALLS"}});
  
    console.log(`Ran a command to update episode 13 in season 30 and it updated ${result.modifiedCount} episodes`);

  } catch(error) {
    console.log(`Error in updating episode 13 season 30 title, Error:${error}`);
  }


  // Update all of the documents in the collection that have `BUSHES` in the elements array to now have `BUSH`
  // It should update 120 episodes!
  try {
    const result = await clientDatabase.updateMany({elements: "BUSHES"}, {$set: {"elements.$":"BUSH"}});
  
    console.log(`Ran a command to update all the BUSHES to BUSH and it updated ${result.modifiedCount} episodes`);

  } catch(error) {
    console.log(`Error in updating BUSHES to BUSH, Error:${error}`);
  }

 
}

async function deleteEpisodeExercise(client) {
  /**
   * It seems an errand episode has gotten into our data.
   * This is episode 14 in season 31. Please remove it and verify that it has been removed!
   */
   const clientDatabase = client.db('databaseWeek3').collection('bob_ross_episodes');
   try {
    const result = await clientDatabase.deleteOne({episode: "S31E14"});
  
    console.log(`Ran a command to delete episode 14 S 31 and it deleted ${result.deletedCount} episodes`);

  } catch(error) {
    console.log(`Error in deleting episode 14 S 31, Error:${error}`);
  }
  
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
