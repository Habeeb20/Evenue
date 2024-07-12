"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unLike = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../users/getUserIdFromToken"));
var unLike = function (req, res) {
    var video_id = req.body.video_id;
    console.log({ video_id: video_id });
    if (!video_id) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    console.log({ user_id: user_id });
    if (!user_id) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    var strVideoId = video_id.toString();
    try {
        db_1.default.execute("\n      DELETE FROM short_videos_likes\nWHERE fk_user_id = ? AND fk_video_id = ?;\n            ", [user_id, strVideoId], function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            res.status(200).json({ message: "unLike successfull" });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.unLike = unLike;
//# sourceMappingURL=unLike.js.map