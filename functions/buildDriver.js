const buildDriver = async () => {
  let driver = await new Builder ().forBrowser ('chrome').build ();
  await driver.manage ().window ().maximize ();
  return driver;
};

module.exports = {buildDriver};
