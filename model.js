"user strict";
var sql = require("./db_config.js");

//Task object constructor
var Samples = function (samples) {
  this.userId = samples.userId;
  this.book_vector = samples.book_vector;
  this.date = samples.date;
};
Samples.createSample = function (newSample, result) {
  sql.query("INSERT INTO samples set ?", newSample, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Samples.getAllSamples = function (result) {
  sql.query("Select * from samples", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("samples : ", res);

      result(null, res);
    }
  });
};

Samples.remove = function (date, result) {
  sql.query("DELETE FROM samples WHERE date = ?", [date], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Samples;
