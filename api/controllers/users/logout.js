"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
var getUserIdFromToken_1 = __importDefault(require("./getUserIdFromToken"));
var db_1 = __importDefault(require("../../db/db"));
var logout = function (req, res) {
    var token = (0, getUserIdFromToken_1.default)(req).token;
    if (!token) {
        res
            .status(200)
            .clearCookie("token", { path: "/" })
            .json({ message: "log out success" });
        return;
    }
    db_1.default.execute("INSERT INTO invalid_tokens (invalid_tokens) VALUE (?)", [token], function (err, result) {
        if (err) {
            console.error("Error invalidating token:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        console.log("Token invalidated:", result);
        // Clear the cookie and redirect after successful invalidation
        res
            .status(200)
            .clearCookie("token", { path: "/" })
            .json({ message: "log out success" });
    });
};
exports.logout = logout;
//# sourceMappingURL=logout.js.map