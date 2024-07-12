"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryCount = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getCategoryCount = function (req, res) {
    try {
        // check if the Venue exists in the database. Avoid race condition
        db_1.default.execute("\n      SELECT\nSUM(category = 'meetings') AS Meetings,\nSUM(category = 'shows') AS Shows,\nSUM(category = 'brand_promotion') AS Brand_promotion,\nSUM(category = 'class_reunion') AS Class_reunion,\nSUM(category = 'boardrooms') AS Boardrooms,\nSUM(category = 'pool_party') AS Pool_party,\nSUM(category = 'award_show') AS Award_show,\nSUM(category = 'exhibition') AS Exhibition,\nSUM(category = 'bachelor_party') AS Bachelor_party,\nSUM(category = 'others') AS Others,\nSUM(category = 'wedding') AS Weddings\nFROM venues;\n                ", function (err, result) {
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
exports.getCategoryCount = getCategoryCount;
//# sourceMappingURL=getCategoryCount.js.map