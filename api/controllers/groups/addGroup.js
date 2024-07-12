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
exports.addGroup = void 0;
var db_1 = __importDefault(require("../../db/db"));
var multer_1 = __importDefault(require("multer"));
var multer_2 = require("../../multer/multer");
var cloudinary_1 = __importDefault(require("../../cloudinary/cloudinary"));
var getUserIdFromToken_1 = __importDefault(require("../users/getUserIdFromToken"));
var addGroup = function (req, res) {
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    if (!user_id) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    multer_2.upload.single("logo")(req, res, function (error) { return __awaiter(void 0, void 0, void 0, function () {
        var uniqueIdentifier, publicId, result, _a, name, about, imgUrl;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (error instanceof multer_1.default.MulterError) {
                        console.log(error);
                    }
                    uniqueIdentifier = Date.now() + "-" + Math.round(Math.random() * 1e9);
                    publicId = "logo-".concat(uniqueIdentifier);
                    // console.log({ file: req.file });
                    if (!req.file) {
                        return [2 /*return*/, res.status(400).json({ error: "No file uploaded" })];
                    }
                    console.log({ file: req.file.path });
                    return [4 /*yield*/, cloudinary_1.default.uploader
                            .upload(req.file.path, {
                            public_id: publicId,
                        })
                            .catch(function (err) {
                            console.log(err);
                        })];
                case 1:
                    result = (_b.sent());
                    _a = req.body, name = _a.name, about = _a.about;
                    imgUrl = result === null || result === void 0 ? void 0 : result.secure_url;
                    db_1.default.getConnection(function (err, connection) {
                        if (err) {
                            // Handle connection error
                            console.error(error);
                            res.status(500).json({ error: "Internal server error" });
                            return;
                        }
                        else {
                            connection.query("START TRANSACTION;", function (err) {
                                if (err) {
                                    // Handle transaction error
                                    console.error(err);
                                    res.status(500).json({ error: "Internal server error" });
                                    return;
                                }
                                else {
                                    try {
                                        connection.query("\n                                INSERT INTO egroups (name, about, logo,\n                                    fk_user_id) VALUES (?, ?, ?, ?);\n                                ", [name, about, imgUrl, user_id], function (err, result) {
                                            if (err) {
                                                // Handle insert error
                                                console.error(err);
                                                res.status(500).json({ error: "Internal server error" });
                                                return;
                                            }
                                            var fk_egroup_id = result.insertId;
                                            connection.query("\n                                        INSERT INTO egroup_members (fk_user_id, fk_egroup_id) VALUES (?, ?)\n                                        ", [user_id, fk_egroup_id], function (err) {
                                                if (err) {
                                                    // Handle insert error
                                                    console.error(err);
                                                    res
                                                        .status(500)
                                                        .json({ error: "Internal server error" });
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
                                                        res
                                                            .status(200)
                                                            .json({ message: "Group created successfully" });
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
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.addGroup = addGroup;
//# sourceMappingURL=addGroup.js.map