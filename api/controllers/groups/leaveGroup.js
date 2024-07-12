"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveGroup = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../users/getUserIdFromToken"));
var leaveGroup = function (req, res) {
    var group_id = req.params.group_id;
    if (!group_id) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    if (!user_id) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        db_1.default.execute("\n      DELETE FROM egroup_members\nWHERE fk_user_id = ? AND fk_egroup_id = ?;    \n            ", [user_id, group_id], function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            res.status(200).json({ message: "Group left successfully" });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.leaveGroup = leaveGroup;
//# sourceMappingURL=leaveGroup.js.map