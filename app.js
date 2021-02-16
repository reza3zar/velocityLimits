"use strict";
exports.__esModule = true;
var transactionRequestSource = require("./data/transactions.json");
var errorMessages = require("./setting/transaction-error/errors");
var transactionTreeHandler = require("./handler/tree_node/transaction/tree/customerTransactionHandler");
var evals = require("./evaluator/transactionRequest/evaluator");
var validatorDataSrc_1 = require("./validation/validatorDataSrc");
var velocityLimitsEvaluator = function () {
    try {
        var transactionRequest = transactionRequestSource;
        var isValidDataSrc = validatorDataSrc_1.ValidatorDataSrc.validateDataSource(transactionRequest);
        if (!isValidDataSrc)
            throw new Error(errorMessages.errors['input-not-found']);
        var customerTransactionTreeCollection = transactionTreeHandler.CustomerTransactionHandler
            .createCustomerTransactionTree(transactionRequest);
        if (!customerTransactionTreeCollection || customerTransactionTreeCollection.length === 0)
            throw new Error(errorMessages.errors['transaction-request-collection-not-found']);
        var transactionResponseCollection = evals.TransactionEvaluator.transactionEval(customerTransactionTreeCollection);
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
