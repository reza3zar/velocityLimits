"use strict";
exports.__esModule = true;
exports.TransactionNodeHandler = void 0;
var _ = require("../../../transactionHandler/transaction");
var node = require("../inquiry/inquiryCustomerTransaction");
var TransactionNodeHandler = /** @class */ (function () {
    function TransactionNodeHandler() {
    }
    TransactionNodeHandler.addCustomerTransactionNode = function (transactionRequest, dateTimeParts, customerTransactionCollection) {
        var insertInfo = _.TransactionFunctions.createCustomerTransaction(transactionRequest, dateTimeParts);
        customerTransactionCollection.push(insertInfo);
    };
    TransactionNodeHandler.addYearCustomerTransactionNode = function (transactionRequest, dateTimeParts, updateCustomerTransaction) {
        var insertInfo = _.TransactionFunctions.creatYearlyTransaction(transactionRequest, dateTimeParts);
        updateCustomerTransaction.yearlyTransactionCollection.push(insertInfo);
    };
    TransactionNodeHandler.addMonthCustomerTransactionNode = function (transactionRequest, dateTimeParts, updateCustomerTransaction) {
        var insertInfo = _.TransactionFunctions.createMonthlyTransaction(transactionRequest, dateTimeParts);
        var yearCustomerTransactionNode = node.InquiryCustomerTransaction.getYearOfCustomerTransaction(updateCustomerTransaction, dateTimeParts);
        yearCustomerTransactionNode.monthlyTransactionCollection.push(insertInfo);
    };
    TransactionNodeHandler.addWeekCustomerTransactionNode = function (transactionRequest, dateTimeParts, updateCustomerTransaction) {
        var insertInfo = _.TransactionFunctions.createWeeklyTransaction(transactionRequest, dateTimeParts);
        var monthCustomerTransactionNode = node.InquiryCustomerTransaction.getMonthOfCustomerTransaction(updateCustomerTransaction, dateTimeParts);
        monthCustomerTransactionNode.weeklyTransactionCollection.push(insertInfo);
    };
    TransactionNodeHandler.addDayCustomerTransactionNode = function (transactionRequest, dateTimeParts, updateCustomerTransaction) {
        var insertInfo = _.TransactionFunctions.createDailyTransaction(transactionRequest, dateTimeParts);
        var weekCustomerTransactionNode = node.InquiryCustomerTransaction.getWeekOfCustomerTransaction(updateCustomerTransaction, dateTimeParts);
        weekCustomerTransactionNode.dailyTransactionCollection.push(insertInfo);
    };
    TransactionNodeHandler.addCustomerTransaction = function (transactionRequest, dateTimeParts, updateCustomerTransaction) {
        var insertInfo = _.TransactionFunctions.createTransactionDetail(transactionRequest);
        var dayCustomerTransactionNode = node.InquiryCustomerTransaction.getDayOfCustomerTransaction(updateCustomerTransaction, dateTimeParts);
        dayCustomerTransactionNode.transactionCollection.push(insertInfo);
    };
    return TransactionNodeHandler;
}());
exports.TransactionNodeHandler = TransactionNodeHandler;
