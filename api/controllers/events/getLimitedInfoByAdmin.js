"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limitedInfoByAdmin = void 0;
var db_1 = __importDefault(require("../../db/db"));
// change user_id in query to the admin user_id
var limitedInfoByAdmin = function (req, res) {
    var category = req.body.category; // consider replacement of req.body to req.query
    console.log({ category: category });
    if (!category) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    try {
        db_1.default.execute("\n        SELECT\n        e.event_id, e.name, e.location, e.start_date_and_time, SUBSTRING_INDEX(GROUP_CONCAT(eimg.imgs), ',', 1) AS first_img, e.price\n    FROM events e \n    JOIN events_imgs eimg ON e.event_id = eimg.event_id\n    WHERE e.user_id = 1 AND e.category = ?\n    GROUP BY e.event_id\n    ORDER BY e.event_id DESC; \n                ", [category], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "Events not found" });
                return;
            }
            res.status(200).json({ result: result });
        });
    }
    catch (error) {
        console.error(error);
    }
};
exports.limitedInfoByAdmin = limitedInfoByAdmin;
//# sourceMappingURL=getLimitedInfoByAdmin.js.map