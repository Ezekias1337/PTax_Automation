const fs = require("fs");
const xlsx = require("xlsx");

const printSuccessfulOperationsToFile = async (arrayOfSuccessfulOperations) => {
  const successfulOperationsStringified = JSON.stringify(
    arrayOfSuccessfulOperations
  );

  if (successfulOperationsStringified.length > 0) {
    /* const worksheet = xlsx.utils.json_to_sheet(successfulOperationsStringified);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Successful Operations");
    xlsx.writeFile(workbook, "../../output/successfulOperations.xlsx"); */

    fs.writeFileSync(
      "../../output/successfulOperations.json",
      successfulOperationsStringified
    );

  }
};

module.exports = printSuccessfulOperationsToFile;
