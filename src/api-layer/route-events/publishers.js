const { ServicePublisher } = require("serviceCommon");

// Review Event Publisher Classes

// Publisher class for getReview route
const { ReviewRetrivedTopic } = require("./topics");
class ReviewRetrivedPublisher extends ServicePublisher {
  constructor(review, session, requestId) {
    super(ReviewRetrivedTopic, review, session, requestId);
  }

  static async Publish(review, session, requestId) {
    const _publisher = new ReviewRetrivedPublisher(review, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for createReview route
const { ReviewCreatedTopic } = require("./topics");
class ReviewCreatedPublisher extends ServicePublisher {
  constructor(review, session, requestId) {
    super(ReviewCreatedTopic, review, session, requestId);
  }

  static async Publish(review, session, requestId) {
    const _publisher = new ReviewCreatedPublisher(review, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for updateReview route
const { ReviewUpdatedTopic } = require("./topics");
class ReviewUpdatedPublisher extends ServicePublisher {
  constructor(review, session, requestId) {
    super(ReviewUpdatedTopic, review, session, requestId);
  }

  static async Publish(review, session, requestId) {
    const _publisher = new ReviewUpdatedPublisher(review, session, requestId);
    await _publisher.publish();
  }
}

// Publisher class for deleteReview route
const { ReviewDeletedTopic } = require("./topics");
class ReviewDeletedPublisher extends ServicePublisher {
  constructor(review, session, requestId) {
    super(ReviewDeletedTopic, review, session, requestId);
  }

  static async Publish(review, session, requestId) {
    const _publisher = new ReviewDeletedPublisher(review, session, requestId);
    await _publisher.publish();
  }
}

// Recommendation Event Publisher Classes

// EngagementEvent Event Publisher Classes

// Publisher class for createEngagementEvent route
const { EngagementeventCreatedTopic } = require("./topics");
class EngagementeventCreatedPublisher extends ServicePublisher {
  constructor(engagementevent, session, requestId) {
    super(EngagementeventCreatedTopic, engagementevent, session, requestId);
  }

  static async Publish(engagementevent, session, requestId) {
    const _publisher = new EngagementeventCreatedPublisher(
      engagementevent,
      session,
      requestId,
    );
    await _publisher.publish();
  }
}

module.exports = {
  ReviewRetrivedPublisher,
  ReviewCreatedPublisher,
  ReviewUpdatedPublisher,
  ReviewDeletedPublisher,
  EngagementeventCreatedPublisher,
};
