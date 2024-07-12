"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInfo = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getAllInfo = function (req, res) {
    var video_id = req.query.video_id;
    if (!video_id) {
        res.status(400).json({ error: "Missing video id fields" });
        return;
    }
    try {
        db_1.default.execute("\n      SELECT \n    sv.id, \n    sv.video, \n    sv.description,\n    sv.posted_on,\n    COALESCE(sv.views, 0) AS views, \n    COUNT(DISTINCT svl.fk_user_id) AS likes,\n    sv.fk_user_id AS video_user_id, \n    u.first_name AS video_user_first_name, \n    u.last_name AS video_user_last_name, \n    u.img AS video_user_img,\n    JSON_ARRAYAGG(\n        JSON_OBJECT(\n            'comment_id', svc.id, \n            'comment', svc.comment, \n            'commentator_username', uc.first_name, \n            'commentator_img', uc.img, \n            'created_at', svc.created_at\n        )\n    ) AS comments,\n    CASE WHEN EXISTS (\n        SELECT 1 \n        FROM short_videos_likes svl2 \n        WHERE svl2.fk_video_id = sv.id AND svl2.fk_user_id = sv.fk_user_id\n    ) THEN 1 ELSE 0 END AS user_has_liked\nFROM \n    short_videos sv\nLEFT JOIN \n    short_videos_likes svl ON sv.id = svl.fk_video_id\nINNER JOIN \n    users u ON sv.fk_user_id = u.user_id\nLEFT JOIN \n    short_video_comments svc ON sv.id = svc.fk_video_id\nLEFT JOIN \n    users uc ON svc.fk_user_id = uc.user_id\nGROUP BY \n    sv.id, \n    sv.video, \n    sv.views, \n    sv.fk_user_id, \n    u.first_name, \n    u.last_name, \n    u.img\nORDER BY \n    sv.id = ? DESC\n;\n            ", [video_id], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "Short videos not found" });
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
exports.getAllInfo = getAllInfo;
//# sourceMappingURL=getAllInfo.js.map