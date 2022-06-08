const waitForLoading = require("../../../../../functions/pTaxSpecific/waitForLoading/waitForLoading");
const awaitElementLocatedAndReturn = require("../../../../../functions/general/awaitElementLocatedAndReturn");
const sendKeysPTaxInputFields = require("../../../../../functions/pTaxSpecific/sendKeysPTaxInputFields/sendKeysPTaxInputFields");
const deleteInputFieldContents = require("../../../../../functions/general/deleteInputFieldContents");

const fillOutPayments = async (
  driver,
  selectors,
  installmentTotalString,
  installmentTotalInt,
  installmentNumber
) => {
  if (installmentNumber === "1") {
    const generatePaymentsBtn = await awaitElementLocatedAndReturn(
      driver,
      selectors.generatePayments,
      "id"
    );
    await generatePaymentsBtn.click();
    await waitForLoading(driver);
    
    const finalPayment1 = await awaitElementLocatedAndReturn(
      driver,
      selectors.finalPayment1,
      "id"
    );
    await sendKeysPTaxInputFields(finalPayment1, installmentTotalString, false);

    const basePayment1 = await awaitElementLocatedAndReturn(
      driver,
      selectors.basePayment1,
      "id"
    );
    await sendKeysPTaxInputFields(basePayment1, installmentTotalString, false);

    // For the first installment, must delete the input of final/base payment for all other installments

    const finalPayment2 = await awaitElementLocatedAndReturn(
      driver,
      selectors.finalPayment2,
      "id"
    );
    await deleteInputFieldContents(finalPayment2);

    const basePayment2 = await awaitElementLocatedAndReturn(
      driver,
      selectors.basePayment2,
      "id"
    );
    await deleteInputFieldContents(basePayment2);

    const finalPayment3 = await awaitElementLocatedAndReturn(
      driver,
      selectors.finalPayment3,
      "id"
    );
    await deleteInputFieldContents(finalPayment3);
    
    const basePayment3 = await awaitElementLocatedAndReturn(
      driver,
      selectors.basePayment3,
      "id"
    );
    await deleteInputFieldContents(basePayment3);
    
    const finalPayment4 = await awaitElementLocatedAndReturn(
      driver,
      selectors.finalPayment4,
      "id"
    );
    await deleteInputFieldContents(finalPayment4);

    const basePayment4 = await awaitElementLocatedAndReturn(
      driver,
      selectors.basePayment4,
      "id"
    );
    await deleteInputFieldContents(basePayment4);

    const btnSaveAllPayment = await awaitElementLocatedAndReturn(
      driver,
      selectors.saveAll,
      "id"
    );
    await btnSaveAllPayment.click();
    await waitForLoading();
  } else {
    console.log(
      "Support for installments past 1 are not yet supported, contact Frank Edwards for assistance if needed"
    );
  }
};

module.exports = fillOutPayments;
