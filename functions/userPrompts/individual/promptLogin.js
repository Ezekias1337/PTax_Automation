const colors = require('colors');
const prompt = require("prompt-sync")();

const promptLogin = async () => {
  console.log("\n");
  console.log("In order to log into PTax, enter your login credentials: ");
  const username = prompt("Enter username: ");
  const password = prompt("Enter password: ");

  const loginCredentials = { username: username, password: password };

  return loginCredentials;
};

module.exports = promptLogin;
