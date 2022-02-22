const { until, By } = require("selenium-webdriver");
const { checkBoxSelector } = require("../../../ptaxXpathsAndSelectors/allSelectors");

const clickCheckMyPropertiesCheckBox = async (driver) => {
  await driver.wait(until.elementLocated(By.id(checkBoxSelector)));
  await driver.findElement(By.id(checkBoxSelector)).click();
};

module.exports = clickCheckMyPropertiesCheckBox;
