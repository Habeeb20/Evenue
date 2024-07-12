"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputLength = void 0;
var validateInputLength = function (fields, validationFields) {
    var errors = [];
    validationFields.forEach(function (field) {
        if (fields[field.name] && fields[field.name].length > field.maxLength) {
            errors.push(field.name);
        }
    });
    return errors;
};
exports.validateInputLength = validateInputLength;
//# sourceMappingURL=checkLength.js.map