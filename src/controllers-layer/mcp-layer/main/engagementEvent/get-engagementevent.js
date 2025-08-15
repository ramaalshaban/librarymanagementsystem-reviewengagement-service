const { GetEngagementEventManager } = require("managers");
const { z } = require("zod");

const ReviewEngagementMcpController = require("../../ReviewEngagementServiceMcpController");

class GetEngagementEventMcpController extends ReviewEngagementMcpController {
  constructor(params) {
    super("getEngagementEvent", "getengagementevent", params);
    this.dataName = "engagementEvent";
    this.crudType = "get";
  }

  createApiManager() {
    return new GetEngagementEventManager(this.request, "mcp");
  }

  static getOutputSchema() {
    return z
      .object({
        status: z.string(),
        engagementEvent: z
          .object({
            id: z
              .string()
              .uuid()
              .describe("The unique primary key of the data object as UUID"),
            userId: z
              .string()
              .uuid()
              .optional()
              .nullable()
              .describe(
                "Member or user for whom event applies (optional for system/global events).",
              ),
            eventType: z
              .string()
              .max(255)
              .describe(
                "Type of engagement (newArrival, recommendation, reviewReceived, readingStreak, alertInterest, etc).",
              ),
            eventTime: z.string().describe("Datetime event was triggered."),
            details: z
              .object()
              .optional()
              .nullable()
              .describe(
                "Payload containing event-specific content (like a bookId, streak info, or recommendation batch).",
              ),
            bookId: z
              .string()
              .uuid()
              .optional()
              .nullable()
              .describe("Catalog book involved with the event (if any)."),
            isActive: z
              .boolean()
              .describe(
                "The active status of the data object to manage soft delete. False when deleted.",
              ),
          })
          .describe(
            "Tracks personalized or event-driven engagement actions for notification/alert publication and analytics.",
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
      engagementEventId: z
        .string()
        .uuid()
        .describe(
          "This id paremeter is used to select the required data object that is queried",
        ),
    };
  }
}

module.exports = (headers) => {
  return {
    name: "getEngagementEvent",
    description:
      "Get an engagement event by id (for dashboard or notification queue display).",
    parameters: GetEngagementEventMcpController.getInputScheme(),
    controller: async (mcpParams) => {
      mcpParams.headers = headers;
      const getEngagementEventMcpController =
        new GetEngagementEventMcpController(mcpParams);
      try {
        const result = await getEngagementEventMcpController.processRequest();
        //return GetEngagementEventMcpController.getOutputSchema().parse(result);
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
