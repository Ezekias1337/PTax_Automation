const { ptaxLoginPage } = require("../../../constants/urls");
const buildDriver = require("../../driver/buildDriver");
const { By, Key } = require ('selenium-webdriver');

const loginToPTAX = async (username, password) => {
  driver = await buildDriver ();
  const ptaxWindow = await driver.getWindowHandle ();
  await driver.get (ptaxLoginPage);
  await driver.findElement (By.name ('txtUserName')).sendKeys (username);
  await driver
    .findElement (By.name ('txtPassword'))
    .sendKeys (password, Key.RETURN);
  await swapToIFrame0 (driver);
  await clickCheckMyPropertiesCheckBox ();
  return [ptaxWindow, driver];
};

module.exports = loginToPTAX;
