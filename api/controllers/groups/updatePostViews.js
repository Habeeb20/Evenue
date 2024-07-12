"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateViews = void 0;
var db_1 = __importDefault(require("../../db/db"));
var updateViews = function (req, res) {
    var group_post_id = req.params.group_post_id;
    if (!group_post_id) {
        res.status(400).json({ error: "Missing group id fields" });
        return;
    }
    try {
        db_1.default.execute("\n      UPDATE egroup_posts\n      SET views = COALESCE(views, 0) + 1\n      WHERE id = ?;\n      \n            ", [group_post_id], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "No posts yet." });
                return;
            }
            res.status(200).json({ message: "Update successful" });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateViews = updateViews;
//# sourceMappingURL=updatePostViews.js.map