const newYorkAssessmentNotices = require("./states/newYork/newYorkAssessmentNotices");
const californiaAssessmentNotices = require("./states/california/californiaAssessmentNotices");

const assessmentNotices = async (state, city, operation) => {
  switch (state) {
    case "California":
      await californiaAssessmentNotices(state, city, operation);
      break;
    case "New York":
      await newYorkAssessmentNotices(state, city, operation);
      break;
    default:
      break;
  }
};

module.exports = assessmentNotices;
