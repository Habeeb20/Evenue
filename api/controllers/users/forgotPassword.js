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
exports.forgotPassword1stStep = void 0;
var db_1 = __importDefault(require("../../db/db"));
var nodemailer_1 = __importDefault(require("../../nodemailer/nodemailer"));
// need to check that the number generated has not been previously generated/ generated & invalidated.
// delete all asscoiated codes if new code is requested. Invalidate a code after 3 hours
var forgotPassword1stStep = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, randomNumbers, message, subject, text, randomNumbersString, saveRandomNumbers, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                console.log({ email: email });
                randomNumbers = Array.from({ length: 6 }, function () {
                    return Math.floor(Math.random() * 10);
                });
                message = "<div>\n    <h1>".concat(randomNumbers.join(""), "</h1>\n    <p>Please don't share this code with anyone. Expires in 3 hours</p>\n    <p>Ignore this message if you didn't request a password reset.</p>\n  </div>");
                subject = "Password Reset";
                text = "".concat(randomNumbers.join(""));
                (0, nodemailer_1.default)(message, email, subject, text);
                randomNumbersString = randomNumbers.join("");
                console.log({ randomNumbersString: randomNumbersString });
                saveRandomNumbers = function (randomNumbersString, email) {
                    return new Promise(function (resolve, reject) {
                        var query = "INSERT INTO forgot_password_codes (code, request_email) VALUES (?, ?)";
                        var values = [randomNumbersString, email];
                        db_1.default.execute(query, values, function (err, result) {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve(result);
                            }
                        });
                    });
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, saveRandomNumbers(randomNumbersString, email)];
            case 2:
                _a.sent();
                console.log("Random numbers saved in the database.");
                res
                    .status(200)
                    .json({ message: "Random numbers successfully saved in the database." });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error saving random numbers:", error_1);
                res.status(500).json({ error: "Failed to save random numbers." });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.forgotPassword1stStep = forgotPassword1stStep;
//# sourceMappingURL=forgotPassword.js.map