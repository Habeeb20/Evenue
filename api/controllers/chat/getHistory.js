"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatHistory = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../users/getUserIdFromToken"));
// import { validateInputLength } from "../../middleware/inputs/checkLength";
var getChatHistory = function (req, res) {
    var _a = req.query, fk_sender_id = _a.fk_sender_id, fk_recipient_id = _a.fk_recipient_id;
    if (!fk_sender_id || !fk_recipient_id) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    // Block unauthorized access of the history
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    if (!user_id && fk_sender_id !== user_id && fk_recipient_id !== user_id) {
        res.status(401).json({ error: "Unauthorized access" });
        return;
    }
    try {
        db_1.default.execute("\n      SELECT chat.id,\n    message,\n    fk_sender_id,\n    fk_recipient_id\nFROM chat\nWHERE (fk_sender_id = ? AND fk_recipient_id = ?) OR (fk_sender_id = ? AND fk_recipient_id = ?)\n    ", [fk_sender_id, fk_recipient_id, fk_recipient_id, fk_sender_id], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "No history found" });
                return;
            }
            else {
                res.status(200).json({ result: result });
            }
        });
    }
    catch (error) {
        console.error("Unexpected error:", error); // Log unexpected errors
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getChatHistory = getChatHistory;
//# sourceMappingURL=getHistory.js.map