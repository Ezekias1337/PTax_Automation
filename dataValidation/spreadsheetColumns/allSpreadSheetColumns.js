const addNewParcelsColumns = require("./individual/addNewParcelsColumns");
const downloadTaxBillsColumns = require("./individual/downloadTaxBillsColumns");
const checkWebsiteURLsColumns = require("./individual/checkWebsiteURLsColumns");
const downloadAndDataEntryAssessmentNoticesColumns = require("./individual/downloadAndDataEntryAssessmentNoticesColumns");


const allSpreadSheetColumns = {
  addNewParcelsColumns: addNewParcelsColumns,
  downloadTaxBillsColumns: downloadTaxBillsColumns,
  checkWebsiteURLsColumns: checkWebsiteURLsColumns,
  downloadAndDataEntryAssessmentNoticesColumns: downloadAndDataEntryAssessmentNoticesColumns
};

module.exports = allSpreadSheetColumns;
