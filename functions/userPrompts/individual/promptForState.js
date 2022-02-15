const prompt = require("prompt-sync")();

const promptForState = async () => {
  const selectedAutomationInput = prompt(
    "Enter a number to select a state: "
  );
  return selectedAutomationInput;
};

module.exports = promptForState;
