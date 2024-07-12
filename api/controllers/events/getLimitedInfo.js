"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLimitedInfo = void 0;
var db_1 = __importDefault(require("../../db/db"));
// consider multiple queries for each case that pushes to an array. Pushes total number of events and other details. Maybe object or array like.
var getLimitedInfo = function (req, res) {
    var _a = req.body, categoryIdentifier = _a.categoryIdentifier, locationIdentifier = _a.locationIdentifier, topEventsIdentifier = _a.topEventsIdentifier, blacklistIdentifier = _a.blacklistIdentifier; // consider replacement of req.body to req.query
    console.log({ locationIdentifier: locationIdentifier });
    console.log({ topEventsIdentifier: topEventsIdentifier });
    console.log({ blacklistIdentifier: blacklistIdentifier });
    if (locationIdentifier &&
        topEventsIdentifier &&
        blacklistIdentifier &&
        categoryIdentifier) {
        res.status(400).json({ error: "Multiple identifiers are not allowed" });
        return;
    }
    else if (topEventsIdentifier &&
        topEventsIdentifier !== "topEventsIdentifier") {
        res.status(400).json({ error: "Invalid top events identifier" });
        return;
    }
    else if (blacklistIdentifier &&
        blacklistIdentifier !== "blacklistIdentifier") {
        res.status(400).json({ error: "Invalid blacklist identifier" });
        return;
    }
    try {
        if (!locationIdentifier &&
            !topEventsIdentifier &&
            !blacklistIdentifier &&
            !categoryIdentifier) {
            db_1.default.execute("\n                SELECT\n                    e.event_id, e.name, e.location, e.start_date_and_time, SUBSTRING_INDEX(GROUP_CONCAT(eimg.imgs), ',', 1) AS first_img, e.price\n                FROM events e \n                JOIN events_imgs eimg ON e.event_id = eimg.event_id\n                GROUP BY e.event_id\n                ORDER BY e.event_id DESC;  \n                ", function (err, result) {
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
        else if (locationIdentifier) {
            db_1.default.execute("\n        SELECT\n        e.event_id, e.name, e.location, e.start_date_and_time, SUBSTRING_INDEX(GROUP_CONCAT(eimg.imgs), ',', 1) AS z_img, e.views, e.price\n    FROM events e \n    JOIN events_imgs eimg ON e.event_id = eimg.event_id\n    GROUP BY e.event_id\n    ORDER BY e.views DESC;\n            ", [locationIdentifier], function (err, result) {
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
        else if (topEventsIdentifier === "topEventsIdentifier") {
            // views can be incremented only
            db_1.default.execute("\n        SELECT\n                e.event_id, e.name, e.location, e.start_date_and_time, SUBSTRING_INDEX(GROUP_CONCAT(eimg.imgs), ',', 1) AS first_img, e.views, e.price\n            FROM events e \n            JOIN events_imgs eimg ON e.event_id = eimg.event_id\n            GROUP BY e.event_id\n            ORDER BY e.views DESC;\n        ", function (err, result) {
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
        else if (blacklistIdentifier === "blacklistIdentifier") {
            db_1.default.execute("\n        SELECT\n                e.event_id, e.name, e.location, e.start_date_and_time, SUBSTRING_INDEX(GROUP_CONCAT(eimg.imgs), ',', 1) AS first_img, e.views, e.price\n            FROM events e \n            JOIN events_imgs eimg ON e.event_id = eimg.event_id\n            WHERE e.blacklist = '1'\n            GROUP BY e.event_id\n            ORDER BY e.views DESC;\n        ", function (err, result) {
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
        else if (categoryIdentifier) {
            db_1.default.execute("\n        SELECT\n                e.event_id, e.name, e.location, e.start_date_and_time, SUBSTRING_INDEX(GROUP_CONCAT(eimg.imgs), ',', 1) \n                AS first_img, e.views, e.price\n            FROM events e \n            JOIN events_imgs eimg ON e.event_id = eimg.event_id\n            WHERE e.category = ?\n            GROUP BY e.event_id\n            ORDER BY e.views DESC;\n        ", [categoryIdentifier], function (err, result) {
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
    }
    catch (error) {
        console.error(error);
    }
};
exports.getLimitedInfo = getLimitedInfo;
//# sourceMappingURL=getLimitedInfo.js.map