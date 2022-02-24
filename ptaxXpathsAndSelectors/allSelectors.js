const addNewAssessmentSelector = require("./individual/addNewAssessmentSelector");
const checkBoxSelector = require("./individual/checkBoxSelector");
const editDetailsSelector = require("./individual/editDetailsSelector");
const {
  userNameSelector,
  passWordSelector,
} = require("./individual/loginPageSelectors");
const searchByAddressSelector = require("./individual/searchByAddressSelector");
const searchByLocationSelector = require("./individual/searchByLocationSelector");
const searchByParcelNumberSelector = require("./individual/searchByParcelNumberSelector");
const searchByParcelOwnerSelector = require("./individual/searchByParcelOwnerSelector");
const navbarAppealsSelectors = require("./navbarDropdowns/navbarAppeals/navbarAppealsSelectors");
const navbarDocumentsSelectors = require("./navbarDropdowns/navbarDocuments/navbarDocumentsSelectors");
const navbarEditSelectors = require("./navbarDropdowns/navbarEdit/navbarEditSelectors");
const navbarFileSelectors = require("./navbarDropdowns/navbarFile/navbarFileSelectors");
const navbarHelpSelectors = require("./navbarDropdowns/navbarHelp/navbarHelpSelectors");
const navbarLinksSelectors = require("./navbarDropdowns/navbarLinks/navbarLinksSelectors");
const navbarPaymentsSelectors = require("./navbarDropdowns/navbarPayments/navbarPaymentsSelectors");
const navbarReportsSelectors = require("./navbarDropdowns/navbarReports/navbarReportsSelectors");
const navbarViewSelectors = require("./navbarDropdowns/navbarView/navbarViewSelectors");
const addNewParcelsSelectors = require("./addNewParcelsSelectors/addNewParcelsSelectors");

const allSelectors = {
  addNewAssessmentSelector,
  checkBoxSelector,
  editDetailsSelector,
  userNameSelector,
  passWordSelector,
  searchByAddressSelector,
  searchByLocationSelector,
  searchByParcelNumberSelector,
  searchByParcelOwnerSelector,
  navbarAppealsSelectors,
  navbarDocumentsSelectors,
  navbarEditSelectors,
  navbarFileSelectors,
  navbarHelpSelectors,
  navbarLinksSelectors,
  navbarPaymentsSelectors,
  navbarReportsSelectors,
  navbarViewSelectors,
  addNewParcelsSelectors,
};

module.exports = allSelectors;
