const waitForLoading = require("../../../../../functions/pTaxSpecific/waitForLoading/waitForLoading");
const awaitElementLocatedAndReturn = require("../../../../../functions/general/awaitElementLocatedAndReturn");
const sendKeysPTaxInputFields = require("../../../../../functions/pTaxSpecific/sendKeysPTaxInputFields/sendKeysPTaxInputFields");

const fillOutLiability = async (
  driver,
  selectors,
  installmentTotalString,
  installmentTotalInt,
  installmentNumber
) => {
  const totalAmountLiabilityInput = await awaitElementLocatedAndReturn(
    driver,
    selectors.totalAmountLiability,
    "id"
  );
  await sendKeysPTaxInputFields(
    totalAmountLiabilityInput,
    installmentTotalString,
    false
  );

  const saveLiabilityBtn = await awaitElementLocatedAndReturn(
    driver,
    selectors.saveLiability,
    "id"
  );
  await saveLiabilityBtn.click();
  await waitForLoading(driver);
};

module.exports = fillOutLiability;
