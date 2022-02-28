const fs = require("fs");
const request = require("request");

const saveLinkToFile = async (
  anchorTag,
  outputDirectory,
  fileName,
  fileExtension
) => {
  const anchorTagToDownloadHREF = await anchorTag.getAttribute("href");

  await request
    .get(anchorTagToDownloadHREF)
    .pipe(
      fs.createWriteStream(`${outputDirectory}/${fileName}.${fileExtension}`)
    );
};

module.exports = saveLinkToFile;
