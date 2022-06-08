const { until, By } = require("selenium-webdriver");
const awaitElementLocatedAndReturn = require("../../../../../functions/general/awaitElementLocatedAndReturn");

const pullTaxBillStrings = async (
  driver,
  taxWebsiteSelectors,
  installmentNumber
) => {
  const sideMenuTabElement = await awaitElementLocatedAndReturn(
    driver,
    taxWebsiteSelectors.accountBalanceTab,
    "xpath"
  );

  await sideMenuTabElement.click();
  await driver.wait(until.urlContains("account_balance"));

  const tableWithTaxBillData = await awaitElementLocatedAndReturn(
    driver,
    taxWebsiteSelectors.taxBillInformation,
    "id"
  );

  const assessmentTableArrayOfRows = await tableWithTaxBillData.findElements(
    By.css("tr")
  );
  let rowWithInstallmentInformation;
  switch (installmentNumber) {
    case "1":
      rowWithInstallmentInformation = assessmentTableArrayOfRows[1];
      break;
    default:
      console.log(
        "Need to update pullTaxBillStrings.js to accomodate past first installment"
      );
      break;
  }

  const installmentRowTDs = await rowWithInstallmentInformation.findElements(
    By.css("td")
  );
  const tdWithTotal = installmentRowTDs[9];
  const installmentTotalTD = await tdWithTotal.getAttribute("innerText")
  const installmentTotalString = installmentTotalTD.replace(/,/g, "");
  const installmentTotalInt = parseFloat(installmentTotalString);
  
  return [installmentTotalString, installmentTotalInt];
};

module.exports = pullTaxBillStrings;
