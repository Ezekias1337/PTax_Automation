const prompt = require("prompt-sync")();

/* 
    NOTE: NEED TO SPECIFY THAT THIS WON'T WORK FOR DIRECTORIES THAT HAVE
    SPACES IN THEM
*/

const promptOutputDirectory = async () => {
  console.log("\n");
  const selectedOutputDirectory = prompt(
    "Enter the path to the location you would like to save the files in: "
  );
  return selectedOutputDirectory
};

module.exports = promptOutputDirectory;
