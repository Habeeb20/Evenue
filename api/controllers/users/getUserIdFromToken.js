"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function getUserIDAndToken(req) {
    var _a;
    var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return { user_id: "", token: "" };
    }
    try {
        var decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return { user_id: decodedToken.user_id, token: token };
    }
    catch (error) {
        console.error("Error decoding token:", error);
        return { user_id: "", token: "" };
    }
}
exports.default = getUserIDAndToken;
//# sourceMappingURL=getUserIdFromToken.js.map