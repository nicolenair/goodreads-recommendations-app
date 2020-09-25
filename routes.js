require("dotenv").config();
const goodreads = require("goodreads-api-node");
const myCredentials = {
  key: process.env.GOODREADS_KEY,
  secret: process.env.GOODREADS_SECRET,
};
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var DOMParser = require("domparser").DOMParser;
var sampleDatabase = require("./controller.js");

const gr = goodreads(myCredentials);
var express = require("express"),
  router = express.Router();

router.get("/", function (req, res) {
  res.send("hello world");
});

router.get("/show-all-samples", sampleDatabase.list_all_samples);

router.get("/delete-yesterday-samples", sampleDatabase.delete_a_samples);

router.get("/compute-recommendation", function (req, res) {
  const userId = req.query.loggedUserId;
  bookList = [];
  var request = new XMLHttpRequest(); //date recent
  console.log(userId);
  request.open(
    "GET",
    "https://www.goodreads.com/review/list/" +
      userId +
      ".xml?key=" +
      process.env.GOODREADS_KEY +
      "&v=2&shelf=read&per_page=20&page=" +
      i,
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
  const { spawn } = require("child_process");
  var o = {};
  o[userId] = bookList;
  console.log(o);
  const pythonProcess = spawn("python", ["./inference.py", JSON.stringify(o)]);
  console.log("complete");
  pythonProcess.stdout.on("data", function (data) {
    console.log("data sent");
    console.log(data);
    dataToSend = data;
  });

  pythonProcess.on("close", (code) => {
    // send data to browser
    // sampleDatabase.create_a_sample(dataToSend);
    sampleDatabase.select_samples(dataToSend[0], req, res);
    // res.send(user_out);
  });
});

router.get("/daily-update", function (req, res) {
  var dict = {};
  arr = [
    "90668048",
    "2515808",
    "39905344",
    "108081413",
    "103381344",
    "6193300",
    "59536397",
    "58562150",
    "59536397",
    "63528005",
    "81660625",
    "102871069",
    "76059151",
    "76843610",
  ];
  arr.forEach(function (userId) {
    console.log(userId);
    // fall = false;
    // while (fall == false) {
    // userId = Math.floor(Math.random() * 10000000);
    bookList = [];
    for (var i = 0; i < 5; i++) {
      var request = new XMLHttpRequest(); //date recent
      request.open(
        "GET",
        "https://www.goodreads.com/review/list/" +
          userId +
          ".xml?key=" +
          process.env.GOODREADS_KEY +
          "&v=2&shelf=read&per_page=20&page=" +
          i,
        false
      );
      request.send();
      var xml = request.responseText;
      xml_parsed = new DOMParser().parseFromString(xml, "text/xml");
      var books = xml_parsed.getElementsByTagName("book");
      for (var i = 0; i < books.length; i++) {
        var book = books[i];
        var names = book.getElementsByTagName("title");

        for (var j = 0; j < names.length; j++) {
          bookList.push(names[j].childNodes[0].nodeValue);
        }
      }
    }
    if (bookList.length > 0) {
      dict[userId] = bookList;
    } //end
  });

  console.log("begin python");

  const { spawn } = require("child_process");
  const pythonProcess = spawn("python", ["./knn.py", JSON.stringify(dict)]);
  console.log("complete");
  pythonProcess.stdout.on("data", function (data) {
    console.log("data sent");
    dataToSend = data;
  });

  pythonProcess.on("close", (code) => {
    // send data to browser
    // sampleDatabase.create_a_sample(dataToSend);
    sampleDatabase.create_a_sample(dataToSend);
    res.send(String(dataToSend));
  });
});

//other routes..

module.exports = router;

// quick way to
// list all books read by all readers(one-hot)
// for now maybe 10000
// reduce dimensions
// get KNN
//so the script grabs users, with many books (>100)
//takes list of books read by each as well
//send to python for one-hot encoding, dimension reduction etc.
//return closest
