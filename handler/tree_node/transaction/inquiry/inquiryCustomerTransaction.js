"use strict";
exports.__esModule = true;
exports.InquiryCustomerTransaction = void 0;
var errorMessages = require("../../../../setting/transaction-error/errors");
var InquiryCustomerTransaction = /** @class */ (function () {
    function InquiryCustomerTransaction() {
    }
    InquiryCustomerTransaction.getYearOfCustomerTransaction = function (customerTransaction, dateTimeParts) {
        var yearCustomerTransaction = customerTransaction.yearlyTransactionCollection.filter(function (x) { return x.year === dateTimeParts.year; });
        if (!yearCustomerTransaction || yearCustomerTransaction.length !== 1)
            throw new Error(errorMessages.errors['year-customer-transaction-is-not-correct-format']);
        return yearCustomerTransaction[0];
    };
    InquiryCustomerTransaction.getMonthOfCustomerTransaction = function (customerTransaction, dateTimeParts) {
        var yearCustomerTransaction = InquiryCustomerTransaction.getYearOfCustomerTransaction(customerTransaction, dateTimeParts);
        var monthCustomerTransaction = yearCustomerTransaction.monthlyTransactionCollection.filter(function (x) { return x.month === dateTimeParts.month; });
        if (!monthCustomerTransaction || monthCustomerTransaction.length !== 1)
            throw new Error(errorMessages.errors['month-customer-transaction-is-not-correct-format']);
        return monthCustomerTransaction[0];
    };
    InquiryCustomerTransaction.getWeekOfCustomerTransaction = function (customerTransaction, dateTimeParts) {
        var monthCustomerTransaction = InquiryCustomerTransaction.getMonthOfCustomerTransaction(customerTransaction, dateTimeParts);
        var weekCustomerTransaction = monthCustomerTransaction.weeklyTransactionCollection.filter(function (x) { return x.week === dateTimeParts.week; });
        if (!weekCustomerTransaction || weekCustomerTransaction.length !== 1)
            throw new Error(errorMessages.errors['month-customer-transaction-is-not-correct-format']);
        return weekCustomerTransaction[0];
    };
    InquiryCustomerTransaction.getDayOfCustomerTransaction = function (customerTransaction, dateTimeParts) {
        var weekCustomerTransaction = InquiryCustomerTransaction.getWeekOfCustomerTransaction(customerTransaction, dateTimeParts);
        var dayCustomerTransaction = weekCustomerTransaction.dailyTransactionCollection.filter(function (x) { return x.day === dateTimeParts.day; });
        if (!dayCustomerTransaction || dayCustomerTransaction.length !== 1)
            throw new Error(errorMessages.errors['day-customer-transaction-is-not-correct-format']);
        return dayCustomerTransaction[0];
    };
    InquiryCustomerTransaction.getCustomerYearlyTransacion = function (customerTransaction, year) {
        return customerTransaction.yearlyTransactionCollection.filter(function (x) { return x.year === year; });
    };
    return InquiryCustomerTransaction;
}());
exports.InquiryCustomerTransaction = InquiryCustomerTransaction;
