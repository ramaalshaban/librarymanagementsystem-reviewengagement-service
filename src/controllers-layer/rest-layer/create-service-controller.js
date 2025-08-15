const ReviewEngagementServiceRestController = require("./ReviewEngagementServiceRestController");

module.exports = (name, routeName, req, res) => {
  const restController = new ReviewEngagementServiceRestController(
    name,
    routeName,
    req,
    res,
  );
  return restController;
};
