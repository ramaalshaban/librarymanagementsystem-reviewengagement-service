const { ListRecommendationsManager } = require("managers");
const { z } = require("zod");

const ReviewEngagementMcpController = require("../../ReviewEngagementServiceMcpController");

class ListRecommendationsMcpController extends ReviewEngagementMcpController {
  constructor(params) {
    super("listRecommendations", "listrecommendations", params);
    this.dataName = "recommendations";
    this.crudType = "getList";
  }

  createApiManager() {
    return new ListRecommendationsManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        recommendations: z
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
          )
          .array(),
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
    };
  }
}

module.exports = (headers) => {
  return {
    name: "listRecommendations",
    description:
      "List recommendations for users, useful for dashboards and personalized engagement.",
    parameters: ListRecommendationsMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const listRecommendationsMcpController =
        new ListRecommendationsMcpController(mcpParams);
      try {
        const result = await listRecommendationsMcpController.processRequest();
        //return ListRecommendationsMcpController.getOutputSchema().parse(result);
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
