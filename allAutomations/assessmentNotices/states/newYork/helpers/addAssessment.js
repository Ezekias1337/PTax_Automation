const { until, By } = require("selenium-webdriver");
const awaitElementLocatedAndReturn = require("../../../../../functions/general/awaitElementLocatedAndReturn");
const generateDynamicXPath = require("../../../../../functions/general/generateDynamicXPath");

const addAssessment = async (
  driver,
  assessmentNoticesSelectors,
  assessmentYear,
  landMarketValueString,
  landAssessedValueString,
  improvementMarketValueString,
  improvementAssessedValueString
) => {
  // Do data entry

  const btnNewAssessment = await awaitElementLocatedAndReturn(
    driver,
    assessmentNoticesSelectors.btnNewAssessment,
    "id"
  );
  await btnNewAssessment.click();

  /* NEED TO ADD HANDLING TO SELECT PROPER TAX YEAR IN 2021*/

  const taxYearNewAssessmentDropdown = await awaitElementLocatedAndReturn(
    driver,
    assessmentNoticesSelectors.taxYearNewAssessmentDropdown,
    "id"
  );
  const taxYearNewAssessmentXPath = generateDynamicXPath(
    "option",
    assessmentYear,
    "equals"
  );
  const taxYearForDropdown = await taxYearNewAssessmentDropdown.findElement(
    By.xpath(taxYearNewAssessmentXPath)
  );
  await taxYearForDropdown.click();

  const startAssessmentBtn = await awaitElementLocatedAndReturn(
    driver,
    assessmentNoticesSelectors.startAssessmentBtn,
    "id"
  );
  await startAssessmentBtn.click();
  await driver.wait(
    until.elementLocated(By.id(assessmentNoticesSelectors.assessmentSection))
  );

  const landMarketValueInputField = await awaitElementLocatedAndReturn(
    driver,
    assessmentNoticesSelectors.landMarketValueInput,
    "name"
  );
  await landMarketValueInputField.sendKeys(landMarketValueString);

  const landAssessedValueInputField = await awaitElementLocatedAndReturn(
    driver,
    assessmentNoticesSelectors.landAssessedValueInput,
    "name"
  );
  await landAssessedValueInputField.sendKeys(landAssessedValueString);

  const improvementsMarketValueInputField = await awaitElementLocatedAndReturn(
    driver,
    assessmentNoticesSelectors.improvementsMarketValueInput,
    "name"
  );
  await improvementsMarketValueInputField.sendKeys(
    improvementMarketValueString
  );

  const improvementsAssessedValueInputField =
    await awaitElementLocatedAndReturn(
      driver,
      assessmentNoticesSelectors.improvementsAssessedValueInput,
      "name"
    );
  await improvementsAssessedValueInputField.sendKeys(
    improvementAssessedValueString
  );

  const btnSaveAssessment = await awaitElementLocatedAndReturn(
    driver,
    assessmentNoticesSelectors.btnSaveAssessment,
    "name"
  );
  await btnSaveAssessment.click();
};

module.exports = addAssessment;
