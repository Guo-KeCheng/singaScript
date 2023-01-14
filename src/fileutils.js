const fsSync = require("fs");
const fs = require("fs/promises");

const createLahFile = (value, filename) => {
  return fs.writeFile(filename, value);
};

const deleteLahFile = (filename) => {
  return fsSync.unlinkSync(filename);
};

exports.createLahFile = createLahFile;
exports.deleteLahFile = deleteLahFile;
