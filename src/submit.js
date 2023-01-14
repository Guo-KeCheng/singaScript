const express = require("express");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const Joi = require("joi");
const { nanoid } = require("nanoid");
const { deleteLahFile } = require("./fileutils");
const { addParamsToTop, checkExceptionOccur } = require("./submitutil");

const router = express.Router();

const parametersSchema = Joi.object();
const testCaseSchema = Joi.object({
  id: Joi.number(),
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

  const submitCodePromises = [];
  testCases.forEach((testCase) => {
    submitCodePromises.push(
      submitCode(
        res,
        userInput,
        testCase.parameters,
        value.challengeIndex,
        testCase.id
      )
    );
  });

  Promise.all(submitCodePromises).then((values) => {
    console.log(values);
    res.json(values);
  });
});

async function submitCode(res, value, params, challengeIndex, testIndex) {
  const tmpFileName = nanoid();
  await addParamsToTop(tmpFileName, value, params);
  return exec(
    `python3 ./src/singaScript_interpreter/shell.py ${tmpFileName}`
  ).then((x) => {
    deleteLahFile(tmpFileName);
    const stdout = x.stdout;
    const exceptionOccurred = checkExceptionOccur(stdout);

    const output = exceptionOccurred ? null : JSON.parse(stdout);
    const exceptionMsg = exceptionOccurred ? stdout : null;

    const returnResult = {
      challengeIndex,
      testIndex,
      output,
      exceptionOccurred,
      exceptionMsg,
    };

    return returnResult;
  });
}

module.exports = router;
