"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminCategoryCount = void 0;
var db_1 = __importDefault(require("../../db/db"));
// change user_id condition to admin user_id
var adminCategoryCount = function (req, res) {
    try {
        // check if the Venue exists in the database. Avoid race condition
        db_1.default.execute("\n      SELECT\n      SUM(category = 'meetings') AS Meetings,\n      SUM(category = 'training') AS Training,\n      SUM(category = 'conference') AS Conference,\n      SUM(category = 'party') AS Party,\n      SUM(category = 'wedding') AS Weddings\n      FROM events\n      WHERE user_id = 1;\n                ", function (err, result) {
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
exports.adminCategoryCount = adminCategoryCount;
//# sourceMappingURL=getCatByEvenue.js.map