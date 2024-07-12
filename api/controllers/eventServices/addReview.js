"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../users/getUserIdFromToken"));
var addReview = function (req, res) {
    var event_service_id = req.query.event_service_id;
    var _a = req.body, rating = _a.rating, review = _a.review;
    console.log({ rating: rating, review: review, event_service_id: event_service_id });
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    console.log({ user_id: user_id });
    if (!event_service_id || !user_id || !rating || !review) {
        res.status(400).json({ error: "Missing required field" });
        return;
    }
    db_1.default.getConnection(function (err, connection) {
        if (err) {
            // Handle connection error
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        else {
            connection.query("START TRANSACTION;", function (err) {
                if (err) {
                    res.status(500).json({ message: "Internal server error" });
                }
                else {
                    try {
                        connection.query("\n              INSERT INTO event_services_ratings\n(rating,\nfk_user_id,\nfk_event_service_id)\nVALUES\n(?,\n?,\n?);\n              ", [rating, user_id, event_service_id], function (err) {
                            if (err) {
                                // Handle event insert error
                                console.error(err);
                                res.status(500).json({ error: "Internal server error" });
                                return;
                            }
                            connection.query("\n                  INSERT INTO e_service_reviews\n                  (review,\n                  fk_user_id,\n                  fk_event_services_id)\n                  VALUES(\n                  ?,\n                  ?,\n                  ?);            \n                  ", [review, user_id, event_service_id], function (err) {
                                if (err) {
                                    console.error(err);
                                    res.status(500).json({ error: "Internal server error" });
                                    return;
                                }
                                connection.query("COMMIT;", function (error) {
                                    if (error) {
                                        try {
                                            connection.query("ROLLBACK;");
                                        }
                                        catch (rollbackError) {
                                            // Handle rollback error
                                            console.error(rollbackError);
                                        }
                                        res
                                            .status(500)
                                            .json({ error: "Internal server error" });
                                    }
                                    else {
                                        res.status(200).json({
                                            message: "Rating & review added successfully",
                                        });
                                    }
                                });
                            });
                        });
                    }
                    catch (error) {
                        connection.query("ROLLBACK;", function (rollbackError) {
                            // Handle rollback error
                            console.error(rollbackError);
                        });
                        res.status(500).json({ error: "Internal server error" });
                    }
                    finally {
                        connection.release(); // Return connection to pool
                    }
                }
            });
        }
    });
};
exports.addReview = addReview;
//# sourceMappingURL=addReview.js.map