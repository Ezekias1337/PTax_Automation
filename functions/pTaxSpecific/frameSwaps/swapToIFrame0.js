const colors = require("colors");
const swapToIFrameDefaultContent = require("./swapToIFrameDefaultContent");
const awaitElementLocatedAndReturn = require("../../general/awaitElementLocatedAndReturn");

const swapToIFrame0 = async (driver) => {
  await swapToIFrameDefaultContent(driver);
  const iframe = await awaitElementLocatedAndReturn(driver, "#fmeTree", "css");
  await driver.switchTo().frame(iframe);
  /* console.log(
    colors.yellow.bold(
      "Successfully switched to frame 0 (where properties are listed)"
    )
  ); */
};

module.exports = swapToIFrame0;
