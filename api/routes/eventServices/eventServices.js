"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var protect_1 = __importDefault(require("../../middleware/auth/protect"));
var upload_1 = require("../../controllers/eventServices/upload");
var getLimitedInfoForAll_1 = require("../../controllers/eventServices/getLimitedInfoForAll");
var search_1 = require("../../controllers/eventServices/search");
var dynamicServiceProviders_1 = require("../../controllers/eventServices/dynamicServiceProviders");
var countByCategory_1 = require("../../controllers/eventServices/countByCategory");
var addReview_1 = require("../../controllers/eventServices/addReview");
var getReviews_1 = require("../../controllers/eventServices/getReviews");
router.post("/", protect_1.default, upload_1.uploadEventService);
router.post("/getLimitedInfoForAll", getLimitedInfoForAll_1.getLimitedInfoForAll);
router.get("/search", search_1.search);
router.get("/getServiceProvider/:sProvider_id", dynamicServiceProviders_1.getServiceProvider);
router.get("/countByCategory", countByCategory_1.countByCategory);
router.post("/addReview", addReview_1.addReview);
router.get("/getReviews/:sProvider_id", getReviews_1.getReviews);
exports.default = router;
//# sourceMappingURL=eventServices.js.map