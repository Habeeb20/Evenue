"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.increaseView = void 0;
var db_1 = __importDefault(require("../../db/db"));
var increaseView = function (req, res) {
    var video_id = req.body.video_id;
    console.log({ video_id: video_id });
    if (!video_id) {
        res.status(400).json({ error: "Missing required fields" });
        return;
    }
    var strVideoId = video_id.toString();
    try {
        db_1.default.execute("\n      UPDATE short_videos\nSET views = COALESCE(views, 0) + 1\nWHERE id = ?;\n            ", [strVideoId], function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            res.status(200).json({ message: "View incremented" });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.increaseView = increaseView;
//# sourceMappingURL=addViews.js.map