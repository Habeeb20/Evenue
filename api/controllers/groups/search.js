"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchGroup = void 0;
var db_1 = __importDefault(require("../../db/db"));
var searchGroup = function (req, res) {
    var group_name = req.query.group_name;
    console.log({ group_name: group_name });
    if (!group_name) {
        res.status(400).json({ error: "Missing required fields" });
    }
    try {
        db_1.default.execute("\n      SELECT eg.id,\n      eg.name,\n      eg.about,\n      eg.logo,\n      eg.fk_user_id\n      , COUNT(egm.fk_user_id) as member_total\n  FROM egroups eg\n  LEFT JOIN egroup_members egm ON egm.fk_egroup_id = eg.id\n  WHERE eg.name LIKE ?\n  GROUP BY eg.id;\n    ", ["%".concat(group_name, "%")], function (err, result) {
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
exports.searchGroup = searchGroup;
//# sourceMappingURL=search.js.map