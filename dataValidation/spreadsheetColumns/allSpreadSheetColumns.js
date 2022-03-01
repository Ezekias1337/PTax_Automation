const addNewParcelsColumns = require("./individual/addNewParcelsColumns");
const downloadTaxBillsColumns = require("./individual/downloadTaxBillsColumns");
const checkWebsiteURLsColumns = require("./individual/checkWebsiteURLsColumns");

const allSpreadSheetColumns = {
  addNewParcelsColumns: addNewParcelsColumns,
  downloadTaxBillsColumns: downloadTaxBillsColumns,
  checkWebsiteURLsColumns: checkWebsiteURLsColumns
};

module.exports = allSpreadSheetColumns;
