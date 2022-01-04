const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
//const options = new chrome.Options()

function generateDelayNumber() {
  const amountToSleep = Math.floor(Math.random() * (25000 - 13000 + 1) + 13000);
  console.log(`Sleeping for: ${amountToSleep / 1000} seconds.`, amountToSleep);
  return amountToSleep;
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
    until.elementLocated(
      By.xpath(
        "/html/body/form/div[4]/table/tbody/tr/td[1]/table[1]/tbody/tr[3]/td[2]/span/button"
      )
    )
  );
  await editPropertyButton.click();

  let clientPOC = await driver.wait(
    until.elementLocated(
      By.xpath(
        "/html/body/form/div[14]/table/tbody/tr[3]/td[2]/select/option[24]"
      )
    )
  );
  await clientPOC.click();

  if (producingLeader === "Nick") {
    const producingLeaderXPath =
      "/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[18]";
    let producingOfficerLeader = await driver.wait(
      until.elementLocated(By.xpath(producingLeaderXPath))
    );
    await producingOfficerLeader.click();
  } else if (producingLeader === "Tim") {
    const producingLeaderXPath =
      "/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[23]";
    let producingOfficerLeader = await driver.wait(
      until.elementLocated(By.xpath(producingLeaderXPath))
    );
    await producingOfficerLeader.click();
  } else if (producingLeader === "Chelley") {
    const producingLeaderXPath =
      "/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[5]";
    let producingOfficerLeader = await driver.wait(
      until.elementLocated(By.xpath(producingLeaderXPath))
    );
    await producingOfficerLeader.click();
  } else if (producingLeader === "Chelsea") {
    const producingLeaderXPath =
      "/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[6]";
    let producingOfficerLeader = await driver.wait(
      until.elementLocated(By.xpath(producingLeaderXPath))
    );
    await producingOfficerLeader.click();
  }

  if (producer === "Chase") {
    const producerXPath =
      "/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[4]";
    let producerToClick = await driver.wait(
      until.elementLocated(By.xpath(producerXPath))
    );
    await producerToClick.click();
  } else if (producer === "Justin") {
    const producerXPath =
      "/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[15]";
    let producerToClick = await driver.wait(
      until.elementLocated(By.xpath(producerXPath))
    );
    await producerToClick.click();
  } else if (producer === "David") {
    const producerXPath =
      "/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[8]";
    let producerToClick = await driver.wait(
      until.elementLocated(By.xpath(producerXPath))
    );
    await producerToClick.click();
  } else if (producer === "Jenn") {
    const producerXPath =
      "/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[13]";
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
  await driver.get(
    "https://a836-pts-access.nyc.gov/care/search/commonsearch.aspx?mode=persprop"
  );
  await driver.findElement(By.id("btAgree")).click();
  await driver.switchTo().newWindow("tab");
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
    until.elementLocated(
      By.xpath("/html/body/form/div[4]/ul/li[24]/ul/li[266]/div/span[2]")
    )
  );
  await propertyToClick.click();
  // Opens a new tab and switches to new tab

  let arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    console.log(`Currently working on parcel: ${item} \n`);
    try {
      await driver.switchTo().window(nyTaxBillWebsite);

      const boroughNumber = item.split("-")[0];
      const blockNumber = item.split("-")[1];
      const lotNumber = item.split("-")[2];

      if (boroughNumber === "1") {
        await driver
          .wait(
            until.elementLocated(
              By.xpath(
                "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[2]"
              )
            )
          )
          .click();
      } else if (boroughNumber === "2") {
        await driver
          .wait(
            until.elementLocated(
              By.xpath(
                "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[3]"
              )
            )
          )
          .click();
      } else if (boroughNumber === "3") {
        await driver
          .wait(
            until.elementLocated(
              By.xpath(
                "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[4]"
              )
            )
          )
          .click();
      } else if (boroughNumber === "4") {
        await driver
          .wait(
            until.elementLocated(
              By.xpath(
                "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[5]"
              )
            )
          )
          .click();
      } else if (boroughNumber === "5") {
        await driver
          .wait(
            until.elementLocated(
              By.xpath(
                "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[6]"
              )
            )
          )
          .click();
      }

      await driver
        .wait(until.elementLocated(By.id("inpTag")))
        .sendKeys(blockNumber);

      await driver
        .wait(until.elementLocated(By.id("inpStat")))
        .sendKeys(lotNumber);

      await driver.wait(until.elementLocated(By.id("btSearch"))).click();

      // Click account history tab
      const accountHistoryTab = await driver.wait(
        until.elementLocated(
          By.css("#sidemenu > ul > li:nth-child(3) > a > span")
        )
      );
      //console.log("accountHistoryTab", accountHistoryTab)

      accountHistoryTab.click();

      const payment3PulledFromNYSiteString = await driver
        .wait(
          until.elementLocated(
            By.xpath(
              "/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[3]/td[8]"
            )
          )
        )
        .getAttribute("innerText");
      const payment4PulledFromNYSiteString = await driver
        .wait(
          until.elementLocated(
            By.xpath(
              "/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[2]/td[8]"
            )
          )
        )
        .getAttribute("innerText");

      /* 
                Now need to add together payment 3/4 from website and then get payment 1/2 from ptax, add all numbers together, this gives total amount liability
            */

      // Go back two pages to get tab ready for next parcel
      await driver.navigate().back();
      await driver.navigate().back();

      await driver.switchTo().window(ptaxWindow);
      await driver.switchTo().defaultContent();
      await driver.switchTo().frame(0);

      const parcelSplitFromBorough = blockNumber.concat("-", lotNumber);
      const parcelXPath = `//*[text()='${
        parcelSplitFromBorough + " (Pay by Electronic Funds Transfer)"
      }']`;
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
        until.elementLocated(
          By.xpath(
            "/html/body/form/div[5]/div[1]/div[1]/table/tbody/tr[1]/td[4]/a"
          )
        )
      );
      await taxAssessmentButtonToClick.click();

      const payment1PulledFromPTAXString = await driver
        .wait(until.elementLocated(By.id("tbBasePaymentAmount1")))
        .getAttribute("value");
      const payment2PulledFromPTAXString = await driver
        .wait(until.elementLocated(By.id("tbBasePaymentAmount2")))
        .getAttribute("value");

      //Now start parsing values scraped from both sources into numbers so calculations can be performed

      //Payments pulled from PTax have a leading $ so need to remove that
      payment1PulledFromPTAXStringNoDollarSign =
        payment1PulledFromPTAXString.replace("$", "");
      payment2PulledFromPTAXStringNoDollarSign =
        payment2PulledFromPTAXString.replace("$", "");

      //Now strings should be on even footing, time to get rid of commas

      const payment1CommasRemoved =
        payment1PulledFromPTAXStringNoDollarSign.replace(",", "");
      const payment2CommasRemoved =
        payment2PulledFromPTAXStringNoDollarSign.replace(",", "");
      const payment3CommasRemoved = payment3PulledFromNYSiteString.replace(
        ",",
        ""
      );
      const payment4CommasRemoved = payment4PulledFromNYSiteString.replace(
        ",",
        ""
      );

      //Now time to convert all of these strings to floats

      const payment1Float = parseFloat(payment1CommasRemoved);
      const payment2Float = parseFloat(payment2CommasRemoved);
      const payment3Float = parseFloat(payment3CommasRemoved);
      const payment4Float = parseFloat(payment4CommasRemoved);

      console.log("\n");
      console.log(
        "___________________________________________________________________________________________"
      );
      console.log(`Information for parcel: ${item}`);
      console.log("payment1Float", payment1Float);
      console.log("payment2Float", payment2Float);
      console.log("payment3Float", payment3Float);
      console.log("payment4Float", payment4Float);

      //Now time to add all of these numbers together to get the total amount liability

      const totalAmountLiability =
        payment1Float + payment2Float + payment3Float + payment4Float;
      console.log("totalAmountLiability", totalAmountLiability);
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
      await driver.sleep(sleepDuration);

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
      await driver.sleep(sleepDuration);

      await driver.switchTo().defaultContent();
      await driver.switchTo().frame(0);
      sleepDuration = generateDelayNumber();
      await driver.sleep(sleepDuration);
    } catch (error) {
      arrayOfFailedParcels.push(item);
      console.log(`Failed to execute for parcel: ${item} \n`);
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
  await driver.get(
    "https://a836-pts-access.nyc.gov/care/search/commonsearch.aspx?mode=persprop"
  );
  await driver.findElement(By.id("btAgree")).click();
  await driver.switchTo().newWindow("tab");
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
    until.elementLocated(
      By.xpath("/html/body/form/div[4]/ul/li[24]/ul/li[7]/div/span[2]")
    )
  );
  await propertyToClick.click();
  // Opens a new tab and switches to new tab

  let arrayOfFailedParcels = [];
  let arrayOfParcelsNeedingReview = [];

  for (const item of arrayOfParcels) {
    console.log(`Currently working on parcel: ${item} \n`);
    try {
      await driver.switchTo().window(nyTaxBillWebsite);

      const boroughNumber = item.split("-")[0];
      const blockNumber = item.split("-")[1];
      const lotNumber = item.split("-")[2];

      if (boroughNumber === "1") {
        await driver
          .wait(
            until.elementLocated(
              By.xpath(
                "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[2]"
              )
            )
          )
          .click();
      } else if (boroughNumber === "2") {
        await driver
          .wait(
            until.elementLocated(
              By.xpath(
                "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[3]"
              )
            )
          )
          .click();
      } else if (boroughNumber === "3") {
        await driver
          .wait(
            until.elementLocated(
              By.xpath(
                "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[4]"
              )
            )
          )
          .click();
      } else if (boroughNumber === "4") {
        await driver
          .wait(
            until.elementLocated(
              By.xpath(
                "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[5]"
              )
            )
          )
          .click();
      } else if (boroughNumber === "5") {
        await driver
          .wait(
            until.elementLocated(
              By.xpath(
                "/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[6]"
              )
            )
          )
          .click();
      }

      await driver
        .wait(until.elementLocated(By.id("inpTag")))
        .sendKeys(blockNumber);

      await driver
        .wait(until.elementLocated(By.id("inpStat")))
        .sendKeys(lotNumber);

      await driver.wait(until.elementLocated(By.id("btSearch"))).click();

      // Click account history tab
      const accountHistoryTab = await driver.wait(
        until.elementLocated(
          By.css("#sidemenu > ul > li:nth-child(3) > a > span")
        )
      );
      //console.log("accountHistoryTab", accountHistoryTab)

      accountHistoryTab.click();

      const payment3PulledFromNYSiteString = await driver
        .wait(
          until.elementLocated(
            By.xpath(
              "/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[3]/td[8]"
            )
          )
        )
        .getAttribute("innerText");
      const payment4PulledFromNYSiteString = await driver
        .wait(
          until.elementLocated(
            By.xpath(
              "/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[2]/td[8]"
            )
          )
        )
        .getAttribute("innerText");

      /* 
                Now need to add together payment 3/4 from website and then get payment 1/2 from ptax, add all numbers together, this gives total amount liability
            */

      // Go back two pages to get tab ready for next parcel
      await driver.navigate().back();
      await driver.navigate().back();

      await driver.switchTo().window(ptaxWindow);
      await driver.switchTo().defaultContent();
      await driver.switchTo().frame(0);

      const parcelSplitFromBorough = blockNumber.concat("-", lotNumber);
      const parcelXPath = `//*[text()='${
        item + " (Pay by Electronic Funds Transfer)"
      }']`;
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
        until.elementLocated(
          By.xpath(
            "/html/body/form/div[5]/div[1]/div[1]/table/tbody/tr[1]/td[4]/a"
          )
        )
      );
      await taxAssessmentButtonToClick.click();

      const payment1PulledFromPTAXString = await driver
        .wait(until.elementLocated(By.id("tbBasePaymentAmount1")))
        .getAttribute("value");
      const payment2PulledFromPTAXString = await driver
        .wait(until.elementLocated(By.id("tbBasePaymentAmount2")))
        .getAttribute("value");

      //Now start parsing values scraped from both sources into numbers so calculations can be performed

      //Payments pulled from PTax have a leading $ so need to remove that
      payment1PulledFromPTAXStringNoDollarSign =
        payment1PulledFromPTAXString.replace("$", "");
      payment2PulledFromPTAXStringNoDollarSign =
        payment2PulledFromPTAXString.replace("$", "");

      //Now strings should be on even footing, time to get rid of commas

      const payment1CommasRemoved =
        payment1PulledFromPTAXStringNoDollarSign.replace(",", "");
      const payment2CommasRemoved =
        payment2PulledFromPTAXStringNoDollarSign.replace(",", "");
      const payment3CommasRemoved = payment3PulledFromNYSiteString.replace(
        ",",
        ""
      );
      const payment4CommasRemoved = payment4PulledFromNYSiteString.replace(
        ",",
        ""
      );

      //Now time to convert all of these strings to floats

      const payment1Float = parseFloat(payment1CommasRemoved);
      const payment2Float = parseFloat(payment2CommasRemoved);
      const payment3Float = parseFloat(payment3CommasRemoved);
      const payment4Float = parseFloat(payment4CommasRemoved);

      console.log("\n");
      console.log(
        "___________________________________________________________________________________________"
      );
      console.log(`Information for parcel: ${item}`);
      console.log("payment1Float", payment1Float);
      console.log("payment2Float", payment2Float);
      console.log("payment3Float", payment3Float);
      console.log("payment4Float", payment4Float);

      //if any of the payment numbers are 0, add to array for review to ensure it was correct:

      if (
        payment1Float === 0 ||
        payment2Float === 0 ||
        payment3Float === 0 ||
        payment4Float === 0
      ) {
        arrayOfParcelsNeedingReview.push(item);
      }

      //Now time to add all of these numbers together to get the total amount liability

      const totalAmountLiability =
        payment1Float + payment2Float + payment3Float + payment4Float;
      console.log("totalAmountLiability", totalAmountLiability);
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
      await driver.sleep(sleepDuration);

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
      await driver.sleep(sleepDuration);

      await driver.switchTo().defaultContent();
      await driver.switchTo().frame(0);
      sleepDuration = generateDelayNumber();
      await driver.sleep(sleepDuration);
    } catch (error) {
      arrayOfFailedParcels.push(item);
      console.log(`Failed to execute for parcel: ${item} \n`);
      console.error(error);
    }
  }
  if (arrayOfFailedParcels.length > 0) {
    console.log("The following parcels failed to complete data entry: \n");
    console.log(arrayOfFailedParcels);
  }
  if (arrayOfParcelsNeedingReview.length > 0) {
    console.log(
      "The following parcels need manual review to ensure accuracy: \n"
    );
    console.log(arrayOfParcelsNeedingReview);
  }
}

