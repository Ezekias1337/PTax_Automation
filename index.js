const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
//const options = new chrome.Options()

function generateDelayNumber() {
    const amountToSleep = Math.floor(Math.random() * (25000 - 13000 + 1) + 13000);
    console.log(`Sleeping for: ${amountToSleep / 1000} seconds.`, amountToSleep)
    return amountToSleep
}


async function updatePropertyPOC(property, producingLeader, producer) {

    const propertyXPath = `//*[text()='${property}']`;



    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://ptax.ptaxsolution.com/Default.aspx");

    //await driver.manage().window().fullscreen();

    await driver.findElement(By.name("txtUserName")).sendKeys("fedwards");
    await driver
        .findElement(By.name("txtPassword"))
        .sendKeys("p@ssw0rd", Key.RETURN);

    //swap to iframe
    await driver.switchTo().frame(0);

    //swaps back to normal if needed for later
    /* await driver.switchTo().defaultContent(); */

    let checkBox = await driver.wait(
        until.elementLocated(By.name("CheckMyProperties"))
    );
    await driver.findElement(By.id("CheckMyProperties")).click();

    await driver
        .findElement(By.xpath("/html/body/form/div[4]/ul/li[24]/div/span[2]"))
        .click();
    /* "fmeMain" */


    let propertyToClick = await driver.wait(
        until.elementLocated(By.xpath(propertyXPath))
    );
    await propertyToClick.click();

    await driver.switchTo().defaultContent();
    // Store the web element
    const iframe = driver.findElement(By.css("#fmeMain"));
    // Switch to the frame
    await driver.switchTo().frame(iframe);


    let editPropertyButton = await driver.wait(
        until.elementLocated(By.xpath("/html/body/form/div[4]/table/tbody/tr/td[1]/table[1]/tbody/tr[3]/td[2]/span/button"))
    );
    await editPropertyButton.click();


    let clientPOC = await driver.wait(
        until.elementLocated(By.xpath("/html/body/form/div[14]/table/tbody/tr[3]/td[2]/select/option[24]"))
    );
    await clientPOC.click();

    if (producingLeader === "Nick") {
        const producingLeaderXPath = "/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[18]";
        let producingOfficerLeader = await driver.wait(
            until.elementLocated(By.xpath(producingLeaderXPath))
        );
        await producingOfficerLeader.click();
    } else if (producingLeader === "Tim") {
        const producingLeaderXPath = "/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[23]";
        let producingOfficerLeader = await driver.wait(
            until.elementLocated(By.xpath(producingLeaderXPath))
        );
        await producingOfficerLeader.click();
    } else if (producingLeader === "Chelley") {
        const producingLeaderXPath = "/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[5]";
        let producingOfficerLeader = await driver.wait(
            until.elementLocated(By.xpath(producingLeaderXPath))
        );
        await producingOfficerLeader.click();
    } else if (producingLeader === "Chelsea") {
        const producingLeaderXPath = "/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[6]";
        let producingOfficerLeader = await driver.wait(
            until.elementLocated(By.xpath(producingLeaderXPath))
        );
        await producingOfficerLeader.click();
    }



    if (producer === "Chase") {
        const producerXPath = "/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[4]";
        let producerToClick = await driver.wait(
            until.elementLocated(By.xpath(producerXPath))
        );
        await producerToClick.click();
    } else if (producer === "Justin") {
        const producerXPath = "/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[15]";
        let producerToClick = await driver.wait(
            until.elementLocated(By.xpath(producerXPath))
        );
        await producerToClick.click();
    } else if (producer === "David") {
        const producerXPath = "/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[8]";
        let producerToClick = await driver.wait(
            until.elementLocated(By.xpath(producerXPath))
        );
        await producerToClick.click();
    } else if (producer === "Jenn") {
        const producerXPath = "/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[13]";
        let producerToClick = await driver.wait(
            until.elementLocated(By.xpath(producerXPath))
        );
        await producerToClick.click();
    }



    await driver.findElement(By.id("SaveButton")).click();

}

