const buildDriver = require("../../functions/driver/buildDriver");
const colors = require('colors');

const checkAssessorURLs = async () => {
    /* 
        Need to pick automation by using sublocation
    */

    const driver = await buildDriver;
    console.log(`Running check Assessor URL automation: `);
};

module.exports = checkAssessorURLs;
