"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
var db_1 = __importDefault(require("../../db/db"));
// import { validateInputLength } from "../../middleware/inputs/checkLength";
var search = function (req, res) {
    var _a = req.query, name = _a.name, location = _a.location, category = _a.category;
    if (!name && !location && !category) {
        res.status(400).json({ error: "Missing required fields" });
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
        db_1.default.execute("\n      SELECT\n      e.event_id, e.name, e.location, e.start_date_and_time, SUBSTRING_INDEX(GROUP_CONCAT(eimg.imgs), ',', 1) AS first_img\n  FROM events e \n  JOIN events_imgs eimg ON e.event_id = eimg.event_id\n  WHERE name LIKE ? AND location LIKE ? AND category LIKE ?\n  GROUP BY e.event_id\n  ORDER BY e.event_id DESC;\n    ", ["%".concat(name, "%"), "%".concat(location, "%"), "%".concat(category, "%")], function (err, result) {
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
exports.search = search;
//# sourceMappingURL=search.js.map