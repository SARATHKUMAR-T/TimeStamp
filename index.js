// Inbuild Requirements
const fs = require("fs");
const express = require("express");
const path = require("path");

const app = express();

// Directory
const dirname = path.join(__dirname, "timeStamps");

// 1.Api endpoint for writting timestamps
app.get("/date", (req, res) => {
  // date and time logics
  let date = new Date();
  let currentTimeStamp = `current Time is : ${date.toUTCString().slice(0, -3)}`;
  let time = date.toLocaleTimeString().split("").join("").replaceAll(":", "-");
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var seedatetime = month + "." + day + "." + year + "-" + time;

  fs.writeFile(`${dirname}/${seedatetime}.txt`, currentTimeStamp, err => {
    if (err) {
      res.send(`Error occurred:${err.message}`);
      return;
    }
    res.sendFile(path.join(dirname, `${seedatetime}.txt`));
  });
});

//2. End point for retrieve all text files

app.get("/all", (req, res) => {
  fs.readdir(dirname, (error, files) => {
    if (error) {
      res.send("error in fetching file");
      return;
    }
    res.send(files);
  });
});

// Listen to server
app.listen(8000, () =>
  console.log("server started in : http://localhost:8000/date")
);
