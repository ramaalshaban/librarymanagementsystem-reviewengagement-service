const { expect } = require("chai");
const sinon = require("sinon");
const proxyquire = require("proxyquire");

//For these tests to work we need to export GetReviewRestController also from file getreview.js
describe("GetReviewRestController", () => {
  let GetReviewRestController, getReview;
  let GetReviewManagerStub, processRequestStub;
  let req, res, next;

  beforeEach(() => {
    req = { requestId: "req-456" };
    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };
    next = sinon.stub();

    // Stub for GetReviewManager constructor
    GetReviewManagerStub = sinon.stub();

    // Stub for processRequest inherited from RestController
    processRequestStub = sinon.stub();

    // Proxyquire module under test with mocks
    ({ GetReviewRestController, getReview } = proxyquire(
      "../../../src/controllers-layer/rest-layer/main/review/get-review.js",
      {
        serviceCommon: {
          HexaLogTypes: {},
          hexaLogger: { insertInfo: sinon.stub(), insertError: sinon.stub() },
        },
        managers: {
          GetReviewManager: GetReviewManagerStub,
        },
        "../../ReviewEngagementServiceRestController": class {
          constructor(name, routeName, _req, _res, _next) {
            this.name = name;
            this.routeName = routeName;
            this._req = _req;
            this._res = _res;
            this._next = _next;
            this.processRequest = processRequestStub;
          }
        },
      },
    ));
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("GetReviewRestController class", () => {
    it("should extend RestController with correct values", () => {
      const controller = new GetReviewRestController(req, res, next);

      expect(controller.name).to.equal("getReview");
      expect(controller.routeName).to.equal("getreview");
      expect(controller.dataName).to.equal("review");
      expect(controller.crudType).to.equal("get");
      expect(controller.status).to.equal(200);
      expect(controller.httpMethod).to.equal("GET");
    });

    it("should create GetReviewManager in createApiManager()", () => {
      const controller = new GetReviewRestController(req, res, next);
      controller._req = req;

      controller.createApiManager();

      expect(GetReviewManagerStub.calledOnceWithExactly(req, "rest")).to.be
        .true;
    });
  });

  describe("getReview function", () => {
    it("should create instance and call processRequest", async () => {
      await getReview(req, res, next);

      expect(processRequestStub.calledOnce).to.be.true;
    });
  });
});
