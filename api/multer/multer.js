"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
// set path based on production or development
var uploadDir = process.env.NODE_ENV === "production" ? "public/uploads" : "dev";
// Ensure directories exist
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        var uniqueIdentifier = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueIdentifier + "-" + file.originalname);
    },
});
var fileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg|webp|avif)$/i)) {
        return cb(null, false);
    }
    cb(null, true);
};
exports.upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
//# sourceMappingURL=multer.js.map