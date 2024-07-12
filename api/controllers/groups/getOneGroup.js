"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneGroup = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../users/getUserIdFromToken"));
var getOneGroup = function (req, res) {
    var group_id = req.params.group_id;
    if (!group_id) {
        res.status(400).json({ error: "Missing group_id" });
        return;
    }
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    if (!user_id) {
        try {
            db_1.default.execute("\n        SELECT eg.id,\n      eg.name,\n      eg.about,\n      eg.logo,\n      eg.fk_user_id\n      , COUNT(egm.fk_user_id) as member_total\n  FROM egroups eg\n  LEFT JOIN egroup_members egm ON egm.fk_egroup_id = eg.id\n  WHERE eg.id = ?\n  GROUP BY eg.id;\n      ", [group_id], function (err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                }
                else if (result.length === 0) {
                    res.status(404).json({ error: "Group not found" });
                    return;
                }
                res.status(200).json({ result: result });
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    else {
        try {
            db_1.default.execute("\n        SELECT eg.id,\n    eg.name,\n    eg.about,\n    eg.logo,\n    eg.fk_user_id\n    , COUNT(egm.fk_user_id) as member_total,\nCASE WHEN EXISTS (\n  SELECT 1\n  FROM egroup_members egm2\n  WHERE egm2.fk_egroup_id = eg.id\n    AND egm2.fk_user_id = ?\n) THEN 1 ELSE 0 END AS user_has_joined\nFROM egroups eg\nLEFT JOIN egroup_members egm ON egm.fk_egroup_id = eg.id\nWHERE eg.id = ?\nGROUP BY eg.id;\n      ", [user_id, group_id], function (err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                }
                else if (result.length === 0) {
                    res.status(404).json({ error: "Group not found" });
                    return;
                }
                res.status(200).json({ result: result });
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};
exports.getOneGroup = getOneGroup;
//# sourceMappingURL=getOneGroup.js.map