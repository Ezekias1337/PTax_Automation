const loginToPTAX = async (username, password) => {
  driver = await buildDriver ();
  const ptaxWindow = await driver.getWindowHandle ();
  await driver.get ('https://ptax.ptaxsolution.com/Default.aspx');
  await driver.findElement (By.name ('txtUserName')).sendKeys (username);
  await driver
    .findElement (By.name ('txtPassword'))
    .sendKeys (password, Key.RETURN);
  await swapToIFrame0 (driver);
  await clickCheckMyPropertiesCheckBox ();
  return [ptaxWindow, driver];
};

module.exports = loginToPTAX;
