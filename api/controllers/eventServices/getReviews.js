"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReviews = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getReviews = function (req, res) {
    var sProvider_id = req.params.sProvider_id;
    console.log(sProvider_id !== null && sProvider_id !== void 0 ? sProvider_id : "no sProvider_id");
    if (!sProvider_id) {
        res.status(400).json({ error: "Missing service provider id" });
        return;
    }
    try {
        var finalResult_1 = [];
        db_1.default.execute("\n      SELECT rv.id, rv.review, u.first_name AS reviewer_first_name, u.last_name AS reviewer_last_name, u.img AS reviewer_img\nFROM e_service_reviews rv\nJOIN users u ON u.user_id = rv.fk_user_id\nWHERE rv.fk_event_services_id = ?;\n                ", [sProvider_id], function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            if (result.length === 0) {
                res.status(404).json({ error: "No reviews yet" });
                return;
            }
            finalResult_1.push(result);
            db_1.default.execute("SELECT COUNT(*) AS total FROM e_service_reviews WHERE fk_event_services_id = ?;", [sProvider_id], function (err, result) {
                if (err) {
                    console.error(err);
                }
                if (result.length === 0) {
                    res.status(404).json({ error: "No reviews yet" });
                }
                finalResult_1.push(result);
                res.status(200).json({ finalResult: finalResult_1 });
            });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getReviews = getReviews;
//# sourceMappingURL=getReviews.js.map