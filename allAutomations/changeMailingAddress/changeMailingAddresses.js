const buildDriver = require("../../functions/driver/buildDriver");

const changeMailingAddresses = async (sublocation) => {
    /* 
        Need to pick automation by using sublocation
    */

    const driver = await buildDriver;
    console.log(`Running change mailing address automation for: ${sublocation}`);
};

module.exports = changeMailingAddresses;
