const { UpdateRecommendationManager } = require("managers");
const { z } = require("zod");

const ReviewEngagementMcpController = require("../../ReviewEngagementServiceMcpController");

class UpdateRecommendationMcpController extends ReviewEngagementMcpController {
  constructor(params) {
    super("updateRecommendation", "updaterecommendation", params);
    this.dataName = "recommendation";
    this.crudType = "update";
  }

  createApiManager() {
    return new UpdateRecommendationManager(this.request, "mcp");
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
          "This id paremeter is used to select the required data object that will be updated",
        ),

      bookIds: z
        .string()
        .uuid()
        .optional()
        .describe(
          "BookIds recommended for the user, ranked by recommendation logic.",
        ),

      generatedBy: z
        .string()
        .max(255)
        .optional()
        .describe(
          "Module, AI, user or system algorithm that generated the recommendation.",
        ),

      contextInfo: z
        .object({})
        .optional()
        .describe(
          "Additional context for why/how recommendations were generated (e.g. triggering event, source, parameters).",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "updateRecommendation",
    description:
      "Update a personalized recommendation record (books, status, context).",
    parameters: UpdateRecommendationMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const updateRecommendationMcpController =
        new UpdateRecommendationMcpController(mcpParams);
      try {
        const result = await updateRecommendationMcpController.processRequest();
        //return UpdateRecommendationMcpController.getOutputSchema().parse(result);
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
