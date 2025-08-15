const { QueryCache, QueryCacheInvalidator } = require("common");

class EngagementEventQueryCache extends QueryCache {
  constructor(input, wClause) {
    super("engagementEvent", [], "$and", "$eq", input, wClause);
  }
}
class EngagementEventQueryCacheInvalidator extends QueryCacheInvalidator {
  constructor() {
    super("engagementEvent", []);
  }
}

module.exports = {
  EngagementEventQueryCache,
  EngagementEventQueryCacheInvalidator,
};
