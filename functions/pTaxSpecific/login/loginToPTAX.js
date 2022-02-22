const { ptaxLoginPage } = require("../../../constants/urls");
const buildDriver = require("../../driver/buildDriver");
const { By, Key } = require("selenium-webdriver");
const {
  userNameSelector,
  passWordSelector,
} = require("../../../ptaxXpathsAndSelectors/allSelectors");

const loginToPTAX = async (username, password) => {
  try {
    driver = await buildDriver();
    const ptaxWindow = await driver.getWindowHandle();
    await driver.get(ptaxLoginPage);
    await driver.findElement(By.name(userNameSelector)).sendKeys(username);
    await driver
      .findElement(By.name(passWordSelector))
      .sendKeys(password, Key.RETURN);
    return [ptaxWindow, driver];
  } catch (error) {
    console.log("You entered an invalid username or password. Try again.")
  }
};

module.exports = loginToPTAX;