//dataEntryNYTaxBills109Montgomery(['3-1190-1101', '3-1190-1103', '3-1190-1104', '3-1190-1106', '3-1190-1107', '3-1190-1111', '3-1190-1112', '3-1190-1113', '3-1190-1114', '3-1190-1116', '3-1190-1117', '3-1190-1119', '3-1190-1120', '3-1190-1122', '3-1190-1124', '3-1190-1125', '3-1190-1132', '3-1190-1136', '3-1190-1139', '3-1190-1140', '3-1190-1141', '3-1190-1142', '3-1190-1143', '3-1190-1145', '3-1190-1146', '3-1190-1148', '3-1190-1152', '3-1190-1153', '3-1190-1154', '3-1190-1157', '3-1190-1158', '3-1190-1159', '3-1190-1160', '3-1190-1161', '3-1190-1162', '3-1190-1164', '3-1190-1165', '3-1190-1167', '3-1190-1168', '3-1190-1169', '3-1190-1170', '3-1190-1171', '3-1190-1173', '3-1190-1174', '3-1190-1175', '3-1190-1176', '3-1190-1177', '3-1190-1178', '3-1190-1179', '3-1190-1180', '3-1190-1181', '3-1190-1183', '3-1190-1186', '3-1190-1187', '3-1190-1188', '3-1190-1189', '3-1190-1190', '3-1190-1192', '3-1190-1193', '3-1190-1194', '3-1190-1195', '3-1190-1196', '3-1190-1197', '3-1190-1198', '3-1190-1199', '3-1190-1200', '3-1190-1202', '3-1190-1203', '3-1190-1204', '3-1190-1205', '3-1190-1206', '3-1190-1208', '3-1190-1209', '3-1190-1210', '3-1190-1211', '3-1190-1212', '3-1190-1213', '3-1190-1215', '3-1190-1216', '3-1190-1218', '3-1190-1219', '3-1190-1220', '3-1190-1222', '3-1190-1223', '3-1190-1225', '3-1190-1226', '3-1190-1227', '3-1190-1228', '3-1190-1229', '3-1190-1230', '3-1190-1231', '3-1190-1232', '3-1190-1234', '3-1190-1235', '3-1190-1236', '3-1190-1237', '3-1190-1238', '3-1190-1239', '3-1190-1240', '3-1190-1241', '3-1190-1242', '3-1190-1243', '3-1190-1244', '3-1190-1245', '3-1190-1246', '3-1190-1247', '3-1190-1248', '3-1190-1250', '3-1190-1251', '3-1190-1252', '3-1190-1253', '3-1190-1254', '3-1190-1255', '3-1190-1256', '3-1190-1257', '3-1190-1258', '3-1190-1259', '3-1190-1260', '3-1190-1261', '3-1190-1262', '3-1190-1264', '3-1190-7502'])

