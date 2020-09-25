"user strict";
var sql = require("./db_config.js");

//Task object constructor
var Samples = function (samples) {
  this.userId = samples.userId;
  this.book_vector1 = samples.book_vector1;
  this.bookvector2 = samples.bookvector2;
  this.bookvector3 = samples.bookvector3;
  this.bookvector4 = samples.bookvector4;
  this.bookvector5 = samples.bookvector5;
  this.bookvector6 = samples.bookvector6;
  this.bookvector7 = samples.bookvector7;
  this.bookvector8 = samples.bookvector8;
  this.bookvector9 = samples.bookvector9;
  this.bookvector10 = samples.bookvector10;
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

Samples.select = function (coordinates, result) {
  sql.query(
    // "select min(sqrt((rr-?[0])*(rr-?[0])+(gg-?[0])*(gg-?[1])+(bb-?[2])*(bb-?[2]))) from samples;",
    "select userId from samples where abs(?-book_vector1) in (select min(abs(?-book_vector1)) from samples);",
    // "select userId, abs(?-book_vector1) from samples;",
    // [coordinates],
    [coordinates, coordinates],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Samples;
