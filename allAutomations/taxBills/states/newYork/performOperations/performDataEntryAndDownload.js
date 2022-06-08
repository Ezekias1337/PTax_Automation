//  Main Imports

const colors = require("colors");
const { until, By } = require("selenium-webdriver");
const buildDriver = require("../../../../../functions/driver/buildDriver");
const verifySpreadSheetColumnNames = require("../../../../../functions/fileOperations/verifySpreadSheetColumnNames");
const handleColumnNameLogging = require("../../../../../functions/fileOperations/handleColumnNameLogging");
const readSpreadsheetFile = require("../../../../../functions/fileOperations/readSpreadsheetFile");
const logErrorMessageCatch = require("../../../../../functions/general/consoleLogErrors/logErrorMessageCatch");
const printAutomationReportToSheet = require("../../../../../functions/fileOperations/printAutomationReportToSheet");
const awaitElementLocatedAndReturn = require("../../../../../functions/general/awaitElementLocatedAndReturn");
const closingAutomationSystem = require("../../../../../functions/general/closingAutomationSystem");
const generateDynamicXPath = require("../../../../../functions/general/generateDynamicXPath");
const deleteInputFieldContents = require("../../../../../functions/general/deleteInputFieldContents");
const promptForInstallment = require("../../../../../functions/userPrompts/individual/promptForInstallment");
const promptLogin = require("../../../../../functions/userPrompts/individual/promptLogin");
const promptOutputDirectory = require("../../../../../functions/userPrompts/individual/promptOutputDirectory");
const loginToPTAX = require("../../../../../functions/pTaxSpecific/login/loginToPTAX");
const saveLinkToFile = require("../../../../../functions/fileOperations/saveLinkToFile");
const trimLeadingZeros = require("../../../../../functions/general/trimLeadingZeros");
const swapToIFrameDefaultContent = require("../../../../../functions/pTaxSpecific/frameSwaps/swapToIFrameDefaultContent");
const swapToIFrame0 = require("../../../../../functions/pTaxSpecific/frameSwaps/swapToIFrame0");
const swapToIFrame1 = require("../../../../../functions/pTaxSpecific/frameSwaps/swapToIFrame1");
const clickCheckMyPropertiesCheckBox = require("../../../../../functions/pTaxSpecific/clickCheckMyPropertiesCheckBox/clickCheckMyPropertiesCheckBox");
const openNewTab = require("../../../../../functions/tabSwapsAndHandling/openNewTab");
const switchToPTaxTab = require("../../../../../functions/tabSwapsAndHandling/switchToPTaxTab");
const switchToTaxWebsiteTab = require("../../../../../functions/tabSwapsAndHandling/switchToTaxWebsiteTab");
const { nyTaxBillSite } = require("../../../../../constants/urls");
const {
  downloadTaxBillsColumns,
  dataEntryTaxBillsColumns
} = require("../../../../../dataValidation/spreadsheetColumns/allSpreadSheetColumns");
const consoleLogLine = require("../../../../../functions/general/consoleLogLine");

// Helpers
const checkForTaxBillTable = require("../helpers/checkForTaxBillTable");
const checkIfNoResultsOrMultipleResults = require("../helpers/checkIfNoResultsOrMultipleResults");
const checkIfSessionExpired = require("../helpers/checkIfSessionExpired");
const checkIfWebsiteUnderMaintenance = require("../helpers/checkIfWebsiteUnderMaintenance");
const bblSearch = require("../helpers/bblSearch");
const fillOutLiability = require("../helpers/fillOutLiability");
const fillOutPayments = require("../helpers/fillOutPayments");

const performDataEntryAndDownload = async (
  state,
  sublocation,
  operation,
  taxWebsiteSelectors
) => {
  const arrayOfSuccessfulOperations = [];
  const arrayOfFailedOperations = [];

  console.log("This operation is not yet available");
  return;
};

module.exports = performDataEntryAndDownload;