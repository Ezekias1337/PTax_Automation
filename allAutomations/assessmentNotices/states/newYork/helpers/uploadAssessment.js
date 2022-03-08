const chooseFileToUpload = require("../../../../../functions/pTaxSpecific/uploadDocumentToPTAX/chooseFileToUpload");
const enterTitle = require("../../../../../functions/pTaxSpecific/uploadDocumentToPTAX/enterTitle");
const reserveNewDocument = require("../../../../../functions/pTaxSpecific/uploadDocumentToPTAX/reserveNewDocument");
const selectDocType = require("../../../../../functions/pTaxSpecific/uploadDocumentToPTAX/selectDocType");
const clickSaveDocumentToPTAXButton = require("../../../../../functions/pTaxSpecific/uploadDocumentToPTAX/clickSaveDocumentToPTAXButton");
const goToUploadDocumentPage = require("../../../../../functions/pTaxSpecific/uploadDocumentToPTAX/goToUploadDocumentPage");
const selectAssessmentDropdown = require("../../../../../functions/pTaxSpecific/uploadDocumentToPTAX/selectAssessmentDropdown");
const enterYear = require("../../../../../functions/pTaxSpecific/uploadDocumentToPTAX/enterYear");

const uploadAssessment = async (
  driver,
  fileNameForFile,
  year,
  assessmentYearEnd,
  outputDirectory
) => {
  await goToUploadDocumentPage(driver);
  await reserveNewDocument(driver);
  await chooseFileToUpload(driver, fileNameForFile, outputDirectory);
  await driver.sleep(1000);
  await enterYear(driver, year);
  await driver.sleep(1000);
  await selectAssessmentDropdown(driver, assessmentYearEnd);
  await driver.sleep(1000);
  await selectDocType(driver, "Assessment Notice");
  await driver.sleep(1000);
  await enterTitle(driver, "Online Annual");
  await driver.sleep(1000);
  await clickSaveDocumentToPTAXButton(driver);
};

module.exports = uploadAssessment;
