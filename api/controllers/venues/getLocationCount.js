"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationCount = void 0;
var db_1 = __importDefault(require("../../db/db"));
var getLocationCount = function (req, res) {
    try {
        // check if the Venue exists in the database. Avoid race condition
        db_1.default.execute("\n      SELECT\nSUM(location LIKE '%lagos%') AS lagos,\nSUM(location LIKE '%ogun%') AS ogun,\nSUM(location LIKE '%kano%') AS kano,\nSUM(location LIKE '%abia%') AS abia,\nSUM(location LIKE '%abuja%') AS abuja,\nSUM(location LIKE '%rivers%') AS rivers\nFROM venues;\n                ", function (err, result) {
            if (err) {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
                return;
            }
            else if (result.length === 0) {
                res.status(404).json({ error: "Venue not found" });
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
exports.getLocationCount = getLocationCount;
//# sourceMappingURL=getLocationCount.js.map