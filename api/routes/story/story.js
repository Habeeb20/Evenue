"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var upload_1 = require("../../controllers/story/upload");
var getLimitedInfo_1 = require("../../controllers/story/getLimitedInfo");
var getAllInfo_1 = require("../../controllers/story/getAllInfo");
router.post("/", upload_1.uploadStory);
router.get("/getLimitedInfo", getLimitedInfo_1.getLimitedInfo);
router.get("/getAllInfo", getAllInfo_1.getAllInfo);
exports.default = router;
//# sourceMappingURL=story.js.map