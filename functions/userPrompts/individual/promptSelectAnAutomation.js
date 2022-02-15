const prompt = require("prompt-sync")();

const promptSelectAnAutomation = async (driver) => {
  const selectedAutomationInput = prompt(
    "Enter a number to select an automation to run: "
  );
  return selectedAutomationInput;
};

module.exports = promptSelectAnAutomation;