//updatePropertyPOC('The Globe','Tim','Justin');

async function dataEntryNYTaxBillsTrumpSoho(arrayOfParcels) {

    let driver = await new Builder().forBrowser("chrome").build();
    let sleepDuration;
    await driver.manage().window().setRect({ width: 1920, height: 1080 });
    //await driver.switchTo().newWindow('tab');
    const nyTaxBillWebsite = await driver.getWindowHandle();
    await driver.get("https://a836-pts-access.nyc.gov/care/search/commonsearch.aspx?mode=persprop");
    await driver
        .findElement(By.id("btAgree"))
        .click();
    await driver.switchTo().newWindow('tab');
    const ptaxWindow = await driver.getWindowHandle();
    await driver.get("https://ptax.ptaxsolution.com/Default.aspx");

    await driver.findElement(By.name("txtUserName")).sendKeys("fedwards");
    await driver
        .findElement(By.name("txtPassword"))
        .sendKeys("p@ssw0rd", Key.RETURN);
    //swap to iframe
    await driver.switchTo().frame(0);

    //swaps back to normal if needed for later
    /* await driver.switchTo().defaultContent(); */

    let checkBox = await driver.wait(
        until.elementLocated(By.name("CheckMyProperties"))
    );
    await driver.findElement(By.id("CheckMyProperties")).click();

    await driver
        .findElement(By.xpath("/html/body/form/div[4]/ul/li[24]/div/span[2]"))
        .click();
    /* "fmeMain" */

    let propertyToClick = await driver.wait(
        until.elementLocated(By.xpath("/html/body/form/div[4]/ul/li[24]/ul/li[266]/div/span[2]"))
    );
    await propertyToClick.click();
    // Opens a new tab and switches to new tab

    let arrayOfFailedParcels = [];

    for (const item of arrayOfParcels) {


        console.log(`Currently working on parcel: ${item} \n`)
        try {
            await driver.switchTo().window(nyTaxBillWebsite);

            const boroughNumber = item.split("-")[0];
            const blockNumber = item.split("-")[1];
            const lotNumber = item.split("-")[2];

            if (boroughNumber === "1") {
                await driver.wait(
                    until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[2]"))
                ).click();
            } else if (boroughNumber === "2") {
                await driver.wait(
                    until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[3]"))
                ).click();
            } else if (boroughNumber === "3") {
                await driver.wait(
                    until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[4]"))
                ).click();
            } else if (boroughNumber === "4") {
                await driver.wait(
                    until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[5]"))
                ).click();
            } else if (boroughNumber === "5") {
                await driver.wait(
                    until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[6]"))
                ).click();
            }

            await driver.wait(
                until.elementLocated(By.id("inpTag"))
            ).sendKeys(blockNumber)

            await driver.wait(
                until.elementLocated(By.id("inpStat"))
            ).sendKeys(lotNumber)

            await driver.wait(
                until.elementLocated(By.id("btSearch"))
            ).click()


            // Click account history tab
            const accountHistoryTab = await driver.wait(
                until.elementLocated(By.css("#sidemenu > ul > li:nth-child(3) > a > span"))
            )
            //console.log("accountHistoryTab", accountHistoryTab)

            accountHistoryTab.click();


            const payment3PulledFromNYSiteString = await driver.wait(
                until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[3]/td[8]"))
            ).getAttribute("innerText");
            const payment4PulledFromNYSiteString = await driver.wait(
                until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[2]/td[8]"))
            ).getAttribute("innerText");


            /* 
                Now need to add together payment 3/4 from website and then get payment 1/2 from ptax, add all numbers together, this gives total amount liability
            */

            // Go back two pages to get tab ready for next parcel
            await driver.navigate().back();
            await driver.navigate().back();


            await driver.switchTo().window(ptaxWindow);
            await driver.switchTo().defaultContent();
            await driver.switchTo().frame(0);


            const parcelSplitFromBorough = blockNumber.concat("-", lotNumber)
            const parcelXPath = `//*[text()='${parcelSplitFromBorough + " (Pay by Electronic Funds Transfer)"}']`;
            const parcelToClick = await driver.wait(
                until.elementLocated(By.xpath(parcelXPath))
            );
            await parcelToClick.click();

            const taxBillDrivenTabXPath = `//*[text()='${"Tax Bill Driven"}']`;
            //const editTaxAssessmentButtonXPath = `//*[text()='${"1/1/2021"}']`;

            await driver.switchTo().defaultContent();
            const iframe = await driver.findElement(By.id("fmeMain"));
            await driver.switchTo().frame(iframe);

            const taxBillDrivenTabButtonToClick = await driver.wait(
                until.elementLocated(By.xpath(taxBillDrivenTabXPath))
            );
            await taxBillDrivenTabButtonToClick.click();

            const taxAssessmentButtonToClick = await driver.wait(
                until.elementLocated(By.xpath("/html/body/form/div[5]/div[1]/div[1]/table/tbody/tr[1]/td[4]/a"))
            );
            await taxAssessmentButtonToClick.click();



            const payment1PulledFromPTAXString = await driver.wait(
                until.elementLocated(By.id("tbBasePaymentAmount1"))
            ).getAttribute("value");
            const payment2PulledFromPTAXString = await driver.wait(
                until.elementLocated(By.id("tbBasePaymentAmount2"))
            ).getAttribute("value");


            //Now start parsing values scraped from both sources into numbers so calculations can be performed

            //Payments pulled from PTax have a leading $ so need to remove that
            payment1PulledFromPTAXStringNoDollarSign = payment1PulledFromPTAXString.replace("$", "");
            payment2PulledFromPTAXStringNoDollarSign = payment2PulledFromPTAXString.replace("$", "");

            //Now strings should be on even footing, time to get rid of commas

            const payment1CommasRemoved = payment1PulledFromPTAXStringNoDollarSign.replace(",", "");
            const payment2CommasRemoved = payment2PulledFromPTAXStringNoDollarSign.replace(",", "");
            const payment3CommasRemoved = payment3PulledFromNYSiteString.replace(",", "");
            const payment4CommasRemoved = payment4PulledFromNYSiteString.replace(",", "");

            //Now time to convert all of these strings to floats

            const payment1Float = parseFloat(payment1CommasRemoved)
            const payment2Float = parseFloat(payment2CommasRemoved)
            const payment3Float = parseFloat(payment3CommasRemoved)
            const payment4Float = parseFloat(payment4CommasRemoved)

            console.log("\n");
            console.log("___________________________________________________________________________________________")
            console.log(`Information for parcel: ${item}`)
            console.log("payment1Float", payment1Float)
            console.log("payment2Float", payment2Float)
            console.log("payment3Float", payment3Float)
            console.log("payment4Float", payment4Float)

            //Now time to add all of these numbers together to get the total amount liability

            const totalAmountLiability = payment1Float + payment2Float + payment3Float + payment4Float;
            console.log("totalAmountLiability", totalAmountLiability)
            console.log("\n");

            const totalAmountLiabilityString = totalAmountLiability.toString();

            //Now that we have all of the values we need, send keys to total Liability field and then save

            const tbTotalTaxLiabilityField = await driver.wait(
                until.elementLocated(By.id("tbTotalTaxLiability"))
            );
            const saveTaxLiabilityButton = await driver.wait(
                until.elementLocated(By.id("btnSaveLiability"))
            );

            await tbTotalTaxLiabilityField.sendKeys(Key.CONTROL, "a");
            await tbTotalTaxLiabilityField.sendKeys(Key.DELETE);
            await tbTotalTaxLiabilityField.sendKeys(totalAmountLiabilityString);
            await saveTaxLiabilityButton.click();

            //Now that the value is saved, wait for loading before proceeding

            sleepDuration = generateDelayNumber();
            await driver.sleep(sleepDuration)

            //Now that wait is done, send keys to payments 3 and 4, and then save

            const payment3FinalPayment = await driver.wait(
                until.elementLocated(By.id("tbBasePaymentAmount3"))
            );
            const payment3BasePayment = await driver.wait(
                until.elementLocated(By.id("tbBaseAmountTransmittal3"))
            );
            const payment4FinalPayment = await driver.wait(
                until.elementLocated(By.id("tbBasePaymentAmount4"))
            );
            const payment4BasePayment = await driver.wait(
                until.elementLocated(By.id("tbBaseAmountTransmittal4"))
            );
            const saveAllPaymentsButton = await driver.wait(
                until.elementLocated(By.id("btnSaveALLPayment"))
            );

            await payment3FinalPayment.sendKeys(Key.CONTROL, "a");
            await payment3FinalPayment.sendKeys(Key.DELETE);
            await payment3FinalPayment.sendKeys(payment3CommasRemoved);

            await payment3BasePayment.sendKeys(Key.CONTROL, "a");
            await payment3BasePayment.sendKeys(Key.DELETE);
            await payment3BasePayment.sendKeys(payment3CommasRemoved);

            await payment4FinalPayment.sendKeys(Key.CONTROL, "a");
            await payment4FinalPayment.sendKeys(Key.DELETE);
            await payment4FinalPayment.sendKeys(payment4CommasRemoved);

            await payment4BasePayment.sendKeys(Key.CONTROL, "a");
            await payment4BasePayment.sendKeys(Key.DELETE);
            await payment4BasePayment.sendKeys(payment4CommasRemoved);

            await saveAllPaymentsButton.click();


            //Now wait some seconds before attempting to swap frames
            sleepDuration = generateDelayNumber();
            await driver.sleep(sleepDuration)

            await driver.switchTo().defaultContent();
            await driver.switchTo().frame(0);
            sleepDuration = generateDelayNumber();
            await driver.sleep(sleepDuration)

        } catch (error) {
            arrayOfFailedParcels.push(item)
            console.log(`Failed to execute for parcel: ${item} \n`)
            console.error(error);
        }
    }
    if (arrayOfFailedParcels.length > 0) {
        console.log("The following parcels failed to complete data entry: \n");
        console.log(arrayOfFailedParcels);
    }
}

