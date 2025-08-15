module.exports = (headers) => {
  // main Database Crud Object Mcp Api Routers
  return {
    reviewMcpRouter: require("./review")(headers),
    recommendationMcpRouter: require("./recommendation")(headers),
    engagementEventMcpRouter: require("./engagementEvent")(headers),
  };
};
