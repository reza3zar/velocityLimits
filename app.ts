
 
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
    let transactionRequest: Array<TransactionRequest> = transactionRequestSource;
    const isValidDataSrc = ValidatorDataSrc.validateDataSource(transactionRequest);
  
    if (!isValidDataSrc)
      throw new Error(errorMessages.errors['input-not-found']);
  
    const customerTransactionTreeCollection: Array<CustomerTransaction> = transactionTreeHandler.CustomerTransactionHandler
      .createCustomerTransactionTree(transactionRequest);
  
    if (!customerTransactionTreeCollection || customerTransactionTreeCollection.length === 0)
      throw new Error(errorMessages.errors['transaction-request-collection-not-found']);
  
    const transactionResponseCollection: Array<TransactionResponse> =
      evals.TransactionEvaluator.transactionEval(customerTransactionTreeCollection);
  
    if (!transactionResponseCollection || transactionResponseCollection.length === 0)
      throw new Error(errorMessages.errors['transaction-response-collection-not-found']);
    
      transactionResponseCollection.forEach(trnsResponse=>console.log(trnsResponse))
  } catch (error) {
    console.error(error);
  }  
}
   
velocityLimitsEvaluator();
 


console.log('------------------------------------------END --------------------------------------------------------')

 



















 

 



