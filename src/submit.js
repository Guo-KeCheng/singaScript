const express = require("express");
const { exec } = require("child_process");
const Joi = require("joi");
const { nanoid } = require("nanoid");
const { deleteLahFile } = require("./fileutils");
const { addParamsToTop, checkExceptionOccur } = require("./submitutil");

const router = express.Router();

const parametersSchema = Joi.object();
const testCaseSchema = Joi.object({
  function: Joi.string(),
  expectedResult: Joi.alternatives()
    .try(Joi.string(), Joi.number(), Joi.boolean())
    .required(),
  parameters: parametersSchema,
});
const reqSchema = Joi.object({
  challengeIndex: Joi.number().required(),
  testCases: Joi.array().items(testCaseSchema),
  userInput: Joi.string(),
});

router.use(express.json());

router.get("/", function (req, res) {
  res.status(404).send("GET requests are not supported.");
});

router.post("/", function (req, res) {
  const { error, value } = reqSchema.validate(req.body);

  if (error) {
    res.status(500).send(error.details[0].message);
    return;
  }

  const submissionData = value;
  const testCases = submissionData.testCases;
  const userInput = submissionData.userInput;

  testCases.forEach((testCase) => {
    submitCode(res, userInput, testCase.parameters, value.challengeIndex);
  });
});

function submitCode(res, value, params, challengeIndex) {
  const tmpFileName = nanoid();
  const lahFile = addParamsToTop(tmpFileName, value, params);

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

          const exceptionOccurred = checkExceptionOccur(stdout);

          const output = exceptionOccurred ? null : stdout;
          const exceptionMsg = exceptionOccurred ? stdout : null;
          const returnResult = {
            challengeIndex,
            output,
            exceptionOccurred,
            exceptionMsg,
          };

          deleteLahFile(tmpFileName);

          res.json(returnResult);
        }
      )
    )
    .catch((error) => console.log(error));
}

module.exports = router;
