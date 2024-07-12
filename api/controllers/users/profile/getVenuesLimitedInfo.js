"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLimitedVenuesInfoProfile = void 0;
var db_1 = __importDefault(require("../../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../getUserIdFromToken"));
var getLimitedVenuesInfoProfile = function (req, res) {
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    console.log(user_id);
    try {
        var finalResult_1 = [];
        db_1.default.execute("\n      SELECT\n   v.id AS event_id, v.title AS name , v.location,  \n   SUBSTRING_INDEX(GROUP_CONCAT(vimg.imgs), ',', 1) AS first_img, \n   v.starting_price AS price, COALESCE(v.views, 0) AS views, COUNT(DISTINCT vl.id) AS likes, COALESCE(v.share_count, 0) AS share_count\nFROM venues v\nJOIN venue_imgs vimg ON v.id = vimg.fk_venue_id\nLEFT JOIN venue_likes vl ON v.id = vl.fk_venue_id\nWHERE v.user_id = ?\nGROUP BY v.id\nORDER BY v.id DESC;\n        ", [user_id], function (err, result) {
            if (err) {
                console.error(err);
            }
            if (result.length === 0) {
                res.status(404).json({ error: "Venues not found" });
                return;
            }
            finalResult_1.push(result);
            db_1.default.execute("SELECT COUNT(*) AS total FROM venues WHERE user_id = ?;", [user_id], function (err, result) {
                if (err) {
                    console.error(err);
                }
                if (result.length === 0) {
                    res.status(404).json({ error: "Venues not found" });
                }
                finalResult_1.push(result);
                res.status(200).json({ finalResult: finalResult_1 });
            });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getLimitedVenuesInfoProfile = getLimitedVenuesInfoProfile;
//# sourceMappingURL=getVenuesLimitedInfo.js.map