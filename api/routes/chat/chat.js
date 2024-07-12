"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var getHistory_1 = require("../../controllers/chat/getHistory");
var getInbox_1 = require("../../controllers/chat/getInbox");
var router = (0, express_1.Router)();
router.get("/", getHistory_1.getChatHistory);
router.get("/getInbox", getInbox_1.getInbox);
exports.default = router;
//# sourceMappingURL=chat.js.map