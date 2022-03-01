const colors = require("colors");
const { until, By } = require("selenium-webdriver");
const buildDriver = require("../../../../functions/driver/buildDriver");
const verifySpreadSheetColumnNames = require("../../../../functions/fileOperations/verifySpreadSheetColumnNames");
const handleColumnNameLogging = require("../../../../functions/fileOperations/handleColumnNameLogging");
const readSpreadsheetFile = require("../../../../functions/fileOperations/readSpreadsheetFile");
const logErrorMessageCatch = require("../../../../functions/general/consoleLogErrors/logErrorMessageCatch");
const printAutomationReportToSheet = require("../../../../functions/fileOperations/printAutomationReportToSheet");
const awaitElementLocatedAndReturn = require("../../../../functions/general/awaitElementLocatedAndReturn");
const closingAutomationSystem = require("../../../../functions/general/closingAutomationSystem");
const generateDynamicXPath = require("../../../../functions/general/generateDynamicXPath");
const deleteInputFieldContents = require("../../../../functions/general/deleteInputFieldContents");
const promptForInstallment = require("../../../../functions/userPrompts/individual/promptForInstallment");
const promptOutputDirectory = require("../../../../functions/userPrompts/individual/promptOutputDirectory");
const saveLinkToFile = require("../../../../functions/fileOperations/saveLinkToFile");
const trimLeadingZeros = require("../../../../functions/general/trimLeadingZeros");
const generateDelayNumber = require("../../../../functions/general/generateDelayNumber");
const { nyTaxBillSite } = require("../../../../constants/urls");
const {
  downloadTaxBillsColumns,
} = require("../../../../dataValidation/spreadsheetColumns/allSpreadSheetColumns");
const consoleLogLine = require("../../../../functions/general/consoleLogLine");
const { elementLocated } = require("selenium-webdriver/lib/until");

const taxWebsiteSelectors = {
  agreeBtn: "btAgree",
  burough1:
    "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[2]",
  burough2:
    "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[3]",
  burough3:
    "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[4]",
  burough4:
    "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[5]",
  burough5:
    "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[6]",
  blockInputField: "inpTag",
  lotInputField: "inpStat",
  searchButton: "btSearch",
  noParcelResultsFoundWarner:
    "//p[contains(text(), 'Your search did not find any records.')]",
  websiteMaintenanceWarner: `//b[contains(text(), 'We are currently conducting maintenance')]`,
  sideMenuTab: "sidemenu",
  propertyTaxBillsTab: `//span[contains(text(), 'Property Tax Bills')]`,
  taxBillTable: "datalet_div_1",
};
const arrayOfSuccessfulOperations = [];
const arrayOfFailedOperations = [];

const checkForTaxBillTable = async (driver) => {
  let continueExecution = false;

  try {
    const taxBillTableElement = await driver.wait(
      until.elementLocated(By.id(taxWebsiteSelectors.taxBillTable)),
      10000
    );

    continueExecution = true;
  } catch (error) {}

  return continueExecution;
};

const checkIfWebsiteUnderMaintenance = async (driver) => {
  try {
    await driver.findElement(
      By.xpath(taxWebsiteSelectors.websiteMaintenanceWarner)
    );
    console.log("Website is under maintenance, unable to proceed.");
    await closingAutomationSystem();
    return true;
  } catch (error) {
    console.log("Website not under maintance. Continuing.");
    return false;
  }
};

const checkIfNoResultsOrMultipleResults = async (driver, item) => {
  const checkURL = await driver.getCurrentUrl();

  if (checkURL.includes("search/CommonSearch.aspx?mode=PERSPROP")) {
    try {
      await driver.sleep(1000);
      const noResultsFoundElement = await driver.findElement(
        By.xpath(taxWebsiteSelectors.noParcelResultsFoundWarner)
      );

      arrayOfFailedOperations.push(item);

      const blockInputToDelete = await awaitElementLocatedAndReturn(
        driver,
        taxWebsiteSelectors.blockInputField,
        "id"
      );
      await deleteInputFieldContents(blockInputToDelete);

      const lotInputToDelete = await awaitElementLocatedAndReturn(
        driver,
        taxWebsiteSelectors.lotInputField,
        "id"
      );
      await deleteInputFieldContents(lotInputToDelete);

      console.log(
        colors.red.bold(`Parcel: ${item.ParcelNumber} not found in database`)
      );

      return true;
    } catch (error) {
      await driver.sleep(2000);
      const strSplit = item.ParcelNumber.split("-");

      const strToFindTD = strSplit[1];
      const noParcelResultsXPath = generateDynamicXPath(
        "div",
        strToFindTD,
        "contains"
      );
      const tdToClickBringToInformation = await awaitElementLocatedAndReturn(
        driver,
        noParcelResultsXPath,
        "xpath"
      );

      await tdToClickBringToInformation.click();
      await driver.wait(until.urlContains("/care/Datalets/Datalet.aspx"));
      console.log(
        `Parcel: ${item.ParcelNumber} has multiple results in database \n`
      );
      return false;
    }
  }
};

