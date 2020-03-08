const MongoClient = require("mongodb").MongoClient;


//const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true }); // useUnifiedTopology removes a warning


function MongoUtils() {
  const mu = {};

  let uri = "";

  mu.setURL = _ => (_ !== undefined ? ((uri = _), mu) : uri);

  mu.connect = () =>{
    const url = uri;
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
    return mu.connect()
      .then(client =>
        client
          .db()
          .admin()
          .listDatabases() // Returns a promise that will resolve to the list of databases
      )
      .then(dbs => {   
        return dbs;
      });
  };

  mu.collections = async (dbName) => {
    const client = await mu.connect();
    console.log("dbName to query", dbName);
    return client.db(dbName).listCollections().toArray();
  };

  mu.documents = (dbName, colName) => {
    return mu.connect().then(client => {
      const documentCol = client.db(dbName).collection(colName);
      console.log("dbName to query", dbName, " colname to query ", colName);
      return documentCol.find().limit(20).toArray().finally(client => client.close());;
    });    
  };

  return mu;
}

module.exports = MongoUtils();