"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.TransactionRequest = void 0;
var transaction_1 = require("./transaction");
var TransactionRequest = /** @class */ (function (_super) {
    __extends(TransactionRequest, _super);
    function TransactionRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TransactionRequest;
}(transaction_1.Transaction));
exports.TransactionRequest = TransactionRequest;
