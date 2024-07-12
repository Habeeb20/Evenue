"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMembers = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getMembers = function (req, res) {
    var group_id = req.params.group_id;
    if (!group_id) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    try {
        db_1.default.execute("\n      SELECT id,\n      u.first_name,\n      u.last_name,\n      u.img\n  FROM egroup_members egm\n  LEFT JOIN users u ON u.user_id = egm.fk_user_id\n  WHERE fk_egroup_id = ?;\n      \n            ", [group_id], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "No group member" });
            }
            res.status(200).json({ result: result });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getMembers = getMembers;
//# sourceMappingURL=getMembers.js.map