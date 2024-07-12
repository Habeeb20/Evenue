"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countByCategory = void 0;
var db_1 = __importDefault(require("../../db/db"));
var countByCategory = function (req, res) {
    try {
        db_1.default.execute("\n      SELECT \n    SUM(category = 'meetings') AS total_meetings,\n    SUM(category = 'training') AS total_training,\n    SUM(category = 'cooperation') AS total_cooperation,\n    SUM(category = 'party') AS total_party,\n    SUM(category = 'engagement') AS total_engagement\nFROM \n    events;\n                ", function (err, result) {
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