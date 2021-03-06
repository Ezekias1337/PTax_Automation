const {Builder, By, Key, until} = require ('selenium-webdriver');
const chrome = require ('selenium-webdriver/chrome');
const fs = require ('fs');
const {Driver} = require ('selenium-webdriver/chromium');
const webdriver = require ('selenium-webdriver');
const request = require ('request');
//const options = new chrome.Options()

function generateDelayNumber () {
  const amountToSleep = Math.floor (
    Math.random () * (35000 - 13000 + 1) + 13000
  );
  console.log (`Sleeping for: ${amountToSleep / 1000} seconds.`, amountToSleep);
  return amountToSleep;
}

async function updatePropertyPOC (property, producingLeader, producer) {
  const propertyXPath = `//*[text()='${property}']`;

  let driver = await new Builder ().forBrowser ('chrome').build ();
  await driver.get ('https://ptax.ptaxsolution.com/Default.aspx');

  //await driver.manage().window().fullscreen();

  await driver.findElement (By.name ('txtUserName')).sendKeys ('fedwards');
  await driver
    .findElement (By.name ('txtPassword'))
    .sendKeys ('p@ssw0rd', Key.RETURN);

  //swap to iframe
  await driver.switchTo ().frame (0);

  //swaps back to normal if needed for later
  /* await driver.switchTo().defaultContent(); */

  let checkBox = await driver.wait (
    until.elementLocated (By.name ('CheckMyProperties'))
  );
  await driver.findElement (By.id ('CheckMyProperties')).click ();

  await driver
    .findElement (By.xpath ('/html/body/form/div[4]/ul/li[24]/div/span[2]'))
    .click ();
  /* "fmeMain" */

  let propertyToClick = await driver.wait (
    until.elementLocated (By.xpath (propertyXPath))
  );
  await propertyToClick.click ();

  await driver.switchTo ().defaultContent ();
  // Store the web element
  const iframe = driver.findElement (By.css ('#fmeMain'));
  // Switch to the frame
  await driver.switchTo ().frame (iframe);

  let editPropertyButton = await driver.wait (
    until.elementLocated (
      By.xpath (
        '/html/body/form/div[4]/table/tbody/tr/td[1]/table[1]/tbody/tr[3]/td[2]/span/button'
      )
    )
  );
  await editPropertyButton.click ();

  let clientPOC = await driver.wait (
    until.elementLocated (
      By.xpath (
        '/html/body/form/div[14]/table/tbody/tr[3]/td[2]/select/option[24]'
      )
    )
  );
  await clientPOC.click ();

  if (producingLeader === 'Nick') {
    const producingLeaderXPath =
      '/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[18]';
    let producingOfficerLeader = await driver.wait (
      until.elementLocated (By.xpath (producingLeaderXPath))
    );
    await producingOfficerLeader.click ();
  } else if (producingLeader === 'Tim') {
    const producingLeaderXPath =
      '/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[23]';
    let producingOfficerLeader = await driver.wait (
      until.elementLocated (By.xpath (producingLeaderXPath))
    );
    await producingOfficerLeader.click ();
  } else if (producingLeader === 'Chelley') {
    const producingLeaderXPath =
      '/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[5]';
    let producingOfficerLeader = await driver.wait (
      until.elementLocated (By.xpath (producingLeaderXPath))
    );
    await producingOfficerLeader.click ();
  } else if (producingLeader === 'Chelsea') {
    const producingLeaderXPath =
      '/html/body/form/div[14]/table/tbody/tr[4]/td[2]/select/option[6]';
    let producingOfficerLeader = await driver.wait (
      until.elementLocated (By.xpath (producingLeaderXPath))
    );
    await producingOfficerLeader.click ();
  }

  if (producer === 'Chase') {
    const producerXPath =
      '/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[4]';
    let producerToClick = await driver.wait (
      until.elementLocated (By.xpath (producerXPath))
    );
    await producerToClick.click ();
  } else if (producer === 'Justin') {
    const producerXPath =
      '/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[15]';
    let producerToClick = await driver.wait (
      until.elementLocated (By.xpath (producerXPath))
    );
    await producerToClick.click ();
  } else if (producer === 'David') {
    const producerXPath =
      '/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[8]';
    let producerToClick = await driver.wait (
      until.elementLocated (By.xpath (producerXPath))
    );
    await producerToClick.click ();
  } else if (producer === 'Jenn') {
    const producerXPath =
      '/html/body/form/div[14]/table/tbody/tr[5]/td[2]/select/option[13]';
    let producerToClick = await driver.wait (
      until.elementLocated (By.xpath (producerXPath))
    );
    await producerToClick.click ();
  }

  await driver.findElement (By.id ('SaveButton')).click ();
}

//updatePropertyPOC('The Globe','Tim','Justin');

async function dataEntryNYTaxBillsTrumpSoho (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  let sleepDuration;
  await driver.manage ().window ().setRect ({width: 1920, height: 1080});
  //await driver.switchTo().newWindow('tab');
  const nyTaxBillWebsite = await driver.getWindowHandle ();
  await driver.get (
    'https://a836-pts-access.nyc.gov/care/search/commonsearch.aspx?mode=persprop'
  );
  await driver.findElement (By.id ('btAgree')).click ();
  await driver.switchTo ().newWindow ('tab');
  const ptaxWindow = await driver.getWindowHandle ();
  await driver.get ('https://ptax.ptaxsolution.com/Default.aspx');

  await driver.findElement (By.name ('txtUserName')).sendKeys ('fedwards');
  await driver
    .findElement (By.name ('txtPassword'))
    .sendKeys ('p@ssw0rd', Key.RETURN);
  //swap to iframe
  await driver.switchTo ().frame (0);

  //swaps back to normal if needed for later
  /* await driver.switchTo().defaultContent(); */

  let checkBox = await driver.wait (
    until.elementLocated (By.name ('CheckMyProperties'))
  );
  await driver.findElement (By.id ('CheckMyProperties')).click ();

  await driver
    .findElement (By.xpath ('/html/body/form/div[4]/ul/li[24]/div/span[2]'))
    .click ();
  /* "fmeMain" */

  let propertyToClick = await driver.wait (
    until.elementLocated (
      By.xpath ('/html/body/form/div[4]/ul/li[24]/ul/li[266]/div/span[2]')
    )
  );
  await propertyToClick.click ();
  // Opens a new tab and switches to new tab

  let arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    console.log (`Currently working on parcel: ${item} \n`);
    try {
      await driver.switchTo ().window (nyTaxBillWebsite);

      const boroughNumber = item.split ('-')[0];
      const blockNumber = item.split ('-')[1];
      const lotNumber = item.split ('-')[2];

      if (boroughNumber === '1') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[2]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '2') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[3]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '3') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[4]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '4') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[5]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '5') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[6]'
              )
            )
          )
          .click ();
      }

      await driver
        .wait (until.elementLocated (By.id ('inpTag')))
        .sendKeys (blockNumber);

      await driver
        .wait (until.elementLocated (By.id ('inpStat')))
        .sendKeys (lotNumber);

      await driver.wait (until.elementLocated (By.id ('btSearch'))).click ();

      // Click account history tab
      const accountHistoryTab = await driver.wait (
        until.elementLocated (
          By.css ('#sidemenu > ul > li:nth-child(3) > a > span')
        )
      );
      //console.log("accountHistoryTab", accountHistoryTab)

      accountHistoryTab.click ();

      const payment3PulledFromNYSiteString = await driver
        .wait (
          until.elementLocated (
            By.xpath (
              '/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[3]/td[8]'
            )
          )
        )
        .getAttribute ('innerText');
      const payment4PulledFromNYSiteString = await driver
        .wait (
          until.elementLocated (
            By.xpath (
              '/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[2]/td[8]'
            )
          )
        )
        .getAttribute ('innerText');

      /* 
                Now need to add together payment 3/4 from website and then get payment 1/2 from ptax, add all numbers together, this gives total amount liability
            */

      // Go back two pages to get tab ready for next parcel
      await driver.navigate ().back ();
      await driver.navigate ().back ();

      await driver.switchTo ().window (ptaxWindow);
      await driver.switchTo ().defaultContent ();
      await driver.switchTo ().frame (0);

      const parcelSplitFromBorough = blockNumber.concat ('-', lotNumber);
      const parcelXPath = `//*[text()='${parcelSplitFromBorough + ' (Pay by Electronic Funds Transfer)'}']`;
      const parcelToClick = await driver.wait (
        until.elementLocated (By.xpath (parcelXPath))
      );
      await parcelToClick.click ();

      const taxBillDrivenTabXPath = `//*[text()='${'Tax Bill Driven'}']`;
      //const editTaxAssessmentButtonXPath = `//*[text()='${"1/1/2021"}']`;

      await driver.switchTo ().defaultContent ();
      const iframe = await driver.findElement (By.id ('fmeMain'));
      await driver.switchTo ().frame (iframe);

      const taxBillDrivenTabButtonToClick = await driver.wait (
        until.elementLocated (By.xpath (taxBillDrivenTabXPath))
      );
      await taxBillDrivenTabButtonToClick.click ();

      const taxAssessmentButtonToClick = await driver.wait (
        until.elementLocated (
          By.xpath (
            '/html/body/form/div[5]/div[1]/div[1]/table/tbody/tr[1]/td[4]/a'
          )
        )
      );
      await taxAssessmentButtonToClick.click ();

      const payment1PulledFromPTAXString = await driver
        .wait (until.elementLocated (By.id ('tbBasePaymentAmount1')))
        .getAttribute ('value');
      const payment2PulledFromPTAXString = await driver
        .wait (until.elementLocated (By.id ('tbBasePaymentAmount2')))
        .getAttribute ('value');

      //Now start parsing values scraped from both sources into numbers so calculations can be performed

      //Payments pulled from PTax have a leading $ so need to remove that
      payment1PulledFromPTAXStringNoDollarSign = payment1PulledFromPTAXString.replace (
        '$',
        ''
      );
      payment2PulledFromPTAXStringNoDollarSign = payment2PulledFromPTAXString.replace (
        '$',
        ''
      );

      //Now strings should be on even footing, time to get rid of commas

      const payment1CommasRemoved = payment1PulledFromPTAXStringNoDollarSign.replace (
        ',',
        ''
      );
      const payment2CommasRemoved = payment2PulledFromPTAXStringNoDollarSign.replace (
        ',',
        ''
      );
      const payment3CommasRemoved = payment3PulledFromNYSiteString.replace (
        ',',
        ''
      );
      const payment4CommasRemoved = payment4PulledFromNYSiteString.replace (
        ',',
        ''
      );

      //Now time to convert all of these strings to floats

      const payment1Float = parseFloat (payment1CommasRemoved);
      const payment2Float = parseFloat (payment2CommasRemoved);
      const payment3Float = parseFloat (payment3CommasRemoved);
      const payment4Float = parseFloat (payment4CommasRemoved);

      console.log ('\n');
      console.log (
        '___________________________________________________________________________________________'
      );
      console.log (`Information for parcel: ${item}`);
      console.log ('payment1Float', payment1Float);
      console.log ('payment2Float', payment2Float);
      console.log ('payment3Float', payment3Float);
      console.log ('payment4Float', payment4Float);

      //Now time to add all of these numbers together to get the total amount liability

      const totalAmountLiability =
        payment1Float + payment2Float + payment3Float + payment4Float;
      console.log ('totalAmountLiability', totalAmountLiability);
      console.log ('\n');

      const totalAmountLiabilityString = totalAmountLiability.toString ();

      //Now that we have all of the values we need, send keys to total Liability field and then save

      const tbTotalTaxLiabilityField = await driver.wait (
        until.elementLocated (By.id ('tbTotalTaxLiability'))
      );
      const saveTaxLiabilityButton = await driver.wait (
        until.elementLocated (By.id ('btnSaveLiability'))
      );

      await tbTotalTaxLiabilityField.sendKeys (Key.CONTROL, 'a');
      await tbTotalTaxLiabilityField.sendKeys (Key.DELETE);
      await tbTotalTaxLiabilityField.sendKeys (totalAmountLiabilityString);
      await saveTaxLiabilityButton.click ();

      //Now that the value is saved, wait for loading before proceeding

      sleepDuration = generateDelayNumber ();
      await driver.sleep (sleepDuration);

      //Now that wait is done, send keys to payments 3 and 4, and then save

      const payment3FinalPayment = await driver.wait (
        until.elementLocated (By.id ('tbBasePaymentAmount3'))
      );
      const payment3BasePayment = await driver.wait (
        until.elementLocated (By.id ('tbBaseAmountTransmittal3'))
      );
      const payment4FinalPayment = await driver.wait (
        until.elementLocated (By.id ('tbBasePaymentAmount4'))
      );
      const payment4BasePayment = await driver.wait (
        until.elementLocated (By.id ('tbBaseAmountTransmittal4'))
      );
      const saveAllPaymentsButton = await driver.wait (
        until.elementLocated (By.id ('btnSaveALLPayment'))
      );

      await payment3FinalPayment.sendKeys (Key.CONTROL, 'a');
      await payment3FinalPayment.sendKeys (Key.DELETE);
      await payment3FinalPayment.sendKeys (payment3CommasRemoved);

      await payment3BasePayment.sendKeys (Key.CONTROL, 'a');
      await payment3BasePayment.sendKeys (Key.DELETE);
      await payment3BasePayment.sendKeys (payment3CommasRemoved);

      await payment4FinalPayment.sendKeys (Key.CONTROL, 'a');
      await payment4FinalPayment.sendKeys (Key.DELETE);
      await payment4FinalPayment.sendKeys (payment4CommasRemoved);

      await payment4BasePayment.sendKeys (Key.CONTROL, 'a');
      await payment4BasePayment.sendKeys (Key.DELETE);
      await payment4BasePayment.sendKeys (payment4CommasRemoved);

      await saveAllPaymentsButton.click ();

      //Now wait some seconds before attempting to swap frames
      sleepDuration = generateDelayNumber ();
      await driver.sleep (sleepDuration);

      await driver.switchTo ().defaultContent ();
      await driver.switchTo ().frame (0);
      sleepDuration = generateDelayNumber ();
      await driver.sleep (sleepDuration);
    } catch (error) {
      arrayOfFailedParcels.push (item);
      console.log (`Failed to execute for parcel: ${item} \n`);
      console.error (error);
    }
  }
  if (arrayOfFailedParcels.length > 0) {
    console.log ('The following parcels failed to complete data entry: \n');
    console.log (arrayOfFailedParcels);
  }
}

