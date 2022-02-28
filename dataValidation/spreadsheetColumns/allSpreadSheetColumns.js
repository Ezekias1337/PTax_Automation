const addNewParcelsColumns = require("./individual/addNewParcelsColumns");
const downloadTaxBillsColumns = require("./individual/downloadTaxBillsColumns");

const allSpreadSheetColumns = {
  addNewParcelsColumns: addNewParcelsColumns,
  downloadTaxBillsColumns: downloadTaxBillsColumns,
};

module.exports = allSpreadSheetColumns;
