var express = require("express");
var router = express.Router();

const mu = require("../db/MongoUtils");

/* GET home page. */
router.get("/", function(req, res, ) {
  res.render("index", { title: "Express" });
});

router.get("/test", (req, res) => {
  mu.connect()
    .then(client => 
      mu.databases(client)
        .then(dbs => {
          console.log(dbs);
          res.send("hola");
        })
    );
});

module.exports = router;
