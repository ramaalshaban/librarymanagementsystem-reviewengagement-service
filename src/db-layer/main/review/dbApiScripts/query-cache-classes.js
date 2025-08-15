const { QueryCache, QueryCacheInvalidator } = require("common");

class ReviewQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("review", [], "$and", "$eq", input, wClause);
  }
}
class ReviewQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("review", []);
  }
}

module.exports = {
  ReviewQueryCache,
  ReviewQueryCacheInvalidator,
};