async function laCountyConfirmPayment(arrayOfParcels) {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.manage().window().setRect({ width: 1920, height: 1080 });

  await driver.get("https://vcheck.ttc.lacounty.gov/index.php");
  // MUST SCROLL DOWN AND CLICK CAPTCHA BOX, THEN SCRIPT WILL RUN REST AUTONOMOUSLY
  await driver.wait(until.urlContains("page=selections"));
  await driver
    .findElement(
      By.xpath(
        "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div[1]/div[2]/a[1]/div/span"
      )
    )
    .click();

  let arrayOfUnpaidParcels = [];
  let arrayOfPaidParcels = [];
  let arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    try {
      const mapBook = item.split("-")[0];
      const page = item.split("-")[1];
      const parcel = item.split("-")[2];

      await driver
        .findElement(
          By.xpath(
            "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/table[2]/tbody/tr[1]/td[2]/form/div[3]/input[1]"
          )
        )
        .sendKeys(mapBook);
      await driver
        .findElement(
          By.xpath(
            "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/table[2]/tbody/tr[1]/td[2]/form/div[3]/input[2]"
          )
        )
        .sendKeys(page);
      await driver
        .findElement(
          By.xpath(
            "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/table[2]/tbody/tr[1]/td[2]/form/div[3]/input[3]"
          )
        )
        .sendKeys(parcel, Key.RETURN);

      await driver
        .findElement(
          By.xpath(
            "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/table[2]/tbody/tr[1]/td[2]/form/table/tbody/tr/td[1]/input"
          )
        )
        .click();
      const paidAmount = await driver
        .findElement(
          By.xpath(
            "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div/table/tbody/tr[5]/td[2]"
          )
        )
        .getAttribute("innerText");

      if (paidAmount === "$0.00") {
        console.log(`Parcel: ${item} is not yet paid. \n`);
        arrayOfUnpaidParcels.push(item);
      } else {
        console.log(`Parcel: ${item} has paid ${paidAmount} so far. \n`);
        arrayOfPaidParcels.push(item);
      }

      await driver
        .findElement(
          By.xpath(
            "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div/input"
          )
        )
        .click();
      await driver
        .findElement(
          By.xpath(
            "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div[1]/div[2]/a/div/span"
          )
        )
        .click();
    } catch (error) {
      console.log(error);
      console.log(`Parcel ${item} failed, manually review`);
      arrayOfFailedParcels.push(item);
    }
  }
  console.log("The following parcels are unpaid: ", arrayOfUnpaidParcels, "\n");
  console.log("The following parcels paid: ", arrayOfPaidParcels, "\n");
  console.log(
    "The following parcels failed to process",
    arrayOfFailedParcels,
    "\n"
  );
}

