var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils");

/* GET home page. */
router.get("/", function(req, res, ) {
  let databases;
  mu.databases().then(dbs => {
    res.send(dbs);
    databases = dbs;
  });   
  res.render("index", { title: "Express", dbs: databases });
});

router.get("/databases", (req, res) => {
  mu.databases().then(dbs => res.send(dbs)); 
});

module.exports = router;
