const { DeleteRecommendationManager } = require("managers");
const { z } = require("zod");

const ReviewEngagementMcpController = require("../../ReviewEngagementServiceMcpController");

class DeleteRecommendationMcpController extends ReviewEngagementMcpController {
  constructor(params) {
    super("deleteRecommendation", "deleterecommendation", params);
    this.dataName = "recommendation";
    this.crudType = "delete";
  }

  createApiManager() {
    return new DeleteRecommendationManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        recommendation: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            userId: z
              .string()
              .uuid()
              .describe("User for whom the recommendations apply."),
            bookIds: z.array(
              z
                .string()
                .uuid()
                .describe(
                  "BookIds recommended for the user, ranked by recommendation logic.",
                ),
            ),
            generatedBy: z
              .string()
              .max(255)
              .optional()
              .nullable()
              .describe(
                "Module, AI, user or system algorithm that generated the recommendation.",
              ),
            contextInfo: z
              .object()
              .optional()
              .nullable()
              .describe(
                "Additional context for why/how recommendations were generated (e.g. triggering event, source, parameters).",
              ),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Personalized or event-driven book recommendations for a user, system-generated or user-requested.",
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
      recommendationId: z
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
    name: "deleteRecommendation",
    description: "Delete a recommendation (soft delete by default).",
    parameters: DeleteRecommendationMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const deleteRecommendationMcpController =
        new DeleteRecommendationMcpController(mcpParams);
      try {
        const result = await deleteRecommendationMcpController.processRequest();
        //return DeleteRecommendationMcpController.getOutputSchema().parse(result);
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
