"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
var db_1 = __importDefault(require("../../db/db"));
var jwt_1 = require("../../middleware/jwt/jwt");
var setToken_1 = require("../../middleware/jwt/setToken");
var bcryptUtils_1 = require("../../middleware/bcrypt/bcryptUtils");
var checkLength_1 = require("../../middleware/inputs/checkLength");
var login = function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (!email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    // Validate the length of the inputs
    var validationFields = [
        { name: "email", maxLength: 60 },
        { name: "password", maxLength: 100 },
    ];
    var validationErrors = (0, checkLength_1.validateInputLength)({ email: email, password: password }, validationFields);
    if (validationErrors.length > 0) {
        return res
            .status(400)
            .json({ error: "Input(s) too long", fields: validationErrors });
    }
    try {
        // Retrieve hashed password from the database based on the provided email
        db_1.default.execute("SELECT email, password, user_id FROM users WHERE email = ?", [email], function (err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Internal server error" });
            }
            if (result.constructor === Array && result.length === 0) {
                return res.status(401).json({ error: "Invalid email or password" });
            }
            var storedHash = result[0].password;
            // Compare the entered password with the stored hash
            (0, bcryptUtils_1.comparePassword)(password, storedHash).then(function (isMatch) {
                if (!isMatch) {
                    return res.status(401).json({ error: "Invalid email or password" });
                }
                // Passwords match, generate a JWT token and send it in the response
                var userId = result[0].user_id;
                var token = (0, jwt_1.jwtGenerateToken)(userId);
                // Set the token in a cookie
                (0, setToken_1.setToken)(req, res, token);
                res.status(200).json({ message: "Login successful", token: token });
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.login = login;
//# sourceMappingURL=login.js.map