const listOfAutomations = {
  assessmentNotices: {
    key: 1,
    name: "Assessment Notices",
    locations: [
      {
        key: 1,
        state: "Nevada",
        subLocations: [{ key: 1, name: "Clark County" }],
      },
      {
        key: 2,
        state: "New York",
        subLocations: [{ key: 1, name: "New York" }],
      },
    ],
  },
  changeMailingAddress: {
    key: 2,
    name: "Change Mailing Address",
    locations: [{ key: 1, state: "", subLocations: [] }],
  },
  checkRequests: {
    key: 3,
    name: "Check Requests",
  },
  paymentConfirmations: {
    key: 4,
    name: "Payment Confirmations",
    locations: [
      {
        key: 1,
        state: "California",
        subLocations: [
          { key: 1, name: "Los Angeles" },
          { key: 2, name: "Orange County" },
          { key: 3, name: "Riverside County" },
          { key: 4, name: "San Bernardino" },
          { key: 5, name: "San Diego" },
          { key: 4, name: "Ventura County" },
        ],
      },
      {
        key: 2,
        state: "Pennsylvania",
        subLocations: [{ key: 1, name: "Multnomah County" }],
      },
    ],
  },
  propertyPointOfContact: {
    key: 5,
    name: "Property Point of Contact",
  },
  taxBills: {
    key: 6,
    name: "Property Tax Bills",
    locations: [
      {
        key: 1,
        state: "California",
        subLocations: [{ key: 1, name: "Los Angeles [No Data Entry]" }],
      },
      {
        key: 2,
        state: "New York",
        subLocations: [{ key: 1, name: "New York" }],
      },
      {
        key: 3,
        state: "Illinois",
        subLocations: [{ key: 1, name: "Cook County" }],
      },
    ],
  },
  updateParcelNames: {
    key: 7,
    name: "Update Parcel Names",
  },
  checkAssessorWebsiteURLs: {
    key: 8,
    name: "Check all the links for Assessors",
  },
  checkTaxCollectorWebsiteURLs: {
    key: 9,
    name: "Check all the links for Tax Collectors",
  },
};

module.exports = listOfAutomations;
