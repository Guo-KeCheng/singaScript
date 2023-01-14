const fs = require("fs/promises");

async function addParamsToTop(filename, value, params) {
  let res = "";
  const declarationStatements = generateDeclarationStatements(params);
  declarationStatements.forEach((statement) => {
    res = res.concat(statement);
  });
  res = res.concat(value);
  return fs.writeFile(filename, res);
}

const generateDeclarationStatements = (params) => {
  const declarationStatements = [];
  for (const param in params) {
    const declarationStatement = `chope ${params[param]} ${param}\n`;
    declarationStatements.push(declarationStatement);
  }

  return declarationStatements;
};

const checkExceptionOccur = (output) => {
  return output.charAt(0) !== "[";
};

exports.addParamsToTop = addParamsToTop;
exports.checkExceptionOccur = checkExceptionOccur;
