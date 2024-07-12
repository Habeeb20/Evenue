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
exports.updateProfile = void 0;
var db_1 = __importDefault(require("../../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../getUserIdFromToken"));
var multer_1 = require("../../../multer/multer");
var cloudinary_1 = __importDefault(require("../../../cloudinary/cloudinary"));
var isomorphic_dompurify_1 = __importDefault(require("isomorphic-dompurify"));
// interface UserData {
//   // user_id: string;
//   // first_name: string;
//   // last_name: string;
//   business_name: string;
//   business_img: string | null;
//   country_code: string;
//   phone_number: string | null;
//   whatsapp_number: string | null;
//   state: string;
//   axis: string;
//   about_your_organisation: string | null;
//   services_your_organization_provides: string | null;
//   business_state: string | null;
//   business_axis: string | null;
//   business_category: string | null;
//   facebook: string | null;
//   twitter: string | null;
//   linkedin: string | null;
//   instagram: string | null;
// }
var updateProfile = function (req, res) {
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    if (!user_id) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    multer_1.upload.single("business_img")(req, res, function (err) { return __awaiter(void 0, void 0, void 0, function () {
        var uniqueIdentifier, publicId, imgURL, result, error_1, user, userData, post;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        return __generator(this, function (_u) {
            switch (_u.label) {
                case 0:
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: "Internal server error" });
                        return [2 /*return*/];
                    }
                    uniqueIdentifier = Date.now() + "-" + Math.round(Math.random() * 1e9);
                    publicId = "business_img-".concat(uniqueIdentifier);
                    imgURL = req.body.business_img || null;
                    if (!req.file) return [3 /*break*/, 4];
                    _u.label = 1;
                case 1:
                    _u.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, cloudinary_1.default.uploader.upload(req.file.path, {
                            public_id: publicId,
                        })];
                case 2:
                    result = _u.sent();
                    imgURL = result.secure_url;
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _u.sent();
                    console.error(error_1);
                    // Handle cloudinary upload errors gracefully (e.g., log, send generic error response)
                    // Consider using a cloudinary error handling library
                    console.error("Error uploading image:", error_1);
                    res.status(500).json({ error: error_1 });
                    return [3 /*break*/, 4];
                case 4: return [4 /*yield*/, db_1.default
                        .promise()
                        .execute("SELECT * FROM users WHERE user_id = ?", [
                        user_id,
                    ])];
                case 5:
                    user = (_u.sent())[0];
                    if (!Array.isArray(user) || user.length === 0) {
                        res.status(404).json({ error: "User not found" });
                        return [2 /*return*/];
                    }
                    userData = user[0];
                    console.log("userData", userData);
                    // seems redundant. Use is Untested
                    if (!user) {
                        res.status(404).json({ error: "User not found" });
                        return [2 /*return*/];
                    }
                    post = {
                        first_name: (_a = req.body.first_name) !== null && _a !== void 0 ? _a : userData.first_name,
                        last_name: (_b = req.body.last_name) !== null && _b !== void 0 ? _b : userData.last_name,
                        business_name: (_d = (_c = req.body.business_name) !== null && _c !== void 0 ? _c : userData.business_name) !== null && _d !== void 0 ? _d : null,
                        business_img: imgURL !== null && imgURL !== void 0 ? imgURL : userData.business_img,
                        country_code: (_e = req.body.country_code) !== null && _e !== void 0 ? _e : userData.country_code,
                        phone_number: (_f = req.body.phone_number) !== null && _f !== void 0 ? _f : userData.phone_number,
                        whatsapp_number: (_g = req.body.whatsapp_number) !== null && _g !== void 0 ? _g : userData.whatsapp_number,
                        state: (_h = req.body.state) !== null && _h !== void 0 ? _h : userData.state,
                        axis: (_j = req.body.axis) !== null && _j !== void 0 ? _j : userData.axis,
                        about_your_organisation: (_k = isomorphic_dompurify_1.default.sanitize(req.body.about_your_organisation)) !== null && _k !== void 0 ? _k : userData.about_your_organisation,
                        services_your_organization_provides: (_l = isomorphic_dompurify_1.default.sanitize(req.body.services_your_organization_provides)) !== null && _l !== void 0 ? _l : userData.services_your_organization_provides,
                        business_state: (_m = req.body.business_state) !== null && _m !== void 0 ? _m : userData.business_state,
                        business_axis: (_o = req.body.business_axis) !== null && _o !== void 0 ? _o : userData.business_axis,
                        business_category: (_p = req.body.business_category) !== null && _p !== void 0 ? _p : userData.business_category,
                        facebook: (_q = req.body.facebook) !== null && _q !== void 0 ? _q : userData.facebook,
                        twitter: (_r = req.body.twitter) !== null && _r !== void 0 ? _r : userData.twitter,
                        linkedin: (_s = req.body.linkedin) !== null && _s !== void 0 ? _s : userData.linkedin,
                        instagram: (_t = req.body.instagram) !== null && _t !== void 0 ? _t : userData.instagram,
                    };
                    // send post to mySQL database
                    db_1.default.execute("\n          UPDATE users\n          SET\n          first_name = ?,\n          last_name = ?,\n          business_name = ?,\n          business_img = ?,\n          country_code = ?,\n          phone_number = ?,\n          whatsapp_number = ?,\n          state = ?,\n          axis = ?,\n          about_your_organisation = ?,\n          services_your_organization_provides = ?,\n          business_state = ?,\n          business_axis = ?,\n          business_category = ?,\n          facebook = ?,\n          twitter = ?,\n          linkedin = ?,\n          instagram = ?\n          WHERE user_id = ?;\n        ", [
                        post.first_name,
                        post.last_name,
                        post.business_name,
                        post.business_img,
                        post.country_code,
                        post.phone_number,
                        post.whatsapp_number,
                        post.state,
                        post.axis,
                        post.about_your_organisation,
                        post.services_your_organization_provides,
                        post.business_state,
                        post.business_axis,
                        post.business_category,
                        post.facebook,
                        post.twitter,
                        post.linkedin,
                        post.instagram,
                        user_id,
                    ], function (err) {
                        if (err) {
                            console.error(err);
                            res.status(500).json({ error: err.message });
                            return;
                        }
                        res.status(500).json({ error: "Internal server error" });
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=update.js.map