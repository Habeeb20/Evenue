"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
var upload_1 = require("../../controllers/venues/upload");
var getAll_1 = require("../../controllers/venues/getAll");
var search_1 = require("../../controllers/venues/search");
var getVenue_1 = require("../../controllers/venues/getVenue");
var getLocationCount_1 = require("../../controllers/venues/getLocationCount");
var getCategoryCount_1 = require("../../controllers/venues/getCategoryCount");
router.post("/", upload_1.uploadVenue);
router.post("/getAll", getAll_1.getAll);
router.get("/search", search_1.search);
router.get("/:venue_id", getVenue_1.getVenue);
router.get("/loc/getLocationCount", getLocationCount_1.getLocationCount);
router.get("/catc/getCategoryCount", getCategoryCount_1.getCategoryCount);
exports.default = router;
//# sourceMappingURL=venues.js.map