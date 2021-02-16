"use strict";
exports.__esModule = true;
exports.TransactionEvaluator = void 0;
var velocity = require("../../setting/velocity/limits_config");
var transactionResponse_1 = require("../../models/transaction/transactionResponse");
var TransactionEvaluator = /** @class */ (function () {
    function TransactionEvaluator() {
    }
    TransactionEvaluator.transactionEval = function (customerTransactionCollection) {
        var transactionResponseCollection = new Array();
        customerTransactionCollection.forEach(function (customerTransactionNode) {
            var customer_id = customerTransactionNode.customer_id;
            customerTransactionNode.yearlyTransactionCollection.forEach(function (yearlyTransactionNode) {
                yearlyTransactionNode.monthlyTransactionCollection.forEach(function (monthlyTransactionNode) {
                    monthlyTransactionNode.weeklyTransactionCollection.forEach(function (weeklyTransactionNode) {
                        var sum_loads_value_Weekly = 0;
                        weeklyTransactionNode.dailyTransactionCollection.forEach(function (dailyTransactionNode) {
                            var sum_loads_value_daily = 0;
                            var sum_loads_times_daily = 0;
                            dailyTransactionNode.transactionCollection.forEach(function (transactionInfo) {
                                var transaction_value = Number(transactionInfo.load_amount.replace(/[^0-9.-]+/g, ""));
                                var transaction_id = transactionInfo.id;
                                sum_loads_times_daily++;
                                var hasDuplicatedRecord = transactionResponseCollection.filter(function (x) { return x.id === transaction_id && x.customer_id === customer_id; });
                                if (hasDuplicatedRecord && hasDuplicatedRecord.length > 0)
                                    return;
                                if (TransactionEvaluator.checkTransactionAcceptability(sum_loads_value_daily, transaction_value, sum_loads_value_Weekly, sum_loads_times_daily)) {
                                    sum_loads_value_daily += transaction_value;
                                    var transactionResponse = new transactionResponse_1.TransactionResponse(transaction_id, customer_id, true);
                                    transactionResponseCollection.push(transactionResponse);
                                }
                                else {
                                    var transactionResponse = new transactionResponse_1.TransactionResponse(transaction_id, customer_id, false);
                                    transactionResponseCollection.push(transactionResponse);
                                }
                            });
                        });
                    });
                });
            });
        });
        return transactionResponseCollection;
    };
    TransactionEvaluator.checkTransactionAcceptability = function (sum_loads_value_daily, load_amount, sum_loads_value_Weekly, sum_loads_times_daily) {
        var maximumLoadAcceptable_perday = velocity.limitsConfig.maximum_load_amount_per_day;
        var maximumLoadAcceptable_perweek = velocity.limitsConfig.maximum_load_amount_per_week;
        var maximumTimesAcceptable_perday = velocity.limitsConfig.maximum_times_loads_can_be_performed_per_day;
        return sum_loads_value_daily <= maximumLoadAcceptable_perday && (sum_loads_value_daily + load_amount) <= maximumLoadAcceptable_perday && sum_loads_value_Weekly <= maximumLoadAcceptable_perweek
            && sum_loads_value_Weekly + load_amount <= maximumLoadAcceptable_perweek
            && sum_loads_times_daily <= maximumTimesAcceptable_perday;
    };
    return TransactionEvaluator;
}());
exports.TransactionEvaluator = TransactionEvaluator;
