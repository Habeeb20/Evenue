"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countByCategory = void 0;
var db_1 = __importDefault(require("../../db/db"));
var countByCategory = function (req, res) {
    try {
        db_1.default.execute("\n      SELECT \n    SUM(category = 'designers') AS total_designers,\n    SUM(category = 'make_up_artise') AS total_make_up_artise,\n    SUM(category = 'Photographer/Videographer') AS total_photo_video_makers\nFROM \n    event_services;\n                ", function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "Designers not found" });
                return;
            }
            else {
                console.log(result);
                res.status(200).json({ result: result });
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.countByCategory = countByCategory;
//# sourceMappingURL=countByCategory.js.map