const awaitElementLocatedAndReturn = require("../../../../../../../functions/general/awaitElementLocatedAndReturn");
const scrollElementIntoView = require("../../../../../../../functions/general/scrollElementIntoView");

const navigateToAssessmentData = async (driver, assessmentWebsiteSelectors) => {
  const viewPropertyButton = await awaitElementLocatedAndReturn(
    driver,
    assessmentWebsiteSelectors.viewProperty,
    "xpath"
  );
  await viewPropertyButton.click();

  const viewValueHistoryButton = await awaitElementLocatedAndReturn(
    driver,
    assessmentWebsiteSelectors.valueHistory,
    "xpath"
  );
  await viewValueHistoryButton.click();

  const totalRollValueElement = await awaitElementLocatedAndReturn(
    driver,
    assessmentWebsiteSelectors.viewTotalRollValue,
    "xpath"
  );
  await scrollElementIntoView(driver, totalRollValueElement);
  await totalRollValueElement.click();
};

module.exports = navigateToAssessmentData;
