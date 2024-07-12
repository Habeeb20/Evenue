"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtGenerateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var jwtGenerateToken = function (user_id) {
    var token = jsonwebtoken_1.default.sign({ user_id: user_id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return token;
};
exports.jwtGenerateToken = jwtGenerateToken;
//# sourceMappingURL=jwt.js.map