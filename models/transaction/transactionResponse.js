"use strict";
exports.__esModule = true;
exports.TransactionResponse = void 0;
var TransactionResponse = /** @class */ (function () {
    function TransactionResponse(transaction_id, customer_id, accepted) {
        this.id = transaction_id;
        this.customer_id = customer_id;
        this.accepted = accepted;
    }
    return TransactionResponse;
}());
exports.TransactionResponse = TransactionResponse;
