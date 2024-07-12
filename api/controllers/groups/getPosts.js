"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../users/getUserIdFromToken"));
// wrongly sending back comments as duplicate
var getPosts = function (req, res) {
    var group_id = req.params.group_id;
    if (!group_id) {
        res.status(400).json({ error: "Missing group id fields" });
        return;
    }
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    if (!user_id) {
        try {
            db_1.default.execute("\n        SELECT \n    egp.id, \n    egp.post, \n    egp.created_at, \n    COALESCE(egp.shares, 0) AS shares, \n    COALESCE(egp.views, 0) AS views,\n    GROUP_CONCAT(eimg.imgs) AS imgs, \n    u.first_name AS owner_firstname, \n    u.last_name AS owner_lastname, \n    u.img AS owner_img, \n    COUNT(epl.fk_user_id) AS likes,\n    (SELECT COUNT(*) FROM egroup_post_likes WHERE fk_egroup_post_id = egp.id AND fk_user_id = 0) AS user_liked,\n    JSON_ARRAYAGG(\n      JSON_OBJECT(\n        \"comment_id\", epc.id,\n        \"comment\", epc.comment,\n        \"created_at\", epc.created_at,\n        \"commentator_img\", uc.img,\n        \"commentator_first_name\", uc.first_name,\n        \"commentator_last_name\", uc.last_name\n      ) \n    ) AS post_comments\n  FROM egroup_posts egp\n  LEFT JOIN users u ON egp.fk_user_id = u.user_id\n  LEFT JOIN egroup_post_comments epc ON epc.fk_egroup_post_id = egp.id\n  LEFT JOIN users uc ON epc.fk_user_id = uc.user_id\n  LEFT JOIN egroups eg ON eg.id = egp.fk_egroup_id\n  LEFT JOIN egroup_post_likes epl ON epl.fk_egroup_post_id = egp.id\n  LEFT JOIN egroup_post_imgs eimg ON eimg.fk_egroup_post_id = egp.id\n  WHERE eg.id = ?\n  GROUP BY egp.id;\n              ", [group_id], function (err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                }
                else if (result.length === 0) {
                    res.status(404).json({ error: "No posts yet." });
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
            db_1.default.execute("\n      SELECT \n  egp.id, \n  egp.post, \n  egp.created_at, \n  COALESCE(egp.shares, 0) AS shares, \n  COALESCE(egp.views, 0) AS views,\n  GROUP_CONCAT(eimg.imgs) AS imgs, \n  u.first_name AS owner_firstname, \n  u.last_name AS owner_lastname, \n  u.img AS owner_img, \n  COUNT(epl.fk_user_id) AS likes,\n  (SELECT COUNT(*) FROM egroup_post_likes WHERE fk_egroup_post_id = egp.id AND fk_user_id = ?) AS user_liked,\n  JSON_ARRAYAGG(\n    JSON_OBJECT(\n      \"comment_id\", epc.id,\n      \"comment\", epc.comment,\n      \"created_at\", epc.created_at,\n      \"commentator_img\", uc.img,\n      \"commentator_first_name\", uc.first_name,\n      \"commentator_last_name\", uc.last_name\n    ) \n  ) AS post_comments\nFROM egroup_posts egp\nLEFT JOIN users u ON egp.fk_user_id = u.user_id\nLEFT JOIN egroup_post_comments epc ON epc.fk_egroup_post_id = egp.id\nLEFT JOIN users uc ON epc.fk_user_id = uc.user_id\nLEFT JOIN egroups eg ON eg.id = egp.fk_egroup_id\nLEFT JOIN egroup_post_likes epl ON epl.fk_egroup_post_id = egp.id\nLEFT JOIN egroup_post_imgs eimg ON eimg.fk_egroup_post_id = egp.id\nWHERE eg.id = ?\nGROUP BY egp.id;\n            ", [user_id, group_id], function (err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                }
                else if (result.length === 0) {
                    res.status(404).json({ error: "No posts yet." });
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
exports.getPosts = getPosts;
//# sourceMappingURL=getPosts.js.map