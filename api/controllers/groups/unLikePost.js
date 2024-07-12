"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unLike = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../users/getUserIdFromToken"));
var unLike = function (req, res) {
    var group_post_id = req.params.group_post_id;
    if (!group_post_id) {
        res.status(400).json({ error: "Missing group id fields" });
        return;
    }
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    if (!user_id) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        db_1.default.execute("\n        DELETE FROM egroup_post_likes\nWHERE fk_egroup_post_id = ? AND fk_user_id = ?;\n            ", [group_post_id, user_id], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "No posts yet." });
                return;
            }
            res.status(200).json({ message: "Unliked successful" });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.unLike = unLike;
//# sourceMappingURL=unLikePost.js.map