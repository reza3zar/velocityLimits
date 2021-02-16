"use strict";
exports.__esModule = true;
exports.ValidatorDataSrc = void 0;
var ValidatorDataSrc = /** @class */ (function () {
    function ValidatorDataSrc() {
    }
    ValidatorDataSrc.validateDataSource = function (dataSource) {
        if (dataSource && dataSource.length > 0)
            return true;
        return false;
    };
    return ValidatorDataSrc;
}());
exports.ValidatorDataSrc = ValidatorDataSrc;
