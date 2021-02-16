
 
import { TransactionRequest } from './models/transaction/transactionRequest';
import * as  transactionRequestSource from './data/transactions.json';
import * as  errorMessages from './setting/transaction-error/errors';
import * as  transactionTreeHandler from './handler/tree_node/transaction/tree/customerTransactionHandler';
import * as  evals from './evaluator/transactionRequest/evaluator';

import { ValidatorDataSrc } from './validation/validatorDataSrc';
import { TransactionResponse } from './models/transaction/transactionResponse';
import { CustomerTransaction } from './models/tree-transaction_viewmodel/customerTransaction';

 
let velocityLimitsEvaluator=()=> {
  try {

    // Load input file from data folder. 
    let transactionRequest: Array<TransactionRequest> = transactionRequestSource;
    // Check input file has value
    const isValidDataSrc = ValidatorDataSrc.validateDataSource(transactionRequest);
    // If input file does not have any data, throw exception data not found.
    if (!isValidDataSrc)
      throw new Error(errorMessages.errors['input-not-found']);
    // Convert input file (transactions) to CustomerTransaction model 
    // CustomerTransaction is a tree for specific customer than it contains all cusomer's transactions.
    const customerTransactionTreeCollection: Array<CustomerTransaction> = transactionTreeHandler.CustomerTransactionHandler
      .createCustomerTransactionTree(transactionRequest);
  
    // Check customerTransactionTreeCollection has any value, if it doesn't throw exception
    if (!customerTransactionTreeCollection || customerTransactionTreeCollection.length === 0)
      throw new Error(errorMessages.errors['transaction-request-collection-not-found']);
  
    /* Evaluator is a core that should check customerTransaction
    per customer that can be accepted or not base velocity limits (velocityLimits are in setting folder)*/
    const transactionResponseCollection: Array<TransactionResponse> =
      evals.TransactionEvaluator.transactionEval(customerTransactionTreeCollection);
  
    // check transactionResponse has any value, if it doesn't throw exception
    if (!transactionResponseCollection || transactionResponseCollection.length === 0)
      throw new Error(errorMessages.errors['transaction-response-collection-not-found']);
    // print transactionResponse (output) in console.    
      transactionResponseCollection.forEach(trnsResponse=>console.log(trnsResponse))
  } catch (error) {
    console.error(error);
  }  
}


console.log('------------------------------------------START --------------------------------------------------------')

velocityLimitsEvaluator();
 


console.log('------------------------------------------END --------------------------------------------------------')

 



















 

 



