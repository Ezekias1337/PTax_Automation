const generateDelayNumber = () => {
  const amountToSleep = Math.floor (
    Math.random () * (25000 - 13000 + 1) + 13000
  );
  console.log (`Sleeping for: ${amountToSleep / 1000} seconds.`, amountToSleep);
  return amountToSleep;
};

module.exports = {generateDelayNumber};