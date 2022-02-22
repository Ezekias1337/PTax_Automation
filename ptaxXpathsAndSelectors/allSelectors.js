const addNewAssessmentSelector = require("./individual/addNewAssessmentSelector");
const checkBoxSelector = require("./individual/checkBoxSelector");
const editDetailsSelector = require("./individual/editDetailsSelector");
const {
  userNameSelector,
  passWordSelector,
} = require("./individual/loginPageSelectors");
const newScannedDocSelector = require("./individual/newScannedDocSelector");
const paymentsTransmittalCreatorSelector = require("./individual/paymentsTransmittalCreatorSelector");
const searchByAddressSelector = require("./individual/searchByAddressSelector");
const searchByLocationSelector = require("./individual/searchByLocationSelector");
const searchByParcelNumberSelector = require("./individual/searchByParcelNumberSelector");
const searchByParcelOwnerSelector = require("./individual/searchByParcelOwnerSelector");

const allSelectors = {
  addNewAssessmentSelector,
  checkBoxSelector,
  editDetailsSelector,
  userNameSelector,
  passWordSelector,
  newScannedDocSelector,
  paymentsTransmittalCreatorSelector,
  searchByAddressSelector,
  searchByLocationSelector,
  searchByParcelNumberSelector,
  searchByParcelOwnerSelector,
};

module.exports = allSelectors;
