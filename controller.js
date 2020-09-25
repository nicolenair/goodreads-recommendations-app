var Samples = require("./model.js");
// is this necessary
const goodreads = require("goodreads-api-node");
const myCredentials = {
  key: process.env.GOODREADS_KEY,
  secret: process.env.GOODREADS_SECRET,
};
const gr = goodreads(myCredentials);
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var DOMParser = require("domparser").DOMParser;
//

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
  today = yyyy + "/" + mm + "/" + dd;
  for (var s in d) {
    console.log(d[s][0]);
    var new_samples = new Samples({
      userId: s,
      book_vector1: d[s][0],
      bookvector2: d[s][1],
      bookvector3: d[s][2],
      bookvector4: d[s][3],
      bookvector5: d[s][4],
      bookvector6: d[s][5],
      bookvector7: d[s][6],
      bookvector8: d[s][7],
      bookvector9: d[s][8],
      bookvector10: d[s][9],
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
  yesterday_date = yyyy + "/" + mm + "/" + dd;
  Samples.remove(yesterday_date, function (err, task) {
    if (err) console.log(err);
    res.json({ message: "Task successfully deleted" });
  });
};

exports.select_samples = function (coordinates, req, res) {
  Samples.select(coordinates, function (err, samples) {
    console.log("controller");
    console.log(samples);
    bookList = [];
    // if (err) res.send(err);
    // console.log("res", samples);
    var request = new XMLHttpRequest(); //date recent
    request.open(
      "GET",
      "https://www.goodreads.com/review/list/" +
        samples[0].userId +
        ".xml?key=" +
        process.env.GOODREADS_KEY +
        "&v=2&shelf=read&per_page=20&page=" +
        1,
      false
    );
    request.send();
    console.log(1);
    var xml = request.responseText;
    xml_parsed = new DOMParser().parseFromString(xml, "text/xml");
    if (xml_parsed.getElementsByTagName("reviews").length > 0) {
      var books = xml_parsed.getElementsByTagName("book");
      for (var i = 0; i < books.length; i++) {
        var book = books[i];
        var names = book.getElementsByTagName("title");

        for (var j = 0; j < names.length; j++) {
          bookList.push(names[j].childNodes[0].nodeValue);
        }
      }
    }
    res.send(bookList);
    // res.send(samples);
  });
};
