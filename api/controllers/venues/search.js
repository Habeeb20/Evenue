"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
var db_1 = __importDefault(require("../../db/db"));
// import { validateInputLength } from "../../middleware/inputs/checkLength";
// TODO: Search not working. Faulty
var search = function (req, res) {
    var _a = req.query, category = _a.category, location = _a.location, no_of_guest = _a.no_of_guest, venue_type = _a.venue_type, space_preference = _a.space_preference, rating = _a.rating;
    var new_no_of_guest = no_of_guest !== null && no_of_guest !== void 0 ? no_of_guest : 0;
    var new_space_preference = space_preference !== null && space_preference !== void 0 ? space_preference : 0;
    var new_rating = rating !== null && rating !== void 0 ? rating : 0;
    console.log({ new_no_of_guest: new_no_of_guest });
    if (!category &&
        !location &&
        !no_of_guest &&
        !venue_type &&
        !space_preference &&
        !rating) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    console.log({
        category: category,
        location: location,
        no_of_guest: no_of_guest,
        venue_type: venue_type,
        space_preference: space_preference,
        rating: rating,
    });
    try {
        db_1.default.execute("\n      SELECT\n      v.id, v.title, v.location, v.no_of_guest, SUBSTRING_INDEX(GROUP_CONCAT(vimg.imgs), ',', 1) AS first_img, \n      COALESCE(ROUND(AVG(vr.rating), 1), 0) AS rating\n  FROM venues v\n  JOIN venue_imgs vimg ON v.id = vimg.fk_venue_id\n  LEFT JOIN venues_ratings vr ON v.id = vr.fk_venue_id\n  WHERE category LIKE ? AND location LIKE ? AND no_of_guest >= ? AND venue_type LIKE ? AND space_preference >= ?\n  GROUP BY v.id\n  HAVING rating >= ?  \n  ORDER BY v.id DESC; \n    ", [
            "%".concat(category, "%"),
            "%".concat(location, "%"),
            new_no_of_guest,
            "%".concat(venue_type, "%"),
            new_space_preference,
            new_rating,
        ], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                console.log({ result: result });
                res.status(404).json({ error: "No venues found" });
                return;
            }
            else {
                console.log({ result200: result });
                res.status(200).json({ result: result });
            }
        });
    }
    catch (error) {
        console.error("Unexpected error:", error); // Log unexpected errors
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.search = search;
//# sourceMappingURL=search.js.map