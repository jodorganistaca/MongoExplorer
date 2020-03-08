var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils");

router.get("/", function(req, res, ) { 
  mu.databases().then(dbs => {    
    res.render("layout", { title: "Mongo Explorer", databases: dbs.databases });
  });    
  
});

router.get("/databases", (req, res) => {
  let databases;
  mu.databases().then(dbs => {    
    databases = dbs;
  });   
  
  console.log(databases);
  mu.databases().then(dbs => res.json(dbs)); 
});

router.get("/collections/:dbname", async (req, res) => {
  console.log(req.params.dbname);
  mu.collections(req.params.dbname).then(coll => {
    console.log(coll);
    res.json(coll);
  });
});
/*
router.post("/collections/createDocument", (req, res)=> {
  
});*/

module.exports = router;
