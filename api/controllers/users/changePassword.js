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
exports.changePassword = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("./getUserIdFromToken"));
var checkLength_1 = require("../../middleware/inputs/checkLength");
var bcryptUtils_1 = require("../../middleware/bcrypt/bcryptUtils");
var changePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, _a, oldPassword, newPassword, validationFields, validationErrors, saltRounds, salt, hash_1, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user_id = (0, getUserIdFromToken_1.default)(req).user_id;
                _a = req.body, oldPassword = _a.oldPassword, newPassword = _a.newPassword;
                if (!oldPassword || !newPassword) {
                    res.status(400).json({ error: "All fields are required" });
                    return [2 /*return*/];
                }
                validationFields = [
                    { name: "oldPassword", maxLength: 100 },
                    { name: "newPassword", maxLength: 100 },
                ];
                validationErrors = (0, checkLength_1.validateInputLength)({ oldPassword: oldPassword, newPassword: newPassword }, validationFields);
                if (validationErrors.length > 0) {
                    res
                        .status(400)
                        .json({ error: "Input(s) too long", fields: validationErrors });
                    return [2 /*return*/];
                }
                saltRounds = 10;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, (0, bcryptUtils_1.generateSalt)(saltRounds)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, (0, bcryptUtils_1.hashPassword)(newPassword, salt)];
            case 3:
                hash_1 = _b.sent();
                // check if the user exists in the database
                db_1.default.execute("SELECT user_id, password FROM users WHERE user_id = ?", [user_id], function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ error: "Internal server error" });
                        return;
                    }
                    if (result.length === 0) {
                        res.status(404).json({ error: "User not found" });
                        return;
                    }
                    console.log(result);
                    var storedHash = result[0].password;
                    // Compare the entered password with the stored hash
                    (0, bcryptUtils_1.comparePassword)(oldPassword, storedHash).then(function (isMatch) {
                        if (!isMatch) {
                            res.status(401).json({ error: "Invalid old password" });
                            return;
                        }
                        else {
                            // update it in the database
                            db_1.default.execute("UPDATE users SET password = ? WHERE user_id = ?", [hash_1, user_id], function (err, result) {
                                if (err) {
                                    console.log(err);
                                    res.status(500).json({ error: "Internal server error" });
                                    return;
                                }
                                res
                                    .status(200)
                                    .json({ message: "Password changed successfully", result: result });
                            });
                        }
                    });
                });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.changePassword = changePassword;
//# sourceMappingURL=changePassword.js.map