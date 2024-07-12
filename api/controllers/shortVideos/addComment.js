"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = void 0;
var db_1 = __importDefault(require("../../db/db"));
var checkLength_1 = require("../../middleware/inputs/checkLength");
var getUserIdFromToken_1 = __importDefault(require("../users/getUserIdFromToken"));
var addComment = function (req, res) {
    var _a = req.body, video_id = _a.video_id, comment = _a.comment;
    console.log({ video_id: video_id, comment: comment });
    if (!video_id || !comment) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    var validationFields = [
        { name: "video_id", maxLength: 100 },
        { name: "comment", maxLength: 100 },
    ];
    var strVideoId = video_id.toString();
    var validationErrors = (0, checkLength_1.validateInputLength)({ strVideoId: strVideoId, comment: comment }, validationFields);
    if (validationErrors.length > 0) {
        res
            .status(400)
            .json({ error: "Input(s) too long", fields: validationErrors });
        return;
    }
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    console.log({ user_id: user_id });
    if (!user_id) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    try {
        db_1.default.execute("\n      INSERT INTO short_video_comments\n      (comment,\n      fk_video_id,\n      fk_user_id)\n      VALUES\n      (?,\n      ?,\n      ?);\n            ", [comment, strVideoId, user_id], function (err) {
            if (err) {
                console.error(err.message);
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
exports.addComment = addComment;
//# sourceMappingURL=addComment.js.map