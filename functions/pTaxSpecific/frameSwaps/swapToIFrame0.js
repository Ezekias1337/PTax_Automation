const colors = require('colors');

const swapToIFrame0 = async driver => {
  await swapToIFrameDefaultContent (driver);
  await driver.switchTo ().frame (0);
  console.log ('Successfully switched to frame 0(where properties are listed)');
};

module.exports = swapToIFrame0;