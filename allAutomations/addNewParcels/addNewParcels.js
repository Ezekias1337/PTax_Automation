const colors = require("colors");
const promptLogin = require("../../functions/userPrompts/individual/promptLogin");
const loginToPTAX = require("../../functions/pTaxSpecific/login/loginToPTAX");
const readSpreadsheetFile = require("../../functions/fileOperations/readSpreadsheetFile");
const closingAutomationSystem = require("../../functions/general/closingAutomationSystem");
const swapToIFrame0 = require("../../functions/pTaxSpecific/frameSwaps/swapToIFrame0");
const swapToIFrame1 = require("../../functions/pTaxSpecific/frameSwaps/swapToIFrame1");
const clickCheckMyPropertiesCheckBox = require("../../functions/pTaxSpecific/clickCheckMyPropertiesCheckBox/clickCheckMyPropertiesCheckBox");

const addNewParcels = async () => {
  console.log(`Running add new parcel automation: `);
  const dataFromSpreadsheet = await readSpreadsheetFile();

  if (!dataFromSpreadsheet[0]?.Location) {
    console.log(
      colors.red.bold(
        "Warning: There must be a column named: 'Location' in your spreadsheet file for where you want the parcel added, otherwise it will not work."
      ),
      "\n"
    );
    await closingAutomationSystem();
    return;
  }

  const { username, password } = await promptLogin();
  const [ptaxWindow, driver] = await loginToPTAX(username, password);
  await swapToIFrame0(driver);
  await clickCheckMyPropertiesCheckBox(driver);
};

addNewParcels();

module.exports = addNewParcels;
