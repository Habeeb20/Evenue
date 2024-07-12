"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLimitedInfoForAll = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getLimitedInfoForAll = function (req, res) {
    var category = req.query.category;
    if (!category) {
        try {
            db_1.default.execute("\n        SELECT\n            es.id, es.name, es.location, es.verified, es.category,\n            SUBSTRING_INDEX(GROUP_CONCAT(esimg.imgs), ',', 1) AS first_img,\n            COALESCE(ROUND(AVG(esr.rating), 1), 0) AS rating, COUNT(DISTINCT esr.fk_user_id) AS total_raings_no\n          FROM event_services es\n          LEFT JOIN event_services_imgs esimg ON es.id = esimg.fk_event_services_id\n          LEFT JOIN event_services_ratings esr ON es.id = esr.fk_event_service_id\n          WHERE es.category = 'Photography/Videography' OR es.category = 'make_up_artise' OR es.category = 'designers'\n          GROUP BY es.id\n          ORDER BY es.id DESC;\n               ", function (err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                }
                else if (result.length === 0) {
                    res.status(404).json({ error: "No event services found" });
                    return;
                }
                res.status(200).json({ result: result });
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
    }
    else {
        try {
            db_1.default.execute("\n        SELECT\n            es.id, es.name, es.location, es.verified, es.category,\n            SUBSTRING_INDEX(GROUP_CONCAT(esimg.imgs), ',', 1) AS first_img,\n            COALESCE(ROUND(AVG(esr.rating), 1), 0) AS rating, COUNT(DISTINCT esr.fk_user_id) AS total_raings_no\n          FROM event_services es\n          LEFT JOIN event_services_imgs esimg ON es.id = esimg.fk_event_services_id\n          LEFT JOIN event_services_ratings esr ON es.id = esr.fk_event_service_id\n          WHERE es.category = ?\n          GROUP BY es.id\n          ORDER BY es.id DESC;\n               ", [category], function (err, result) {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal server error" });
                    return;
                }
                else if (result.length === 0) {
                    res.status(404).json({ error: "No event services found" });
                    return;
                }
                res.status(200).json({ result: result });
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
    }
};
exports.getLimitedInfoForAll = getLimitedInfoForAll;
//# sourceMappingURL=getLimitedInfoForAll.js.map