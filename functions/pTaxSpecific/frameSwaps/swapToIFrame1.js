const colors = require("colors");
const swapToIFrameDefaultContent = require("./swapToIFrameDefaultContent");
const awaitElementLocatedAndReturn = require("../../general/awaitElementLocatedAndReturn");

const swapToIFrame1 = async (driver) => {
  await swapToIFrameDefaultContent(driver);
  const iframe = await awaitElementLocatedAndReturn(driver, "#fmeMain", "css");
  await driver.switchTo().frame(iframe);
  /* console.log(
    colors.yellow.bold(
      "Successfully switched to frame 1 (right hand side of ui)"
    )
  ); */
};

module.exports = swapToIFrame1;
