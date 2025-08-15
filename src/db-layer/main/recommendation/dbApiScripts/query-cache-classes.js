const { QueryCache, QueryCacheInvalidator } = require("common");

class RecommendationQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("recommendation", [], "$and", "$eq", input, wClause);
  }
}
class RecommendationQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("recommendation", []);
  }
}

module.exports = {
  RecommendationQueryCache,
  RecommendationQueryCacheInvalidator,
};
