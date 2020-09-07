var Samples = require("./model.js");

exports.list_all_samples = function (req, res) {
  Samples.getAllSamples(function (err, samples) {
    console.log("controller");
    if (err) res.send(err);
    console.log("res", samples);
    res.send(samples);
  });
};

exports.create_a_sample = function (data) {
  d = JSON.parse(data);
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  for (var s in d) {
    var new_samples = new Samples({
      userId: s,
      book_vector: d[s],
      date: today,
    });
    Samples.createSample(new_samples, function (err, samples) {
      if (err) console.log(err);
      // res.json(samples);
    });
  }
  //handles null error
};

exports.delete_a_samples = function (req, res) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  var dd = String(yesterday.getDate()).padStart(2, "0");
  var mm = String(yesterday.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = yesterday.getFullYear();
  yesterday_date = mm + "/" + dd + "/" + yyyy;
  Samples.remove(yesterday_date, function (err, task) {
    if (err) console.log(err);
    res.json({ message: "Task successfully deleted" });
  });
};
