"use strict";
exports.__esModule = true;
exports.Validator = void 0;
var Validator = /** @class */ (function () {
    function Validator() {
    }
    Validator.validateDataSource = function (dataSource) {
        if (dataSource && dataSource.length > 0)
            return true;
        return false;
    };
    return Validator;
}());
exports.Validator = Validator;
