const {Builder, By, Key, until} = require ('selenium-webdriver');
const chrome = require ('selenium-webdriver/chrome');
const {usernameHidden, passwordHidden} = require ('./credentials');
const htmlPdf = require ('html-pdf-chrome');
const fs = require ('fs');
//const options = new chrome.Options()

/* 
    NEED TO FIX CREDENTIALS IMPORT
    NEED TO ADD A FILE FOR CHOOSING DEFAULT DOWNLOAD LOCATION (printPageToPDF)
    NEED TO IMPORT SWAP TO DEFAULT CONTENT FUNCTION TO OTHER FRAME SWAP FUNCTIONS
    SOME FUNCTIONS NEED TO PASS PTAXWINDOW, OR IFRAME
*/

function generateDelayNumber () {
  const amountToSleep = Math.floor (
    Math.random () * (25000 - 13000 + 1) + 13000
  );
  console.log (`Sleeping for: ${amountToSleep / 1000} seconds.`, amountToSleep);
  return amountToSleep;
}

async function printPageToPDF (driver, outputFilename) {
  const DEFAULT_PRINT_PATH =
    'C:/Users/frank.edwards/Desktop/Tax_Bills_Check Requests_And_Assessment_Notices/Assessment_Notices';
  console.log ('Getting the html...');
  const sourceHTML = await driver
    .findElement (By.css ('body'))
    .getAttribute ('innerHTML');
  //let sourceHTML = await driver.getSource();

  console.log ('Printing the html using Chrome...');
  let pdf = await htmlPdf.create (sourceHTML);

  console.log ('Saving the PDF to ' + outputFilename + '...');
  await pdf.toFile (`${DEFAULT_PRINT_PATH} ${outputFilename}`);
  console.log ('File saved!');
}

async function openNewTab (driver) {
  await driver.switchTo ().newWindow ('tab');
}

async function switchToPTaxTab (driver, ptaxWindow) {
  await driver.switchTo ().window (ptaxWindow);
}

async function switchToTaxWebsiteTab (driver, taxWebsiteWindow) {
  await driver.switchTo ().window (taxWebsiteWindow);
}

async function swapToIFrameDefaultContent (driver) {
  await driver.switchTo ().defaultContent ();
  console.log (
    'Successfully switched to default frame, for purpose of resetting context'
  );
}

async function swapToIFrame0 (driver) {
  await swapToIFrameDefaultContent (driver);
  await driver.switchTo ().frame (0);
  console.log ('Successfully switched to frame 0(where properties are listed)');
}

async function swapToIFrame1 (driver) {
  await swapToIFrameDefaultContent (driver);
  // Store the web element
  const iframe = driver.findElement (By.css ('#fmeMain'));
  // Switch to the frame
  await driver.switchTo ().frame (iframe);
  console.log ('Successfully switched to frame 1(right hand side of ui)');
}

async function buildDriver () {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  await driver.manage ().window ().maximize ();
  return driver;
}

async function loginToPTAX (username, password) {
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
}

async function clickCheckMyPropertiesCheckBox () {
  let checkBox = await driver.wait (
    until.elementLocated (By.name ('CheckMyProperties'))
  );
  await driver.findElement (By.id ('CheckMyProperties')).click ();
}

