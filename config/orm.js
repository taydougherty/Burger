var connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }

  function objToSql(obj) {
    var array = [];
  
    for (var key in obj) {
      var value = obj[key];

      if (Object.hasOwnProperty.call(obj, key)) {

        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }

        array.push(key + "=" + value);
      }
    }
  
    return array.toString();
  }
  
  var orm = {
    selectAll: function(table, callback) {
      var queryString = "SELECT * FROM " + table + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        callback(result);
      });
    },
    insertOne: function(table, columns, values, callback) {
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += columns.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(values.length);
      queryString += ") ";
  
      console.log(queryString);
  
      connection.query(queryString, values, function(err, result) {
        if (err) {
          throw err;
        }
  
        callback(result);
      });
    },

    updateOne: function(table, objColVals, condition, callback) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        callback(result);
      });
    }
  };

module.exports = orm;