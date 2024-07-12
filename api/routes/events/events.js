"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var protect_1 = __importDefault(require("../../middleware/auth/protect"));
var upload_1 = require("../../controllers/events/upload");
var getLimitedInfo_1 = require("../../controllers/events/getLimitedInfo");
var search_1 = require("../../controllers/events/search");
var getEvent_1 = require("../../controllers/events/getEvent");
var countByCategory_1 = require("../../controllers/events/countByCategory");
var getCatByEvenue_1 = require("../../controllers/events/getCatByEvenue");
var getLimitedInfoByAdmin_1 = require("../../controllers/events/getLimitedInfoByAdmin");
router.post("/", protect_1.default, upload_1.uploadEvent);
router.post("/getLimitedInfo", getLimitedInfo_1.getLimitedInfo);
router.get("/search", search_1.search);
router.get("/:event_id", getEvent_1.getEvent);
router.get("/q/countByCategory", countByCategory_1.countByCategory);
router.get("/q/adminCategoryCount", getCatByEvenue_1.adminCategoryCount);
router.get("/q/limitedInfoByAdmin", getLimitedInfoByAdmin_1.limitedInfoByAdmin);
exports.default = router;
//# sourceMappingURL=events.js.map