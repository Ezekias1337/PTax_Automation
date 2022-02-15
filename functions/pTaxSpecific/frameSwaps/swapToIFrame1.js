const swapToIFrame1 = async driver => {
  await swapToIFrameDefaultContent (driver);
  // Store the web element
  const iframe = driver.findElement (By.css ('#fmeMain'));
  // Switch to the frame
  await driver.switchTo ().frame (iframe);
  console.log ('Successfully switched to frame 1(right hand side of ui)');
};

module.exports = swapToIFrame1;