async function check1stPaymentLA(arrayOfParcels) {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://vcheck.ttc.lacounty.gov/index.php");

  await driver.wait(
    until.urlIs("https://vcheck.ttc.lacounty.gov/proptax.php?page=screen")
  );

  const arrayOfPaidParcels = [];
  const arrayOfUnpaidParcels = [];

  for (const item of arrayOfParcels) {
    await driver.sleep(2000);
    console.log(`Working on parcel: ${item}`);

    const mapBookInput = await driver.findElement(By.name("mapbook"));
    const pageInput = await driver.findElement(By.name("page"));
    const parcelInput = await driver.findElement(By.name("parcel"));
    const submitButton = await driver.findElement(By.name("submit"));

    //split str to send to input field
    const splitParcelStr = item.split("-");
    const mapStr = splitParcelStr[0];
    const pageStr = splitParcelStr[1];
    const parcelStr = splitParcelStr[2];

    await mapBookInput.sendKeys(mapStr);
    await pageInput.sendKeys(pageStr);
    await parcelInput.sendKeys(parcelStr);

    await submitButton.click();

    //Should now be on next page
    await driver.wait(
      until.urlIs("https://vcheck.ttc.lacounty.gov/proptax.php?page=main")
    );

    const inquiryOnlyButton = await driver.findElement(By.id("inquirebutton"));
    await inquiryOnlyButton.click();

    //Should now be on payment page
    await driver.wait(
      until.urlIs(
        "https://vcheck.ttc.lacounty.gov/proptax.php?page=installments"
      )
    );

    const balanceDueElement = await driver.findElement(
      By.xpath(
        "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div/table/tbody/tr[6]/td[2]"
      )
    );
    const balanceDueStr = await balanceDueElement.getAttribute("innerText");

    if (balanceDueStr === "$0.00") {
      arrayOfPaidParcels.push(item);
    } else {
      arrayOfUnpaidParcels.push(item);
    }

    const selectAnotherAccountButton = await driver.findElement(
      By.xpath(
        "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div/input"
      )
    );
    await selectAnotherAccountButton.click();

    //Should now be on re-select-page
    await driver.wait(
      until.urlIs("https://vcheck.ttc.lacounty.gov/index.php?page=selections&")
    );
    const restartLoopButton = await driver.findElement(
      By.xpath(
        "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div[1]/div[2]/a"
      )
    );
    await restartLoopButton.click();

    //Should now be on page to search again
    await driver.wait(
      until.urlIs("https://vcheck.ttc.lacounty.gov/proptax.php?page=screen")
    );
  }

  //Now that loop is done, write results to a file

  const paidParcelsStringified = JSON.stringify(arrayOfPaidParcels);
  const unpaidParcelsStringified = JSON.stringify(arrayOfUnpaidParcels);

  if (paidParcelsStringified.length > 0) {
    fs.writeFileSync("paidLAParcels.json", paidParcelsStringified);
  }
  if (unpaidParcelsStringified.length > 0) {
    fs.writeFileSync("unpaidLAParcels.json", unpaidParcelsStringified);
  }
}