async function angelinaCounty (arrayOfParcels) {
  const arrayOfPTaxWindowAndDriver = await loginToPTAX (
    usernameHidden,
    passwordHidden
  );
  const ptaxWindow = arrayOfPTaxWindowAndDriver[0];
  const driver = arrayOfPTaxWindowAndDriver[1];
  await openNewTab (driver);
  const taxWebsiteWindow = await driver.getWindowHandle ();
  await driver.get (
    'https://propaccess.trueautomation.com/clientdb/PropertySearch.aspx?cid=71'
  );

  for (const [index, item] of arrayOfParcels.entries ()) {
    try {
      //split the string to get the query for website
      let searchQuery = item.split (' ')[0];
      console.log ('searchQuery', searchQuery);
      //search for parcel
      const searchBar = await driver.findElement (
        By.id ('propertySearchOptions_searchText')
      );
      const submitSearchButton = await driver.findElement (
        By.id ('propertySearchOptions_search')
      );
      const taxYearElement = await driver.findElement (
        By.xpath (
          '/html/body/form/div[3]/fieldset[3]/table/tbody/tr[1]/td[2]/select/option[1]'
        )
      );

      //WHEN DONE NEED TO UNCOMMENT BOTTOM LINE, TAX YEAR 2022 ISNT AVAILABLE YET
      //await taxYearElement.click ();
      await searchBar.sendKeys (searchQuery);
      await submitSearchButton.click ();

      //click on search results link
      let linkXpath =
        '/html/body/form/div[3]/div[2]/table/tbody/tr[2]/td[10]/a';
      await driver.wait (until.elementLocated (By.xpath (linkXpath)));
      const viewDetailsLink = await driver.findElement (By.xpath (linkXpath));
      await viewDetailsLink.click ();

      //click on expand all element to show all information
      await driver
        .findElement (By.xpath ('/html/body/form/div/div[5]/div[1]/span/input'))
        .click ();

      //save PDF of assessment Notice
      await printPageToPDF (
        driver,
        `Angelina County ${item} Assessment Notice`
      );

      //scrape data from page and parse it
      //Get improvement values elements
      const improvementHomeSiteValueElement = await driver
        .findElement (
          By.xpath ('/html/body/form/div/div[5]/div[5]/table/tbody/tr[2]/td[3]')
        )
        .getAttribute ('innerText');
      const improvementNonHomeSiteValueElement = await driver
        .findElement (
          By.xpath ('/html/body/form/div/div[5]/div[5]/table/tbody/tr[3]/td[3]')
        )
        .getAttribute ('innerText');
      //Get land values elements
      const landHomeSiteValueElement = await driver
        .findElement (
          By.xpath ('/html/body/form/div/div[5]/div[5]/table/tbody/tr[4]/td[3]')
        )
        .getAttribute ('innerText');
      const landNonHomesiteValueElement = await driver
        .findElement (
          By.xpath ('/html/body/form/div/div[5]/div[5]/table/tbody/tr[5]/td[3]')
        )
        .getAttribute ('innerText');
      const agriculturalMarketValuationElement = await driver
        .findElement (
          By.xpath ('/html/body/form/div/div[5]/div[5]/table/tbody/tr[6]/td[3]')
        )
        .getAttribute ('innerText');
      const timberMarketValuationElement = await driver
        .findElement (
          By.xpath ('/html/body/form/div/div[5]/div[5]/table/tbody/tr[7]/td[3]')
        )
        .getAttribute ('innerText');
      //Get market and exemption values elements
      const marketValueElement = await driver
        .findElement (
          By.xpath ('/html/body/form/div/div[5]/div[5]/table/tbody/tr[9]/td[3]')
        )
        .getAttribute ('innerText');
      const exemptionValueElement = await driver
        .findElement (
          By.xpath (
            '/html/body/form/div/div[5]/div[5]/table/tbody/tr[10]/td[3]'
          )
        )
        .getAttribute ('innerText');

      //Take Strings and remove $ and commas
      const arrayOfStringsToRemoveDollarSignAndCommas = [
        ['improvement', improvementHomeSiteValueElement],
        ['improvement', improvementNonHomeSiteValueElement],
        ['land', landHomeSiteValueElement],
        ['land', landNonHomesiteValueElement],
        ['agricultural', agriculturalMarketValuationElement],
        ['timber', timberMarketValuationElement],
        ['marketValue', marketValueElement],
        ['exemptionValue', exemptionValueElement],
      ];

      let arrayOfImprovementValueStrings = [];
      let arrayOfLandValueStrings = [];

      let improvementsValue = 0;
      let landValue = 0;
      let marketValue = 0;
      let exemptionValue = 0;

      for (const itemNested of arrayOfStringsToRemoveDollarSignAndCommas) {
        if (itemNested[0].includes ('improvement')) {
          let improvementParsedToNumber = parseInt (
            itemNested[1].replace ('$', '').replace (',', '')
          );
          arrayOfImprovementValueStrings.push (improvementParsedToNumber);
        } else if (
          itemNested.includes ('land') ||
          itemNested.includes ('agricultural') ||
          itemNested.includes ('timber')
        ) {
          let landParsedToNumber = parseInt (
            itemNested[1].replace ('$', '').replace (',', '')
          );
          arrayOfLandValueStrings.push (landParsedToNumber);
        } else if (itemNested[0].includes ('marketValue')) {
          marketValue = parseInt (
            itemNested[1].replace ('$', '').replace (',', '')
          );
        } else if (itemNested[0].includes ('exemptionValue')) {
          exemptionValue = parseInt (
            itemNested[1].replace ('$', '').replace (',', '')
          );
        }
      }

      //Sum up all of the improvement category values
      for (const itemNested of arrayOfImprovementValueStrings) {
        improvementsValue = improvementsValue + itemNested;
      }

      //sum up all of the land category values
      for (const itemNested of arrayOfLandValueStrings) {
        landValue = landValue + itemNested;
      }

      //Go back two pages and switch back to PTAXWindow
      await driver.navigate ().back ();
      await driver.navigate ().back ();
      await switchToPTaxTab (driver, ptaxWindow);

      //search for parcel in searchbar, then click on result
      const parcelItemToString = item.toString ();
      const parcelToClickXpath = `//a[contains(text(), '${parcelItemToString}')]`; //`//a[contains(text(), ${item})]`
      const parcelSearchBar = await driver.findElement (
        By.id ('txtSearchParcel')
      );
      await parcelSearchBar.sendKeys (item, Key.ENTER);
      await swapToIFrame0 (driver);
      const parcelToClick = await driver.findElement (
        By.xpath (parcelToClickXpath)
      );
      await parcelToClick.click ();

      /* 
            Need to do the following:
            Do data entry of assessment notice
            Upload PDF of assessment notice
      */

      await swapToIFrame1 (driver);

      //Click on Add new assessment button
      const addNewAssessmentButton = await driver.findElement (
        By.id ('btn_new_assessment')
      );
      await addNewAssessmentButton.click ();

      //Click on Tax Year element
      const ptaxTaxYearElement = await driver.findElement (
        By.xpath (
          '/html/body/form/p[1]/table/tbody/tr[4]/td[2]/select/option[12]'
        )
      );
      await ptaxTaxYearElement.click ();

      //Click on Begin button (takes you to data entry page)
      const beginButton = await driver.findElement (By.id ('btnStart'));
      await beginButton.click ();

      //Send stored information to dataFields
      const landMarketValueInputField = await driver.findElement (
        By.id ('tbMarketValueLand')
      );
      await landMarketValueInputField.sendKeys (landValue.toString ());

      const landAssessedvalueInputField = await driver.findElement (
        By.id ('tbAssessedValueLand')
      );
      await landAssessedvalueInputField.sendKeys (landValue.toString ());

      const improvementsMarketValueInputField = await driver.findElement (
        By.id ('tbMarketValueImprovements')
      );
      await improvementsMarketValueInputField.sendKeys (
        improvementsValue.toString ()
      );

      const improvementsAssessedValueInputField = await driver.findElement (
        By.id ('tbAssessedValueImprovements')
      );
      await improvementsAssessedValueInputField.sendKeys (
        improvementsValue.toString ()
      );

      const exemptionMarketValueField = await driver.findElement (
        By.id ('tbMarketValueExemption')
      );
      await exemptionMarketValueField.sendKeys (exemptionValue.toString ());

      const exemptionAssessedValueField = await driver.findElement (
        By.id ('tbAssessedValueExemption')
      );
      await exemptionAssessedValueField.sendKeys (exemptionValue.toString ());

      //Find save button element and click on it
      const saveButton = await driver.findElement (By.id ('btnSaveAssessment'));
      await saveButton.click ();

      //Now it's time to upload pdf of the assessment
      await swapToIFrameDefaultContent (driver);

      //Click on document element in navbar
      const documentTabOfNavbar = await driver.findElement (
        By.xpath ('/html/body/form/div[4]/div/ul/li[4]/a/span')
      );
      await documentTabOfNavbar.click ();

      //wait until the upload document dropdown is interactable, then click
      await driver.sleep (10000);
      const newDocumentElement = await driver.findElement (
        By.xpath ('/html/body/form/div[4]/div/ul/li[4]/div/ul/li[9]/a/span')
      );
      driver.wait (until.elementIsEnabled (newDocumentElement));
      await newDocumentElement.click ();

      //Click reserve button
      await swapToIFrame1 (driver);
      const reserveButton = await driver.findElement (By.id ('UploadBtn'));
      await reserveButton.click ();

      //For selenium to upload file you have to sendkeys of the filename, declaring part of string to concat in string literal below
      const baseFilePath =
        'C:/Users/frank.edwards/Desktop/Tax_Bills_Check Requests_And_Assessment_Notices/';

      //Click upload file button
      await driver.wait (until.elementLocated (By.id ('Image1')));
      const chooseFileButton = await driver.findElement (By.id ('Image1'));
      await chooseFileButton.sendKeys (
        `${baseFilePath}Assessment_Notices Angelina County ${item} Assessment Notice`
      );

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

      //Select correct Document Type from dropdown
      const correctDocTypeElement = await driver.findElement (
        By.xpath (
          '/html/body/form/div[3]/div/table[2]/tbody/tr[6]/td[2]/select/option[9]'
        )
      );
      await correctDocTypeElement.click ();
      await driver.sleep (5000);

      //Set Name of file before uploading to server
      const titleElement = await driver.findElement (By.id ('fileTitle'));
      await titleElement.sendKeys (`Angelina County ${item} Assessment Notice`);

      //Save file to server
      await driver.sleep (5000);
      const documentSaveButton = await driver.findElement (By.id ('UploadBtn'));
      await documentSaveButton.click ();

      //Now need to handle swapping back to other tab

      await driver.sleep (5000);
    } catch (error) {
      console.log (error);
    }
  }
}

angelinaCounty (['0016-057-040-002-00 (94887)', '0016-057-041-000-00 (14047)']);

async function bexarCounty () {}

async function bowieCounty () {}

async function brazoriaCounty () {}

async function brazosCounty () {}

async function cameronCounty () {}

async function collinCounty () {}

async function dallasCounty () {}

async function dentonCounty () {}

async function elPasoCounty () {}

async function fortBendCounty () {}

async function harrisCounty () {}

async function libertyCounty () {}

async function montgomeryCounty () {}

async function tarrantCounty () {}

async function travisCounty () {}

async function victoriaCounty () {}

async function wallerCounty () {}

async function wichitaCounty () {}

async function williamsonCounty () {}