async function dataEntryNYTaxBills109Montgomery (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  let sleepDuration;
  await driver.manage ().window ().setRect ({width: 1920, height: 1080});
  //await driver.switchTo().newWindow('tab');
  const nyTaxBillWebsite = await driver.getWindowHandle ();
  await driver.get (
    'https://a836-pts-access.nyc.gov/care/search/commonsearch.aspx?mode=persprop'
  );
  await driver.findElement (By.id ('btAgree')).click ();
  await driver.switchTo ().newWindow ('tab');
  const ptaxWindow = await driver.getWindowHandle ();
  await driver.get ('https://ptax.ptaxsolution.com/Default.aspx');

  await driver.findElement (By.name ('txtUserName')).sendKeys ('fedwards');
  await driver
    .findElement (By.name ('txtPassword'))
    .sendKeys ('p@ssw0rd', Key.RETURN);
  //swap to iframe
  await driver.switchTo ().frame (0);

  //swaps back to normal if needed for later
  /* await driver.switchTo().defaultContent(); */

  let checkBox = await driver.wait (
    until.elementLocated (By.name ('CheckMyProperties'))
  );
  await driver.findElement (By.id ('CheckMyProperties')).click ();

  await driver
    .findElement (By.xpath ('/html/body/form/div[4]/ul/li[24]/div/span[2]'))
    .click ();

  let propertyToClick = await driver.wait (
    until.elementLocated (
      By.xpath ('/html/body/form/div[4]/ul/li[24]/ul/li[7]/div/span[2]')
    )
  );
  await propertyToClick.click ();
  // Opens a new tab and switches to new tab

  let arrayOfFailedParcels = [];
  let arrayOfParcelsNeedingReview = [];

  for (const item of arrayOfParcels) {
    console.log (`Currently working on parcel: ${item} \n`);
    try {
      await driver.switchTo ().window (nyTaxBillWebsite);

      const boroughNumber = item.split ('-')[0];
      const blockNumber = item.split ('-')[1];
      const lotNumber = item.split ('-')[2];

      if (boroughNumber === '1') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[2]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '2') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[3]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '3') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[4]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '4') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[5]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '5') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[6]'
              )
            )
          )
          .click ();
      }

      await driver
        .wait (until.elementLocated (By.id ('inpTag')))
        .sendKeys (blockNumber);

      await driver
        .wait (until.elementLocated (By.id ('inpStat')))
        .sendKeys (lotNumber);

      await driver.wait (until.elementLocated (By.id ('btSearch'))).click ();

      // Click account history tab
      const accountHistoryTab = await driver.wait (
        until.elementLocated (
          By.css ('#sidemenu > ul > li:nth-child(3) > a > span')
        )
      );
      //console.log("accountHistoryTab", accountHistoryTab)

      accountHistoryTab.click ();

      const payment3PulledFromNYSiteString = await driver
        .wait (
          until.elementLocated (
            By.xpath (
              '/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[3]/td[8]'
            )
          )
        )
        .getAttribute ('innerText');
      const payment4PulledFromNYSiteString = await driver
        .wait (
          until.elementLocated (
            By.xpath (
              '/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[2]/td[8]'
            )
          )
        )
        .getAttribute ('innerText');

      /* 
                Now need to add together payment 3/4 from website and then get payment 1/2 from ptax, add all numbers together, this gives total amount liability
            */

      // Go back two pages to get tab ready for next parcel
      await driver.navigate ().back ();
      await driver.navigate ().back ();

      await driver.switchTo ().window (ptaxWindow);
      await driver.switchTo ().defaultContent ();
      await driver.switchTo ().frame (0);

      const parcelSplitFromBorough = blockNumber.concat ('-', lotNumber);
      const parcelXPath = `//*[text()='${item + ' (Pay by Electronic Funds Transfer)'}']`;
      const parcelToClick = await driver.wait (
        until.elementLocated (By.xpath (parcelXPath))
      );
      await parcelToClick.click ();

      const taxBillDrivenTabXPath = `//*[text()='${'Tax Bill Driven'}']`;
      //const editTaxAssessmentButtonXPath = `//*[text()='${"1/1/2021"}']`;

      await driver.switchTo ().defaultContent ();
      const iframe = await driver.findElement (By.id ('fmeMain'));
      await driver.switchTo ().frame (iframe);

      const taxBillDrivenTabButtonToClick = await driver.wait (
        until.elementLocated (By.xpath (taxBillDrivenTabXPath))
      );
      await taxBillDrivenTabButtonToClick.click ();

      const taxAssessmentButtonToClick = await driver.wait (
        until.elementLocated (
          By.xpath (
            '/html/body/form/div[5]/div[1]/div[1]/table/tbody/tr[1]/td[4]/a'
          )
        )
      );
      await taxAssessmentButtonToClick.click ();

      const payment1PulledFromPTAXString = await driver
        .wait (until.elementLocated (By.id ('tbBasePaymentAmount1')))
        .getAttribute ('value');
      const payment2PulledFromPTAXString = await driver
        .wait (until.elementLocated (By.id ('tbBasePaymentAmount2')))
        .getAttribute ('value');

      //Now start parsing values scraped from both sources into numbers so calculations can be performed

      //Payments pulled from PTax have a leading $ so need to remove that
      payment1PulledFromPTAXStringNoDollarSign = payment1PulledFromPTAXString.replace (
        '$',
        ''
      );
      payment2PulledFromPTAXStringNoDollarSign = payment2PulledFromPTAXString.replace (
        '$',
        ''
      );

      //Now strings should be on even footing, time to get rid of commas

      const payment1CommasRemoved = payment1PulledFromPTAXStringNoDollarSign.replace (
        ',',
        ''
      );
      const payment2CommasRemoved = payment2PulledFromPTAXStringNoDollarSign.replace (
        ',',
        ''
      );
      const payment3CommasRemoved = payment3PulledFromNYSiteString.replace (
        ',',
        ''
      );
      const payment4CommasRemoved = payment4PulledFromNYSiteString.replace (
        ',',
        ''
      );

      //Now time to convert all of these strings to floats

      const payment1Float = parseFloat (payment1CommasRemoved);
      const payment2Float = parseFloat (payment2CommasRemoved);
      const payment3Float = parseFloat (payment3CommasRemoved);
      const payment4Float = parseFloat (payment4CommasRemoved);

      console.log ('\n');
      console.log (
        '___________________________________________________________________________________________'
      );
      console.log (`Information for parcel: ${item}`);
      console.log ('payment1Float', payment1Float);
      console.log ('payment2Float', payment2Float);
      console.log ('payment3Float', payment3Float);
      console.log ('payment4Float', payment4Float);

      //if any of the payment numbers are 0, add to array for review to ensure it was correct:

      if (
        payment1Float === 0 ||
        payment2Float === 0 ||
        payment3Float === 0 ||
        payment4Float === 0
      ) {
        arrayOfParcelsNeedingReview.push (item);
      }

      //Now time to add all of these numbers together to get the total amount liability

      const totalAmountLiability =
        payment1Float + payment2Float + payment3Float + payment4Float;
      console.log ('totalAmountLiability', totalAmountLiability);
      console.log ('\n');

      const totalAmountLiabilityString = totalAmountLiability.toString ();

      //Now that we have all of the values we need, send keys to total Liability field and then save

      const tbTotalTaxLiabilityField = await driver.wait (
        until.elementLocated (By.id ('tbTotalTaxLiability'))
      );
      const saveTaxLiabilityButton = await driver.wait (
        until.elementLocated (By.id ('btnSaveLiability'))
      );

      await tbTotalTaxLiabilityField.sendKeys (Key.CONTROL, 'a');
      await tbTotalTaxLiabilityField.sendKeys (Key.DELETE);
      await tbTotalTaxLiabilityField.sendKeys (totalAmountLiabilityString);
      await saveTaxLiabilityButton.click ();

      //Now that the value is saved, wait for loading before proceeding

      sleepDuration = generateDelayNumber ();
      await driver.sleep (sleepDuration);

      //Now that wait is done, send keys to payments 3 and 4, and then save

      const payment3FinalPayment = await driver.wait (
        until.elementLocated (By.id ('tbBasePaymentAmount3'))
      );
      const payment3BasePayment = await driver.wait (
        until.elementLocated (By.id ('tbBaseAmountTransmittal3'))
      );
      const payment4FinalPayment = await driver.wait (
        until.elementLocated (By.id ('tbBasePaymentAmount4'))
      );
      const payment4BasePayment = await driver.wait (
        until.elementLocated (By.id ('tbBaseAmountTransmittal4'))
      );
      const saveAllPaymentsButton = await driver.wait (
        until.elementLocated (By.id ('btnSaveALLPayment'))
      );

      await payment3FinalPayment.sendKeys (Key.CONTROL, 'a');
      await payment3FinalPayment.sendKeys (Key.DELETE);
      await payment3FinalPayment.sendKeys (payment3CommasRemoved);

      await payment3BasePayment.sendKeys (Key.CONTROL, 'a');
      await payment3BasePayment.sendKeys (Key.DELETE);
      await payment3BasePayment.sendKeys (payment3CommasRemoved);

      await payment4FinalPayment.sendKeys (Key.CONTROL, 'a');
      await payment4FinalPayment.sendKeys (Key.DELETE);
      await payment4FinalPayment.sendKeys (payment4CommasRemoved);

      await payment4BasePayment.sendKeys (Key.CONTROL, 'a');
      await payment4BasePayment.sendKeys (Key.DELETE);
      await payment4BasePayment.sendKeys (payment4CommasRemoved);

      await saveAllPaymentsButton.click ();

      //Now wait some seconds before attempting to swap frames
      sleepDuration = generateDelayNumber ();
      await driver.sleep (sleepDuration);

      await driver.switchTo ().defaultContent ();
      await driver.switchTo ().frame (0);
      sleepDuration = generateDelayNumber ();
      await driver.sleep (sleepDuration);
    } catch (error) {
      arrayOfFailedParcels.push (item);
      console.log (`Failed to execute for parcel: ${item} \n`);
      console.error (error);
    }
  }
  if (arrayOfFailedParcels.length > 0) {
    console.log ('The following parcels failed to complete data entry: \n');
    console.log (arrayOfFailedParcels);
  }
  if (arrayOfParcelsNeedingReview.length > 0) {
    console.log (
      'The following parcels need manual review to ensure accuracy: \n'
    );
    console.log (arrayOfParcelsNeedingReview);
  }
}

