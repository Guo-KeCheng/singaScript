const fs = require("fs/promises");

const addParamsToTop = (filename, value, params) => {
  let res = "";
  const declarationStatements = generateDeclarationStatements(params);
  declarationStatements.forEach((statement) => {
    res = res.concat(statement);
  });
  res = res.concat(value);
  return fs.writeFile(filename, res);
};

const generateDeclarationStatements = (params) => {
  const declarationStatements = [];
  for (const param in params) {
    const declarationStatement = `chope ${params[param]} ${param}\n`;
    declarationStatements.push(declarationStatement);
  }

  return declarationStatements;
};

exports.addParamsToTop = addParamsToTop;
