const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning


function MongoUtils() {
  const mu = {};

  let hostname = "localhost",
    port = 27017;

  mu.hostname = _ => (_ !== undefined ? ((hostname = _),mu) : hostname);
  mu.port = _ => (_ !== undefined ? ((port = _),mu) : port);

  mu.connect = () =>{
    const url = `mongodb://${hostname}:${port}`;
    
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

  return mu;
}

module.exports = MongoUtils();