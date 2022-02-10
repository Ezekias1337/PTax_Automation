const {Builder, By, Key, until} = require ('selenium-webdriver');
const chrome = require ('selenium-webdriver/chrome');
const prompt = require("prompt-sync")();


const loginToPTAX = async (username, password) => {
let driver = await new Builder ().forBrowser ('chrome').build ();
  const ptaxWindow = await driver.getWindowHandle();
  await driver.get("https://ptax.ptaxsolution.com/Default.aspx");
  await driver.findElement(By.name("txtUserName")).sendKeys(username);
  await driver
    .findElement(By.name("txtPassword"))
    .sendKeys(password, Key.RETURN);
  await swapToIFrame0(driver);
  await clickCheckMyPropertiesCheckBox();
  return [ptaxWindow, driver];
};

console.log(
  "-------------------------------------------------------------------------------------------"
);
console.log("In order to log into PTax, enter your login credentials: ");
const username = prompt("Enter username: ");
const password = prompt("Enter password: ");
console.log(
  "-------------------------------------------------------------------------------------------"
);
try {
  console.log("Attempting to log into PTax");
  loginToPTAX(username, password);
  console.log("Login successful!")
} catch (error){
    console.log("Login failed! Please check you typed your login credentials correctly.")
    console.log(`For username you entered: ${username}`);
    console.log(`For password you entered: ${password}`)
}
console.log(
  "-------------------------------------------------------------------------------------------"
);

//module.exports = {loginToPTAX};
