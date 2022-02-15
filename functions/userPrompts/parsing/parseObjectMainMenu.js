const consoleLogKeyAndName = require("./consoleLogKeyAndName");

const parseObjectMainMenu = (objectToParse, stateOrCity) => {
  const objConvertedToArray = [];

  for (const item of objectToParse) {
    if (stateOrCity === "state") {
      if (item?.key && item?.state) {
        objConvertedToArray.push(item);
        consoleLogKeyAndName(item.key, item.state);
      }
    } else if (stateOrCity === "city") {
      if (item?.key && item?.name) {
        objConvertedToArray.push(item);
        consoleLogKeyAndName(item.key, item.name);
      }
    }
  }
  return objConvertedToArray;
};

module.exports = parseObjectMainMenu;
