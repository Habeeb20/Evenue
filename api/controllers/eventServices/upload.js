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
exports.uploadEventService = void 0;
var db_1 = __importDefault(require("../../db/db"));
var multer_1 = __importDefault(require("multer"));
var multer_2 = require("../../multer/multer");
var cloudinary_1 = __importDefault(require("../../cloudinary/cloudinary"));
var getUserIdFromToken_1 = __importDefault(require("../users/getUserIdFromToken"));
var checkLength_1 = require("../../middleware/inputs/checkLength");
var uploadEventService = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id;
    return __generator(this, function (_a) {
        user_id = (0, getUserIdFromToken_1.default)(req).user_id;
        if (!user_id) {
            res.status(401).json({ error: "Unauthorized" });
            return [2 /*return*/];
        }
        multer_2.upload.array("imgs", 5)(req, res, function (error) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, name, location, profession, category, email, phone_number, experience_duration, bio, MONDAY_OPEN, MONDAY_CLOSE, TUESDAY_OPEN, TUESDAY_CLOSE, WEDNESDAY_OPEN, WEDNESDAY_CLOSE, THURSDAY_OPEN, THURSDAY_CLOSE, FRIDAY_OPEN, FRIDAY_CLOSE, SATURDAY_OPEN, SATURDAY_CLOSE, SUNDAY_OPEN, SUNDAY_CLOSE, validationFields, validationErrors, pictureUrls, _i, _b, file, uniqueIdentifier, publicId, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (error) {
                            // Handle error
                            if (error.message === "Unexpected field") {
                                console.log(error.message);
                                res.status(400).json({ error: "Maximum of 5 images allowed" });
                                return [2 /*return*/];
                            }
                            console.log(error.message);
                            res.status(500).json({ error: error.message });
                            return [2 /*return*/];
                        }
                        // Handle multer upload error
                        if (error instanceof multer_1.default.MulterError) {
                            // Handle Multer error
                            console.log(error.message);
                            res.status(500).json({ error: error.message });
                            return [2 /*return*/];
                        }
                        // Handle no files uploaded
                        if (!req.files || req.files.length === 0) {
                            // No files uploaded
                            console.log(error.message);
                            console.error("No files uploaded");
                            res.status(400).json({ error: "No files uploaded" });
                            return [2 /*return*/];
                        }
                        // Handle the case where req.files is not an array
                        if (!Array.isArray(req.files)) {
                            console.error("req.files is not an array");
                            res.status(500).json({ error: "Internal server error" });
                            return [2 /*return*/];
                        }
                        _a = req.body, name = _a.name, location = _a.location, profession = _a.profession, category = _a.category, email = _a.email, phone_number = _a.phone_number, experience_duration = _a.experience_duration, bio = _a.bio, MONDAY_OPEN = _a.MONDAY_OPEN, MONDAY_CLOSE = _a.MONDAY_CLOSE, TUESDAY_OPEN = _a.TUESDAY_OPEN, TUESDAY_CLOSE = _a.TUESDAY_CLOSE, WEDNESDAY_OPEN = _a.WEDNESDAY_OPEN, WEDNESDAY_CLOSE = _a.WEDNESDAY_CLOSE, THURSDAY_OPEN = _a.THURSDAY_OPEN, THURSDAY_CLOSE = _a.THURSDAY_CLOSE, FRIDAY_OPEN = _a.FRIDAY_OPEN, FRIDAY_CLOSE = _a.FRIDAY_CLOSE, SATURDAY_OPEN = _a.SATURDAY_OPEN, SATURDAY_CLOSE = _a.SATURDAY_CLOSE, SUNDAY_OPEN = _a.SUNDAY_OPEN, SUNDAY_CLOSE = _a.SUNDAY_CLOSE;
                        console.log(req.body);
                        validationFields = [
                            { name: "name", maxLength: 300 },
                            { name: "location", maxLength: 300 },
                            { name: "profession", maxLength: 100 },
                            { name: "category", maxLength: 100 },
                            { name: "email", maxLength: 60 },
                            { name: "phone_number", maxLength: 11 },
                            { name: "experience_duration", maxLength: 19 },
                            { name: "bio", maxLength: 1000 },
                        ];
                        validationErrors = (0, checkLength_1.validateInputLength)(req.body, validationFields);
                        if (validationErrors.length > 0) {
                            res
                                .status(400)
                                .json({ error: "Input(s) too long", fields: validationErrors });
                            return [2 /*return*/];
                        }
                        pictureUrls = Array();
                        _i = 0, _b = req.files;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                        file = _b[_i];
                        uniqueIdentifier = Date.now() + "-" + Math.round(Math.random() * 1e9);
                        publicId = "".concat(user_id, "_Eservice_img_").concat(uniqueIdentifier);
                        return [4 /*yield*/, cloudinary_1.default.uploader.upload(file.path, {
                                public_id: publicId,
                            })];
                    case 2:
                        result = _c.sent();
                        console.log({ result: result });
                        pictureUrls.unshift(result.secure_url);
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        db_1.default.getConnection(function (error, connection) {
                            if (error) {
                                // Handle connection error
                                console.error(error);
                                res.status(500).json({ error: "Internal server error" });
                                return;
                            }
                            else {
                                connection.query("START TRANSACTION;", function (error) {
                                    if (error) {
                                        // Handle transaction start error
                                        res.status(500).json({ error: "Internal server error" });
                                        return;
                                    }
                                    else {
                                        try {
                                            // Insert Event service data
                                            connection.query("INSERT INTO event_services\n                (\n                name,\n                location,\n                profession,\n                category,\n                email,\n                phone_number,\n                experience_duration,\n                bio,\n                fk_user_id)\n                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);", [
                                                name,
                                                location,
                                                profession,
                                                category,
                                                email,
                                                phone_number,
                                                experience_duration,
                                                bio,
                                                user_id,
                                            ], function (error, results) {
                                                if (error) {
                                                    // Handle Event service insert error
                                                    console.error(error);
                                                    res.status(500).json({ error: "Internal server error" });
                                                    return;
                                                }
                                                var fk_event_services_id = results.insertId;
                                                // Insert image URLs
                                                var values = pictureUrls.map(function (imageUrl) { return [
                                                    fk_event_services_id,
                                                    imageUrl,
                                                ]; });
                                                connection.query("INSERT INTO event_services_imgs (fk_event_services_id, imgs) VALUES ?", [values], function (error) {
                                                    if (error) {
                                                        // Handle image insert error
                                                        console.error(error);
                                                        res
                                                            .status(500)
                                                            .json({ error: "Internal server error" });
                                                        return;
                                                    }
                                                    else {
                                                        try {
                                                            connection.query("\nINSERT INTO event_service_hours\n(MONDAY_OPEN,\nMONDAY_CLOSE,\nTUESDAY_OPEN,\nTUESDAY_CLOSE,\nWEDNESDAY_OPEN,\nWEDNESDAY_CLOSE,\nTHURSDAY_OPEN,\nTHURSDAY_CLOSE,\nFRIDAY_OPEN,\nFRIDAY_CLOSE,\nSATURDAY_OPEN,\nSATURDAY_CLOSE,\nSUNDAY_OPEN,\nSUNDAY_CLOSE,\nfk_event_service_id)\nVALUES\n(\n?,\n?,\n?,\n?,\n?,\n?,\n?,\n?,\n?,\n?,\n?,\n?,\n?,\n?,\n?\n);\n \n                            ", [
                                                                MONDAY_OPEN,
                                                                MONDAY_CLOSE,
                                                                TUESDAY_OPEN,
                                                                TUESDAY_CLOSE,
                                                                WEDNESDAY_OPEN,
                                                                WEDNESDAY_CLOSE,
                                                                THURSDAY_OPEN,
                                                                THURSDAY_CLOSE,
                                                                FRIDAY_OPEN,
                                                                FRIDAY_CLOSE,
                                                                SATURDAY_OPEN,
                                                                SATURDAY_CLOSE,
                                                                SUNDAY_OPEN,
                                                                SUNDAY_CLOSE,
                                                                fk_event_services_id,
                                                            ], function (err) {
                                                                if (err) {
                                                                    console.error(err);
                                                                    res
                                                                        .status(500)
                                                                        .json({ error: "Internal sever error" });
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
                                                                            message: "Event service created successfully",
                                                                        });
                                                                    }
                                                                });
                                                            });
                                                        }
                                                        catch (error) {
                                                            console.error(error);
                                                            res
                                                                .status(500)
                                                                .json({ error: "Internal server error" });
                                                        }
                                                    }
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
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); };
exports.uploadEventService = uploadEventService;
//# sourceMappingURL=upload.js.map