async function dataEntryNYTaxBills109Montgomery(arrayOfParcels) {

    let driver = await new Builder().forBrowser("chrome").build();
    let sleepDuration;
    await driver.manage().window().setRect({ width: 1920, height: 1080 });
    //await driver.switchTo().newWindow('tab');
    const nyTaxBillWebsite = await driver.getWindowHandle();
    await driver.get("https://a836-pts-access.nyc.gov/care/search/commonsearch.aspx?mode=persprop");
    await driver
        .findElement(By.id("btAgree"))
        .click();
    await driver.switchTo().newWindow('tab');
    const ptaxWindow = await driver.getWindowHandle();
    await driver.get("https://ptax.ptaxsolution.com/Default.aspx");

    await driver.findElement(By.name("txtUserName")).sendKeys("fedwards");
    await driver
        .findElement(By.name("txtPassword"))
        .sendKeys("p@ssw0rd", Key.RETURN);
    //swap to iframe
    await driver.switchTo().frame(0);

    //swaps back to normal if needed for later
    /* await driver.switchTo().defaultContent(); */

    let checkBox = await driver.wait(
        until.elementLocated(By.name("CheckMyProperties"))
    );
    await driver.findElement(By.id("CheckMyProperties")).click();

    await driver
        .findElement(By.xpath("/html/body/form/div[4]/ul/li[24]/div/span[2]"))
        .click();

    let propertyToClick = await driver.wait(
        until.elementLocated(By.xpath("/html/body/form/div[4]/ul/li[24]/ul/li[7]/div/span[2]"))
    );
    await propertyToClick.click();
    // Opens a new tab and switches to new tab

    let arrayOfFailedParcels = [];
    let arrayOfParcelsNeedingReview = [];

    for (const item of arrayOfParcels) {


        console.log(`Currently working on parcel: ${item} \n`)
        try {
            await driver.switchTo().window(nyTaxBillWebsite);

            const boroughNumber = item.split("-")[0];
            const blockNumber = item.split("-")[1];
            const lotNumber = item.split("-")[2];

            if (boroughNumber === "1") {
                await driver.wait(
                    until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[2]"))
                ).click();
            } else if (boroughNumber === "2") {
                await driver.wait(
                    until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[3]"))
                ).click();
            } else if (boroughNumber === "3") {
                await driver.wait(
                    until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[4]"))
                ).click();
            } else if (boroughNumber === "4") {
                await driver.wait(
                    until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[5]"))
                ).click();
            } else if (boroughNumber === "5") {
                await driver.wait(
                    until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[6]"))
                ).click();
            }

            await driver.wait(
                until.elementLocated(By.id("inpTag"))
            ).sendKeys(blockNumber)

            await driver.wait(
                until.elementLocated(By.id("inpStat"))
            ).sendKeys(lotNumber)

            await driver.wait(
                until.elementLocated(By.id("btSearch"))
            ).click()


            // Click account history tab
            const accountHistoryTab = await driver.wait(
                until.elementLocated(By.css("#sidemenu > ul > li:nth-child(3) > a > span"))
            )
            //console.log("accountHistoryTab", accountHistoryTab)

            accountHistoryTab.click();


            const payment3PulledFromNYSiteString = await driver.wait(
                until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[3]/td[8]"))
            ).getAttribute("innerText");
            const payment4PulledFromNYSiteString = await driver.wait(
                until.elementLocated(By.xpath("/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[2]/td[8]"))
            ).getAttribute("innerText");


            /* 
                Now need to add together payment 3/4 from website and then get payment 1/2 from ptax, add all numbers together, this gives total amount liability
            */

            // Go back two pages to get tab ready for next parcel
            await driver.navigate().back();
            await driver.navigate().back();


            await driver.switchTo().window(ptaxWindow);
            await driver.switchTo().defaultContent();
            await driver.switchTo().frame(0);


            const parcelSplitFromBorough = blockNumber.concat("-", lotNumber)
            const parcelXPath = `//*[text()='${item + " (Pay by Electronic Funds Transfer)"}']`;
            const parcelToClick = await driver.wait(
                until.elementLocated(By.xpath(parcelXPath))
            );
            await parcelToClick.click();

            const taxBillDrivenTabXPath = `//*[text()='${"Tax Bill Driven"}']`;
            //const editTaxAssessmentButtonXPath = `//*[text()='${"1/1/2021"}']`;

            await driver.switchTo().defaultContent();
            const iframe = await driver.findElement(By.id("fmeMain"));
            await driver.switchTo().frame(iframe);

            const taxBillDrivenTabButtonToClick = await driver.wait(
                until.elementLocated(By.xpath(taxBillDrivenTabXPath))
            );
            await taxBillDrivenTabButtonToClick.click();

            const taxAssessmentButtonToClick = await driver.wait(
                until.elementLocated(By.xpath("/html/body/form/div[5]/div[1]/div[1]/table/tbody/tr[1]/td[4]/a"))
            );
            await taxAssessmentButtonToClick.click();



            const payment1PulledFromPTAXString = await driver.wait(
                until.elementLocated(By.id("tbBasePaymentAmount1"))
            ).getAttribute("value");
            const payment2PulledFromPTAXString = await driver.wait(
                until.elementLocated(By.id("tbBasePaymentAmount2"))
            ).getAttribute("value");


            //Now start parsing values scraped from both sources into numbers so calculations can be performed

            //Payments pulled from PTax have a leading $ so need to remove that
            payment1PulledFromPTAXStringNoDollarSign = payment1PulledFromPTAXString.replace("$", "");
            payment2PulledFromPTAXStringNoDollarSign = payment2PulledFromPTAXString.replace("$", "");

            //Now strings should be on even footing, time to get rid of commas

            const payment1CommasRemoved = payment1PulledFromPTAXStringNoDollarSign.replace(",", "");
            const payment2CommasRemoved = payment2PulledFromPTAXStringNoDollarSign.replace(",", "");
            const payment3CommasRemoved = payment3PulledFromNYSiteString.replace(",", "");
            const payment4CommasRemoved = payment4PulledFromNYSiteString.replace(",", "");

            //Now time to convert all of these strings to floats

            const payment1Float = parseFloat(payment1CommasRemoved)
            const payment2Float = parseFloat(payment2CommasRemoved)
            const payment3Float = parseFloat(payment3CommasRemoved)
            const payment4Float = parseFloat(payment4CommasRemoved)

            console.log("\n");
            console.log("___________________________________________________________________________________________")
            console.log(`Information for parcel: ${item}`)
            console.log("payment1Float", payment1Float)
            console.log("payment2Float", payment2Float)
            console.log("payment3Float", payment3Float)
            console.log("payment4Float", payment4Float)

            //if any of the payment numbers are 0, add to array for review to ensure it was correct:

            if (payment1Float === 0 || payment2Float === 0 || payment3Float === 0 || payment4Float === 0) {
                arrayOfParcelsNeedingReview.push(item)
            }

            //Now time to add all of these numbers together to get the total amount liability

            const totalAmountLiability = payment1Float + payment2Float + payment3Float + payment4Float;
            console.log("totalAmountLiability", totalAmountLiability)
            console.log("\n");

            const totalAmountLiabilityString = totalAmountLiability.toString();

            //Now that we have all of the values we need, send keys to total Liability field and then save

            const tbTotalTaxLiabilityField = await driver.wait(
                until.elementLocated(By.id("tbTotalTaxLiability"))
            );
            const saveTaxLiabilityButton = await driver.wait(
                until.elementLocated(By.id("btnSaveLiability"))
            );

            await tbTotalTaxLiabilityField.sendKeys(Key.CONTROL, "a");
            await tbTotalTaxLiabilityField.sendKeys(Key.DELETE);
            await tbTotalTaxLiabilityField.sendKeys(totalAmountLiabilityString);
            await saveTaxLiabilityButton.click();

            //Now that the value is saved, wait for loading before proceeding

            sleepDuration = generateDelayNumber();
            await driver.sleep(sleepDuration)

            //Now that wait is done, send keys to payments 3 and 4, and then save

            const payment3FinalPayment = await driver.wait(
                until.elementLocated(By.id("tbBasePaymentAmount3"))
            );
            const payment3BasePayment = await driver.wait(
                until.elementLocated(By.id("tbBaseAmountTransmittal3"))
            );
            const payment4FinalPayment = await driver.wait(
                until.elementLocated(By.id("tbBasePaymentAmount4"))
            );
            const payment4BasePayment = await driver.wait(
                until.elementLocated(By.id("tbBaseAmountTransmittal4"))
            );
            const saveAllPaymentsButton = await driver.wait(
                until.elementLocated(By.id("btnSaveALLPayment"))
            );

            await payment3FinalPayment.sendKeys(Key.CONTROL, "a");
            await payment3FinalPayment.sendKeys(Key.DELETE);
            await payment3FinalPayment.sendKeys(payment3CommasRemoved);

            await payment3BasePayment.sendKeys(Key.CONTROL, "a");
            await payment3BasePayment.sendKeys(Key.DELETE);
            await payment3BasePayment.sendKeys(payment3CommasRemoved);

            await payment4FinalPayment.sendKeys(Key.CONTROL, "a");
            await payment4FinalPayment.sendKeys(Key.DELETE);
            await payment4FinalPayment.sendKeys(payment4CommasRemoved);

            await payment4BasePayment.sendKeys(Key.CONTROL, "a");
            await payment4BasePayment.sendKeys(Key.DELETE);
            await payment4BasePayment.sendKeys(payment4CommasRemoved);

            await saveAllPaymentsButton.click();


            //Now wait some seconds before attempting to swap frames
            sleepDuration = generateDelayNumber();
            await driver.sleep(sleepDuration)

            await driver.switchTo().defaultContent();
            await driver.switchTo().frame(0);
            sleepDuration = generateDelayNumber();
            await driver.sleep(sleepDuration)

        } catch (error) {
            arrayOfFailedParcels.push(item)
            console.log(`Failed to execute for parcel: ${item} \n`)
            console.error(error);
        }
    }
    if (arrayOfFailedParcels.length > 0) {
        console.log("The following parcels failed to complete data entry: \n");
        console.log(arrayOfFailedParcels);
    } if (arrayOfParcelsNeedingReview.length > 0) {
        console.log("The following parcels need manual review to ensure accuracy: \n");
        console.log(arrayOfParcelsNeedingReview);
    }
}