async function check1stPaymentLA (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  await driver.get ('https://vcheck.ttc.lacounty.gov/index.php');

  await driver.wait (
    until.urlIs ('https://vcheck.ttc.lacounty.gov/proptax.php?page=screen')
  );

  const arrayOfPaidParcels = [];
  const arrayOfUnpaidParcels = [];

  for (const item of arrayOfParcels) {
    await driver.sleep (2000);
    console.log (`Working on parcel: ${item}`);

    const mapBookInput = await driver.findElement (By.name ('mapbook'));
    const pageInput = await driver.findElement (By.name ('page'));
    const parcelInput = await driver.findElement (By.name ('parcel'));
    const submitButton = await driver.findElement (By.name ('submit'));

    //split str to send to input field
    const splitParcelStr = item.split ('-');
    const mapStr = splitParcelStr[0];
    const pageStr = splitParcelStr[1];
    const parcelStr = splitParcelStr[2];

    await mapBookInput.sendKeys (mapStr);
    await pageInput.sendKeys (pageStr);
    await parcelInput.sendKeys (parcelStr);

    await submitButton.click ();

    //Should now be on next page
    await driver.wait (
      until.urlIs ('https://vcheck.ttc.lacounty.gov/proptax.php?page=main')
    );

    const inquiryOnlyButton = await driver.findElement (
      By.id ('inquirebutton')
    );
    await inquiryOnlyButton.click ();

    //Should now be on payment page
    await driver.wait (
      until.urlIs (
        'https://vcheck.ttc.lacounty.gov/proptax.php?page=installments'
      )
    );

    const balanceDueElement = await driver.findElement (
      By.xpath (
        '/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div/table/tbody/tr[6]/td[2]'
      )
    );
    const balanceDueStr = await balanceDueElement.getAttribute ('innerText');

    if (balanceDueStr === '$0.00') {
      arrayOfPaidParcels.push (item);
    } else {
      arrayOfUnpaidParcels.push (item);
    }

    const selectAnotherAccountButton = await driver.findElement (
      By.xpath (
        '/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div/input'
      )
    );
    await selectAnotherAccountButton.click ();

    //Should now be on re-select-page
    await driver.wait (
      until.urlIs ('https://vcheck.ttc.lacounty.gov/index.php?page=selections&')
    );
    const restartLoopButton = await driver.findElement (
      By.xpath (
        '/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div[1]/div[2]/a'
      )
    );
    await restartLoopButton.click ();

    //Should now be on page to search again
    await driver.wait (
      until.urlIs ('https://vcheck.ttc.lacounty.gov/proptax.php?page=screen')
    );
  }

  //Now that loop is done, write results to a file

  const paidParcelsStringified = JSON.stringify (arrayOfPaidParcels);
  const unpaidParcelsStringified = JSON.stringify (arrayOfUnpaidParcels);

  if (paidParcelsStringified.length > 0) {
    fs.writeFileSync ('paidLAParcels.json', paidParcelsStringified);
  }
  if (unpaidParcelsStringified.length > 0) {
    fs.writeFileSync ('unpaidLAParcels.json', unpaidParcelsStringified);
  }
}

//check1stPaymentLA(['8701-027-031', '2849-025-001', '2849-025-002', '2849-025-003', '2849-025-007', '2849-025-010', '2849-025-011', '2849-025-012', '2849-025-013', '8318-020-011', '8318-020-048', '8701-027-028', '8701-027-029', '8701-027-030', '8701-027-031', '8701-027-032', '8285-020-034', '8285-020-035', '8285-020-037', '8285-020-039', '8285-020-041', '8285-020-042', '8285-020-043', '8285-020-044', '8285-020-045', '8285-020-048', '8285-020-049', '8285-020-050', '8285-020-051', '8285-020-054', '8285-020-055', '8285-020-056', '2038-040-006', '2038-040-007', '2038-040-011', '2038-040-012', '2038-040-013', '2038-040-014', '2038-040-016', '2038-040-018', '2038-040-019', '2038-040-021', '2038-040-024', '2038-040-027', '2038-040-028', '2038-040-029', '8639-017-025', '8639-017-034', '8639-017-035', '8639-017-036', '6270-020-040', '6270-020-041', '6270-020-042', '6270-020-043', '6270-020-044', '6270-020-045', '6270-020-046', '6270-020-048', '6270-020-049', '5815-020-030', '5815-020-031', '5815-020-032', '8900-762-954', '4149-005-040', '4149-005-041', '7550-019-018', '7134-016-040', '2168-027-025', '2038-040-015', '2038-040-022', '2038-040-031', '2038-040-032', '6270-020-047'])

async function pullOnlineBillsLA (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  await driver.get ('https://vcheck.ttc.lacounty.gov/index.php');

  await driver.wait (
    until.urlIs ('https://vcheck.ttc.lacounty.gov/proptax.php?page=screen')
  );

  const arrayOfParcelsBills = [];
  const arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    await driver.sleep (2000);
    console.log (`Working on parcel: ${item}`);

    const mapBookInput = await driver.findElement (By.name ('mapbook'));
    const pageInput = await driver.findElement (By.name ('page'));
    const parcelInput = await driver.findElement (By.name ('parcel'));
    const submitButton = await driver.findElement (By.name ('submit'));

    //split str to send to input field
    const splitParcelStr = item.split ('-');
    const mapStr = splitParcelStr[0];
    const pageStr = splitParcelStr[1];
    const parcelStr = splitParcelStr[2];

    await mapBookInput.sendKeys (mapStr);
    await pageInput.sendKeys (pageStr);
    await parcelInput.sendKeys (parcelStr);

    await submitButton.click ();

    //Should now be on next page
    await driver.wait (
      until.urlIs ('https://vcheck.ttc.lacounty.gov/proptax.php?page=main')
    );

    const inquiryOnlyButton = await driver.findElement (
      By.id ('inquirebutton')
    );
    await inquiryOnlyButton.click ();

    //Should now be on payment page
    await driver.wait (
      until.urlIs (
        'https://vcheck.ttc.lacounty.gov/proptax.php?page=installments'
      )
    );

    try {
      const installmentOneTotalEle = await driver.findElement (
        By.xpath (
          '/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div/table/tbody/tr[2]/td[2]'
        )
      );
      const installmentTwoTotalEle = await driver.findElement (
        By.xpath (
          '/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div/table/tbody/tr[2]/td[5]'
        )
      );

      const installmentOneTotalStr = await installmentOneTotalEle.getAttribute (
        'innerText'
      );
      const installmentTwoTotalStr = await installmentTwoTotalEle.getAttribute (
        'innerText'
      );

      arrayOfParcelsBills.push (
        [item, 'Installment One', installmentOneTotalStr],
        [item, 'Installment Two', installmentTwoTotalStr]
      );
    } catch (error) {
      arrayOfFailedParcels.push (item);
      console.log ('Failed to pull data for this parcel');
      console.log (error.message);
    }

    const selectAnotherAccountButton = await driver.findElement (
      By.xpath (
        '/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div/input'
      )
    );
    await selectAnotherAccountButton.click ();

    //Should now be on re-select-page
    await driver.wait (
      until.urlIs ('https://vcheck.ttc.lacounty.gov/index.php?page=selections&')
    );
    const restartLoopButton = await driver.findElement (
      By.xpath (
        '/html/body/table/tbody/tr/td[1]/div/table/tbody/tr/td[2]/div/div[1]/div[2]/a'
      )
    );
    await restartLoopButton.click ();

    //Should now be on page to search again
    await driver.wait (
      until.urlIs ('https://vcheck.ttc.lacounty.gov/proptax.php?page=screen')
    );
  }

  //Now that loop is done, write results to a file

  const arrayOfParcelsBillsStringified = JSON.stringify (arrayOfParcelsBills);
  const failedParcelsStringified = JSON.stringify (arrayOfFailedParcels);

  if (arrayOfParcelsBillsStringified !== '[]') {
    fs.writeFileSync (
      'arrayOfParcelsBills.json',
      arrayOfParcelsBillsStringified
    );
  }
  if (failedParcelsStringified !== '[]') {
    fs.writeFileSync ('failedLAParcels.json', failedParcelsStringified);
  }
}

async function check1stPaymentOrangeCounty (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  await driver.get ('https://tax.ocgov.com/tcweb/search_page.asp');

  const arrayOfParcelsBills = [];
  const arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    console.log (`Working on parcel: ${item}`);
    await driver.sleep (2000);

    const parcelNumberInput = await driver.findElement (
      By.name ('t_parcel_no')
    );
    const searchButton = await driver.findElement (By.name ('s_parcel'));

    await parcelNumberInput.sendKeys (item);
    await searchButton.click ();

    await driver.wait (
      until.urlIs ('https://tax.ocgov.com/tcweb/search_parcel.asp')
    );

    const statusElement = await driver.findElement (
      By.xpath (
        '/html/body/center/table/tbody/tr/td[2]/div/table/tbody/tr[3]/td/table/tbody/tr/td[5]/div[2]/table/tbody/tr[3]/td/table/tbody/tr[2]/td/table/tbody/tr[7]/td/table/tbody/tr[4]/td[4]'
      )
    );
    const statusElementInnerText = await statusElement.getAttribute (
      'innerText'
    );

    if (statusElementInnerText.includes ('FIRST INSTALLMENT PAID')) {
      console.log (`${item} is paid!`);
      arrayOfParcelsBills.push (item);
    } else {
      console.log (`${item} is unpaid!`);
      arrayOfFailedParcels.push (item);
    }
    await driver.navigate ().back ();
  }

  //Now that loop is done, write results to a file

  const arrayOfParcelsBillsStringified = JSON.stringify (arrayOfParcelsBills);
  const failedParcelsStringified = JSON.stringify (arrayOfFailedParcels);

  if (arrayOfParcelsBillsStringified !== '[]') {
    fs.writeFileSync (
      'arrayOfParcelsBills.json',
      arrayOfParcelsBillsStringified
    );
  }
  if (failedParcelsStringified !== '[]') {
    fs.writeFileSync ('failedOCParcels.json', failedParcelsStringified);
  }
}

