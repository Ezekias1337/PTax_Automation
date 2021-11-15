const { Builder, By, Key, util } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const options = new chrome.Options()

options.setUserPreferences("browser.download.dir", "C:\\Users\\frank\\Downloads\\Selenium_Downloads")
options.setUserPreferences("browser.download.folderList", 2)
options.setUserPreferences("browser.helperApps.neverAsk.saveToDisk", "application/x-csv")

async function example() {
    let driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
    driver.get("http://samplecsvs.s3.amazonaws.com/Sacramentorealestatetransactions.csv")
    /* await driver.get("http://google.com");
    await driver.findElement(By.name("q")).sendKeys("World of Warcraft: Burning Crusade", Key.RETURN); */
}

example();