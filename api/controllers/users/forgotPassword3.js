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
exports.forgotPassword3rdStep = void 0;
var db_1 = __importDefault(require("../../db/db"));
var bcryptUtils_1 = require("../../middleware/bcrypt/bcryptUtils");
/**
 * select from the db where the email has a code that has a verified status of true. If none, send an error else change password
 */
var forgotPassword3rdStep = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, newPassword, saltRounds, salt, hash;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, newPassword = _a.newPassword;
                saltRounds = 10;
                return [4 /*yield*/, (0, bcryptUtils_1.generateSalt)(saltRounds)];
            case 1:
                salt = _b.sent();
                return [4 /*yield*/, (0, bcryptUtils_1.hashPassword)(newPassword, salt)];
            case 2:
                hash = _b.sent();
                // check if the code exists in the database, if the password is not older than 24 hours.
                db_1.default.getConnection(function (error, connection) {
                    if (error) {
                        // Handle connection error
                        console.error(error);
                        res.status(500).json({ error: "Internal server error" });
                        return;
                    }
                    else {
                        try {
                            connection.query("START TRANSACTION;", function (error) {
                                if (error) {
                                    // Handle transaction start error
                                    res.status(500).json({ error: "Internal server error" });
                                    return;
                                }
                                else {
                                    // check if the user has a code that has a verified status of true and code timestamp is not greater than 3 hours.
                                    connection.query("\n              SELECT code_id \nFROM forgot_password_codes \nWHERE verified = 'true' AND request_email = ? AND TIMESTAMPDIFF(HOUR, timestamp, NOW()) < 3\nORDER BY code_id DESC LIMIT 1;\n              ", [email], function (error, result) {
                                        if (error) {
                                            // Handle query error
                                            console.error(error);
                                            res.status(500).json({ error: "Internal server error" });
                                            return;
                                        }
                                        else if (result.length === 0) {
                                            res.status(404).json({ error: "No code found" });
                                            return;
                                        }
                                        else {
                                            // delete every code from the table with a time > 3hrs. This should be eventually done by a crone job aka automated
                                            connection.query("\n                    DELETE FROM forgot_password_codes\nWHERE TIMESTAMPDIFF(HOUR, timestamp, NOW()) > 3;\n                    ", function (error) {
                                                if (error) {
                                                    // Handle image insert error
                                                    console.error(error);
                                                    res
                                                        .status(500)
                                                        .json({ error: "Internal server error" });
                                                    return;
                                                }
                                                else {
                                                    // allow password change
                                                    connection.query("\n                          UPDATE users SET password = ?\nWHERE email = ?;\n                          ", [hash, email], function (error) {
                                                        if (error) {
                                                            // Handle image insert error
                                                            console.error(error);
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
                                                                res.status(200).json({
                                                                    message: "password change successful",
                                                                });
                                                            }
                                                        });
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
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
                return [2 /*return*/];
        }
    });
}); };
exports.forgotPassword3rdStep = forgotPassword3rdStep;
//# sourceMappingURL=forgotPassword3.js.map