async function check1stPaymentRiversideCounty (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  await driver.get (
    'https://ca-riverside-ttc.publicaccessnow.com/PropertySearch.aspx'
  );

  const arrayOfParcelsBills = [];
  const arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    console.log (`Working on parcel: ${item}`);
    await driver.sleep (2000);

    const parcelInputField = await driver.findElement (
      By.xpath (
        '/html/body/form/div[3]/div[5]/main/div/div[4]/div[1]/div[2]/div/div[1]/div/div/tr-quick-search-root/div/tr-container-component/div/ngb-tabset/div/div/div/span/tr-search-options/div/div/div/div[1]/div/kendo-panelbar/kendo-panelbar-item[2]/div/div/tr-search-options-field-component/div/input'
      )
    );
    const searchButton = await driver.findElement (
      By.xpath (
        '/html/body/form/div[3]/div[5]/main/div/div[4]/div[1]/div[2]/div/div[1]/div/div/tr-quick-search-root/div/tr-container-component/div/ngb-tabset/div/div/div/span/tr-search-options/div/div/div/div[2]/div[2]/button'
      )
    );

    await parcelInputField.sendKeys (Key.CONTROL, 'a', Key.DELETE);
    await parcelInputField.sendKeys (item);
    await searchButton.click ();

    await driver.wait (until.urlContains ('?s=ParcelID'));
    await driver.sleep (4000);

    const viewAccountButton = await driver.findElement (
      By.xpath ("//a[contains(text(), 'View Account')]")
    );
    await viewAccountButton.click ();

    await driver.wait (until.urlContains ('AccountSearch/AccountSummary'));

    let determineToContinue;

    try {
      const table2021TaxData = await driver.findElement (
        By.xpath (
          '/html/body/form/div[3]/div[5]/main/div/div/div[1]/div[4]/div/div/div/div/table[1]'
        )
      );
      determineToContinue = true;
    } catch (error) {
      determineToContinue = false;
      console.log (`${item}: 1st and 2nd installments are paid!`);
      arrayOfParcelsBills.push (item);
    }

    if (determineToContinue === true) {
      try {
        const installmentOneChecker = await table2021TaxData.findElement (
          By.xpath ("//td[contains(text(), 'Installment #1')]")
        );
        console.log (`${item} is unpaid!`);
        arrayOfFailedParcels.push (item);
      } catch (error) {
        console.log (`${item} is paid!`);
        arrayOfParcelsBills.push (item);
      }
    }

    const backButton = await driver.findElement (
      By.xpath (
        '/html/body/form/div[3]/div[5]/main/div/div/div[1]/div[2]/div/div/div/center/div/div'
      )
    );
    await backButton.click ();
  }

  const arrayOfParcelsBillsStringified = JSON.stringify (arrayOfParcelsBills);
  const failedParcelsStringified = JSON.stringify (arrayOfFailedParcels);

  if (arrayOfParcelsBillsStringified !== '[]') {
    fs.writeFileSync (
      'arrayOfParcelsBills.json',
      arrayOfParcelsBillsStringified
    );
  }
  if (failedParcelsStringified !== '[]') {
    fs.writeFileSync ('failedOCParcels.json', failedParcelsStringified);
  }
}

async function check1stPaymentSanBernardinoCounty (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  await driver.get ('https://www.mytaxcollector.com/trSearch.aspx');

  const arrayOfParcelsBills = [];
  const arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    console.log (`Working on parcel: ${item}`);
    await driver.sleep (2000);

    let itemDashesRemoved = item.split ('-').join ('');
    const parcelInputField = await driver.findElement (
      By.name ('txtParcelNumber')
    );
    await parcelInputField.sendKeys (Key.CONTROL, 'a', Key.DELETE);
    await parcelInputField.sendKeys (itemDashesRemoved);

    const searchButton = await driver.findElement (
      By.name ('ctl00$contentHolder$cmdSearch')
    );
    await searchButton.click ();

    const proccedToPayBillsBtn = await driver.findElement (
      By.id ('cmdProceedToBills')
    );
    await proccedToPayBillsBtn.click ();

    await driver.wait (until.urlContains ('trPropInfo_CurrentTaxes.aspx'));

    //Check if all installments paid
    try {
      const allBillsPaidChecker = await driver.findElement (
        By.xpath (
          "//h4[contains(text(), 'There are no bills at this time that are due for the current tax year.')]"
        )
      );
      console.log (`${item} is paid!`);
      arrayOfParcelsBills.push (item);
    } catch (error) {
      console.log (`${item} has atleast one bill due`);
    }

    //Check if atleast 1st installment paid
    try {
      const firstBillPaidChecker = await driver.findElement (
        By.xpath ("//font[contains(text(), 'Installment 1')]")
      );
      console.log (`${item} is unpaid!`);
      arrayOfFailedParcels.push (item);
    } catch (error) {
      console.log (`${item} 1st installment is paid!`);
      arrayOfParcelsBills.push (item);
    }

    await driver.sleep (15000);

    await driver.navigate ().back ();
    await driver.navigate ().back ();
  }

  const arrayOfParcelsBillsStringified = JSON.stringify (arrayOfParcelsBills);
  const failedParcelsStringified = JSON.stringify (arrayOfFailedParcels);

  if (arrayOfParcelsBillsStringified !== '[]') {
    fs.writeFileSync (
      'arrayOfParcelsBills.json',
      arrayOfParcelsBillsStringified
    );
  }
  if (failedParcelsStringified !== '[]') {
    fs.writeFileSync ('failedOCParcels.json', failedParcelsStringified);
  }
}

async function check1stPaymentSanDiegoCounty (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  await driver.get ('https://iwr.sdttc.com/paymentapplication/Search.aspx');

  const arrayOfParcelsBills = [];
  const arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    console.log (`Working on parcel: ${item}`);
    await driver.sleep (2000);

    const accordionElement = await driver.findElement (
      By.id ('PaymentApplicationContent_lblSearchOption2')
    );
    await accordionElement.click ();

    await driver.sleep (4000);

    let itemDashesRemoved = item.split ('-').join ('');
    const parcelInputField = await driver.findElement (
      By.name ('ctl00$PaymentApplicationContent$tbParcelNumber')
    );
    await parcelInputField.sendKeys (Key.CONTROL, 'a', Key.DELETE);
    await parcelInputField.sendKeys (itemDashesRemoved);

    const searchButton = await driver.findElement (
      By.name ('ctl00$PaymentApplicationContent$btnSubmitOption2')
    );
    await searchButton.click ();

    let continueExecution;

    try {
      await driver.findElement (
        By.id ('PaymentApplicationContent_litSearchError2')
      );
      console.log (`${item} is not found in database!`);
      arrayOfFailedParcels.push (item);
      continueExecution = false;
    } catch (error) {
      console.log ('looks like no search error, continuing');
      continueExecution = true;
    }

    if (continueExecution === true) {
      await driver.wait (
        until.urlIs (
          'https://iwr.sdttc.com/paymentapplication/SearchResults.aspx'
        )
      );

      try {
        const paidChecker = await driver.findElement (
          By.xpath (
            '/html/body/form/div[3]/div[3]/div[2]/div[2]/div[5]/div[2]/div/table/tbody/tr[2]/td[9]'
          )
        );
        const paidCheckerInnerText = await paidChecker.getAttribute (
          'innerText'
        );
        if (paidCheckerInnerText === 'DUE') {
          console.log (`${item} is unpaid!`);
          arrayOfFailedParcels.push (item);
        } else {
          console.log (`${item} 1st installment is paid!`);
          arrayOfParcelsBills.push (item);
        }
      } catch (error) {
        console.log ('some error in finding status');
      }

      const startNewSearchBtn = await driver.findElement (
        By.id ('PaymentApplicationContent_btnSearch')
      );
      await startNewSearchBtn.click ();

      await driver.wait (
        until.urlIs ('https://iwr.sdttc.com/paymentapplication/Search.aspx')
      );
    } else {
      await driver.get ('https://iwr.sdttc.com/paymentapplication/Search.aspx');
    }
  }

  const arrayOfParcelsBillsStringified = JSON.stringify (arrayOfParcelsBills);
  const failedParcelsStringified = JSON.stringify (arrayOfFailedParcels);

  if (arrayOfParcelsBillsStringified !== '[]') {
    fs.writeFileSync (
      'arrayOfParcelsBills.json',
      arrayOfParcelsBillsStringified
    );
  }
  if (failedParcelsStringified !== '[]') {
    fs.writeFileSync ('failedOCParcels.json', failedParcelsStringified);
  }
}

async function check1stPaymentVenturaCounty (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  await driver.get ('https://prop-tax.countyofventura.org/');

  const arrayOfParcelsBills = [];
  const arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    console.log (`Working on parcel: ${item}`);
    await driver.sleep (2000);

    let itemDashesRemoved = item.split ('-').join ('');
    const parcelInputField = await driver.findElement (
      By.name ('ctl00$MainContent$txtAPN')
    );
    await parcelInputField.sendKeys (Key.CONTROL, 'a', Key.DELETE);
    await parcelInputField.sendKeys (itemDashesRemoved, Key.ENTER);

    try {
      await driver.findElement (
        By.xpath ("//span[contains(text(), 'There are no properties')]")
      );
      continueExecution = false;
      console.log (`${item} is not in database!`);
      arrayOfFailedParcels.push (item);
    } catch (error) {
      console.log ('No search error, continuing');
      continueExecution = true;
    }

    if (continueExecution === true) {
      await driver.wait (
        until.urlIs ('https://prop-tax.countyofventura.org/listing.aspx')
      );

      const paidChecker = await driver.findElement (
        By.xpath (
          '/html/body/form/div[3]/div[3]/div[2]/table/tbody/tr[3]/td/table/tbody/tr[6]/td/table/tbody/tr[1]/td/div/table/tbody/tr[2]/td[4]/span[1]'
        )
      );
      const paidCheckerInnerText = await paidChecker.getAttribute ('innerText');

      if (paidCheckerInnerText.includes ('PAID')) {
        console.log (`${item} is paid!`);
        arrayOfParcelsBills.push (item);
      } else {
        console.log (`${item} is unpaid!`);
        arrayOfFailedParcels.push (item);
      }

      await driver.sleep (5000);

      const searchAgainButton = await driver.findElement (
        By.name ('ctl00$MainContent$btnSearchAgain')
      );
      await searchAgainButton.click ();

      await driver.wait (
        until.urlIs ('https://prop-tax.countyofventura.org/Default.aspx')
      );
    } else {
      const searchAnewbutton = await driver.findElement (
        By.id ('ctl00_MainContent_btnSearchAgain')
      );
      await searchAnewbutton.click ();
      await driver.wait (
        until.urlIs ('https://prop-tax.countyofventura.org/Default.aspx')
      );
    }
  }

  const arrayOfParcelsBillsStringified = JSON.stringify (arrayOfParcelsBills);
  const failedParcelsStringified = JSON.stringify (arrayOfFailedParcels);

  if (arrayOfParcelsBillsStringified !== '[]') {
    fs.writeFileSync (
      'arrayOfParcelsBills.json',
      arrayOfParcelsBillsStringified
    );
  }
  if (failedParcelsStringified !== '[]') {
    fs.writeFileSync ('failedOCParcels.json', failedParcelsStringified);
  }
}

async function check1stPaymentMultnomahCounty (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  await driver.get ('https://multcoproptax.com/');

  const arrayOfParcelsBills = [];
  const arrayOfFailedParcels = [];

  await driver.wait (until.urlIs ('https://multcoproptax.com/PA-Disclaimer'));
  const iAgreeButton = await driver.findElement (
    By.xpath (
      '/html/body/form/div[5]/div/table/tbody/tr[1]/td/div/div/div/div/div/div/div/p[3]/a'
    )
  );
  await iAgreeButton.click ();
  await driver.sleep (5000);

  for (const item of arrayOfParcels) {
    console.log (`Working on parcel: ${item}`);
    await driver.sleep (2000);
    await driver.wait (
      until.urlIs ('https://multcoproptax.com/Property-Search')
    );

    const parcelInputField = await driver.findElement (
      By.name ('dnn$ctr410$MultnomahGuestView$SearchTextBox')
    );
    await parcelInputField.sendKeys (Key.CONTROL, 'a', Key.DELETE);
    await parcelInputField.sendKeys (item, Key.ENTER);

    await driver.sleep (5000);

    const tdElementWLink = await driver.findElement (
      By.xpath (
        '/html/body/form/div[5]/div/table/tbody/tr[1]/td/div/div/div/div/div/div/table/tbody/tr[6]/td/div/div[2]/table/tbody/tr/td[1]'
      )
    );
    await tdElementWLink.click ();

    await driver.wait (until.urlContains ('PropertyQuickRefID'));

    const billsTabElement = await driver.findElement (By.id ('tabBills'));
    await billsTabElement.click ();

    const tr2021Ele = await driver.findElement (
      By.xpath (
        '/html/body/form/div[5]/div/table/tbody/tr[1]/td/div/div/div/div/div/div/div[2]/table[3]/tbody/tr[2]/td[1]/div[2]/div/table[2]/tbody/tr[2]'
      )
    );
    const tdElementChildren = await tr2021Ele.findElements (By.css ('td'));
    const totalOwedTD = tdElementChildren[7];

    const totalOwedTDInnerText = await totalOwedTD.getAttribute ('innerText');
    if (totalOwedTDInnerText === '$0.00') {
      console.log (`${item} is paid!`);
      arrayOfParcelsBills.push (item);
    } else {
      console.log (`${item} is unpaid! ${totalOwedTDInnerText} is owed!`);
      arrayOfFailedParcels.push ([item, totalOwedTDInnerText]);
    }

    await driver.get ('https://multcoproptax.com/Property-Search');
    await driver.wait (
      until.urlIs ('https://multcoproptax.com/Property-Search')
    );
  }

  const arrayOfParcelsBillsStringified = JSON.stringify (arrayOfParcelsBills);
  const failedParcelsStringified = JSON.stringify (arrayOfFailedParcels);

  if (arrayOfParcelsBillsStringified !== '[]') {
    fs.writeFileSync (
      'arrayOfParcelsBills.json',
      arrayOfParcelsBillsStringified
    );
  }
  if (failedParcelsStringified !== '[]') {
    fs.writeFileSync ('failedOCParcels.json', failedParcelsStringified);
  }
}

