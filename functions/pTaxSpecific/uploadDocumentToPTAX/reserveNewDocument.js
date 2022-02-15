const reserveNewDocument = async (driver, iframe) => {
    await driver.switchTo ().frame (iframe);
    const reserveButton = await driver.findElement (By.id ('UploadBtn'));
    await driver.wait (until.elementIsEnabled (reserveButton));
    await reserveButton.click ();
};

module.exports = reserveNewDocument;