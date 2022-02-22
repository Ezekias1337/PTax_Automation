const colors = require("colors");
const swapToIFrameDefaultContent = require("./swapToIFrameDefaultContent");

const swapToIFrame0 = async (driver) => {
  await swapToIFrameDefaultContent(driver);
  await driver.switchTo().frame(0);
  console.log(
    colors.yellow.bold(
      "Successfully switched to frame 0 (where properties are listed)"
    )
  );
};

module.exports = swapToIFrame0;
