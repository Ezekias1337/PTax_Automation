const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { usernameHidden, passwordHidden } = require("./credentials");
//const options = new chrome.Options()

let driver

function generateDelayNumber() {
    const amountToSleep = Math.floor(Math.random() * (25000 - 13000 + 1) + 13000);
    console.log(`Sleeping for: ${amountToSleep / 1000} seconds.`, amountToSleep)
    return amountToSleep
}

async function openNewTab() {
    await driver.switchTo().newWindow('tab');
}

async function switchToPTaxTab() {
    
}

async function switchToTaxWebsiteTab() {
    
}

async function buildDriver() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().window().maximize();
    return driver
}

async function loginToPTAX(username, password) {
    driver = await buildDriver();
    await driver.get("https://ptax.ptaxsolution.com/Default.aspx");
    await driver.findElement(By.name("txtUserName")).sendKeys(username);
    await driver
        .findElement(By.name("txtPassword"))
        .sendKeys(password, Key.RETURN);
    await swapToIFrame0();
    await clickCheckMyPropertiesCheckBox();
}

async function swapToIFrameDefaultContent() {
    await driver.switchTo().defaultContent();
    console.log("Successfully switched to default frame, for purpose of resetting context")
}

async function swapToIFrame0() {
    await swapToIFrameDefaultContent()
    await driver.switchTo().frame(0);
    console.log("Successfully switched to frame 0 (where properties are listed)")
}

async function swapToIFrame1() {
    await swapToIFrameDefaultContent()
    // Store the web element
    const iframe = driver.findElement(By.css("#fmeMain"));
    // Switch to the frame
    await driver.switchTo().frame(iframe);
    console.log("Successfully switched to frame 1 (right hand side of ui)")
}

async function clickCheckMyPropertiesCheckBox() {
    let checkBox = await driver.wait(
        until.elementLocated(By.name("CheckMyProperties"))
    );
    await driver.findElement(By.id("CheckMyProperties")).click();
}

async function angelinaCounty(arrayOfParcels) {
    await loginToPTAX(usernameHidden, passwordHidden);
    await openNewTab();
    await driver.get("https://propaccess.trueautomation.com/clientdb/PropertySearch.aspx?cid=71");
    

    for (const [index, item] of arrayOfParcels.entries()) {
        //split the string to get the query for website
        let searchQuery = item.split(" ")[0];
        
        //search for parcel
        const searchBar = await driver.findElement(By.id("propertySearchOptions_searchText"));
        const submitSearchButton = await driver.findElement(By.id("propertySearchOptions_search"));
        await searchBar.sendKeys(searchQuery);
        await submitSearchButton.click();

        //click on search results link
        let linkXpath = "/html/body/form/div[3]/div[2]/table/tbody/tr[2]/td[10]/a";
        await driver.wait(until.elementLocated(By.xpath(linkXpath)))
        const viewDetailsLink = await driver.findElement(By.xpath(linkXpath));
        await viewDetailsLink.click();
        
        //click on values accordion element
        await driver.findElement(By.id("values")).click();

        let landValue;
        let improvementsValue;

        await driver.sleep(120000)
    }

}

angelinaCounty(['0016-057-040-002-00 (94887)', '0016-057-041-000-00 (14047)'])

async function bexarCounty() {

}

async function bowieCounty() {

}

async function brazoriaCounty() {

}

async function brazosCounty() {

}

async function cameronCounty() {

}

async function collinCounty() {

}

async function dallasCounty() {

}

async function dentonCounty() {

}

async function elPasoCounty() {

}

async function fortBendCounty() {

}

async function harrisCounty() {

}

async function libertyCounty() {

}

async function montgomeryCounty() {

}

async function tarrantCounty() {

}

async function travisCounty() {

}

async function victoriaCounty() {

}

async function wallerCounty() {

}

async function wichitaCounty() {

}

async function williamsonCounty() {

}
