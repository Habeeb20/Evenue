"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchVenues = void 0;
var db_1 = __importDefault(require("../../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../getUserIdFromToken"));
// import { validateInputLength } from "../../middleware/inputs/checkLength";
var searchVenues = function (req, res) {
    var _a = req.query, title = _a.title, location = _a.location, category = _a.category, venue_type = _a.venue_type, starting_price = _a.starting_price;
    console.log({
        title: title,
        location: location,
        category: category,
        frequency: venue_type,
        starting_price: starting_price,
    });
    if (!title && !location && !category && !venue_type && !starting_price) {
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
        db_1.default.execute(" \n      SELECT\n   v.id AS event_id, v.title AS name , v.location, v.no_of_guest, \n   SUBSTRING_INDEX(GROUP_CONCAT(vimg.imgs), ',', 1) AS first_img, \n   v.starting_price AS price, v.views, COUNT(DISTINCT vl.id) AS likes, COALESCE(v.share_count, 0) AS share_count\nFROM venues v \nJOIN venue_imgs vimg ON v.id = vimg.fk_venue_id\nLEFT JOIN venue_likes vl ON v.id = vl.fk_venue_id\nWHERE v.title LIKE ? AND v.location LIKE ? AND v.category LIKE ? AND v.venue_type LIKE ? AND v.starting_price >= ? AND v.user_id = ?\nGROUP BY v.id\nORDER BY v.id DESC;\n    ", [
            "%".concat(title, "%"),
            "%".concat(location, "%"),
            "%".concat(category, "%"),
            "%".concat(venue_type, "%"),
            starting_price,
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
exports.searchVenues = searchVenues;
//# sourceMappingURL=searchVenues.js.map