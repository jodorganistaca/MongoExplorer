const MongoClient = require("mongodb").MongoClient;

function MongoUtils() {
  const mu = {};

  let hostname = "localhost",
    port = 27017,
    dbName = "test";

  mu.dbName = _ => (_ !== undefined ? ((dbName = _), mu) : dbName);
  mu.hostname = _ => (_ !== undefined ? ((hostname = _),mu) : hostname);
  mu.port = _ => (_ !== undefined ? ((port = _),mu) : port);

  mu.connect = () =>{
    const url = `mongodb://${hostname}:${port}/${dbName}`;
    
    const client = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

    console.log("connecting");
    return new Promise((resolve, reject) => {
      client.connect((err) => {
        if(err){
          reject && reject(err);
          return;
        }
      
        console.log("Connected!");
        resolve(client);
      });
    });
  };

  mu.databases = (client) => {
    const databases = client.db(dbName).admin().listDatabases();
    return databases.then(dbs => {
      console.log("Mongo databases", dbs);
    }).finally(() => client.close());
  };

  return mu;
}

module.exports = MongoUtils;