const MongoClient = require("mongodb").MongoClient;
const env = require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  try {
    await client.connect();
    await insertAccounts(client, accounts);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

// Function to insert data
const insertAccounts = async (client, accounts) => {
  const insertedAccounts = await client
    .db("databaseWeek4")
    .collection("Accounts")
    .insertMany(accounts);

  await console.log(
    `Number of added accounts is: ${insertedAccounts.insertedCount}`
  );
};

// accounts data
const accounts = [
  {
    account_number: 101,
    balance: 5000,
    account_changes: {
      change_number: 9,
      amount: 1000,
      changed_date: "2020-01-07",
      remark: "Transfer",
    },
  },
  {
    account_number: 102,
    balance: 3000,
    account_changes: {
      change_number: 2,
      amount: 500,
      changed_date: "2021-11-17",
      remark: "Online purchase",
    },
  },
  {
    account_number: 103,
    balance: 2000,
    account_changes: {
      change_number: 4,
      amount: 300,
      changed_date: "2022-09-10",
      remark: "Return purchase",
    },
  },
];

main();
