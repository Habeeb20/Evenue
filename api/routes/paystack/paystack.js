"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var paystack_1 = require("../../controllers/paystack/paystack");
router.get("/payment", paystack_1.payment);
exports.default = router;
//# sourceMappingURL=paystack.js.map