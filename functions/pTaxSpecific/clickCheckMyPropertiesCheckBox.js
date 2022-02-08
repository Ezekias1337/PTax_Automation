const clickCheckMyPropertiesCheckBox = async (driver) => {
let checkBox = await driver.wait (
    until.elementLocated (By.name ('CheckMyProperties'))
    );
    await driver.findElement (By.id ('CheckMyProperties')).click ();
};

module.exports = {clickCheckMyPropertiesCheckBox};