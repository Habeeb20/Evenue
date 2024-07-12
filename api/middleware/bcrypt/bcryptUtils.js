"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = exports.generateSalt = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var generateSalt = function (rounds) {
    return new Promise(function (resolve, reject) {
        bcrypt_1.default.genSalt(rounds, function (err, salt) {
            if (err) {
                reject(err);
            }
            else {
                resolve(salt);
            }
        });
    });
};
exports.generateSalt = generateSalt;
var hashPassword = function (password, salt) {
    return new Promise(function (resolve, reject) {
        bcrypt_1.default.hash(password, salt, function (err, hash) {
            if (err) {
                reject(err);
            }
            else {
                resolve(hash);
            }
        });
    });
};
exports.hashPassword = hashPassword;
var comparePassword = function (password, hash) {
    return new Promise(function (resolve, reject) {
        bcrypt_1.default.compare(password, hash, function (err, result) {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=bcryptUtils.js.map