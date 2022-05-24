const MongoClient = require("mongodb").MongoClient;
const env = require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  try {
    await client.connect();
    await createTransfer(
      client,
      101,
      102,
      1000,
      "Online purchase",
      "2022-05-24"
    );
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

const createTransfer = async (client, fromAcc, toAcc, amount, remark, date) => {
  const accountsCollection = client.db("databaseWeek4").collection("Accounts");
  const session = client.startSession();
  const transactionOptions = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
  };

  try {
    const transactionResults = await session.withTransaction(async () => {
      // check for suffecient balance
      const accountBalance = await accountsCollection.findOne(
        {
          account_number: fromAcc,
        },
        { session }
      );

      if (accountBalance.balance < amount) {
        await session.abortTransaction();
        console.log(
          `Account number ${fromAcc} does not have enough balance to transfer money!`
        );
        return;
      }
      // update senders account function
      const fromAccountsUpdateResults = await accountsCollection.updateOne(
        { account_number: fromAcc },
        {
          $inc: { balance: -amount, "account_changes.change_number": 1 },
          $set: {
            "account_changes.amount": amount,
            "account_changes.changed_date": date,
            "account_changes.remark": remark,
          },
        },
        { session }
      );
      console.log(
        `${fromAccountsUpdateResults.matchedCount} document(s) found in accounts collection with the account number ${fromAcc}.`
      );
      console.log(
        `${fromAccountsUpdateResults.modifiedCount} document(s) was/were updated according to required transaction`
      );

      // update receivers account function
      const toAccountsUpdateResults = await accountsCollection.updateOne(
        { account_number: toAcc },
        {
          $inc: { balance: amount, "account_changes.change_number": 1 },
          $set: {
            "account_changes.amount": amount,
            "account_changes.changed_date": date,
            "account_changes.remark": remark,
          },
        },
        { session }
      );
      console.log(
        `${toAccountsUpdateResults.matchedCount} document(s) found in accounts collection with the account number ${toAcc}.`
      );
      console.log(
        `${toAccountsUpdateResults.modifiedCount} document(s) was/were updated according to required transaction`
      );
    }, transactionOptions);
  } catch (err) {
    console.error(err);
  } finally {
    await session.endSession();
  }
};

main();
