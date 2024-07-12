"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
var db_1 = __importDefault(require("../../db/db"));
var authenticateUser = function (req, res) {
    var userId = req.query.userId;
    try {
        db_1.default.execute("\n      SELECT first_name FROM users WHERE user_id = ?\n            ", [userId], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "No posts yet." });
                return;
            }
            console.log({ result: result });
            res.status(200).json({ result: result });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=authForWebSocket.js.map