"use strict";
exports.__esModule = true;
exports.TransactinNodeValidator = void 0;
var errorMessages = require("../setting/transaction-error/errors");
var TransactinNodeValidator = /** @class */ (function () {
    function TransactinNodeValidator() {
    }
    TransactinNodeValidator.checkCustomerofTransactionIsMatch = function (customerTransaction, customerId) {
        return customerTransaction.customer_id === customerId;
    };
    TransactinNodeValidator.checkCustomerTransactionIsMatched = function (customerTransaction, customerId) {
        var customerIsMatched = TransactinNodeValidator.checkCustomerofTransactionIsMatch(customerTransaction, customerId);
        if (!customerIsMatched)
            throw new Error(errorMessages.errors['customer-transaction-not-matched']);
    };
    TransactinNodeValidator.checkCustomerTransactionHasThisYear = function (customerYearlyTransaction, customerId, dateTimeParts, customerTransaction) {
        TransactinNodeValidator.checkCustomerTransactionIsMatched(customerTransaction, customerId);
        if (customerYearlyTransaction && customerYearlyTransaction.length > 1) {
            throw new Error(errorMessages.errors['more-than-one-record-yearly-transaction-not-allowed']);
        }
        if (customerYearlyTransaction && customerYearlyTransaction.length === 1)
            return true;
        return false;
    };
    TransactinNodeValidator.checkCustomerTransactionHasThisMonth = function (yearCustomerTransaction, customerId, dateTimeParts, customerTransaction) {
        TransactinNodeValidator.checkCustomerTransactionIsMatched(customerTransaction, customerId);
        var monthCustomerTransaction = yearCustomerTransaction.monthlyTransactionCollection.filter(function (x) { return x.month === dateTimeParts.month; });
        if (monthCustomerTransaction && monthCustomerTransaction.length > 1) {
            throw new Error(errorMessages.errors['more-than-one-record-montly-transaction-not-allowed']);
        }
        if (monthCustomerTransaction && monthCustomerTransaction.length === 1)
            return true;
        return false;
    };
    TransactinNodeValidator.checkCustomerTransactionHasThisWeek = function (monthCustomerTransaction, dateTimeParts, customerTransaction) {
        var weekCustomerTransaction = monthCustomerTransaction.weeklyTransactionCollection.filter(function (x) { return x.week === dateTimeParts.week; });
        if (weekCustomerTransaction && weekCustomerTransaction.length > 1) {
            throw new Error(errorMessages.errors['more-than-one-record-weekly-transaction-not-allowed']);
        }
        if (weekCustomerTransaction && weekCustomerTransaction.length === 1)
            return true;
        return false;
    };
    TransactinNodeValidator.checkCustomerTransactionHasThisDay = function (weekCustomerTransaction, dateTimeParts, customerTransaction) {
        // getYearOfCustomerTransaction(customerTransaction, dateTimeParts);
        var dayCustomerTransaction = weekCustomerTransaction.dailyTransactionCollection.filter(function (x) { return x.day === dateTimeParts.day; });
        if (dayCustomerTransaction && dayCustomerTransaction.length > 1) {
            throw new Error(errorMessages.errors['more-than-one-record-daily-transaction-not-allowed']);
        }
        if (dayCustomerTransaction && dayCustomerTransaction.length === 1)
            return true;
        return false;
    };
    return TransactinNodeValidator;
}());
exports.TransactinNodeValidator = TransactinNodeValidator;
