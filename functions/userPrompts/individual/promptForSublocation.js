const prompt = require("prompt-sync")();

const promptForSublocation = async () => {
  const selectedSublocation = prompt(
    "Enter a number to select a sublocation: "
  );
  return selectedSublocation;
};

module.exports = promptForSublocation;
