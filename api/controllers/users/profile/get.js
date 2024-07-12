"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
var db_1 = __importDefault(require("../../../db/db"));
var getUserIdFromToken_1 = __importDefault(require("../getUserIdFromToken"));
var getProfile = function (req, res) {
    var user_id = (0, getUserIdFromToken_1.default)(req).user_id;
    console.log({ user_id: user_id });
    try {
        db_1.default.execute("  \n      SELECT user_id,\n        first_name,\n        last_name, \n        business_name, \n        img,\n        email,\n        country_code,\n        phone_number,\n        whatsapp_number, \n        state,\n        axis,\n        about_your_organisation,\n        services_your_organization_provides,  \n        business_state,\n        business_axis,\n        business_category,\n        facebook,\n        twitter,\n        linkedin,\n        instagram,\n        MONTHNAME(joined_date) AS month,\n        YEAR(joined_date) AS year\n    FROM users\n    WHERE user_id = ?;\n    ", [user_id], function (err, result) {
            if (err) {
                res
                    .status(500)
                    .json({ error: "Internal server error. Try again later" });
                return;
            }
            else if (result.length === 0) {
                console.log({ result: result });
                res.status(404).json({ message: "Profile not found" });
                return;
            }
            else {
                res.status(200).json({ profile: result });
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error. Try again later" });
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=get.js.map