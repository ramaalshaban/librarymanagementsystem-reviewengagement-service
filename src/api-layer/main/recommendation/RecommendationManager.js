const { HttpServerError, HttpError, PaymentGateError } = require("common");
const { hexaLogger } = require("common");
const { ElasticIndexer } = require("serviceCommon");

const ReviewEngagementServiceManager = require("../../service-manager/ReviewEngagementServiceManager");

/* Base Class For the Crud Routes Of DbObject Recommendation */
class RecommendationManager extends ReviewEngagementServiceManager {
  constructor(request, options) {
    super(request, options);
    this.objectName = "recommendation";
    this.modelName = "Recommendation";
  }

  toJSON() {
    const jsonObj = super.toJSON();

    return jsonObj;
  }
}

module.exports = RecommendationManager;
