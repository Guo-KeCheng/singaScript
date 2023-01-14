const fs = require("fs/promises");

const createLahFile = (value, filename) => {
  return fs.writeFile(filename, value);
};

const deleteLahFile = (filename) => {
  return fs.unlink(filename);
};

exports.createLahFile = createLahFile;
exports.deleteLahFile = deleteLahFile;
