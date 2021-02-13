"use strict";
exports.__esModule = true;
var transactionRequestSource = require("./data/transactions.json");
var errorMessages = require("./setting/transaction-error/errors");
var transactionTreeHandler = require("./handler/graph_node/transaction/tree/customerTransactionHandler");
var evals = require("./evaluator/transactionRequest/evaluator");
var validator_1 = require("./validation/validator");
var velocityLimitsEvaluator = function () {
    try {
        var transactionRequest = transactionRequestSource;
        var isValidDataSrc = validator_1.Validator.validateDataSource(transactionRequest);
        if (!isValidDataSrc)
            throw new Error(errorMessages.errors['input-not-found']);
        var customerTransactionGraphCollection = transactionTreeHandler.CustomerTransactionHandler
            .createCustomerTransactionTree(transactionRequest);
        if (!customerTransactionGraphCollection || customerTransactionGraphCollection.length === 0)
            throw new Error(errorMessages.errors['transaction-request-collection-not-found']);
        var transactionResponseCollection = evals.TransactionEvaluator.transactionEval(customerTransactionGraphCollection);
        if (!transactionResponseCollection || transactionResponseCollection.length === 0)
            throw new Error(errorMessages.errors['transaction-response-collection-not-found']);
        transactionResponseCollection.forEach(function (trnsResponse) { return console.log(trnsResponse); });
    }
    catch (error) {
        console.error(error);
    }
};
velocityLimitsEvaluator();
console.log('------------------------------------------END --------------------------------------------------------');
