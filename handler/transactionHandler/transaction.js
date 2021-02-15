"use strict";
exports.__esModule = true;
exports.TransactionFunctions = void 0;
var transaction_1 = require("../../models/transaction/transaction");
var customerTransaction_1 = require("../../models/tree-transaction_viewmodel/customerTransaction");
var dailyTransaction_1 = require("../../models/tree-Transaction_viewmodel/dailyTransaction");
var monthlyTransaction_1 = require("../../models/tree-Transaction_viewmodel/monthlyTransaction");
var weeklyTransaction_1 = require("../../models/tree-Transaction_viewmodel/weeklyTransaction");
var yearlyTransaction_1 = require("../../models/tree-Transaction_viewmodel/yearlyTransaction");
var TransactionFunctions = /** @class */ (function () {
    function TransactionFunctions() {
    }
    TransactionFunctions.setTransactionDetail = function (TransactionRequest) {
        var transaction = new transaction_1.Transaction();
        transaction.id = TransactionRequest.id;
        transaction.load_amount = TransactionRequest.load_amount;
        transaction.time = TransactionRequest.time;
        return transaction;
    };
    TransactionFunctions.setDailyTransaction = function (day, transaction) {
        var transactionDay = new dailyTransaction_1.DailyTransaction();
        transactionDay.day = day;
        transactionDay.transactionCollection.push(transaction);
        return transactionDay;
    };
    TransactionFunctions.setWeeklyTransaction = function (week, transactionDay) {
        var transactionWeek = new weeklyTransaction_1.WeeklyTransaction();
        transactionWeek.week = week;
        transactionWeek.dailyTransactionCollection.push(transactionDay);
        return transactionWeek;
    };
    TransactionFunctions.setMonthlyTransaction = function (month, transactionWeek) {
        var transactionMonth = new monthlyTransaction_1.MonthlyTransaction();
        transactionMonth.month = month;
        transactionMonth.weeklyTransactionCollection.push(transactionWeek);
        return transactionMonth;
    };
    TransactionFunctions.setYearlyTransaction = function (year, transactionMonth) {
        var transactionYear = new yearlyTransaction_1.YearlyTransaction();
        transactionYear.year = year;
        transactionYear.monthlyTransactionCollection.push(transactionMonth);
        return transactionYear;
    };
    TransactionFunctions.setCustomerTransaction = function (customer_id, transactionYear) {
        var customerTransaction = new customerTransaction_1.CustomerTransaction();
        customerTransaction.customer_id = customer_id;
        customerTransaction.yearlyTransactionCollection.push(transactionYear);
        return customerTransaction;
    };
    TransactionFunctions.createCustomerTransaction = function (transactionRequest, dateParts) {
        var yearlyTransactionDetail = TransactionFunctions.creatYearlyTransaction(transactionRequest, dateParts);
        var customerTransaction = TransactionFunctions.setCustomerTransaction(transactionRequest.customer_id, yearlyTransactionDetail);
        return customerTransaction;
    };
    TransactionFunctions.creatYearlyTransaction = function (transactionRequest, dateParts) {
        var monthlyTransactionDetail = TransactionFunctions.createMonthlyTransaction(transactionRequest, dateParts);
        var yearlyTransactionDetail = TransactionFunctions.setYearlyTransaction(dateParts.year, monthlyTransactionDetail);
        return yearlyTransactionDetail;
    };
    TransactionFunctions.createMonthlyTransaction = function (transactionRequest, dateParts) {
        var weeklyTransactionDetail = TransactionFunctions.createWeeklyTransaction(transactionRequest, dateParts);
        var monthlyTransactionDetail = TransactionFunctions.setMonthlyTransaction(dateParts.month, weeklyTransactionDetail);
        return monthlyTransactionDetail;
    };
    TransactionFunctions.createWeeklyTransaction = function (transactionRequest, dateParts) {
        var dailyTransactionDetail = TransactionFunctions.createDailyTransaction(transactionRequest, dateParts);
        var weeklyTransactionDetail = TransactionFunctions.setWeeklyTransaction(dateParts.week, dailyTransactionDetail);
        return weeklyTransactionDetail;
    };
    TransactionFunctions.createDailyTransaction = function (transactionRequest, dateParts) {
        var transactionDetail = TransactionFunctions.createTransactionDetail(transactionRequest);
        var dailyTransactionDetail = TransactionFunctions.setDailyTransaction(dateParts.day, transactionDetail);
        return dailyTransactionDetail;
    };
    TransactionFunctions.createTransactionDetail = function (transactionRequest) {
        var transactionDetail = TransactionFunctions.setTransactionDetail(transactionRequest);
        return transactionDetail;
    };
    return TransactionFunctions;
}());
exports.TransactionFunctions = TransactionFunctions;