//check1stPaymentLA(['8701-027-031', '2849-025-001', '2849-025-002', '2849-025-003', '2849-025-007', '2849-025-010', '2849-025-011', '2849-025-012', '2849-025-013', '8318-020-011', '8318-020-048', '8701-027-028', '8701-027-029', '8701-027-030', '8701-027-031', '8701-027-032', '8285-020-034', '8285-020-035', '8285-020-037', '8285-020-039', '8285-020-041', '8285-020-042', '8285-020-043', '8285-020-044', '8285-020-045', '8285-020-048', '8285-020-049', '8285-020-050', '8285-020-051', '8285-020-054', '8285-020-055', '8285-020-056', '2038-040-006', '2038-040-007', '2038-040-011', '2038-040-012', '2038-040-013', '2038-040-014', '2038-040-016', '2038-040-018', '2038-040-019', '2038-040-021', '2038-040-024', '2038-040-027', '2038-040-028', '2038-040-029', '8639-017-025', '8639-017-034', '8639-017-035', '8639-017-036', '6270-020-040', '6270-020-041', '6270-020-042', '6270-020-043', '6270-020-044', '6270-020-045', '6270-020-046', '6270-020-048', '6270-020-049', '5815-020-030', '5815-020-031', '5815-020-032', '8900-762-954', '4149-005-040', '4149-005-041', '7550-019-018', '7134-016-040', '2168-027-025', '2038-040-015', '2038-040-022', '2038-040-031', '2038-040-032', '6270-020-047'])

