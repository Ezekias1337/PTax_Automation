const assessmentNotices = require("../assessmentNotices/assessmentNotices");
const changeMailingAddress = require("../changeMailingAddress/changeMailingAddresses");
const checkRequests = require("../checkRequests/checkRequests");
const checkWebsiteURLs = require("../checkURLs/checkWebsiteURLs");
const paymentConfirmations = require("../paymentConfirmations/paymentConfirmations");
const propertyPointOfContact = require("../propertyPointOfContact/propertyPointOfContact");
const pullParcelInformationFromRealquest = require("../pullParcelInformationFromRealquest/pullParcelInformationFromRealquest");
const taxBills = require("../taxBills/taxBills");
const addNewParcels = require("../addNewParcels/addNewParcels");
const updateParcelNames = require("../updateParcelNames/updateParcelNames");

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
      {
        key: 3,
        state: "California",
        subLocations: [
          { key: 1, name: "Kern", function: assessmentNotices },
          { key: 2, name: "Los Angeles", function: assessmentNotices },
          { key: 3, name: "Riverside", function: assessmentNotices },
          { key: 4, name: "San Bernardino", function: assessmentNotices },
          { key: 5, name: "San Diego", function: assessmentNotices },
        ],
      },
    ],
    operations: [
      { key: 1, name: "Data Entry" },
      { key: 2, name: "Download Files" },
      { key: 3, name: "Data Entry And Download Files" },
    ],
  },
  changeMailingAddress: {
    key: 2,
    name: "Change Mailing Address",
    WIP: true,
    /* locations: [{ key: 1, state: "", subLocations: [] }], */
  },
  checkRequests: {
    key: 3,
    name: "Check Requests",
    WIP: true,
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
    WIP: true,
  },
  taxBills: {
    key: 6,
    name: "Property Tax Bills",
    locations: [
      {
        key: 1,
        state: "California",
        subLocations: [
          { key: 1, name: "Los Angeles", function: taxBills },
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
    operations: [
      { key: 1, name: "Data Entry" },
      { key: 2, name: "Download Files" },
      { key: 3, name: "Data Entry And Download Files" },
    ],
  },
  addNewParcels: {
    key: 7,
    name: "Add New Parcels",
    function: addNewParcels,
  },
  updateParcelNames: {
    key: 8,
    name: "Update Parcel Names",
    function: updateParcelNames,
  },
  checkWebsiteURLs: {
    key: 9,
    name: "Check all the links for Assessors/Collectors",
    function: checkWebsiteURLs,
  },
  pullParcelInformationFromRealquest: {
    key: 10,
    name: "Pull parcel information from Realquest",
    WIP: true,
  },
};

module.exports = listOfAutomations;
