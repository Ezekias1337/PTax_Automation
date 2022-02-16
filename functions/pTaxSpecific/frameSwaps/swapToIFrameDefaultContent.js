const colors = require('colors');

const swapToIFrameDefaultContent = async driver => {
  await driver.switchTo ().defaultContent ();
  console.log (
    'Successfully switched to default frame, for purpose of resetting context'
  );
};

module.exports = swapToIFrameDefaultContent;
