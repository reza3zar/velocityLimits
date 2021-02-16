"use strict";
exports.__esModule = true;
var transactionRequestSource = require("./data/transactions.json");
var errorMessages = require("./setting/transaction-error/errors");
var transactionTreeHandler = require("./handler/tree_node/transaction/tree/customerTransactionHandler");
var evals = require("./evaluator/transactionRequest/evaluator");
var validatorDataSrc_1 = require("./validation/validatorDataSrc");
var velocityLimitsEvaluator = function () {
    try {
        // Load input file from data folder. 
        var transactionRequest = transactionRequestSource;
        // Check input file has value
        var isValidDataSrc = validatorDataSrc_1.ValidatorDataSrc.validateDataSource(transactionRequest);
        // If input file does not have any data, throw exception data not found.
        if (!isValidDataSrc)
            throw new Error(errorMessages.errors['input-not-found']);
        // Convert input file (transactions) to CustomerTransaction model 
        // CustomerTransaction is a tree for specific customer than it contains all cusomer's transactions.
        var customerTransactionTreeCollection = transactionTreeHandler.CustomerTransactionHandler
            .createCustomerTransactionTree(transactionRequest);
        // Check customerTransactionTreeCollection has any value, if it doesn't throw exception
        if (!customerTransactionTreeCollection || customerTransactionTreeCollection.length === 0)
            throw new Error(errorMessages.errors['transaction-request-collection-not-found']);
        /* Evaluator is a core that should check customerTransaction
        per customer that can be accepted or not base velocity limits (velocityLimits are in setting folder)*/
        var transactionResponseCollection = evals.TransactionEvaluator.transactionEval(customerTransactionTreeCollection);
        // check transactionResponse has any value, if it doesn't throw exception
        if (!transactionResponseCollection || transactionResponseCollection.length === 0)
            throw new Error(errorMessages.errors['transaction-response-collection-not-found']);
        // print transactionResponse (output) in console.    
        transactionResponseCollection.forEach(function (trnsResponse) { return console.log(trnsResponse); });
    }
    catch (error) {
        console.error(error);
    }
};
console.log('------------------------------------------START --------------------------------------------------------');
velocityLimitsEvaluator();
console.log('------------------------------------------END --------------------------------------------------------');
