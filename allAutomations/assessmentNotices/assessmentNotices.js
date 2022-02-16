const buildDriver = require("../../functions/driver/buildDriver");
const colors = require('colors');

const assessmentNotices = async (sublocation) => {
    /* 
        Need to pick automation by using sublocation
    */

    const driver = await buildDriver;
    console.log(`Running assessment notice automation for: ${sublocation}`);
};

module.exports = assessmentNotices;
