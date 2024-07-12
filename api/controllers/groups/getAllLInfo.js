"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllLimitedInfo = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getAllLimitedInfo = function (req, res) {
    try {
        db_1.default.execute("\n      SELECT \n    eg.id,\n    eg.name,\n    eg.about,\n    eg.logo,\n    eg.fk_user_id,\n    COUNT(DISTINCT egm.fk_user_id) AS member_total,\n    COUNT(DISTINCT CASE WHEN po.created_at >= DATE_SUB(NOW(), INTERVAL 1 DAY) THEN po.id END) AS total_post_last_24_hrs\nFROM \n    egroups eg\nLEFT JOIN \n    egroup_members egm ON egm.fk_egroup_id = eg.id\nLEFT JOIN \n    egroup_posts po ON po.fk_egroup_id = eg.id\nGROUP BY \n    eg.id;\n    ", function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "Groups not found" });
                return;
            }
            res.status(200).json({ result: result });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllLimitedInfo = getAllLimitedInfo;
//# sourceMappingURL=getAllLInfo.js.map