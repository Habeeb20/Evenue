"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVenue = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getVenue = function (req, res) {
    var venue_id = req.params.venue_id;
    console.log(venue_id !== null && venue_id !== void 0 ? venue_id : "no venue_id");
    if (!venue_id) {
        res.status(400).json({ error: "Missing venue_id" });
        return;
    }
    try {
        // check if the Venue exists in the database. Avoid race condition
        db_1.default.execute("\n      SELECT\n            v.id, v.title, v.description, v.category, v.select_type, v.bathrooms, v.toilets, v.starting_price, v.location, v.no_of_guest, \n            v.space_preference, GROUP_CONCAT(vimg.imgs) AS imgs, v.vEmail, v.vPhone, v.venue_type,\n            v.no_of_guest AS seating, opening_hours.opening_hours\n        FROM venues v\n        JOIN venue_imgs vimg ON v.id = vimg.fk_venue_id\n        LEFT JOIN (\n    SELECT fk_venue_id,\n        JSON_ARRAYAGG(\n            JSON_OBJECT(\n                'hours_id', id,\n                'MONDAY_OPEN', MONDAY_OPEN, \n                'MONDAY_CLOSE', MONDAY_CLOSE,\n                'TUESDAY_OPEN', TUESDAY_OPEN, \n                'TUESDAY_CLOSE', TUESDAY_CLOSE,\n                'WEDNESDAY_OPEN', WEDNESDAY_OPEN, \n                'WEDNESDAY_CLOSE', WEDNESDAY_CLOSE, \n                'THURSDAY_OPEN', THURSDAY_OPEN ,\n                'THURSDAY_CLOSE', THURSDAY_CLOSE ,\n                'FRIDAY_OPEN', FRIDAY_OPEN ,\n                'FRIDAY_CLOSE', FRIDAY_CLOSE ,\n                'SATURDAY_OPEN', SATURDAY_OPEN ,\n                'SATURDAY_CLOSE', SATURDAY_CLOSE ,\n                'SUNDAY_OPEN', SUNDAY_OPEN ,\n                'SUNDAY_CLOSE', SUNDAY_CLOSE\n            )\n        ) AS opening_hours\n    FROM venue_hours\n    GROUP BY fk_venue_id\n) AS opening_hours ON v.id = opening_hours.fk_venue_id\n        WHERE v.id = ?\n        GROUP BY v.id \n        ORDER BY v.id DESC;\n                ", [venue_id], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "Venue not found" });
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
exports.getVenue = getVenue;
//# sourceMappingURL=getVenue.js.map