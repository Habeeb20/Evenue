"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceProvider = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../users/getUserIdFromToken"));
var getServiceProvider = function (req, res) {
    var sProvider_id = req.params.sProvider_id;
    console.log(sProvider_id !== null && sProvider_id !== void 0 ? sProvider_id : "no sProvider_id");
    if (!sProvider_id) {
        res.status(400).json({ error: "Missing sProvider_id" });
        return;
    }
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    if (!user_id) {
        user_id = "0";
    }
    try {
        // check if the event exists in the database. Avoid race condition
        db_1.default.execute("\n      SELECT\n    es.id,\n    es.name,\n    es.location,\n    es.verified,\n    es.bio,\n    es.profession,\n    es.category,\n    es.email,\n    es.phone_number,\n    es.experience_duration,\n    GROUP_CONCAT(esimg.imgs) AS imgs,\n    COALESCE(ROUND(AVG(esr.rating), 1), 0) AS rating,\n    COUNT(DISTINCT esr.fk_user_id) AS total_raings_no,\n    opening_hours.opening_hours,\n    CASE WHEN EXISTS(\n    SELECT 1 FROM e_service_reviews esrev WHERE esrev.fk_user_id = ?\n    AND fk_event_services_id = es.id\n    ) THEN 1 ELSE 0 END AS user_has_reviewed\nFROM event_services es\nLEFT JOIN event_services_imgs esimg ON es.id = esimg.fk_event_services_id\nLEFT JOIN event_services_ratings esr ON es.id = esr.fk_event_service_id\nLEFT JOIN (\n    SELECT fk_event_service_id,\n        JSON_ARRAYAGG(\n            JSON_OBJECT(\n                'hours_id', id,\n                'MONDAY_OPEN', MONDAY_OPEN,\n                'MONDAY_CLOSE', MONDAY_CLOSE,\n                'TUESDAY_OPEN', TUESDAY_OPEN,\n                'TUESDAY_CLOSE', TUESDAY_CLOSE,\n                'WEDNESDAY_OPEN', WEDNESDAY_OPEN,\n                'WEDNESDAY_CLOSE', WEDNESDAY_CLOSE,\n                'THURSDAY_OPEN', THURSDAY_OPEN,\n                'THURSDAY_CLOSE', THURSDAY_CLOSE,\n                'FRIDAY_OPEN', FRIDAY_OPEN,\n                'FRIDAY_CLOSE', FRIDAY_CLOSE,\n                'SATURDAY_OPEN', SATURDAY_OPEN,\n                'SATURDAY_CLOSE', SATURDAY_CLOSE,\n                'SUNDAY_OPEN', SUNDAY_OPEN,\n                'SUNDAY_CLOSE', SUNDAY_CLOSE\n            )\n        ) AS opening_hours\n    FROM event_service_hours\n    GROUP BY fk_event_service_id\n) AS opening_hours ON es.id = opening_hours.fk_event_service_id\nWHERE es.id = ?\nGROUP BY es.id\nORDER BY es.id DESC;   \n                ", [user_id, sProvider_id], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "Service not found" });
                return;
            }
            else {
                console.log(result);
                res.status(200).json({ result: result });
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getServiceProvider = getServiceProvider;
//# sourceMappingURL=dynamicServiceProviders.js.map