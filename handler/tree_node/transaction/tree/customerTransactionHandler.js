"use strict";
exports.__esModule = true;
exports.CustomerTransactionHandler = void 0;
var nodeInquiry = require("../../../tree_node/transaction/inquiry/inquiryCustomerTransaction");
var nodeManagement = require("../../../tree_node/transaction/nodeHandler/TransactionNodeHandler");
var dateTimeUtility_1 = require("../../../../utility/dateTimeUtility");
var transactin_nodevalidator_1 = require("../../../../validation/transactin_nodevalidator");
var CustomerTransactionHandler = /** @class */ (function () {
    function CustomerTransactionHandler() {
    }
    CustomerTransactionHandler.createCustomerTransactionTree = function (transactionRequest) {
        var customerTransactionCollection = new Array();
        transactionRequest.forEach(function (transactionRequest) {
            var dateTimeParts = dateTimeUtility_1.DateTimeUtility.getDateTimeParts(transactionRequest.time);
            var findCustomerTransaction = customerTransactionCollection.filter(function (x) { return x.customer_id === transactionRequest.customer_id; });
            var updateCustomerTransaction = findCustomerTransaction[0];
            if (!findCustomerTransaction || findCustomerTransaction.length == 0)
                nodeManagement.TransactionNodeHandler.addCustomerTransactionNode(transactionRequest, dateTimeParts, customerTransactionCollection);
            else if (!transactin_nodevalidator_1.TransactinNodeValidator.checkCustomerTransactionHasThisYear(nodeInquiry.InquiryCustomerTransaction.getCustomerYearlyTransacion(updateCustomerTransaction, dateTimeParts.year), transactionRequest.customer_id, updateCustomerTransaction))
                nodeManagement.TransactionNodeHandler.addYearCustomerTransactionNode(transactionRequest, dateTimeParts, updateCustomerTransaction);
            else if (!transactin_nodevalidator_1.TransactinNodeValidator.checkCustomerTransactionHasThisMonth(nodeInquiry.InquiryCustomerTransaction.getYearOfCustomerTransaction(updateCustomerTransaction, dateTimeParts), transactionRequest.customer_id, dateTimeParts, updateCustomerTransaction))
                nodeManagement.TransactionNodeHandler.addMonthCustomerTransactionNode(transactionRequest, dateTimeParts, updateCustomerTransaction);
            else if (!transactin_nodevalidator_1.TransactinNodeValidator.checkCustomerTransactionHasThisWeek(nodeInquiry.InquiryCustomerTransaction.getMonthOfCustomerTransaction(updateCustomerTransaction, dateTimeParts), dateTimeParts))
                nodeManagement.TransactionNodeHandler.addWeekCustomerTransactionNode(transactionRequest, dateTimeParts, updateCustomerTransaction);
            else if (!transactin_nodevalidator_1.TransactinNodeValidator.checkCustomerTransactionHasThisDay(nodeInquiry.InquiryCustomerTransaction.getWeekOfCustomerTransaction(updateCustomerTransaction, dateTimeParts), dateTimeParts))
                nodeManagement.TransactionNodeHandler.addDayCustomerTransactionNode(transactionRequest, dateTimeParts, updateCustomerTransaction);
            else
                nodeManagement.TransactionNodeHandler.addCustomerTransaction(transactionRequest, dateTimeParts, updateCustomerTransaction);
        });
        return customerTransactionCollection;
    };
    return CustomerTransactionHandler;
}());
exports.CustomerTransactionHandler = CustomerTransactionHandler;
