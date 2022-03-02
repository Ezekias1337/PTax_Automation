const fs = require("fs");
const request = require("request");

const saveLinkToFile = async (
  anchorTag,
  outputDirectory,
  fileName,
  fileExtension
) => {
  const anchorTagToDownloadHREF = await anchorTag.getAttribute("href");
  let downloadSucceeded = false;
  const fileNameSpecialCharactersRemoved = fileName.replace("*", "");

  try {
    await request
      .get(anchorTagToDownloadHREF)
      .pipe(
        fs.createWriteStream(
          `${outputDirectory}${fileNameSpecialCharactersRemoved}.${fileExtension}`
        )
      );
    downloadSucceeded = true;
  } catch (error) {
    console.log("Error in individual file", error);
  }

  return downloadSucceeded;
};

module.exports = saveLinkToFile;
