const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { awaitElementLocatedAndReturn } = require("../functions/general/awaitElementLocatedAndReturn");
//const {usernameHidden, passwordHidden} = require ('./credentials');

function generateDelayNumber() {
  const amountToSleep = Math.floor(Math.random() * (45000 - 23000 + 1) + 13000);
  console.log(`Sleeping for: ${amountToSleep / 1000} seconds.`, amountToSleep);
  return amountToSleep;
}

async function swapToIFrameDefaultContent(driver) {
  await driver.switchTo().defaultContent();
  console.log(
    "Successfully switched to default frame, for purpose of resetting context"
  );
}

async function swapToIFrame0(driver) {
  await swapToIFrameDefaultContent(driver);
  await driver.switchTo().frame(0);
  console.log("Successfully switched to frame 0(where properties are listed)");
}

async function swapToIFrame1(driver) {
  await swapToIFrameDefaultContent(driver);
  // Store the web element
  const iframe = driver.findElement(By.css("#fmeMain"));
  // Switch to the frame
  await driver.switchTo().frame(iframe);
  console.log("Successfully switched to frame 1(right hand side of ui)");
}

async function buildDriver() {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.manage().window().maximize();
  return driver;
}

async function loginToPTAX(username, password) {
  driver = await buildDriver();
  const ptaxWindow = await driver.getWindowHandle();
  await driver.get("http://localhost:61709/Default.aspx");
  await driver.findElement(By.name("txtUserName")).sendKeys(username);
  await driver
    .findElement(By.name("txtPassword"))
    .sendKeys(password, Key.RETURN);
  await swapToIFrame0(driver);
  await clickCheckMyPropertiesCheckBox();
  return [ptaxWindow, driver];
}

async function clickCheckMyPropertiesCheckBox() {
  let checkBox = await driver.wait(
    until.elementLocated(By.name("CheckMyProperties"))
  );
  await driver.findElement(By.id("CheckMyProperties")).click();
}

async function workForSetTimeout() {
  await swapToIFrame0(driver);
  const propertyToClick = await driver.findElement(
    By.xpath("//a[contains(text(),'CIM Group Inc.')]")
  );
  await propertyToClick.click();
  await driver.sleep(4000);

  await swapToIFrame1(driver);
  const editButton = await driver.findElement(
    By.xpath("//button[contains(text(),'Edit Details')]")
  );
  await editButton.click();
  let sleepNumber = generateDelayNumber();
  await driver.sleep(sleepNumber);

  try {
    await swapToIFrameDefaultContent(driver);
    //Click on file element in navbar
    const fileTabOfNavbar = await driver.findElement(By.xpath('/html/body/form/div[4]/div/ul/li[1]/a/span'))
    await fileTabOfNavbar.click();

    //wait until the dropdown is interactable, then click
    await driver.sleep(1500);
    const subOptionElement = await driver.findElement(By.xpath("/html/body/form/div[4]/div/ul/li[1]/div/ul/li[9]/a/span"))
    driver.wait(until.elementIsEnabled(subOptionElement));
    await subOptionElement.click();
  } catch (error) {
    console.log(error, error.message);
  }

  sleepNumber = generateDelayNumber();
  await driver.sleep(sleepNumber);
}

async function simulateNaviation() {
  const [ptaxWindow, driver] = await loginToPTAX("fedwards", "p@ssw0rd");

  const intervalID = setInterval(workForSetTimeout, 60000);
  // 15 Minutes
  //setTimeout(() => clearInterval(intervalID), 15000)
  // 30 Minutes
  //setTimeout(() => clearInterval(intervalID), 30000)
  // 45 Minutes
  //setTimeout(() => clearInterval(intervalID), 45000)
  // 60 Minutes
  //setTimeout(() => clearInterval(intervalID), 60000)
}

simulateNaviation();
