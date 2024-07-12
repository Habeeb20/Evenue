"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLimitedInfo = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getLimitedInfo = function (req, res) {
    try {
        db_1.default.execute("\nSELECT sv.id, sv.video, COALESCE(sv.views, 0) AS views, COALESCE(svl.like_count, 0) AS likes\nFROM short_videos sv\nLEFT JOIN short_videos_likes svl ON sv.id = svl.fk_video_id;\n            ", function (err, result) {
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
exports.getLimitedInfo = getLimitedInfo;
//# sourceMappingURL=getLimitedInfo.js.map