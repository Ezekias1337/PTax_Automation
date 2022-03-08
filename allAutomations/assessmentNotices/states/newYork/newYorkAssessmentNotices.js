const colors = require("colors");
const performDataEntry = require("./performOperations/performDataEntry");
const performDownload = require("./performOperations/performDownload");
const performDataEntryAndDownload = require("./performOperations/performDataEntryAndDownload");

const arrayOfSuccessfulOperations = [];
const arrayOfFailedOperations = [];

const newYorkAssessmentNotices = async (state, sublocation, operation) => {
  console.log(
    colors.bold.red(
      "Warning: ensure the data in the Parcel Number column all follow the convention: "
    ),
    "\n",
    "Burough-Block-Lot",
    "\n",
    "Example: 1-482-1302"
  );

  switch (operation) {
    case "Data Entry":
      await performDataEntry(state, sublocation, operation);
      return;
    case "Download Files":
      await performDownload(state, sublocation, operation);
      break;
    case "Data Entry And Download Files":
      await performDataEntryAndDownload(state, sublocation, operation);
      return;
    default:
      console.log("No operation found, check spelling of operation");
      return;
  }
};

module.exports = newYorkAssessmentNotices;
