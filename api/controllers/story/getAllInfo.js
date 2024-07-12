"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInfo = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getAllInfo = function (req, res) {
    var story_id = req.query.story_id;
    if (!story_id) {
        try {
            db_1.default.execute("\n        SELECT st.id, st.video, COALESCE(st.views, 0) AS views, COUNT(DISTINCT stl.fk_user_id) AS likes,\n  u.first_name, u.last_name, u.img\n  FROM stories st\n  LEFT JOIN story_likes stl ON st.id = stl.fk_story_id\n  JOIN users u ON u.user_id = st.fk_user_id\n  GROUP BY st.id\n  ORDER BY st.id DESC;\n  ;\n              ", function (err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                }
                else if (result.length === 0) {
                    res.status(404).json({ error: "Stories not found" });
                    return;
                }
                res.status(200).json({ result: result });
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    else {
        try {
            db_1.default.execute("\n      SELECT st.id, st.video, COALESCE(st.views, 0) AS views, COUNT(DISTINCT stl.fk_user_id) AS likes,\nu.first_name, u.last_name, u.img\nFROM stories st\nLEFT JOIN story_likes stl ON st.id = stl.fk_story_id\nJOIN users u ON u.user_id = st.fk_user_id\nGROUP BY st.id\nORDER BY st.id = ? DESC;\n;\n            ", [story_id], function (err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                }
                else if (result.length === 0) {
                    res.status(404).json({ error: "Stories not found" });
                    return;
                }
                res.status(200).json({ result: result });
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};
exports.getAllInfo = getAllInfo;
//# sourceMappingURL=getAllInfo.js.map