var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils");

/* GET home page. */
router.get("/", function(req, res, ) {
  res.render("index", { title: "Express" });
});

router.get("/test", (req, res) => {
  mu.databases().then(dbs => res.send(dbs)); 
});

module.exports = router;