async function pullOnlineBillsLA(arrayOfParcels) {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://vcheck.ttc.lacounty.gov/index.php");

  await driver.wait(
    until.urlIs("https://vcheck.ttc.lacounty.gov/proptax.php?page=screen")
  );

  const arrayOfParcelsBills = [];
  const arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    await driver.sleep(2000);
    console.log(`Working on parcel: ${item}`);

    const mapBookInput = await driver.findElement(By.name("mapbook"));
    const pageInput = await driver.findElement(By.name("page"));
    const parcelInput = await driver.findElement(By.name("parcel"));
    const submitButton = await driver.findElement(By.name("submit"));

    //split str to send to input field
    const splitParcelStr = item.split("-");
    const mapStr = splitParcelStr[0];
    const pageStr = splitParcelStr[1];
    const parcelStr = splitParcelStr[2];

    await mapBookInput.sendKeys(mapStr);
    await pageInput.sendKeys(pageStr);
    await parcelInput.sendKeys(parcelStr);

    await submitButton.click();

    //Should now be on next page
    await driver.wait(
      until.urlIs("https://vcheck.ttc.lacounty.gov/proptax.php?page=main")
    );

    const inquiryOnlyButton = await driver.findElement(By.id("inquirebutton"));
    await inquiryOnlyButton.click();

    //Should now be on payment page
    await driver.wait(
      until.urlIs(
        "https://vcheck.ttc.lacounty.gov/proptax.php?page=installments"
      )
    );

    try {
      const installmentOneTotalEle = await driver.findElement(
        By.xpath(
          "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div/table/tbody/tr[2]/td[2]"
        )
      );
      const installmentTwoTotalEle = await driver.findElement(
        By.xpath(
          "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div/table/tbody/tr[2]/td[5]"
        )
      );

      const installmentOneTotalStr = await installmentOneTotalEle.getAttribute(
        "innerText"
      );
      const installmentTwoTotalStr = await installmentTwoTotalEle.getAttribute(
        "innerText"
      );

      arrayOfParcelsBills.push(
        [item, "Installment One", installmentOneTotalStr],
        [item, "Installment Two", installmentTwoTotalStr]
      );
    } catch (error) {
      arrayOfFailedParcels.push(item);
      console.log("Failed to pull data for this parcel");
      console.log(error.message);
    }

    const selectAnotherAccountButton = await driver.findElement(
      By.xpath(
        "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div/input"
      )
    );
    await selectAnotherAccountButton.click();

    //Should now be on re-select-page
    await driver.wait(
      until.urlIs("https://vcheck.ttc.lacounty.gov/index.php?page=selections&")
    );
    const restartLoopButton = await driver.findElement(
      By.xpath(
        "/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div[1]/div[2]/a"
      )
    );
    await restartLoopButton.click();

    //Should now be on page to search again
    await driver.wait(
      until.urlIs("https://vcheck.ttc.lacounty.gov/proptax.php?page=screen")
    );
  }

  //Now that loop is done, write results to a file

  const arrayOfParcelsBillsStringified = JSON.stringify(arrayOfParcelsBills);
  const failedParcelsStringified = JSON.stringify(arrayOfFailedParcels);

  if (arrayOfParcelsBillsStringified !== "[]") {
    fs.writeFileSync(
      "arrayOfParcelsBills.json",
      arrayOfParcelsBillsStringified
    );
  }
  if (failedParcelsStringified !== "[]") {
    fs.writeFileSync("failedLAParcels.json", failedParcelsStringified);
  }
}

