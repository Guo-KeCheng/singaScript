const express = require("express");
const router = express.Router();
const { exec } = require('child_process');

router.get("/", function (req, res) {
  res.send("POST data instead");
});

router.post("/", function (req, res) {
  exec("ls -al", (err, stdout, stderr) => {
    if (err) {
      console.error(`error: ${error.message}`);
      return;
    }
  
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    res.send(`stdout:\n${stdout}`);
  });
});

module.exports = router;
