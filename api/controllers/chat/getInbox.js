"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInbox = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../users/getUserIdFromToken"));
var getInbox = function (req, res) {
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    if (!user_id) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        var finalResult_1 = [];
        db_1.default.execute("\n      SELECT \n      c.id,\n      c.message,\n      c.fk_sender_id,\n      c.fk_recipient_id\n  FROM \n      chat c\n  INNER JOIN (\n      SELECT \n          MAX(id) AS min_id\n      FROM \n          chat\n      GROUP BY \n          fk_sender_id,\n          fk_recipient_id\n  ) AS sub ON c.id = sub.min_id\n  WHERE fk_sender_id = ? OR fk_recipient_id = ?;\n  \n        ", [user_id, user_id], function (err, result) {
            if (err) {
                console.error(err);
            }
            if (result.length === 0) {
                res.status(404).json({ error: "Messages showcase not found" });
            }
            finalResult_1.push(result);
            db_1.default.execute("\n            SELECT COUNT(*) AS result_count\n            FROM (\n                SELECT \n                    c.id,\n                    c.message,\n                    c.fk_sender_id,\n                    c.fk_recipient_id\n                FROM \n                    chat c\n                INNER JOIN (\n                    SELECT \n                        MAX(id) AS min_id\n                    FROM \n                        chat\n                    GROUP BY \n                        fk_sender_id,\n                        fk_recipient_id\n                ) AS sub ON c.id = sub.min_id\n                WHERE \n                    fk_sender_id = ? OR fk_recipient_id = ?\n            ) AS subquery;\n            \n            ", [user_id, user_id], function (err, result) {
                if (err) {
                    console.error(err);
                }
                if (result.length === 0) {
                    res.status(404).json({ error: "Messages not found" });
                }
                finalResult_1.push(result);
                res.status(200).json({ finalResult: finalResult_1 });
            });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getInbox = getInbox;
//# sourceMappingURL=getInbox.js.map