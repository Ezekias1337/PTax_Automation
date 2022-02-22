const colors = require("colors");
const prompt = require("prompt-sync")();
const filePathIncludesSpaces = require("../../general/consoleLogErrors/filePathIncludesSpaces");
const filePathDoesntContainSlashes = require("../../general/consoleLogErrors/filePathDoesntContainSlashes");
const filePathIsRelative = require("../../general/consoleLogErrors/filePathIsRelative");

/* 
    NOTE: NEED TO SPECIFY THAT THIS WON'T WORK FOR DIRECTORIES THAT HAVE
    SPACES IN THEM
*/

const promptUploadOrScanDirectory = async () => {
  console.log("\n");
  console.log(
    colors.yellow.bold("This automation requires uploading or scanning files.")
  );
  console.log("\n");
  console.log(
    colors.red.bold("Beware, this will not work if the filepath has spaces!")
  );
  console.log("\n");
  const selectedUploadDirectory = prompt(
    "Enter the filepath to the location of the file(s) to upload or scan: "
  );

  if (selectedUploadDirectory.includes(" ")) {
    filePathIncludesSpaces();
  }
  if (
    selectedUploadDirectory.includes("./") ||
    selectedUploadDirectory.includes("../")
  ) {
    filePathIsRelative();
  }

  if (!(selectedUploadDirectory.includes("/") || selectedUploadDirectory.includes("\\"))) {
    filePathDoesntContainSlashes();
  }
  return selectedUploadDirectory;
};

module.exports = promptUploadOrScanDirectory;
