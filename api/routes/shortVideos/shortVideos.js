"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var protect_1 = __importDefault(require("../../middleware/auth/protect"));
var upload_1 = require("../../controllers/shortVideos/upload");
var getLimitedInfo_1 = require("../../controllers/shortVideos/getLimitedInfo");
var getAllInfo_1 = require("../../controllers/shortVideos/getAllInfo");
var addComment_1 = require("../../controllers/shortVideos/addComment");
var addLike_1 = require("../../controllers/shortVideos/addLike");
var unLike_1 = require("../../controllers/shortVideos/unLike");
var addViews_1 = require("../../controllers/shortVideos/addViews");
router.post("/", protect_1.default, upload_1.uploadShortVideo);
router.get("/", getLimitedInfo_1.getLimitedInfo);
router.get("/getAllInfo", getAllInfo_1.getAllInfo);
router.post("/addComment", addComment_1.addComment);
router.post("/addLike", addLike_1.addLike);
router.post("/unLike", unLike_1.unLike);
router.post("/increaseView", addViews_1.increaseView);
exports.default = router;
//# sourceMappingURL=shortVideos.js.map