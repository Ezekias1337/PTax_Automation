const saveWindowHandle = async driver => {
  const windowHandleToSave = await driver.getWindowHandle ();
  return windowHandleToSave;
};

module.exports = {saveWindowHandle};