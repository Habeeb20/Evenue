"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = void 0;
var db_1 = __importDefault(require("../../db/db"));
// import { validateInputLength } from "../../middleware/inputs/checkLength";
var search = function (req, res) {
    var _a = req.query, location = _a.location, category = _a.category;
    if (!location && !category) {
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
        db_1.default.execute("\n      SELECT\n          es.id, es.name, es.location, es.verified, es.category,\n          SUBSTRING_INDEX(GROUP_CONCAT(esimg.imgs), ',', 1) AS first_img,\n          COALESCE(ROUND(AVG(esr.rating), 1), 0) AS rating, COUNT(DISTINCT esr.fk_user_id) AS total_raings_no\n        FROM event_services es\n        LEFT JOIN event_services_imgs esimg ON es.id = esimg.fk_event_services_id\n        LEFT JOIN event_services_ratings esr ON es.id = esr.fk_event_service_id\n        WHERE es.category LIKE ? AND es.location LIKE ? \n        GROUP BY es.id\n        ORDER BY es.id DESC;\n    ", ["%".concat(category, "%"), "%".concat(location, "%")], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "No event services found" });
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