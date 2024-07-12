"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, categoryIdentifier, locationIdentifier, popularIdentifier, blacklistIdentifier, finalResult_1, finalResult_2, finalResult_3, finalResult_4, finalResult_5;
    return __generator(this, function (_b) {
        _a = req.body, categoryIdentifier = _a.categoryIdentifier, locationIdentifier = _a.locationIdentifier, popularIdentifier = _a.popularIdentifier, blacklistIdentifier = _a.blacklistIdentifier;
        console.log({ categoryIdentifier: categoryIdentifier });
        console.log({ popularIdentifier: popularIdentifier });
        console.log({ blacklistIdentifier: blacklistIdentifier });
        if (categoryIdentifier &&
            popularIdentifier &&
            blacklistIdentifier &&
            locationIdentifier) {
            res.status(400).json({ error: "Multiple identifiers are not allowed" });
            return [2 /*return*/];
        }
        try {
            if (!categoryIdentifier &&
                !popularIdentifier &&
                !blacklistIdentifier &&
                !locationIdentifier) {
                finalResult_1 = [];
                db_1.default.execute("\n        SELECT\n          v.id, v.title, v.location, v.no_of_guest,\n          SUBSTRING_INDEX(GROUP_CONCAT(vimg.imgs), ',', 1) AS first_img,\n          COALESCE(ROUND(AVG(vr.rating), 1), 0) AS rating\n        FROM venues v\n        JOIN venue_imgs vimg ON v.id = vimg.fk_venue_id\n        LEFT JOIN venues_ratings vr ON v.id = vr.fk_venue_id\n        GROUP BY v.id\n        ORDER BY v.views DESC;\n        ", function (err, result) {
                    if (err) {
                        console.error(err);
                    }
                    if (result.length === 0) {
                        res.status(404).json({ error: "Venues not found" });
                    }
                    finalResult_1.push(result);
                    db_1.default.execute("SELECT COUNT(*) AS total FROM venues;", function (err, result) {
                        if (err) {
                            console.error(err);
                        }
                        if (result.length === 0) {
                            res.status(404).json({ error: "Venues not found" });
                        }
                        finalResult_1.push(result);
                        res.status(200).json({ finalResult: finalResult_1 });
                    });
                });
            }
            else if (categoryIdentifier &&
                !popularIdentifier &&
                !blacklistIdentifier &&
                !locationIdentifier) {
                finalResult_2 = [];
                db_1.default.execute("\n        SELECT\n          v.id, v.title, v.location, v.no_of_guest,\n          SUBSTRING_INDEX(GROUP_CONCAT(vimg.imgs), ',', 1) AS first_img,\n          COALESCE(ROUND(AVG(vr.rating), 1), 0) AS rating\n        FROM venues v \n        JOIN venue_imgs vimg ON v.id = vimg.fk_venue_id\n        LEFT JOIN venues_ratings vr ON v.id = vr.fk_venue_id\n        WHERE v.category LIKE ?\n        GROUP BY v.id\n        ORDER BY v.id DESC;\n          ", ["%".concat(categoryIdentifier, "%")], function (err, result) {
                    if (err) {
                        console.error(err);
                    }
                    if (result.length === 0) {
                        res.status(404).json({ error: "Venues not found" });
                        return;
                    }
                    finalResult_2.push(result);
                    db_1.default.execute("SELECT SUM(category LIKE ?) AS total FROM venues;", ["%".concat(categoryIdentifier, "%")], function (err, result) {
                        if (err) {
                            console.error(err);
                        }
                        if (result.length === 0) {
                            res.status(404).json({ error: "Venues not found" });
                            return;
                        }
                        finalResult_2.push(result);
                        res.status(200).json({ finalResult: finalResult_2 });
                    });
                });
            }
            else if (!categoryIdentifier &&
                popularIdentifier === "popularIdentifier" &&
                blacklistIdentifier !== "blacklistIdentifier" &&
                !locationIdentifier) {
                finalResult_3 = [];
                db_1.default.execute("\n        SELECT\n            v.id, v.title, v.location, v.no_of_guest,\n            SUBSTRING_INDEX(GROUP_CONCAT(vimg.imgs), ',', 1) AS first_img,\n            COALESCE(ROUND(AVG(vr.rating), 1), 0) AS rating\n        FROM venues v\n        JOIN venue_imgs vimg ON v.id = vimg.fk_venue_id\n        LEFT JOIN venues_ratings vr ON v.id = vr.fk_venue_id\n        GROUP BY v.id\n        ORDER BY v.views DESC;\n          ", function (err, result) {
                    if (err) {
                        console.error(err);
                    }
                    if (result.length === 0) {
                        res.status(404).json({ error: "Venues not found" });
                        return;
                    }
                    finalResult_3.push(result);
                    db_1.default.execute("SELECT COUNT(*) AS total FROM venues", ["%".concat(categoryIdentifier, "%")], function (err, result) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        if (result.length === 0) {
                            res.status(404).json({ error: "Venues not found" });
                            return;
                        }
                        finalResult_3.push(result);
                        res.status(200).json({ finalResult: finalResult_3 });
                    });
                });
            }
            else if (!categoryIdentifier &&
                popularIdentifier !== "popularIdentifier" &&
                blacklistIdentifier === "blacklistIdentifier" &&
                !locationIdentifier) {
                finalResult_4 = [];
                db_1.default.execute("\n        SELECT\n          v.id, v.title, v.location, v.no_of_guest,\n          SUBSTRING_INDEX(GROUP_CONCAT(vimg.imgs), ',', 1) AS first_img,\n          COALESCE(ROUND(AVG(vr.rating), 1), 0) AS rating\n        FROM venues v \n        JOIN venue_imgs vimg ON v.id = vimg.fk_venue_id\n        LEFT JOIN venues_ratings vr ON v.id = vr.fk_venue_id\n        WHERE v.blacklist = '1'\n        GROUP BY v.id\n        ORDER BY v.id DESC; \n          ", function (err, result) {
                    if (err) {
                        console.error(err);
                    }
                    if (result.length === 0) {
                        res.status(404).json({ error: "Venues not found" });
                        return;
                    }
                    finalResult_4.push(result);
                    db_1.default.execute("SELECT COUNT(*) FROM venues WHERE blacklist = '1';", ["%".concat(categoryIdentifier, "%")], function (err, result) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        if (result.length === 0) {
                            res.status(404).json({ error: "Venues not found" });
                            return;
                        }
                        finalResult_4.push(result);
                        res.status(200).json({ finalResult: finalResult_4 });
                    });
                });
            }
            else if (!categoryIdentifier &&
                !popularIdentifier &&
                blacklistIdentifier !== "blacklistIdentifier" &&
                locationIdentifier) {
                finalResult_5 = [];
                db_1.default.execute("\n          SELECT\n          v.id, v.title, v.location, v.no_of_guest,\n          SUBSTRING_INDEX(GROUP_CONCAT(vimg.imgs), ',', 1) AS first_img,\n          COALESCE(ROUND(AVG(vr.rating), 1), 0) AS rating\n        FROM venues v\n        JOIN venue_imgs vimg ON v.id = vimg.fk_venue_id\n        LEFT JOIN venues_ratings vr ON v.id = vr.fk_venue_id\n        WHERE v.location LIKE ?\n        GROUP BY v.id\n        ORDER BY v.views DESC;\n            ", ["%".concat(locationIdentifier, "%")], function (err, result) {
                    if (err) {
                        console.error(err);
                    }
                    if (result.length === 0) {
                        res.status(404).json({ error: "Venues not found" });
                        return;
                    }
                    finalResult_5.push(result);
                    db_1.default.execute("SELECT SUM(location LIKE ?) AS total FROM venues;", ["%".concat(categoryIdentifier, "%")], function (err, result) {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        if (result.length === 0) {
                            res.status(404).json({ error: "Venues not found" });
                            return;
                        }
                        finalResult_5.push(result);
                        res.status(200).json({ finalResult: finalResult_5 });
                    });
                });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
        return [2 /*return*/];
    });
}); };
exports.getAll = getAll;
//# sourceMappingURL=getAll.js.map