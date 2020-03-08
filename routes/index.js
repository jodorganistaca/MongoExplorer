var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils");


router.get("/", function(req, res, ) { 
  /*mu.databases().then(dbs => {    
    res.render("layout", { title: "Mongo Explorer", databases: dbs.databases });
  });  */  
  let params = {
    title: "Home",
    connect: false,
  };
  res.render("layout", params);  
});

router.post("/connectMongo", (req, res) => {
  const urlInput = req.body.urlInput;
  console.log("url: ", req.body);
  mu.setURL(urlInput);
  //res.render("layout", {connect: true});
  mu.databases().then(dbs => {    
    res.render("layout", { title: "Mongo Explorer", databases: dbs.databases, connect: true });
  });
});

router.get("/connectMongo/databases", (req, res) => {
  let databases;
  mu.databases().then(dbs => {    
    databases = dbs;
  });   
  
  console.log(databases);
  mu.databases().then(dbs => res.json(dbs)); 
});

router.get("/collections/:dbname", (req, res) => {
  console.log(req.params.dbname);
  mu.collections(req.params.dbname).then(coll => {
    console.log(coll);
    res.json(coll);
  });
});

router.get("/documents/:dbname/:colname", (req, res) => {
  console.log("dbname ",req.params.dbname, " colname ", req.params.colname);
  mu.documents(req.params.dbname, req.params.colname).then(coll => {
    console.log(coll);
    res.render("table", {
      name: "Collection Name",
      getData: true,
      data: coll,
    });
  });
});
/*
router.post("/collections/createDocument", (req, res)=> {
  
});*/

module.exports = router;
