"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLimitedInfo = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getLimitedInfo = function (req, res) {
    try {
        db_1.default.execute("\n      SELECT st.id, st.video, COALESCE(st.views, 0) AS views, COALESCE(stl.like_count, 0) AS likes\n      FROM stories st\n      LEFT JOIN story_likes stl ON st.id = stl.fk_story_id;\n            ", function (err, result) {
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