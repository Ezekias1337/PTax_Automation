const colors = require("colors");
const promptLogin = require("../../functions/userPrompts/individual/promptLogin");
const loginToPTAX = require("../../functions/pTaxSpecific/login/loginToPTAX");
const readSpreadsheetFile = require("../../functions/fileOperations/readSpreadsheetFile");
const closingAutomationSystem = require("../../functions/general/closingAutomationSystem");
const swapToIFrame0 = require("../../functions/pTaxSpecific/frameSwaps/swapToIFrame0");
const swapToIFrame1 = require("../../functions/pTaxSpecific/frameSwaps/swapToIFrame1");
const clickCheckMyPropertiesCheckBox = require("../../functions/pTaxSpecific/clickCheckMyPropertiesCheckBox/clickCheckMyPropertiesCheckBox");
const logErrorMessageCatch = require("../../functions/general/consoleLogErrors/logErrorMessageCatch");
const verifySpreadSheetColumnNames = require("../../functions/fileOperations/verifySpreadSheetColumnNames");
const handleColumnNameLogging = require("../../functions/fileOperations/handleColumnNameLogging");
const {
  addNewParcelsColumns,
} = require("../../dataValidation/spreadsheetColumns/allSpreadSheetColumns");

const addNewParcels = async () => {
  try {
    console.log(`Running add new parcel automation: `);

    const dataFromSpreadsheet = await readSpreadsheetFile();
    const [areCorrectSheetColumnsPresent, arrayOfMissingColumnNames] =
      verifySpreadSheetColumnNames(
        addNewParcelsColumns,
        dataFromSpreadsheet[0]
      );

    await handleColumnNameLogging(
      areCorrectSheetColumnsPresent,
      arrayOfMissingColumnNames
    );
    if (areCorrectSheetColumnsPresent === false) {
      return;
    }

    const { username, password } = await promptLogin();
    const [ptaxWindow, driver] = await loginToPTAX(username, password);

    /* These values will be null if the login failed, this will cause the execution
    to stop */

    if (ptaxWindow === null || driver === null) {
      return;
    }

    await swapToIFrame0(driver);
    await clickCheckMyPropertiesCheckBox(driver);
  } catch (error) {
    logErrorMessageCatch(error);
  }
};

addNewParcels();

module.exports = addNewParcels;
