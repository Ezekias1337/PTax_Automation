const prompt = require("prompt-sync")();

/* 
    NOTE: NEED TO SPECIFY THAT THIS WON'T WORK FOR DIRECTORIES THAT HAVE
    SPACES IN THEM
*/

const promptUploadDirectory = async () => {
  console.log("\n");
  console.log("This automation requires uploading files to PTax.")
  const selectedUploadDirectory = prompt(
    "Enter the path to the location of the files to upload: "
  );
  return selectedUploadDirectory;
};

module.exports = promptUploadDirectory;