dataEntryNYTaxBills109Montgomery(['3-1190-1101', '3-1190-1103', '3-1190-1104', '3-1190-1106', '3-1190-1107', '3-1190-1111', '3-1190-1112', '3-1190-1113', '3-1190-1114', '3-1190-1116', '3-1190-1117', '3-1190-1119', '3-1190-1120', '3-1190-1122', '3-1190-1124', '3-1190-1125', '3-1190-1132', '3-1190-1136', '3-1190-1139', '3-1190-1140', '3-1190-1141', '3-1190-1142', '3-1190-1143', '3-1190-1145', '3-1190-1146', '3-1190-1148', '3-1190-1152', '3-1190-1153', '3-1190-1154', '3-1190-1157', '3-1190-1158', '3-1190-1159', '3-1190-1160', '3-1190-1161', '3-1190-1162', '3-1190-1164', '3-1190-1165', '3-1190-1167', '3-1190-1168', '3-1190-1169', '3-1190-1170', '3-1190-1171', '3-1190-1173', '3-1190-1174', '3-1190-1175', '3-1190-1176', '3-1190-1177', '3-1190-1178', '3-1190-1179', '3-1190-1180', '3-1190-1181', '3-1190-1183', '3-1190-1186', '3-1190-1187', '3-1190-1188', '3-1190-1189', '3-1190-1190', '3-1190-1192', '3-1190-1193', '3-1190-1194', '3-1190-1195', '3-1190-1196', '3-1190-1197', '3-1190-1198', '3-1190-1199', '3-1190-1200', '3-1190-1202', '3-1190-1203', '3-1190-1204', '3-1190-1205', '3-1190-1206', '3-1190-1208', '3-1190-1209', '3-1190-1210', '3-1190-1211', '3-1190-1212', '3-1190-1213', '3-1190-1215', '3-1190-1216', '3-1190-1218', '3-1190-1219', '3-1190-1220', '3-1190-1222', '3-1190-1223', '3-1190-1225', '3-1190-1226', '3-1190-1227', '3-1190-1228', '3-1190-1229', '3-1190-1230', '3-1190-1231', '3-1190-1232', '3-1190-1234', '3-1190-1235', '3-1190-1236', '3-1190-1237', '3-1190-1238', '3-1190-1239', '3-1190-1240', '3-1190-1241', '3-1190-1242', '3-1190-1243', '3-1190-1244', '3-1190-1245', '3-1190-1246', '3-1190-1247', '3-1190-1248', '3-1190-1250', '3-1190-1251', '3-1190-1252', '3-1190-1253', '3-1190-1254', '3-1190-1255', '3-1190-1256', '3-1190-1257', '3-1190-1258', '3-1190-1259', '3-1190-1260', '3-1190-1261', '3-1190-1262', '3-1190-1264', '3-1190-7502'])