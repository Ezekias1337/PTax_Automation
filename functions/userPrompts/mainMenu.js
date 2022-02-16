const colors = require('colors');
const findOptionByKey = require("./parsing/findOptionByKey");
const parseNestedObjectMainMenu = require("./parsing/parseNestedObjectMainMenu");
const parseObjectMainMenu = require("./parsing/parseObjectMainMenu");
const consoleLogLine = require("../general/consoleLogLine");
const promptSelectAnAutomation = require("./individual/promptSelectAnAutomation");
const promptForState = require("./individual/promptForState");
const promptForSublocation = require("./individual/promptForSublocation");
const listOfAutomations = require("../../allAutomations/listOfAutomations/listOfAutomations");

const mainMenu = async () => {
  /* 
    First select an automation that you want to perform
  */

  consoleLogLine();
  const objToArraySelectAutomation =
    parseNestedObjectMainMenu(listOfAutomations);
  const selectedAutomationInput = await promptSelectAnAutomation();
  consoleLogLine();

  const selectedAutomation = findOptionByKey(
    objToArraySelectAutomation,
    selectedAutomationInput
  );

  /* 
    If the automation has a state to select, prompt the user
  */

  if (selectedAutomation?.locations?.length > 0) {
    const objToArraySelectLocation = parseObjectMainMenu(
      selectedAutomation.locations,
      "state"
    );
    const selectedStateInput = await promptForState();
    consoleLogLine();

    const selectedState = findOptionByKey(
      objToArraySelectLocation,
      selectedStateInput
    );

    /* 
      If the state has a list of sublocations, prompt the user
    */

    if (selectedAutomation?.WIP === true) {
      console.log(
        "This automation has not yet been added, but is planned for the future."
      );
    } else if (selectedState?.subLocations?.length > 0) {
      const objToArraySelectSublocation = parseObjectMainMenu(
        selectedState.subLocations,
        "city"
      );
      const selectedSublocationInput = await promptForSublocation();
      consoleLogLine();

      const selectedSublocation = findOptionByKey(
        objToArraySelectSublocation,
        selectedSublocationInput
      );
      selectedSublocation.function(selectedSublocation.name);
    }
  }
};

mainMenu();

module.exports = mainMenu;
