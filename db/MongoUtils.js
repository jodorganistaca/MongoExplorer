const MongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://mdbExplorerAdmin:9M2XvH29abRBP3hU@mongoexplorercluster-nymrk.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true }); // useUnifiedTopology removes a warning


function MongoUtils() {
  const mu = {};

  mu.connect = () =>{
    
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

    console.log("connecting");
    return new Promise((resolve, reject) => {
      client.connect((err) => {
        if(err){
          reject && reject(err);
          return;
        }
      
        console.log("Connected!!");
        resolve(client);
      });
    });
  };

  mu.databases = () => {
    return client
      .connect()
      .then(client =>
        client
          .db()
          .admin()
          .listDatabases() // Returns a promise that will resolve to the list of databases
      )
      .then(dbs => {   
        return dbs;
      })
      .finally(() => client.close());
  };

  mu.collections = (dbName) => {
    return mu.connect()
      .then(client =>{
        console.log("dbName to query", dbName);
        return client
          .db(dbName).listCollections().toArray();
      });
  };

  mu.document = (dbName, colName) => {
    mu.connect().then(client => {
      const documentCol = client.db(dbName).collection(colName);

      return documentCol.find().limit(20).toArray().finally(() => client.close());
    });    
  };

  return mu;
}

module.exports = MongoUtils();