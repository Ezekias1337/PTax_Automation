const fs = require("fs");
const xlsx = require("xlsx");

const printFailedOperationsToFile = async (arrayOfFailedOperations) => {
  const failedOperationsStringified = JSON.stringify(arrayOfFailedOperations);

  if (failedOperationsStringified.length > 0) {
    fs.writeFileSync(
      "../../output/FailedOperations.json",
      failedOperationsStringified
    );
  }
};

module.exports = printFailedOperationsToFile;
