const buildDriver = require("../../functions/driver/buildDriver");
const colors = require('colors');

const updateParcelNames = async () => {
  /* 
        Need to pick automation by using sublocation
    */

  const driver = await buildDriver;
  console.log(`Running update parcel automation: `);
};

module.exports = updateParcelNames;
