const { DeleteReviewManager } = require("managers");
const { z } = require("zod");

const ReviewEngagementMcpController = require("../../ReviewEngagementServiceMcpController");

class DeleteReviewMcpController extends ReviewEngagementMcpController {
  constructor(params) {
    super("deleteReview", "deletereview", params);
    this.dataName = "review";
    this.crudType = "delete";
  }

  createApiManager() {
    return new DeleteReviewManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        review: z
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
          ),
      })
      .describe("The response object of the crud route");
  }

  static getInputScheme() {
    return {
      accessToken: z
        .string()
        .optional()
        .describe(
          "The access token which is returned from a login request or given by user. This access token will override if there is any bearer or OAuth token in the mcp client. If not given the request will be made with the system (bearer or OAuth) token. For public routes you dont need to deifne any access token.",
        ),
      reviewId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to select the required data object that will be deleted",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "deleteReview",
    description: "Delete a review (soft delete by default).",
    parameters: DeleteReviewMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const deleteReviewMcpController = new DeleteReviewMcpController(
        mcpParams,
      );
      try {
        const result = await deleteReviewMcpController.processRequest();
        //return DeleteReviewMcpController.getOutputSchema().parse(result);
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
