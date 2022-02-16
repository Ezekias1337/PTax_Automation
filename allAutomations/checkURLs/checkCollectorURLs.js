const buildDriver = require("../../functions/driver/buildDriver");

const checkCollectorURLs = async () => {
    /* 
        Need to pick automation by using sublocation
    */

    const driver = await buildDriver;
    console.log(`Running check Tax Collector URL automation: `);
};

module.exports = checkCollectorURLs;
