const express = require("express");
const { exec } = require("child_process");
const Joi = require("joi");
const { nanoid } = require("nanoid");
const { createLahFile, deleteLahFile } = require("./fileutils");

const router = express.Router();
const reqSchema = Joi.object({ userInput: Joi.string().required() });

router.use(express.json());

router.get("/", function (req, res) {
  res.status(404).send("GET requests are not supported.");
});

router.post("/", function (req, res) {
  const { error, value } = reqSchema.validate(req.body);

  if (error) {
    res.status(404).send(error.details[0].message);
  }

  runCode(res, value.userInput);
});

function runCode(res, value) {
  const tmpFileName = nanoid();
  const lahFile = createLahFile(value, tmpFileName);

  lahFile
    .then(() =>
      exec(
        // unfortunately no promise based yet
        `python3 ../singaScript_interpreter/shell.py ${tmpFileName}`,
        (err, stdout, stderr) => {
          if (err) {
            console.error(`error: ${err.message}`);
            return;
          }

          if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
          }

          const returnResult = { results: stdout };

          deleteLahFile(tmpFileName);

          res.json(returnResult);
        }
      )
    )
    .catch((error) => console.log(error));
}

module.exports = router;
