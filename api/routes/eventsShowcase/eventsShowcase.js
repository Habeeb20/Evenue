"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var protect_1 = __importDefault(require("../../middleware/auth/protect"));
var upload_1 = require("../../controllers/eventsShowcase/upload");
var getAllLimitedInfo_1 = require("../../controllers/eventsShowcase/getAllLimitedInfo");
router.post("/", protect_1.default, upload_1.uploadEventShowcase);
router.get("/getLimitedInfo", getAllLimitedInfo_1.getAllLimitedInfo);
exports.default = router;
//# sourceMappingURL=eventsShowcase.js.map