async function confirmPaymentInPTax (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  await driver.get ('https://ptax.ptaxsolution.com/Default.aspx');

  const arrayOfSuccessfulParcels = [];
  const arrayOfFailedParcels = [];

  //await driver.manage().window().fullscreen();

  await driver.findElement (By.name ('txtUserName')).sendKeys ('fedwards');
  await driver
    .findElement (By.name ('txtPassword'))
    .sendKeys ('p@ssw0rd', Key.RETURN);
  await driver.wait (until.urlIs ('https://ptax.ptaxsolution.com/MainTC.aspx'));
  await driver.sleep (5000);

  for (const item of arrayOfParcels) {
    try {
      const parcelNumInput = await driver.findElement (
        By.id ('txtSearchParcel')
      );
      await parcelNumInput.sendKeys (Key.CONTROL, 'a', Key.DELETE);
      await parcelNumInput.sendKeys (item, Key.ENTER);

      //swap to iframe
      await driver.switchTo ().frame (0);

      const arrayOfParcelElements = await driver.findElements (
        By.css ('a.rtIn')
      );
      let elementToClick;

      for (const nestedItem of arrayOfParcelElements) {
        const nestedItemInnerText = await nestedItem.getAttribute ('innerText');

        if (
          nestedItemInnerText.includes (item) &&
          nestedItemInnerText.includes ('Pay by Check')
        ) {
          elementToClick = nestedItem;
        } else if (
          nestedItemInnerText.includes (item) &&
          nestedItemInnerText.includes ('(LENDER PAYS) (Pay By Lender)')
        ) {
          elementToClick = nestedItem;
        } else if (
          nestedItemInnerText.includes (item) &&
          nestedItemInnerText.includes ('Tenant Pays')
        ) {
          elementToClick = nestedItem;
        } else if (
          nestedItemInnerText.includes (item) &&
          nestedItemInnerText.includes ('(Pay by Check)')
        ) {
          elementToClick = nestedItem;
        } else if (
          nestedItemInnerText.includes (item) &&
          nestedItemInnerText.includes ('(NEW) (Pay by Check)')
        ) {
          elementToClick = nestedItem;
        } else if (
          nestedItemInnerText.includes (item) &&
          nestedItemInnerText.includes ('(Pay by Check)')
        ) {
          elementToClick = nestedItem;
        } else if (nestedItemInnerText.includes (item)) {
          elementToClick = nestedItem;
        }
      }
      await elementToClick.click ();
      await driver.switchTo ().defaultContent ();
      // Store the web element
      const iframe = driver.findElement (By.css ('#fmeMain'));
      await driver.switchTo ().frame (iframe);
      await driver.sleep (2000);

      const taxBillDrivenTab = await driver.findElement (
        By.id ('licontainer2')
      );
      await taxBillDrivenTab.click ();
      const editAssessmentEle = await driver.findElement (
        By.xpath ("//a[contains(text(), '1/1/2021')]")
      );
      await editAssessmentEle.click ();

      await driver.sleep (5000);

      const copyDataAndAmount = await driver.findElement (
        By.xpath (
          '/html/body/form/div[4]/div/div/div[3]/div[1]/table/tbody/tr[1]/td[1]/table/tbody/tr[6]/td[2]/input[1]'
        )
      );
      await copyDataAndAmount.click ();
      await driver.sleep (5000);

      const saveButton = await driver.findElement (
        By.xpath (
          '/html/body/form/div[4]/div/div/div[3]/div[1]/table/tbody/tr[2]/td/input[1]'
        )
      );
      await saveButton.click ();
      await driver.sleep (5000);
      await driver.switchTo ().defaultContent ();

      const delayNumber = generateDelayNumber ();
      await driver.sleep (delayNumber);

      console.log (`${item} was successful!`);
      arrayOfSuccessfulParcels.push (item);
    } catch (error) {
      console.log (`${item} was unsuccessful!`);
      console.log (error.message);
      arrayOfFailedParcels.push (item);
      await driver.sleep (5000);
      await driver.switchTo ().defaultContent ();
    }
  }

  const arrayOfParcelsBillsStringified = JSON.stringify (
    arrayOfSuccessfulParcels
  );
  const failedParcelsStringified = JSON.stringify (arrayOfFailedParcels);

  if (arrayOfParcelsBillsStringified !== '[]') {
    fs.writeFileSync (
      'arrayOfParcelsBills.json',
      arrayOfParcelsBillsStringified
    );
  }
  if (failedParcelsStringified !== '[]') {
    fs.writeFileSync ('failedOCParcels.json', failedParcelsStringified);
  }
}

async function pullClarkCountyAssessmentNotices (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  await driver.get (
    'https://maps.clarkcountynv.gov/assessor/AssessorParcelDetail/pcl.aspx'
  );

  /* const body = await driver.findElement(By.css("body"));
  await body.sendKeys(Key.CONTROL, "p"); */
  driver.window.print ();

  await driver.sleep (15000);
}

//pullClarkCountyAssessmentNotices();