async function check1stPaymentOrangeCounty(arrayOfParcels) {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://tax.ocgov.com/tcweb/search_page.asp");

  const arrayOfParcelsBills = [];
  const arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    console.log(`Working on parcel: ${item}`);
    await driver.sleep(2000);

    const parcelNumberInput = await driver.findElement(By.name("t_parcel_no"));
    const searchButton = await driver.findElement(By.name("s_parcel"));

    await parcelNumberInput.sendKeys(item);
    await searchButton.click();

    await driver.wait(
      until.urlIs("https://tax.ocgov.com/tcweb/search_parcel.asp")
    );

    const statusElement = await driver.findElement(
      By.xpath(
        "/html/body/center/table/tbody/tr/td[2]/div/table/tbody/tr[3]/td/table/tbody/tr/td[5]/div[2]/table/tbody/tr[3]/td/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table/tbody/tr[4]/td[4]"
      )
    );
    const statusElementInnerText = await statusElement.getAttribute(
      "innerText"
    );

    if (statusElementInnerText.includes("FIRST INSTALLMENT PAID")) {
      console.log(`${item} is paid!`);
      arrayOfParcelsBills.push(item);
    } else {
      console.log(`${item} is unpaid!`);
      arrayOfFailedParcels.push(item);
    }
    await driver.navigate().back();
  }

  //Now that loop is done, write results to a file

  const arrayOfParcelsBillsStringified = JSON.stringify(arrayOfParcelsBills);
  const failedParcelsStringified = JSON.stringify(arrayOfFailedParcels);

  if (arrayOfParcelsBillsStringified !== "[]") {
    fs.writeFileSync(
      "arrayOfParcelsBills.json",
      arrayOfParcelsBillsStringified
    );
  }
  if (failedParcelsStringified !== "[]") {
    fs.writeFileSync("failedOCParcels.json", failedParcelsStringified);
  }
}

async function check1stPaymentRiversideCounty(arrayOfParcels) {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get(
    "https://ca-riverside-ttc.publicaccessnow.com/PropertySearch.aspx"
  );

  const arrayOfParcelsBills = [];
  const arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    console.log(`Working on parcel: ${item}`);
    await driver.sleep(2000);

    const parcelInputField = await driver.findElement(
      By.xpath(
        "/html/body/form/div[3]/div[5]/main/div/div[4]/div[1]/div[2]/div/div[1]/div/div/tr-quick-search-root/div/tr-container-component/div/ngb-tabset/div/div/div/span/tr-search-options/div/div/div/div[1]/div/kendo-panelbar/kendo-panelbar-item[2]/div/div/tr-search-options-field-component/div/input"
      )
    );
    const searchButton = await driver.findElement(
      By.xpath(
        "/html/body/form/div[3]/div[5]/main/div/div[4]/div[1]/div[2]/div/div[1]/div/div/tr-quick-search-root/div/tr-container-component/div/ngb-tabset/div/div/div/span/tr-search-options/div/div/div/div[2]/div[2]/button"
      )
    );

    await parcelInputField.sendKeys(Key.CONTROL, "a", Key.DELETE);
    await parcelInputField.sendKeys(item);
    await searchButton.click();

    await driver.wait(until.urlContains("?s=ParcelID"));
    await driver.sleep(4000);

    const viewAccountButton = await driver.findElement(
      By.xpath("//a[contains(text(), 'View Account')]")
    );
    await viewAccountButton.click();

    await driver.wait(until.urlContains("AccountSearch/AccountSummary"));

    let determineToContinue;

    try {
      const table2021TaxData = await driver.findElement(
        By.xpath(
          "/html/body/form/div[3]/div[5]/main/div/div/div[1]/div[4]/div/div/div/div/table[1]"
        )
      );
      determineToContinue = true;
    } catch (error) {
      determineToContinue = false;
      console.log(`${item}: 1st and 2nd installments are paid!`);
      arrayOfParcelsBills.push(item);
    }

    if (determineToContinue === true) {
      try {
        const installmentOneChecker = await table2021TaxData.findElement(
          By.xpath("//td[contains(text(), 'Installment #1')]")
        );
        console.log(`${item} is unpaid!`);
        arrayOfFailedParcels.push(item);
      } catch (error) {
        console.log(`${item} is paid!`);
        arrayOfParcelsBills.push(item);
      }
    }

    const backButton = await driver.findElement(
      By.xpath(
        "/html/body/form/div[3]/div[5]/main/div/div/div[1]/div[2]/div/div/div/center/div/div"
      )
    );
    await backButton.click();
  }

  const arrayOfParcelsBillsStringified = JSON.stringify(arrayOfParcelsBills);
  const failedParcelsStringified = JSON.stringify(arrayOfFailedParcels);

  if (arrayOfParcelsBillsStringified !== "[]") {
    fs.writeFileSync(
      "arrayOfParcelsBills.json",
      arrayOfParcelsBillsStringified
    );
  }
  if (failedParcelsStringified !== "[]") {
    fs.writeFileSync("failedOCParcels.json", failedParcelsStringified);
  }
}

