"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLimitedInfo = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getAllLimitedInfo = function (req, res) {
    try {
        var finalResult_1 = [];
        db_1.default.execute("\n        SELECT\n          evs.id, evs.name, evs.intro,\n          SUBSTRING_INDEX(GROUP_CONCAT(evsimg.imgs), ',', 1) AS first_img\n        FROM events_showcase evs\n        JOIN events_showcase_imgs evsimg ON evs.id = evsimg.fk_events_showcase_id\n        GROUP BY evs.id\n        ORDER BY evs.id DESC;\n        ", function (err, result) {
            if (err) {
                console.error(err);
            }
            if (result.length === 0) {
                res.status(404).json({ error: "Events showcase not found" });
            }
            finalResult_1.push(result);
            db_1.default.execute("SELECT COUNT(*) AS total FROM events_showcase;", function (err, result) {
                if (err) {
                    console.error(err);
                }
                if (result.length === 0) {
                    res.status(404).json({ error: "Events showcase not found" });
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
exports.getAllLimitedInfo = getAllLimitedInfo;
//# sourceMappingURL=getAllLimitedInfo.js.map