async function cookCounty1stInstallment (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  await driver.manage ().window ().fullscreen ();
  await driver.get ('https://ptax.ptaxsolution.com/Default.aspx');

  const arrayOfSuccessfulParcels = [];
  const arrayOfFailedParcels = [];

  await driver.findElement (By.name ('txtUserName')).sendKeys ('fedwards');
  await driver
    .findElement (By.name ('txtPassword'))
    .sendKeys ('p@ssw0rd', Key.RETURN);
  await driver.wait (until.urlIs ('https://ptax.ptaxsolution.com/MainTC.aspx'));
  const pTaxWindow = await driver.getWindowHandle ();
  await driver.sleep (5000);

  await driver.switchTo ().newWindow ('tab');
  const treasurerWindow = await driver.getWindowHandle ();
  await driver.sleep (5000);

  let nonConstIndex = 0;

  for (const [index, item] of arrayOfParcels.entries ()) {
    try {
      console.log ('INDEX', nonConstIndex);
      await driver.switchTo ().window (treasurerWindow);
      await driver.get (
        'https://cookcountytreasurer.com/setsearchparameters.aspx'
      );
      const parcelNumberSplit = item.split ('-');
      const parcelInputField1 = await driver.findElement (
        By.id ('ContentPlaceHolder1_ASPxPanel1_SearchByPIN1_txtPIN1')
      );
      const parcelInputField2 = await driver.findElement (
        By.id ('ContentPlaceHolder1_ASPxPanel1_SearchByPIN1_txtPIN2')
      );
      const parcelInputField3 = await driver.findElement (
        By.id ('ContentPlaceHolder1_ASPxPanel1_SearchByPIN1_txtPIN3')
      );
      const parcelInputField4 = await driver.findElement (
        By.id ('ContentPlaceHolder1_ASPxPanel1_SearchByPIN1_txtPIN4')
      );
      const parcelInputField5 = await driver.findElement (
        By.id ('ContentPlaceHolder1_ASPxPanel1_SearchByPIN1_txtPIN5')
      );

      console.log (item);

      await parcelInputField1.sendKeys (parcelNumberSplit[0].toString ());
      await parcelInputField2.sendKeys (parcelNumberSplit[1].toString ());
      await parcelInputField3.sendKeys (parcelNumberSplit[2].toString ());
      await parcelInputField4.sendKeys (parcelNumberSplit[3].toString ());
      await parcelInputField5.sendKeys (parcelNumberSplit[4].toString ());

      //wait for recaptcha to be completed
      await driver.wait (until.urlContains ('taxoverviewresults'));
      console.log ('captcha completed successfuly!');
      await driver.sleep (5000);

      const currentAmountDueTableElement = await driver.findElements (
        By.className ('overviewpaymentsinstallment1balancedue')
      );
      const currentAmountDueStringArray = await currentAmountDueTableElement[0].findElements (
        By.className ('overviewpaymentsdatavalue')
      );
      const currentAmountDueStringElement = currentAmountDueStringArray[0];
      const currentAmountDueString = await currentAmountDueStringElement.getAttribute (
        'innerText'
      );

      const currentAmountDueDollarSignRemoved = currentAmountDueString.replace (
        '$',
        ''
      );
      const currentAmountStringFinal = currentAmountDueDollarSignRemoved.replace (
        ',',
        ''
      );
      console.log ('currentAmountStringFinal', currentAmountStringFinal);
      if (currentAmountStringFinal === '0.00') {
        console.log ('there is no bill for this parcel');
        console.log (`${item} was unsuccessful!`);
        arrayOfFailedParcels.push (item);

        console.log ('nonConstIndex', nonConstIndex);

        //Wait for the new window or tab
        await driver.wait (
          async () => (await driver.getAllWindowHandles ()).length === 3,
          10000
        );

        //Loop through until we find a new window handle
        const windows = await driver.getAllWindowHandles ();
        const errorWindow = windows[2];
        await driver.switchTo ().window (errorWindow);
        await driver.close ();
        await driver.switchTo ().window (treasurerWindow);

        continue;
      }

      const downloadYourTaxBillElement = await driver.findElement (
        By.id (
          'ContentPlaceHolder1_DataViewNavigationDesktop1_ASPxMenu1_DXI1_T'
        )
      );
      await downloadYourTaxBillElement.click ();

      /* await driver.wait (
        until.urlIs (
          'https://cookcountytreasurer.com/requestaduplicatetaxbillresults.aspx'
        )
      ); */
      await driver.sleep (5000);

      console.log ('looking for download link...');
      const download2021FirstInstallmentElement = await driver.findElement (
        By.xpath (
          '/html/body/form/div[4]/div/div/div/div[4]/div[2]/div/div[1]/div/div/div[2]/div/div[2]/div/a[2]'
        )
      );
      await download2021FirstInstallmentElement.click ();

      console.log ('file downloaded');

      //now need to reset back to overview - payments tab to ensure script keeps running
      const overviewPaymentsTab = await driver.findElement (
        By.xpath (
          '/html/body/form/div[4]/div/div/div/div[2]/div[1]/div/div/ul/li[1]/a'
        )
      );
      await overviewPaymentsTab.click ();

      await driver.sleep (5000);
      await driver.switchTo ().window (pTaxWindow);

      let fileNameToUpload = '';

      if (index >= 1) {
        fileNameToUpload = `CookCountyPropertyTaxBill2021FirstInstallment (${nonConstIndex}).pdf`;
      } else {
        fileNameToUpload = 'CookCountyPropertyTaxBill2021FirstInstallment.pdf';
      }

      await driver.switchTo ().defaultContent ();

      const parcelSearchBarPTAX = await driver.findElement (
        By.id ('txtSearchParcel')
      );
      await parcelSearchBarPTAX.sendKeys (Key.CONTROL, 'a', Key.DELETE);
      await parcelSearchBarPTAX.sendKeys (item, Key.ENTER);

      await driver.switchTo ().frame (0);
      await driver.wait (
        until.elementLocated (By.xpath (`//a[contains(text(), '${item}')]`))
      );
      const parcelToEdit = await driver.findElement (
        By.xpath (`//a[contains(text(), '${item}')]`)
      );
      await parcelToEdit.click ();

      await driver.switchTo ().defaultContent ();

      // Store the web element
      const iframe = driver.findElement (By.css ('#fmeMain'));
      // Switch to the frame
      await driver.switchTo ().frame (iframe);

      const taxBillDrivenTab = await driver.findElement (
        By.id ('licontainer2')
      );
      await taxBillDrivenTab.click ();

      const assessmentToEdit = await driver.findElement (
        By.xpath (`//a[contains(text(), "1/1/2021")]`)
      );
      await assessmentToEdit.click ();

      await driver.sleep (2000);

      const dataSourceSelectWrapper = await driver.findElement (
        By.name ('ddDataSourceAssessment')
      );

      const dataSourceElement = await dataSourceSelectWrapper.findElement (
        By.xpath (`//option[contains(text(), "Estimate")]`)
      );
      await dataSourceElement.click ();

      const saveDataSourceBtn = await driver.findElement (
        By.name ('btnSaveAssessment')
      );
      await saveDataSourceBtn.click ();
      await driver.sleep (3000);

      const pTaxTotalAmtLiabilityElement = await driver.findElement (
        By.id ('tbTotalTaxLiability')
      );
      await pTaxTotalAmtLiabilityElement.sendKeys (currentAmountStringFinal);

      const saveAssessmentBTN = await driver.findElement (
        By.id ('btnSaveLiability')
      );
      await saveAssessmentBTN.click ();

      await driver.sleep (5000);

      const generatePaymentsBtn = await driver.findElement (
        By.id ('btnGeneratePayments')
      );
      await generatePaymentsBtn.click ();

      await driver.wait (
        until.elementLocated (By.name ('tbBasePaymentAmount2'))
      );

      //now delete 2nd payment
      const ptaxFinalPaymentEle = await driver.findElement (
        By.name ('tbBasePaymentAmount2')
      );
      await ptaxFinalPaymentEle.sendKeys (Key.CONTROL, 'a', Key.DELETE);

      const ptaxBasePaymentele = await driver.findElement (
        By.name ('tbBaseAmountTransmittal2')
      );
      await ptaxBasePaymentele.sendKeys (Key.CONTROL, 'a', Key.DELETE);

      const secondPaymentDueByEle = await driver.findElement (
        By.name ('dpBasePaymentDueByDate2$dateInput')
      );
      await secondPaymentDueByEle.sendKeys (Key.CONTROL, 'a', Key.DELETE);

      await driver.sleep (2000);

      const savePaymentsBtn = await driver.findElement (
        By.id ('btnSaveALLPayment')
      );
      await savePaymentsBtn.click ();

      await driver.sleep (3000);

      //Now it's time to upload pdf of the assessment
      await driver.switchTo ().defaultContent ();

      //Click on document element in navbar
      const documentTabOfNavbar = await driver.findElement (
        By.xpath ('/html/body/form/div[4]/div/ul/li[4]/a/span')
      );
      await documentTabOfNavbar.click ();

      //wait until the upload document dropdown is interactable, then click
      await driver.sleep (5000);
      const newDocumentElement = await driver.findElement (
        By.xpath ('/html/body/form/div[4]/div/ul/li[4]/div/ul/li[9]/a/span')
      );
      driver.wait (until.elementIsEnabled (newDocumentElement));
      await newDocumentElement.click ();

      //Click reserve button
      await driver.switchTo ().frame (iframe);
      const reserveButton = await driver.findElement (By.id ('UploadBtn'));
      await driver.wait (until.elementIsEnabled (reserveButton));
      await reserveButton.click ();

      //For selenium to upload file you have to sendkeys of the filename, declaring part of string to concat in string literal below
      const baseFilePath = 'C:/Users/frank.edwards/Downloads/';

      //Click upload file button
      await driver.wait (until.elementLocated (By.id ('Image1')));
      const chooseFileButton = await driver.findElement (By.id ('Image1'));
      await chooseFileButton.sendKeys (`${baseFilePath + fileNameToUpload}`);

      //Select correct assessment year from dropdown
      const assessmentInputElement = await driver.findElement (
        By.xpath (
          '/html/body/form/div[3]/div/table[2]/tbody/tr[5]/td[2]/select'
        )
      );
      let correctAssessmentElement;
      const assessmentInputElementChildren = await assessmentInputElement.findElements (
        By.css ('option')
      );

      for (const itemNestedNested of assessmentInputElementChildren) {
        const itemNestedNestedInnerText = await itemNestedNested.getAttribute (
          'innerText'
        );
        if (itemNestedNestedInnerText.includes ('| 2021 | ANN')) {
          correctAssessmentElement = itemNestedNested;
        }
      }
      await correctAssessmentElement.click ();

      await driver.wait (
        until.elementLocated (
          By.xpath (`//option[contains(text(), "Bill #1 - | 2021 |")]`)
        )
      );

      const correctTaxLiabilityElement = await driver.findElement (
        By.xpath (`//option[contains(text(), "Bill #1 - | 2021 |")]`)
      );
      await correctTaxLiabilityElement.click ();

      await driver.sleep (5000);

      //Set Name of file before uploading to server
      const titleElement = await driver.findElement (By.id ('fileTitle'));
      await titleElement.sendKeys (`Online Annual: ${item} Tax Bill`);

      //Save file to server
      await driver.sleep (5000);
      const documentSaveButton = await driver.findElement (By.id ('UploadBtn'));
      await documentSaveButton.click ();

      await driver.sleep (5000);

      console.log (`${item} was successful!`);
      arrayOfSuccessfulParcels.push (item);
      nonConstIndex++;
    } catch (error) {
      console.log (`${item} was unsuccessful!`);
      console.log (error, error.message);
      arrayOfFailedParcels.push (item);
      await driver.sleep (5000);
      await driver.switchTo ().defaultContent ();
    }
  }
  const arrayOfParcelsBillsStringified = JSON.stringify (
    arrayOfSuccessfulParcels
  );
  const failedParcelsStringified = JSON.stringify (arrayOfFailedParcels);

  if (arrayOfParcelsBillsStringified !== '[]') {
    fs.writeFileSync ('successfulBills.json', arrayOfParcelsBillsStringified);
  }
  if (failedParcelsStringified !== '[]') {
    fs.writeFileSync ('failedParcels.json', failedParcelsStringified);
  }
}

async function dataEntryNYAssessmentNotices (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  let sleepDuration;
  await driver.manage ().window ().setRect ({width: 1920, height: 1080});
  //await driver.switchTo().newWindow('tab');
  const nyTaxBillWebsite = await driver.getWindowHandle ();
  await driver.get (
    'https://a836-pts-access.nyc.gov/care/search/commonsearch.aspx?mode=persprop'
  );
  await driver.findElement (By.id ('btAgree')).click ();
  await driver.switchTo ().newWindow ('tab');
  const ptaxWindow = await driver.getWindowHandle ();
  await driver.get ('https://ptax.ptaxsolution.com/Default.aspx');

  await driver.findElement (By.name ('txtUserName')).sendKeys ('fedwards');
  await driver
    .findElement (By.name ('txtPassword'))
    .sendKeys ('p@ssw0rd', Key.RETURN);
  //swap to iframe
  await driver.switchTo ().frame (0);

  //swaps back to normal if needed for later
  /* await driver.switchTo().defaultContent(); */

  let checkBox = await driver.wait (
    until.elementLocated (By.name ('CheckMyProperties'))
  );
  await driver.findElement (By.id ('CheckMyProperties')).click ();

  await driver
    .findElement (By.xpath ('/html/body/form/div[4]/ul/li[24]/div/span[2]'))
    .click ();
  /* "fmeMain" */

  let propertyToClick = await driver.wait (
    until.elementLocated (
      By.xpath ('/html/body/form/div[4]/ul/li[24]/ul/li[266]/div/span[2]')
    )
  );
  await propertyToClick.click ();
  // Opens a new tab and switches to new tab

  let arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    console.log (`Currently working on parcel: ${item} \n`);
    try {
      await driver.switchTo ().window (nyTaxBillWebsite);

      const boroughNumber = item.split ('-')[0];
      const blockNumber = item.split ('-')[1];
      const lotNumber = item.split ('-')[2];

      if (boroughNumber === '1') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[2]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '2') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[3]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '3') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[4]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '4') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[5]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '5') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[6]'
              )
            )
          )
          .click ();
      }

      await driver
        .wait (until.elementLocated (By.id ('inpTag')))
        .sendKeys (blockNumber);

      await driver
        .wait (until.elementLocated (By.id ('inpStat')))
        .sendKeys (lotNumber);

      await driver.wait (until.elementLocated (By.id ('btSearch'))).click ();

      // Click account history tab
      const accountHistoryTab = await driver.wait (
        until.elementLocated (
          By.css ('#sidemenu > ul > li:nth-child(3) > a > span')
        )
      );
      //console.log("accountHistoryTab", accountHistoryTab)

      accountHistoryTab.click ();

      const payment3PulledFromNYSiteString = await driver
        .wait (
          until.elementLocated (
            By.xpath (
              '/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[3]/td[8]'
            )
          )
        )
        .getAttribute ('innerText');
      const payment4PulledFromNYSiteString = await driver
        .wait (
          until.elementLocated (
            By.xpath (
              '/html/body/div/div[3]/section/div/form/div[3]/div/div/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[3]/table[2]/tbody/tr[2]/td[8]'
            )
          )
        )
        .getAttribute ('innerText');

      /* 
                Now need to add together payment 3/4 from website and then get payment 1/2 from ptax, add all numbers together, this gives total amount liability
            */

      // Go back two pages to get tab ready for next parcel
      await driver.navigate ().back ();
      await driver.navigate ().back ();

      await driver.switchTo ().window (ptaxWindow);
      await driver.switchTo ().defaultContent ();
      await driver.switchTo ().frame (0);

      const parcelSplitFromBorough = blockNumber.concat ('-', lotNumber);
      const parcelXPath = `//*[text()='${parcelSplitFromBorough + ' (Pay by Electronic Funds Transfer)'}']`;
      const parcelToClick = await driver.wait (
        until.elementLocated (By.xpath (parcelXPath))
      );
      await parcelToClick.click ();

      const taxBillDrivenTabXPath = `//*[text()='${'Tax Bill Driven'}']`;
      //const editTaxAssessmentButtonXPath = `//*[text()='${"1/1/2021"}']`;

      await driver.switchTo ().defaultContent ();
      const iframe = await driver.findElement (By.id ('fmeMain'));
      await driver.switchTo ().frame (iframe);

      const taxBillDrivenTabButtonToClick = await driver.wait (
        until.elementLocated (By.xpath (taxBillDrivenTabXPath))
      );
      await taxBillDrivenTabButtonToClick.click ();

      const taxAssessmentButtonToClick = await driver.wait (
        until.elementLocated (
          By.xpath (
            '/html/body/form/div[5]/div[1]/div[1]/table/tbody/tr[1]/td[4]/a'
          )
        )
      );
      await taxAssessmentButtonToClick.click ();

      const payment1PulledFromPTAXString = await driver
        .wait (until.elementLocated (By.id ('tbBasePaymentAmount1')))
        .getAttribute ('value');
      const payment2PulledFromPTAXString = await driver
        .wait (until.elementLocated (By.id ('tbBasePaymentAmount2')))
        .getAttribute ('value');

      //Now start parsing values scraped from both sources into numbers so calculations can be performed

      //Payments pulled from PTax have a leading $ so need to remove that
      payment1PulledFromPTAXStringNoDollarSign = payment1PulledFromPTAXString.replace (
        '$',
        ''
      );
      payment2PulledFromPTAXStringNoDollarSign = payment2PulledFromPTAXString.replace (
        '$',
        ''
      );

      //Now strings should be on even footing, time to get rid of commas

      const payment1CommasRemoved = payment1PulledFromPTAXStringNoDollarSign.replace (
        ',',
        ''
      );
      const payment2CommasRemoved = payment2PulledFromPTAXStringNoDollarSign.replace (
        ',',
        ''
      );
      const payment3CommasRemoved = payment3PulledFromNYSiteString.replace (
        ',',
        ''
      );
      const payment4CommasRemoved = payment4PulledFromNYSiteString.replace (
        ',',
        ''
      );

      //Now time to convert all of these strings to floats

      const payment1Float = parseFloat (payment1CommasRemoved);
      const payment2Float = parseFloat (payment2CommasRemoved);
      const payment3Float = parseFloat (payment3CommasRemoved);
      const payment4Float = parseFloat (payment4CommasRemoved);

      console.log ('\n');
      console.log (
        '___________________________________________________________________________________________'
      );
      console.log (`Information for parcel: ${item}`);
      console.log ('payment1Float', payment1Float);
      console.log ('payment2Float', payment2Float);
      console.log ('payment3Float', payment3Float);
      console.log ('payment4Float', payment4Float);

      //Now time to add all of these numbers together to get the total amount liability

      const totalAmountLiability =
        payment1Float + payment2Float + payment3Float + payment4Float;
      console.log ('totalAmountLiability', totalAmountLiability);
      console.log ('\n');

      const totalAmountLiabilityString = totalAmountLiability.toString ();

      //Now that we have all of the values we need, send keys to total Liability field and then save

      const tbTotalTaxLiabilityField = await driver.wait (
        until.elementLocated (By.id ('tbTotalTaxLiability'))
      );
      const saveTaxLiabilityButton = await driver.wait (
        until.elementLocated (By.id ('btnSaveLiability'))
      );

      await tbTotalTaxLiabilityField.sendKeys (Key.CONTROL, 'a');
      await tbTotalTaxLiabilityField.sendKeys (Key.DELETE);
      await tbTotalTaxLiabilityField.sendKeys (totalAmountLiabilityString);
      await saveTaxLiabilityButton.click ();

      //Now that the value is saved, wait for loading before proceeding

      sleepDuration = generateDelayNumber ();
      await driver.sleep (sleepDuration);

      //Now that wait is done, send keys to payments 3 and 4, and then save

      const payment3FinalPayment = await driver.wait (
        until.elementLocated (By.id ('tbBasePaymentAmount3'))
      );
      const payment3BasePayment = await driver.wait (
        until.elementLocated (By.id ('tbBaseAmountTransmittal3'))
      );
      const payment4FinalPayment = await driver.wait (
        until.elementLocated (By.id ('tbBasePaymentAmount4'))
      );
      const payment4BasePayment = await driver.wait (
        until.elementLocated (By.id ('tbBaseAmountTransmittal4'))
      );
      const saveAllPaymentsButton = await driver.wait (
        until.elementLocated (By.id ('btnSaveALLPayment'))
      );

      await payment3FinalPayment.sendKeys (Key.CONTROL, 'a');
      await payment3FinalPayment.sendKeys (Key.DELETE);
      await payment3FinalPayment.sendKeys (payment3CommasRemoved);

      await payment3BasePayment.sendKeys (Key.CONTROL, 'a');
      await payment3BasePayment.sendKeys (Key.DELETE);
      await payment3BasePayment.sendKeys (payment3CommasRemoved);

      await payment4FinalPayment.sendKeys (Key.CONTROL, 'a');
      await payment4FinalPayment.sendKeys (Key.DELETE);
      await payment4FinalPayment.sendKeys (payment4CommasRemoved);

      await payment4BasePayment.sendKeys (Key.CONTROL, 'a');
      await payment4BasePayment.sendKeys (Key.DELETE);
      await payment4BasePayment.sendKeys (payment4CommasRemoved);

      await saveAllPaymentsButton.click ();

      //Now wait some seconds before attempting to swap frames
      sleepDuration = generateDelayNumber ();
      await driver.sleep (sleepDuration);

      await driver.switchTo ().defaultContent ();
      await driver.switchTo ().frame (0);
      sleepDuration = generateDelayNumber ();
      await driver.sleep (sleepDuration);
    } catch (error) {
      arrayOfFailedParcels.push (item);
      console.log (`Failed to execute for parcel: ${item} \n`);
      console.error (error);
    }
  }
  if (arrayOfFailedParcels.length > 0) {
    console.log ('The following parcels failed to complete data entry: \n');
    console.log (arrayOfFailedParcels);
  }
}