const performDataEntry = async (state, sublocation, operation) => {
  console.log("This operation is not yet available");
  return;
};
const performDownload = async (state, sublocation, operation) => {
  try {
    console.log(`Running download Tax Bill automation: `);

    const dataFromSpreadsheet = await readSpreadsheetFile();
    const outputDirectory = await promptOutputDirectory();
    const installmentNumber = await promptForInstallment();
    const [areCorrectSheetColumnsPresent, arrayOfMissingColumnNames] =
      verifySpreadSheetColumnNames(
        downloadTaxBillsColumns,
        dataFromSpreadsheet[0]
      );

    await handleColumnNameLogging(
      areCorrectSheetColumnsPresent,
      arrayOfMissingColumnNames
    );
    if (areCorrectSheetColumnsPresent === false) {
      return;
    }

    const driver = await buildDriver();
    await driver.get(nyTaxBillSite);
    const maintenanceStatus = await checkIfWebsiteUnderMaintenance(driver);
    if (maintenanceStatus === true) {
      throw "Website Under Maintenance";
    }

    const agreeBtnElement = await awaitElementLocatedAndReturn(
      driver,
      taxWebsiteSelectors.agreeBtn,
      "id"
    );
    await agreeBtnElement.click();

    for (const item of dataFromSpreadsheet) {
      try {
        console.log(
          colors.magenta.bold(`Working on parcel: ${item.ParcelNumber}`)
        );

        /* 
          Some parcels have leading zeros in the block/lot numbers which cause them
          to not be pulled up on the database. This remedies that.
        */
        const boroughNumber = item.ParcelNumber.split("-")[0];
        const blockNumberPreZerotrim = item.ParcelNumber.split("-")[1];
        const blockNumber = trimLeadingZeros(blockNumberPreZerotrim);
        const lotNumberPreZerotrim = item.ParcelNumber.split("-")[2];
        const lotNumber = trimLeadingZeros(lotNumberPreZerotrim);

        if (boroughNumber === "1") {
          const burough1Element = await awaitElementLocatedAndReturn(
            driver,
            taxWebsiteSelectors.burough1,
            "xpath"
          );
          await burough1Element.click();
        } else if (boroughNumber === "2") {
          const burough2Element = await awaitElementLocatedAndReturn(
            driver,
            taxWebsiteSelectors.burough2,
            "xpath"
          );
          await burough2Element.click();
        } else if (boroughNumber === "3") {
          const burough3Element = await awaitElementLocatedAndReturn(
            driver,
            taxWebsiteSelectors.burough3,
            "xpath"
          );
          await burough3Element.click();
        } else if (boroughNumber === "4") {
          const burough4Element = await awaitElementLocatedAndReturn(
            driver,
            taxWebsiteSelectors.burough4,
            "xpath"
          );
          await burough4Element.click();
        } else if (boroughNumber === "5") {
          const burough5Element = await awaitElementLocatedAndReturn(
            driver,
            taxWebsiteSelectors.burough5,
            "xpath"
          );
          await burough5Element.click();
        }

        const blockInputFieldElement = await awaitElementLocatedAndReturn(
          driver,
          taxWebsiteSelectors.blockInputField,
          "id"
        );
        await blockInputFieldElement.sendKeys(blockNumber);

        const lotInputFieldElement = await awaitElementLocatedAndReturn(
          driver,
          taxWebsiteSelectors.lotInputField,
          "id"
        );
        await lotInputFieldElement.sendKeys(lotNumber);

        const taxWebsiteSearchBtn = await awaitElementLocatedAndReturn(
          driver,
          taxWebsiteSelectors.searchButton,
          "id"
        );

        await taxWebsiteSearchBtn.click();
        const resultsNotPresent = await checkIfNoResultsOrMultipleResults(
          driver,
          item
        );
        if (resultsNotPresent === true) {
          continue;
        }

        // Get side menu so it can be used to safely get Tab Bill tab
        const sideMenuTabElement = await awaitElementLocatedAndReturn(
          driver,
          taxWebsiteSelectors.sideMenuTab,
          "id"
        );
        const propertyTaxBillsTab = await sideMenuTabElement.findElement(
          By.xpath(taxWebsiteSelectors.propertyTaxBillsTab)
        );
        await propertyTaxBillsTab.click();
        await driver.wait(until.urlContains("soa_docs"));

        /* 
          Before trying to download, need to check for the table element which contains the
          links to ensure the script doesn't get stuck
        */

        const continueExecution = await checkForTaxBillTable(driver);

        if (continueExecution === false) {
          await driver.navigate().back();
          await driver.navigate().back();
          console.log(
            colors.red.bold(
              `Failed for parcel: ${item.ParcelNumber} Parcel found, but no tax bill in database`
            )
          );
          consoleLogLine();
          arrayOfFailedOperations.push(item);
          continue;
        }

        /* 
          Because of the way the DOM is structured, it's necessary to parse out the correct
          anchor tag this way 
        */
        const downloadLinkChildXPath = generateDynamicXPath(
          "u",
          `Q${installmentNumber}: `,
          "contains"
        );
        const downloadLinkChild = await driver.findElement(
          By.xpath(downloadLinkChildXPath)
        );
        const downloadLink = await downloadLinkChild.findElement(
          By.xpath("./../..")
        );
        const fileNameForFile = `${item.CompanyName} ${item.EntityName} ${item.ParcelNumber}`;
        try {
          await saveLinkToFile(
            downloadLink,
            outputDirectory,
            fileNameForFile,
            "pdf"
          );
        } catch (error) {
          console.log(
            colors.red.bold(`Failed for parcel: ${item.ParcelNumber}`)
          );
          consoleLogLine();
          arrayOfFailedOperations.push(item);
        }

        //Sleep to give time to download file
        /* const amountToSleep = generateDelayNumber();
        await driver.sleep(amountToSleep); */
        await driver.sleep(5000);

        await driver.navigate().back();
        await driver.navigate().back();

        arrayOfSuccessfulOperations.push(item);
        console.log(
          colors.green.bold(`Succeeded for parcel: ${item.ParcelNumber}`)
        );
        consoleLogLine();
      } catch (error) {
        console.log(colors.red.bold(`Failed for parcel: ${item.ParcelNumber}`));
        consoleLogLine();
        arrayOfFailedOperations.push(item);
      }
    }

    await printAutomationReportToSheet(
      arrayOfSuccessfulOperations,
      arrayOfFailedOperations,
      "./output/"
    );

    console.log(
      colors.blue.bold(
        `Reports have been generated for parcels that were added successful and unsuccessfuly, located in the output folder. Please check the 'Failed Operations' tab to verify if any results need manual review.`
      ),
      "\n"
    );
    await closingAutomationSystem();
  } catch (error) {
    logErrorMessageCatch(error);
  }
};
const performDataEntryAndDownload = async (state, sublocation, operation) => {
  console.log("This operation is not yet available");
  return;
};

const newYorkTaxBills = async (state, sublocation, operation) => {
  /* 
        Need to pick automation by using sublocation
    */

  console.log(
    colors.bold.red(
      "Warning: ensure the data in the Parcel Number column all follow the convention: "
    ),
    "\n",
    "Burough-Block-Lot",
    "\n",
    "Example: 1-482-1302"
  );

  switch (operation) {
    case "Data Entry":
      await performDataEntry(state, sublocation, operation);
      return;
    case "Download Files":
      await performDownload(state, sublocation, operation);
      break;
    case "Data Entry And Download Files":
      await performDataEntryAndDownload(state, sublocation, operation);
      return;
    default:
      console.log("No operation found, check spelling of operation");
      return;
  }
};

module.exports = newYorkTaxBills;
