"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchEvent = void 0;
var db_1 = __importDefault(require("../../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../getUserIdFromToken"));
// import { validateInputLength } from "../../middleware/inputs/checkLength";
var searchEvent = function (req, res) {
    var _a = req.query, name = _a.name, location = _a.location, category = _a.category, frequency = _a.frequency, price = _a.price;
    console.log({ name: name, location: location, category: category, frequency: frequency, price: price });
    if (!name && !location && !category && !frequency && !price) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    if (!user_id) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    /* TODO */
    // Validate the length of the inputs
    // const defaultx = "0";
    //     const validationFields = [
    //       { name: "name", maxLength: 100 },
    //       { name: "newPassword", maxLength: 100 },
    //     ];
    //     const validationErrors = validateInputLength(
    //       { name: name || defaultx, location: location || defaultx, category: category || defaultx },
    //       validationFields
    //     );
    //     if (validationErrors.length > 0) {
    //       res
    //         .status(400)
    //         .json({ error: "Input(s) too long", fields: validationErrors });
    //       return;
    //     }
    try {
        db_1.default.execute("\n      SELECT\n   e.event_id, e.name, e.location, e.start_date_and_time, \n   SUBSTRING_INDEX(GROUP_CONCAT(eimg.imgs), ',', 1) AS first_img, \n   e.price, e.views, COUNT(DISTINCT el.id) AS likes, COALESCE(e.share_count, 0) AS share_count\nFROM events e\nJOIN events_imgs eimg ON e.event_id = eimg.event_id\nLEFT JOIN event_likes el ON e.event_id = el.fk_event_id\nWHERE e.name LIKE ? AND e.location LIKE ? AND e.category LIKE ? AND e.frequency LIKE ? AND e.price >= ? AND e.user_id = ?\nGROUP BY e.event_id\nORDER BY e.event_id DESC;\n    ", [
            "%".concat(name, "%"),
            "%".concat(location, "%"),
            "%".concat(category, "%"),
            "%".concat(frequency, "%"),
            price,
            user_id,
        ], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "No events found" });
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
exports.searchEvent = searchEvent;
//# sourceMappingURL=searchEvents.js.map