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
exports.uploadShortVideo = void 0;
var db_1 = __importDefault(require("../../db/db"));
var multerVideos_1 = require("../../multer/multerVideos");
var cloudinary_1 = __importDefault(require("../../cloudinary/cloudinary"));
var multer_1 = __importDefault(require("multer"));
var getUserIdFromToken_1 = __importDefault(require("../users/getUserIdFromToken"));
var uploadShortVideo = function (req, res) {
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    if (!user_id) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    multerVideos_1.upload.single("video")(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
        var uniqueIdentifier, publicId, result, post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (err instanceof multer_1.default.MulterError) {
                        console.log(err);
                    }
                    uniqueIdentifier = Date.now() + "-" + Math.round(Math.random() * 1e9);
                    publicId = "shortVideo-".concat(uniqueIdentifier);
                    // handle if no req.file
                    if (!req.file) {
                        return [2 /*return*/, res.status(400).json({ error: "No file uploaded" })];
                    }
                    return [4 /*yield*/, cloudinary_1.default.uploader
                            .upload(req.file.path, {
                            public_id: publicId,
                            resource_type: "video",
                        })
                            .catch(function (err) {
                            console.log(err);
                        })];
                case 1:
                    result = (_a.sent());
                    post = {
                        video: result.secure_url,
                        description: req.body.description,
                        fk_user_id: user_id,
                    };
                    // send post to mySQL database
                    db_1.default.execute("INSERT INTO short_videos (video, description, fk_user_id) VALUES (?, ?, ?)", [post.video, post.description, post.fk_user_id], function (err) {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ error: err.message });
                            return;
                        }
                        res.status(200).json({ message: "Short video uploaded successfully" });
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.uploadShortVideo = uploadShortVideo;
//# sourceMappingURL=upload.js.map