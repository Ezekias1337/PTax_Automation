const colors = require("colors");

const generateDynamicXPath = (
  elementType,
  textToSearchFor,
  containOrEquals
) => {
  let xpathToReturn;

  if (containOrEquals === "contains") {
    xpathToReturn = `//${elementType}[contains(text(), ${textToSearchFor})]`;
  } else if (containOrEquals === "equals") {
    xpathToReturn = `//*[text()=${textToSearchFor}]`;
  } else {
    xpathToReturn = "failed";
    console.log(
      colors.red.bold(
        "Failed to generate dynamic xpath. Check the arguments of the function when you're calling"
      )
    );
  }

  return xpathToReturn;
};

module.exports = generateDynamicXPath;
