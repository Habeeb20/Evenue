"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLimitedInfoProfile = void 0;
var db_1 = __importDefault(require("../../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../getUserIdFromToken"));
var getLimitedInfoProfile = function (req, res) {
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    console.log(user_id);
    try {
        var finalResult_1 = [];
        db_1.default.execute("\n      SELECT\n   e.event_id, e.name, e.location, e.start_date_and_time,  \n   SUBSTRING_INDEX(GROUP_CONCAT(eimg.imgs), ',', 1) AS first_img, \n   e.price, e.views, COUNT(DISTINCT el.id) AS likes, COALESCE(e.share_count, 0) AS share_count\nFROM events e\nJOIN events_imgs eimg ON e.event_id = eimg.event_id\nLEFT JOIN event_likes el ON e.event_id = el.fk_event_id\nWHERE e.user_id = ?\nGROUP BY e.event_id\nORDER BY e.event_id DESC;\n        ", [user_id], function (err, result) {
            if (err) {
                console.error(err);
            }
            if (result.length === 0) {
                res.status(404).json({ error: "Events not found" });
                return;
            }
            finalResult_1.push(result);
            db_1.default.execute("SELECT COUNT(*) AS total FROM events WHERE user_id = ?;", [user_id], function (err, result) {
                if (err) {
                    console.error(err);
                }
                if (result.length === 0) {
                    res.status(404).json({ error: "Events not found" });
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
exports.getLimitedInfoProfile = getLimitedInfoProfile;
//# sourceMappingURL=getEventsLimitedInfo.js.map