async function updateParcelNamesInPTax (arrayOfParcels) {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  let sleepDuration;
  await driver.manage ().window ().setRect ({width: 1920, height: 1080});
  //await driver.switchTo().newWindow('tab');
  const nyTaxBillWebsite = await driver.getWindowHandle ();
  await driver.get (
    'https://a836-pts-access.nyc.gov/care/search/commonsearch.aspx?mode=persprop'
  );
  await driver.findElement (By.id ('btAgree')).click ();
  await driver.switchTo ().newWindow ('tab');
  const ptaxWindow = await driver.getWindowHandle ();
  await driver.get ('https://ptax.ptaxsolution.com/Default.aspx');

  await driver.findElement (By.name ('txtUserName')).sendKeys ('fedwards');
  await driver
    .findElement (By.name ('txtPassword'))
    .sendKeys ('p@ssw0rd', Key.RETURN);

  let arrayOfSuccessfulParcels = [];
  let arrayOfFailedParcels = [];

  for (const item of arrayOfParcels) {
    const oldParcelName = item[0];
    const newParcelName = item[1];

    console.log (
      '--------------------------------------------------------------------------------------------------------------'
    );
    console.log (`Renaming parcel ${oldParcelName} => ${newParcelName}`);

    try {
      await driver.switchTo ().defaultContent ();

      const parcelSearchBarPTAX = await driver.findElement (
        By.id ('txtSearchParcel')
      );
      await parcelSearchBarPTAX.sendKeys (Key.CONTROL, 'a', Key.DELETE);
      await parcelSearchBarPTAX.sendKeys (item[0], Key.ENTER);

      await driver.switchTo ().defaultContent ();
      await driver.switchTo ().frame (0);
      await driver.wait (
        until.elementLocated (
          By.xpath (`//a[contains(text(), '${oldParcelName}')]`)
        )
      );

      const parcelToRename = await driver.findElement (
        By.xpath (`//a[contains(text(), '${oldParcelName}')]`)
      );
      await parcelToRename.click ();
      await driver.sleep (5000);

      await driver.switchTo ().defaultContent ();

      // Store the web element
      const iframe = driver.findElement (By.css ('#fmeMain'));
      // Switch to the frame
      await driver.switchTo ().frame (iframe);

      const taxBillDrivenTab = await driver.findElement (
        By.id ('licontainer2')
      );
      await taxBillDrivenTab.click ();

      const editParcelNameButton = await driver.findElement (
        By.xpath (
          '/html/body/form/div[4]/table/tbody/tr/td[1]/table/tbody/tr[3]/td[2]/span[1]/button'
        )
      );
      await editParcelNameButton.click ();

      driver.wait (until.elementLocated (By.id ('txtParcelNumber')));
      const parcelNumberInputField = await driver.findElement (
        By.id ('txtParcelNumber')
      );
      await parcelNumberInputField.sendKeys (Key.CONTROL, 'a', Key.DELETE);
      await parcelNumberInputField.sendKeys (newParcelName);
      await driver.sleep (2000);

      const saveEditToNameButton = await driver.findElement (
        By.id ('SaveButton')
      );
      await saveEditToNameButton.click ();
      await driver.sleep (2000);

      arrayOfSuccessfulParcels.push (item);
      await driver.switchTo ().defaultContent ();
      console.log ('Parcel renamed successfully!');
      console.log (
        '--------------------------------------------------------------------------------------------------------------'
      );
      sleepDuration = generateDelayNumber ();
      await driver.sleep (sleepDuration);
    } catch (error) {
      arrayOfFailedParcels.push (item);
      await driver.switchTo ().defaultContent ();
      console.log ('Parcel failed to be renamed');
      console.log (
        '--------------------------------------------------------------------------------------------------------------'
      );
      sleepDuration = generateDelayNumber ();
      await driver.sleep (sleepDuration);
    }
  }

  const paidParcelsStringified = JSON.stringify (arrayOfSuccessfulParcels);
  const unpaidParcelsStringified = JSON.stringify (arrayOfFailedParcels);

  if (paidParcelsStringified.length > 0) {
    fs.writeFileSync ('successfulParcels.json', paidParcelsStringified);
  }
  if (unpaidParcelsStringified.length > 0) {
    fs.writeFileSync ('unsuccessfulParcels.json', unpaidParcelsStringified);
  }
}

