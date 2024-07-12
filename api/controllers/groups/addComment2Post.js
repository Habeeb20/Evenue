"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment2Post = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../users/getUserIdFromToken"));
var addComment2Post = function (req, res) {
    var group_post_id = req.params.group_post_id;
    var comment = req.body.comment;
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    if (!group_post_id || !comment || !user_id) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    try {
        db_1.default.execute("\n      INSERT INTO egroup_post_comments\n(comment,\nfk_egroup_post_id,\nfk_user_id)\nVALUES\n(?,\n?,\n?);\n      \n            ", [comment, group_post_id, user_id], function (err) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            res.status(200).json({ message: "Comment added successfully" });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.addComment2Post = addComment2Post;
//# sourceMappingURL=addComment2Post.js.map