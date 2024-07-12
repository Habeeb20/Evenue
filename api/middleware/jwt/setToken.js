"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToken = void 0;
var setToken = function (_, res, token) {
    var cookie = res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    });
    return cookie;
};
exports.setToken = setToken;
//# sourceMappingURL=setToken.js.map