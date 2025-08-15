const ReviewEngagementServiceGrpcController = require("./ReviewEngagementServiceGrpcController");

module.exports = (name, routeName, call, callback) => {
  const grpcController = new ReviewEngagementServiceGrpcController(
    name,
    routeName,
    call,
    callback,
  );
  return grpcController;
};
