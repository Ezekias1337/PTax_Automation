const assessmentNotices = require("../assessmentNotices/assessmentNotices");
const changeMailingAddress = require("../changeMailingAddress/changeMailingAddresses");
const checkRequests = require("../checkRequests/checkRequests");
const checkAssessorURLs = require("../checkURLs/checkAssessorURLs");
const checkCollectorURLs = require("../checkURLs/checkCollectorURLs");
const paymentConfirmations = require("../paymentConfirmations/paymentConfirmations");
const propertyPointOfContact = require("../propertyPointOfContact/propertyPointOfContact");
const pullParcelInformationFromRealquest = require("../pullParcelInformationFromRealquest/pullParcelInformationFromRealquest");
const taxBills = require("../taxBills/taxBills");
const addNewParcels = require("../addNewParcels/addNewParcels");

const listOfAutomations = {
  assessmentNotices: {
    key: 1,
    name: "Assessment Notices",
    locations: [
      {
        key: 1,
        state: "Nevada",
        subLocations: [
          { key: 1, name: "Clark County", function: assessmentNotices },
        ],
      },
      {
        key: 2,
        state: "New York",
        subLocations: [
          { key: 1, name: "New York", function: assessmentNotices },
        ],
      },
    ],
  },
  changeMailingAddress: {
    key: 2,
    name: "Change Mailing Address",
    WIP: true
    /* locations: [{ key: 1, state: "", subLocations: [] }], */
  },
  checkRequests: {
    key: 3,
    name: "Check Requests",
    WIP: true
  },
  paymentConfirmations: {
    key: 4,
    name: "Payment Confirmations",
    locations: [
      {
        key: 1,
        state: "California",
        subLocations: [
          { key: 1, name: "Los Angeles", function: paymentConfirmations },
          { key: 2, name: "Orange County", function: paymentConfirmations },
          { key: 3, name: "Riverside County", function: paymentConfirmations },
          { key: 4, name: "San Bernardino", function: paymentConfirmations },
          { key: 5, name: "San Diego", function: paymentConfirmations },
          { key: 4, name: "Ventura County", function: paymentConfirmations },
        ],
      },
      {
        key: 2,
        state: "Pennsylvania",
        subLocations: [
          { key: 1, name: "Multnomah County", function: paymentConfirmations },
        ],
      },
    ],
  },
  propertyPointOfContact: {
    key: 5,
    name: "Property Point of Contact",
    WIP: true
  },
  taxBills: {
    key: 6,
    name: "Property Tax Bills",
    locations: [
      {
        key: 1,
        state: "California",
        subLocations: [
          { key: 1, name: "Los Angeles [No Data Entry]", function: taxBills },
        ],
      },
      {
        key: 2,
        state: "New York",
        subLocations: [{ key: 1, name: "New York", function: taxBills }],
      },
      {
        key: 3,
        state: "Illinois",
        subLocations: [{ key: 1, name: "Cook County", function: taxBills }],
      },
    ],
  },
  addNewParcels: {
    key: 7,
    name: "Add New Parcels",
    function: addNewParcels
  },
  updateParcelNames: {
    key: 8,
    name: "Update Parcel Names",
    WIP: true
  },
  checkAssessorWebsiteURLs: {
    key: 9,
    name: "Check all the links for Assessors",
    WIP: true
  },
  checkTaxCollectorWebsiteURLs: {
    key: 10,
    name: "Check all the links for Tax Collectors",
    WIP: true
  },
  pullParcelInformationFromRealquest: {
    key: 11,
    name: "Pull parcel information from Realquest",
    WIP: true
  },
};

module.exports = listOfAutomations;
