const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const ReviewEngagementServiceManager = require("../../service-manager/ReviewEngagementServiceManager");

/* Base Class For the Crud Routes Of DbObject Review */
class ReviewManager extends ReviewEngagementServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "review";
    this.modelName = "Review";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = ReviewManager;
