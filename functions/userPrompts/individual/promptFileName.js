const fs = require("fs");
const prompt = require("prompt-sync")();
const consoleLogLine = require("../../general/consoleLogLine");

const promptFileName = async (uploadDirectory) => {
  consoleLogLine();
  const arrayOfFiles = fs.readdirSync(uploadDirectory);
  const arrayOfFilesWithIndex = [];

  for (const [index, item] of arrayOfFiles.entries()) {
    const arrayChunkToPush = [index + 1, item];
    console.log(arrayChunkToPush);

    arrayOfFilesWithIndex.push(arrayChunkToPush);
  }
  consoleLogLine();

  const keyToFindFileName = prompt(
    "Enter the number corresponding to the file you wish to use: "
  );
  const fileNamePreParse = arrayOfFilesWithIndex.find(
    (arrayChunk) => arrayChunk[0].toString() === keyToFindFileName
  );
  const fileName = fileNamePreParse[1];

  return fileName;
};

module.exports = promptFileName;
