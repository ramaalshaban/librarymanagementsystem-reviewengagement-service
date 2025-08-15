const { ListReviewsManager } = require("managers");
const { z } = require("zod");

const ReviewEngagementMcpController = require("../../ReviewEngagementServiceMcpController");

class ListReviewsMcpController extends ReviewEngagementMcpController {
  constructor(params) {
    super("listReviews", "listreviews", params);
    this.dataName = "reviews";
    this.crudType = "getList";
  }

  createApiManager() {
    return new ListReviewsManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        reviews: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            bookId: z
              .string()
              .uuid()
              .describe("Catalog book being reviewed (target of the review)."),
            userId: z
              .string()
              .uuid()
              .describe("Member who authored the review."),
            rating: z
              .number()
              .max(32767)
              .min(-32768)
              .describe("Star rating (usually 1-5)."),
            reviewText: z.string().describe("Full review content."),
            status: z
              .enum(["pending", "approved", "rejected"])
              .describe(
                "Moderation status: 0 = pending, 1 = approved/published, 2 = rejected/hidden.",
              ),
            moderatedByUserId: z
              .string()
              .uuid()
              .optional()
              .nullable()
              .describe(
                "UserId of librarian or admin who moderated this review.",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "A member-written review for a specific book, supporting moderation status and visibility.",
          )
          .array(),
      })
      .describe("The response object of the crud route");
  }

  static getInputScheme() {
    return {};
  }
}

module.exports = (headers) => {
  return {
    name: "listReviews",
    description:
      "List reviews - filter by book, user, status, for catalog display or moderation.",
    parameters: ListReviewsMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const listReviewsMcpController = new ListReviewsMcpController(mcpParams);
      try {
        const result = await listReviewsMcpController.processRequest();
        //return ListReviewsMcpController.getOutputSchema().parse(result);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      } catch (err) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `Error: ${err.message}`,
            },
          ],
        };
      }
    },
  };
};
