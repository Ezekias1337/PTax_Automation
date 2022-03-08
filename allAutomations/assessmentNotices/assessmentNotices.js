const newYorkAssessmentNotices = require("./states/newYork/newYorkAssessmentNotices");

const assessmentNotices = async (state, city, operation) => {
  /* 
        Need to pick automation by using sublocation
    */

  switch (state) {
    case "California":
      // code block
      break;
    case "New York":
      await newYorkAssessmentNotices(state, city, operation);
      break;
    default:
    // code block
  }
};

module.exports = assessmentNotices;
