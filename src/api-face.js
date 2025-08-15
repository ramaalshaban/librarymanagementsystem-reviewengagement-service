const { inject } = require("mindbricks-api-face");

module.exports = (app) => {
  const authUrl = (process.env.SERVICE_URL ?? "mindbricks.com").replace(
    process.env.SERVICE_SHORT_NAME,
    "auth",
  );

  const config = {
    name: "librarymanagementsystem - reviewEngagement",
    brand: {
      name: "librarymanagementsystem",
      image: "https://mindbricks.com/favicon.ico",
      moduleName: "reviewEngagement",
      version: process.env.SERVICE_VERSION || "1.0.0",
    },
    auth: {
      url: authUrl,
      loginPath: "/login",
      logoutPath: "/logout",
      currentUserPath: "/currentuser",
      authStrategy: "external",
      initialAuth: true,
    },
    dataObjects: [
      {
        name: "Review",
        description:
          "A member-written review for a specific book, supporting moderation status and visibility.",
        reference: {
          tableName: "review",
          properties: [
            {
              name: "bookId",
              type: "ID",
            },

            {
              name: "userId",
              type: "ID",
            },

            {
              name: "rating",
              type: "Short",
            },

            {
              name: "reviewText",
              type: "Text",
            },

            {
              name: "status",
              type: "Enum",
            },

            {
              name: "moderatedByUserId",
              type: "ID",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "GET",
            url: "/reviews/{reviewId}",
            title: "getReview",
            query: [],

            parameters: [
              {
                key: "reviewId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "POST",
            url: "/reviews",
            title: "createReview",
            query: [],

            body: {
              type: "json",
              content: {
                bookId: "ID",
                rating: "Short",
                reviewText: "Text",
                status: "Enum",
                moderatedByUserId: "ID",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: "/reviews/{reviewId}",
            title: "updateReview",
            query: [],

            body: {
              type: "json",
              content: {
                rating: "Short",
                reviewText: "Text",
                status: "Enum",
                moderatedByUserId: "ID",
              },
            },

            parameters: [
              {
                key: "reviewId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: "/reviews/{reviewId}",
            title: "deleteReview",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "reviewId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: false,
            method: "GET",
            url: "/reviews",
            title: "listReviews",
            query: [],

            parameters: [],
            headers: [],
          },
        ],
      },

      {
        name: "Recommendation",
        description:
          "Personalized or event-driven book recommendations for a user, system-generated or user-requested.",
        reference: {
          tableName: "recommendation",
          properties: [
            {
              name: "userId",
              type: "ID",
            },

            {
              name: "bookIds",
              type: "[ID]",
            },

            {
              name: "generatedBy",
              type: "String",
            },

            {
              name: "contextInfo",
              type: "Object",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "GET",
            url: "/recommendations/{recommendationId}",
            title: "getRecommendation",
            query: [],

            parameters: [
              {
                key: "recommendationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "POST",
            url: "/recommendations",
            title: "createRecommendation",
            query: [],

            body: {
              type: "json",
              content: {
                bookIds: "ID",
                generatedBy: "String",
                contextInfo: "Object",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: "/recommendations/{recommendationId}",
            title: "updateRecommendation",
            query: [],

            body: {
              type: "json",
              content: {
                bookIds: "ID",
                generatedBy: "String",
                contextInfo: "Object",
              },
            },

            parameters: [
              {
                key: "recommendationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: "/recommendations/{recommendationId}",
            title: "deleteRecommendation",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "recommendationId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: "/recommendations",
            title: "listRecommendations",
            query: [],

            parameters: [],
            headers: [],
          },
        ],
      },

      {
        name: "EngagementEvent",
        description:
          "Tracks personalized or event-driven engagement actions for notification/alert publication and analytics.",
        reference: {
          tableName: "engagementEvent",
          properties: [
            {
              name: "userId",
              type: "ID",
            },

            {
              name: "eventType",
              type: "String",
            },

            {
              name: "eventTime",
              type: "Date",
            },

            {
              name: "details",
              type: "Object",
            },

            {
              name: "bookId",
              type: "ID",
            },
          ],
        },
        endpoints: [
          {
            isAuth: true,
            method: "GET",
            url: "/engagementevents/{engagementEventId}",
            title: "getEngagementEvent",
            query: [],

            parameters: [
              {
                key: "engagementEventId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "POST",
            url: "/engagementevents",
            title: "createEngagementEvent",
            query: [],

            body: {
              type: "json",
              content: {
                userId: "ID",
                eventType: "String",
                eventTime: "Date",
                details: "Object",
                bookId: "ID",
              },
            },

            parameters: [],
            headers: [],
          },

          {
            isAuth: true,
            method: "PATCH",
            url: "/engagementevents/{engagementEventId}",
            title: "updateEngagementEvent",
            query: [],

            body: {
              type: "json",
              content: {
                details: "Object",
              },
            },

            parameters: [
              {
                key: "engagementEventId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "DELETE",
            url: "/engagementevents/{engagementEventId}",
            title: "deleteEngagementEvent",
            query: [],

            body: {
              type: "json",
              content: {},
            },

            parameters: [
              {
                key: "engagementEventId",
                value: "",
                description: "",
              },
            ],
            headers: [],
          },

          {
            isAuth: true,
            method: "GET",
            url: "/engagementevents",
            title: "listEngagementEvents",
            query: [],

            parameters: [],
            headers: [],
          },
        ],
      },
    ],
  };

  inject(app, config);
};
