const { DBGetListMongooseCommand } = require("dbCommand");
const { Recommendation } = require("models");
const { hexaLogger } = require("common");

class DbListRecommendationsCommand extends DBGetListMongooseCommand {
  constructor(input) {
    super(input);
    this.commandName = "dbListRecommendations";
    this.emptyResult = true;
    this.objectName = "recommendations";
    this.serviceLabel = "librarymanagementsystem-reviewengagement-service";
    this.input.pagination = null;
  }

  loadHookFunctions() {
    super.loadHookFunctions({});
  }

  initOwnership(input) {
    super.initOwnership(input);
  }

  // ask about this should i rename the whereClause to dataClause???

  async transposeResult() {
    for (const recommendation of this.dbData.items) {
      // tarnspose dbData item
    }
  }

  createQuery() {
    const input = this.input;

    return Recommendation.find(this.whereClause);
  }

  // populateQuery(query) {
  //    //    if (!this.input.getJoins) return query;
  //
  //   return query;
  //     // }

  paginateQuery(query) {
    if (this.input.pagination) {
      const limit = this.input.pagination.pageRowCount;
      const skip =
        this.input.pagination.pageRowCount *
        (this.input.pagination.pageNumber - 1);
      query = query.limit(limit).skip(skip);
    }
    return query;
  }

  async getCqrsJoins(item) {
    if (Recommendation.getCqrsJoins) {
      await Recommendation.getCqrsJoins(item);
    }
  }

  async setPaginationTotalRowCount() {
    this.paginationTotalRowCount = await Recommendation.countDocuments(
      this.whereClause,
    );
  }

  async runDbCommand() {
    const cmResult = await super.runDbCommand();
    if (cmResult !== undefined) return cmResult;

    let mongooseQuery = this.createQuery();
    mongooseQuery = this.populateQuery(mongooseQuery);
    mongooseQuery = this.paginateQuery(mongooseQuery);

    const rowData = await mongooseQuery.exec();

    this.dbData = { items: [] };
    this.input[this.objectName] = [];
    if (!rowData) return this.dbData;

    if (this.input.pagination && this.paginationTotalRowCount == null) {
      await this.setPaginationTotalRowCount();
    }

    this.dbData.totalRowCount = this.input.pagination
      ? this.paginationTotalRowCount
      : Array.isArray(rowData)
        ? rowData.length
        : 1;

    this.dbData.pageCount = this.input.pagination
      ? Math.ceil(
          this.dbData.totalRowCount / this.input.pagination.pageRowCount,
        )
      : 1;

    this.dbData.items = Array.isArray(rowData)
      ? rowData.map((item) => item.getData())
      : [rowData.getData()];

    if (this.input.getJoins && !this.input.excludeCqrs) {
      await this.getCqrsJoins(this.dbData.items);
    }

    if (!Array.isArray(this.dbData.items)) {
      this.convertAggregationsToNumbers(this.dbData.items);
    } else {
      for (const item of this.dbData.items) {
        this.convertAggregationsToNumbers(item);
      }
    }

    this.input[this.objectName] = this.dbData.items;

    return this.dbData;
  }
}

const dbListRecommendations = (input) => {
  const dbGetListCommand = new DbListRecommendationsCommand(input);
  return dbGetListCommand.execute();
};

module.exports = dbListRecommendations;
