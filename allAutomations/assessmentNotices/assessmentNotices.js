const buildDriver = require("../../functions/driver/buildDriver");

const assessmentNotices = async (sublocation) => {
    /* 
        Need to pick automation by using sublocation
    */

    const driver = await buildDriver;
    console.log(`Running assessment notice automation for: ${sublocation}`);
};

module.exports = assessmentNotices;
