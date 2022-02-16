const colors = require('colors');

const consoleLogLine = () => {
  console.log("\n");
  console.log(
    "-------------------------------------------------------------------------------------------".blue.bold
  );
  console.log("\n");
};

module.exports = consoleLogLine;
