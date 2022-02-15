const goToUploadDocumentPage = async (driver) => {
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
};

module.exports = goToUploadDocumentPage;