async function dataEntryNYAssessmentNotices (arrayOfParcels) {
  var driver = new Builder ()
    .forBrowser ('chrome')
    .setChromeOptions (
      new chrome.Options ().setUserPreferences ({
        'download.default_directory': 'C:/Users/frank.edwards/Downloads/NY_Assessment_Notices',
        'download.prompt_for_download': false,
      })
    )
    .build ();

  /*  let driver = new webdriver.Builder().
   withCapabilities(options.toCapabilities()).build(); */

  /*  driver = new webdriver.Builder()
   .forBrowser("chrome")
   .setChromeOptions(chromeOptions)
   .build(); */
  /* let driver = await new Builder ().forBrowser ('chrome').build (); */
  let sleepDuration;
  await driver.manage ().window ().setRect ({width: 1920, height: 1080});
  //await driver.switchTo().newWindow('tab');
  const nyTaxBillWebsite = await driver.getWindowHandle ();
  await driver.get (
    'https://a836-pts-access.nyc.gov/care/search/commonsearch.aspx?mode=persprop'
  );
  await driver.findElement (By.id ('btAgree')).click ();
  await driver.switchTo ().newWindow ('tab');
  const ptaxWindow = await driver.getWindowHandle ();
  await driver.get ('https://ptax.ptaxsolution.com/Default.aspx');

  await driver.findElement (By.name ('txtUserName')).sendKeys ('fedwards');
  await driver
    .findElement (By.name ('txtPassword'))
    .sendKeys ('p@ssw0rd', Key.RETURN);

  let arrayOfFailedParcels = [];
  await driver.wait (until.urlIs ('https://ptax.ptaxsolution.com/MainTC.aspx'));

  for (const item of arrayOfParcels) {
    console.log (`Currently working on parcel: ${item} \n`);
    try {
      await driver.switchTo ().window (ptaxWindow);
      await driver.switchTo ().defaultContent ();
      await driver.sleep (5000);
      const parcelSearchBarPTAX = await driver.findElement (
        By.id ('txtSearchParcel')
      );
      await parcelSearchBarPTAX.sendKeys (Key.CONTROL, 'a', Key.DELETE);
      await parcelSearchBarPTAX.sendKeys (item, Key.ENTER);

      await driver.switchTo ().defaultContent ();
      await driver.switchTo ().frame (0);
      await driver.wait (
        until.elementLocated (By.xpath (`//a[contains(text(), '${item}')]`))
      );

      const parcelToRename = await driver.findElement (
        By.xpath (`//a[contains(text(), '${item}')]`)
      );
      await parcelToRename.click ();
      await driver.sleep (5000);

      await driver.switchTo ().defaultContent ();

      // Store the web element
      const iframe = driver.findElement (By.css ('#fmeMain'));
      // Switch to the frame
      await driver.switchTo ().frame (iframe);

      const taxBillDrivenTab = await driver.findElement (
        By.id ('licontainer2')
      );
      await taxBillDrivenTab.click ();

      await driver.switchTo ().window (nyTaxBillWebsite);
      await driver.get (
        'https://a836-pts-access.nyc.gov/care/search/commonsearch.aspx?mode=persprop'
      );
      await driver.sleep (5000);

      const boroughNumber = item.split ('-')[0];
      const blockNumberPreZeroTrim = item.split ('-')[1];
      const blockNumber = parseInt (blockNumberPreZeroTrim, 10);
      const lotNumberPreZeroTrim = item.split ('-')[2];
      const lotNumber = parseInt (lotNumberPreZeroTrim, 10);

      if (boroughNumber === '1') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[2]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '2') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[3]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '3') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[4]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '4') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[5]'
              )
            )
          )
          .click ();
      } else if (boroughNumber === '5') {
        await driver
          .wait (
            until.elementLocated (
              By.xpath (
                '/html/body/div/div[3]/section/div/form/table/tbody/tr/td/div/div/table[1]/tbody/tr[6]/td/table/tbody/tr[1]/td[2]/select/option[6]'
              )
            )
          )
          .click ();
      }

      await driver
        .wait (until.elementLocated (By.id ('inpTag')))
        .sendKeys (blockNumber);

      await driver
        .wait (until.elementLocated (By.id ('inpStat')))
        .sendKeys (lotNumber);

      await driver.wait (until.elementLocated (By.id ('btSearch'))).click ();

      await driver.sleep (5000);
      const checkURL = await driver.getCurrentUrl ();

      if (checkURL.includes ('search/CommonSearch.aspx?mode=PERSPROP')) {
        try {
          const noResultsFoundElement = await driver.findElement (
            By.xpath (
              `//p[contains(text(), 'Your search did not find any records.')]`
            )
          );
          arrayOfFailedParcels.push (item);
          await driver.switchTo ().window (nyTaxBillWebsite);
          console.log (`Parcel: ${item} not found in database \n`);
          continue;
        } catch (error) {
          const strToFindTD = item.split ('-').join ('');
          const tdToClickBringToInformation = await driver.findElement (
            By.xpath (`//a[contains(text(), '${strToFindTD}')]`)
          );
          await tdToClickBringToInformation.click ();
          await driver.wait (until.urlContains ('/care/Datalets/Datalet.aspx'));
        }
      }

      // Click account history tab
      const accountHistoryTab = await driver.wait (
        until.elementLocated (
          By.css ('#sidemenu > ul > li:nth-child(3) > a > span')
        )
      );

      await driver.wait (until.urlContains ('Datalets/Datalet.aspx?sIndex'));

      const temporaryValues2022to2023Element = await driver.findElement (
        By.xpath ("//span[contains(text(), '2022-2023 Tentative')]")
      );
      await temporaryValues2022to2023Element.click ();

      await driver.wait (until.urlContains ('asmt_tent'));

      await driver.sleep (30000);

      const tableWithAssessmentData = await driver.findElement (
        By.id ('Assessment Information')
      );
      const assessmentTableArrayOfRows = await tableWithAssessmentData.findElements (
        By.css ('tr')
      );
      const estimatedMarketValueRow = assessmentTableArrayOfRows[1];
      const marketAVRow = assessmentTableArrayOfRows[2];

      const estimatedMarketValueTDs = await estimatedMarketValueRow.findElements (
        By.css ('td')
      );
      const marketAVTDs = await marketAVRow.findElements (By.css ('td'));

      const landMarketValueString = await estimatedMarketValueTDs[2].getAttribute (
        'innerText'
      );
      const landMarketValueStringCommasRemoved = landMarketValueString.replace (
        /,/g,
        ''
      );
      const landMarketValueInt = parseInt (landMarketValueStringCommasRemoved);

      //This is used to subtract landmarketvalue to get landAssessed value, nothing else
      const landTotalValueString = await estimatedMarketValueTDs[3].getAttribute (
        'innerText'
      );
      const landTotalValueStringCommasRemoved = landTotalValueString.replace (
        /,/g,
        ''
      );
      const landTotalValueInt = parseInt (landTotalValueStringCommasRemoved);

      //Now subtract marketvalue from total value to get assessed value
      const improvementMarketValueInt = landTotalValueInt - landMarketValueInt;
      const improvementMarketValueString = improvementMarketValueInt.toString ();

      const landAssessedValueString = await marketAVTDs[2].getAttribute (
        'innerText'
      );
      console.log ('landAssessedValueString', landAssessedValueString);

      const landAssessedValueStringCommasRemoved = landAssessedValueString.replace (
        /,/g,
        ''
      );
      const landAssessedValueInt = parseInt (
        landAssessedValueStringCommasRemoved
      );

      //This is used to subtract improvementmarketvalue to get improvementAssessed value, nothing else
      const improvementTotalValueString = await marketAVTDs[3].getAttribute (
        'innerText'
      );
      const improvementTotalValueStringCommasRemoved = improvementTotalValueString.replace (
        /,/g,
        ''
      );
      const improvementTotalValueInt = parseInt (
        improvementTotalValueStringCommasRemoved
      );

      console.log ('improvementTotalValueInt', improvementTotalValueInt);
      console.log ('landAssessedValueInt', landAssessedValueInt);

      const improvementAssessedValueInt =
        improvementTotalValueInt - landAssessedValueInt;
      const improvementAssessedValueString = improvementAssessedValueInt.toString ();

      const noticeOfPropertyTabElement = await driver.findElement (
        By.xpath ('/html/body/div/div[3]/div/nav/div/div/ul/li[6]/a')
      );
      await noticeOfPropertyTabElement.click ();

      await driver.sleep (5000);

      const noticesOfPropertyTable = await driver.findElement (
        By.id ('Notices of Property Value')
      );
      const noticesOfPropertyTRs = await noticesOfPropertyTable.findElements (
        By.css ('tr')
      );

      const firstTROfTableWithData = noticesOfPropertyTRs[1];
      const firstTROfTableWithDataTDs = await firstTROfTableWithData.findElements (
        By.css ('td')
      );

      let isCorrectRow = false;
      let indexOfCorrectRow;
      let correctRowToDownloadPDF;

      for (const [index, nestedItem] of firstTROfTableWithDataTDs.entries ()) {
        let correctRowChecker = await nestedItem.getAttribute ('innerText');

        if (
          correctRowChecker.includes ('2022') &&
          correctRowChecker.includes ('January')
        ) {
          isCorrectRow = true;
          indexOfCorrectRow = index;
          correctTDToDownloadPDF = nestedItem;
          break;
        }
      }

      if (isCorrectRow === true) {
        const tdWithDownloadLink = correctTDToDownloadPDF;
        const tdWithDownloadLinkAnchorTag = await tdWithDownloadLink.findElements (
          By.css ('a')
        );
        const anchorTagToDownload = tdWithDownloadLinkAnchorTag[0];
        const anchorTagToDownloadHREF = await anchorTagToDownload.getAttribute (
          'href'
        );

        await request
          .get (anchorTagToDownloadHREF)
          .pipe (
            fs.createWriteStream (
              `C:/Users/frank.edwards/Downloads/NY_Assessment_Notices/${item}.pdf`
            )
          );

        const returnToBBLSearchBtn = await driver.findElement (
          By.xpath ('/html/body/div/div[2]/div/nav/div[2]/ul/li[2]/a')
        );
        await returnToBBLSearchBtn.click ();
        await driver.sleep (5000);
        await driver.switchTo ().window (ptaxWindow);
        await driver.switchTo ().defaultContent ();
        await driver.switchTo ().frame (1);

        const btnNewAssessment = await driver.findElement (
          By.id ('btn_new_assessment')
        );
        await btnNewAssessment.click ();

        await driver.wait (until.elementLocated (By.id ('btnStart')));
        const startAssessmentBtn = await driver.findElement (
          By.id ('btnStart')
        );
        await startAssessmentBtn.click ();

        await driver.wait (until.elementLocated (By.id ('AssessmentSection')));

        const landMarketValueInputField = await driver.findElement (
          By.name ('tbMarketValueLand')
        );
        await landMarketValueInputField.sendKeys (landMarketValueString);

        const landAssessedValueInputField = await driver.findElement (
          By.name ('tbAssessedValueLand')
        );
        await landAssessedValueInputField.sendKeys (landAssessedValueString);

        const improvementsMarketValueInputField = await driver.findElement (
          By.name ('tbMarketValueImprovements')
        );
        await improvementsMarketValueInputField.sendKeys (
          improvementMarketValueString
        );

        const improvementsAssessedValueInputField = await driver.findElement (
          By.name ('tbAssessedValueImprovements')
        );
        await improvementsAssessedValueInputField.sendKeys (
          improvementAssessedValueString
        );

        await driver.sleep (6000);

        const btnSaveAssessment = await driver.findElement (
          By.name ('btnSaveAssessment')
        );
        await btnSaveAssessment.click ();

        //Now it's time to upload pdf of the assessment
        await driver.switchTo ().defaultContent ();

        //Click on document element in navbar
        const documentTabOfNavbar = await driver.findElement (
          By.xpath ('/html/body/form/div[4]/div/ul/li[4]/a/span')
        );
        await documentTabOfNavbar.click ();

        //wait until the upload document dropdown is interactable, then click
        await driver.sleep (5000);
        const newDocumentElement = await driver.findElement (
          By.xpath ('/html/body/form/div[4]/div/ul/li[4]/div/ul/li[9]/a/span')
        );
        driver.wait (until.elementIsEnabled (newDocumentElement));
        await newDocumentElement.click ();

        //Click reserve button
        await driver.switchTo ().frame (iframe);
        const reserveButton = await driver.findElement (By.id ('UploadBtn'));
        await driver.wait (until.elementIsEnabled (reserveButton));
        await reserveButton.click ();

        //For selenium to upload file you have to sendkeys of the filename, declaring part of string to concat in string literal below
        const baseFilePath =
          'C:/Users/frank.edwards/Downloads/NY_Assessment_Notices/';

        //Click upload file button
        await driver.wait (until.elementLocated (By.id ('Image1')));
        const chooseFileButton = await driver.findElement (By.id ('Image1'));
        await chooseFileButton.sendKeys (`${baseFilePath + item + '.pdf'}`);

        //Select correct assessment year from dropdown
        const assessmentInputElement = await driver.findElement (
          By.xpath (
            '/html/body/form/div[3]/div/table[2]/tbody/tr[5]/td[2]/select'
          )
        );
        let correctAssessmentElement;
        const assessmentInputElementChildren = await assessmentInputElement.findElements (
          By.css ('option')
        );

        for (const itemNestedNested of assessmentInputElementChildren) {
          const itemNestedNestedInnerText = await itemNestedNested.getAttribute (
            'innerText'
          );
          if (itemNestedNestedInnerText.includes ('| 2022-2023 | ANN')) {
            correctAssessmentElement = itemNestedNested;
          }
        }
        await correctAssessmentElement.click ();

        await driver.sleep (5000);

        await driver.wait (
          until.elementLocated (
            By.xpath (
              '/html/body/form/div[3]/div/table[2]/tbody/tr[7]/td[2]/select/option[9]'
            )
          )
        );
        const assessmentNoticeElement = await driver.findElement (
          By.xpath (
            '/html/body/form/div[3]/div/table[2]/tbody/tr[7]/td[2]/select/option[9]'
          )
        );
        await assessmentNoticeElement.click ();

        //Set Name of file before uploading to server
        await driver.sleep (5000);
        const titleElement = await driver.findElement (By.id ('fileTitle'));
        await titleElement.sendKeys (`Annual`);

        //Save file to server
        await driver.sleep (5000);
        const documentSaveButton = await driver.findElement (
          By.id ('UploadBtn')
        );
        await documentSaveButton.click ();

        await driver.sleep (5000);

        console.log (`${item} was successful!`);
      }

      await driver.switchTo ().defaultContent ();
      await driver.switchTo ().frame (0);
      await driver.switchTo ().window (nyTaxBillWebsite);
      /* sleepDuration = generateDelayNumber ();
      await driver.sleep (sleepDuration); */
      await driver.sleep (5000);
    } catch (error) {
      arrayOfFailedParcels.push (item);
      await driver.switchTo ().window (nyTaxBillWebsite);
      console.log (`Failed to execute for parcel: ${item} \n`);
      console.error (error);
    }
  }
  if (arrayOfFailedParcels.length > 0) {
    console.log ('The following parcels failed to complete data entry: \n');
    console.log (arrayOfFailedParcels);
  }

  const unpaidParcelsStringified = JSON.stringify (arrayOfFailedParcels);
  if (unpaidParcelsStringified.length > 0) {
    fs.writeFileSync ('unsuccessfulParcels.json', unpaidParcelsStringified);
  }
}

dataEntryNYAssessmentNotices ([
  '3-00208-0002'
]);
