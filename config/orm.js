var connection = require("../config/connection.js");

function selectAll(){
    connection.query("SELECT * FROM burgers;", function(err, data) {
        if (err) {
          return res.status(500).end();
        }
    
        // res.render("index", { burgers: data });
      });
};

function insertOne(){
    connection.query("INSERT INTO burgers (burger_name, devoured) VALUES (?, ?)", [req.body.burger_name, req.body.devoured], function(
        err,
        result
      ) {
        if (err) {
          return res.status(500).end();
        }
        
        res.json({ id: result.insertId });
      });
};

function updateOne(){
    connection.query(
        "UPDATE burgers SET burger_name = ?, devoured = ? WHERE id = ?",
        [req.body.burger_name, req.body.devoured, req.params.id],
        function(err, result) {
          if (err) {
            return res.status(500).end();
          }
          else if (result.changedRows === 0) {
            return res.status(404).end();
          }
          res.status(200).end();
        }
      );
};

module.exports = orm;