async function check1stPaymentSanBernardinoCounty(arrayOfParcels) {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://www.mytaxcollector.com/trSearch.aspx");

  const arrayOfParcelsBills = [];
  const arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    console.log(`Working on parcel: ${item}`);
    await driver.sleep(2000);

    let itemDashesRemoved = item.split("-").join("");
    const parcelInputField = await driver.findElement(
      By.name("txtParcelNumber")
    );
    await parcelInputField.sendKeys(Key.CONTROL, "a", Key.DELETE);
    await parcelInputField.sendKeys(itemDashesRemoved);

    const searchButton = await driver.findElement(
      By.name("ctl00$contentHolder$cmdSearch")
    );
    await searchButton.click();

    const proccedToPayBillsBtn = await driver.findElement(
      By.id("cmdProceedToBills")
    );
    await proccedToPayBillsBtn.click();

    await driver.wait(until.urlContains("trPropInfo_CurrentTaxes.aspx"));

    //Check if all installments paid
    try {
      const allBillsPaidChecker = await driver.findElement(
        By.xpath(
          "//h4[contains(text(), 'There are no bills at this time that are due for the current tax year.')]"
        )
      );
      console.log(`${item} is paid!`);
      arrayOfParcelsBills.push(item);
    } catch (error) {
      console.log(`${item} has atleast one bill due`);
    }

    //Check if atleast 1st installment paid
    try {
      const firstBillPaidChecker = await driver.findElement(
        By.xpath("//font[contains(text(), 'Installment 1')]")
      );
      console.log(`${item} is unpaid!`);
      arrayOfFailedParcels.push(item);
    } catch (error) {
      console.log(`${item} 1st installment is paid!`);
      arrayOfParcelsBills.push(item);
    }

    await driver.sleep(15000);

    await driver.navigate().back();
    await driver.navigate().back();
  }

  const arrayOfParcelsBillsStringified = JSON.stringify(arrayOfParcelsBills);
  const failedParcelsStringified = JSON.stringify(arrayOfFailedParcels);

  if (arrayOfParcelsBillsStringified !== "[]") {
    fs.writeFileSync(
      "arrayOfParcelsBills.json",
      arrayOfParcelsBillsStringified
    );
  }
  if (failedParcelsStringified !== "[]") {
    fs.writeFileSync("failedOCParcels.json", failedParcelsStringified);
  }
}

async function check1stPaymentSanDiegoCounty(arrayOfParcels) {
  let driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://iwr.sdttc.com/paymentapplication/Search.aspx");

  const arrayOfParcelsBills = [];
  const arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    console.log(`Working on parcel: ${item}`);
    await driver.sleep(2000);

    const accordionElement = await driver.findElement(
      By.id("PaymentApplicationContent_lblSearchOption2")
    );
    await accordionElement.click();

    await driver.sleep(4000);

    let itemDashesRemoved = item.split("-").join("");
    const parcelInputField = await driver.findElement(
      By.name("ctl00$PaymentApplicationContent$tbParcelNumber")
    );
    await parcelInputField.sendKeys(Key.CONTROL, "a", Key.DELETE);
    await parcelInputField.sendKeys(itemDashesRemoved);

    const searchButton = await driver.findElement(
      By.name("ctl00$PaymentApplicationContent$btnSubmitOption2")
    );
    await searchButton.click();

    let continueExecution;

    try {
      await driver.findElement(
        By.id("PaymentApplicationContent_litSearchError2")
      );
      console.log(`${item} is not found in database!`);
      arrayOfFailedParcels.push(item);
      continueExecution = false;
    } catch (error) {
      console.log("looks like no search error, continuing");
      continueExecution = true;
    }

    if (continueExecution === true) {
      await driver.wait(
        until.urlIs(
          "https://iwr.sdttc.com/paymentapplication/SearchResults.aspx"
        )
      );

      await driver.sleep(5000);

      try {
        const paidChecker = await driver.findElement(
          By.xpath(
            "/html/body/form/div[3]/div[3]/div[2]/div[2]/div[5]/div[2]/div/table/tbody/tr[2]/td[9]"
          )
        );
        const paidCheckerInnerText = await paidChecker.getAttribute(
          "innerText"
        );
        if (paidCheckerInnerText === "DUE") {
          console.log(`${item} is unpaid!`);
          arrayOfFailedParcels.push(item);
        } else {
          console.log(`${item} 1st installment is paid!`);
          arrayOfParcelsBills.push(item);
        }
      } catch (error) {
        console.log("some error in finding status");
      }

      const startNewSearchBtn = await driver.findElement(
        By.id("PaymentApplicationContent_btnSearch")
      );
      await startNewSearchBtn.click();

      await driver.wait(
        until.urlIs("https://iwr.sdttc.com/paymentapplication/Search.aspx")
      );
    } else {
      await driver.get("https://iwr.sdttc.com/paymentapplication/Search.aspx");
    }
  }
}

check1stPaymentSanDiegoCounty([
  "158-390-18-00",
  "158-390-19-00",
  "743-0108908",
  "557-322-14-00",
  "557-322-15-00",
  "557-351-11-00",
  "274-912-38-00",
  "317-820-04-00",
  "317-820-05-00",
  "317-820-06-00",
  "317-820-07-00",
  "317-820-08-00",
  "317-820-09-00",
  "356-230-29-00",
  "356-230-30-00",
  "356-230-31-00",
  "356-230-32-00",
  "158-390-02-00",
  "158-390-06-00",
  "158-390-07-00",
  "158-390-08-00",
  "158-390-11-00",
  "158-390-16-00",
  "158-390-18-00",
  "158-390-19-00",
  "345-221-12-00",
  "307-350-24-00",
]);
