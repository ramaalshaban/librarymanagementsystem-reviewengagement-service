const ReviewEngagementServiceMcpController = require("./ReviewEngagementServiceMcpController");

module.exports = (name, routeName, params) => {
  const mcpController = new ReviewEngagementServiceMcpController(
    name,
    routeName,
    params,
  );
  return mcpController;
};
