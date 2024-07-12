"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvent = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getEvent = function (req, res) {
    var event_id = req.params.event_id;
    console.log(event_id !== null && event_id !== void 0 ? event_id : "no event_id");
    if (!event_id) {
        res.status(400).json({ error: "Missing event_id" });
        return;
    }
    try {
        // check if the event exists in the database. Avoid race condition
        db_1.default.execute("\n        SELECT\n            e.event_id, e.name, e.description, e.location, e.url, e.category, e.frequency, e.time_zone, e.start_date_and_time, e.end_date_and_time, GROUP_CONCAT(eimg.imgs) AS imgs, e.price\n        FROM events e \n        JOIN events_imgs eimg ON e.event_id = eimg.event_id\n        WHERE e.event_id = ?\n        GROUP BY e.event_id\n        ORDER BY e.event_id DESC;\n                ", [event_id], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "Event not found" });
                return;
            }
            else {
                console.log(result);
                res.status(200).json({ result: result });
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getEvent = getEvent;
//# sourceMappingURL=getEvent.js.map