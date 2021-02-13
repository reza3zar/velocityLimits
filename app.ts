
 
import { TransactionRequest } from './models/transaction/transactionRequest';
import * as  transactionRequestSource from './data/transactions.json';
import * as  errorMessages from './setting/transaction-error/errors';
import * as  transactionTreeHandler from './handler/graph_node/transaction/tree/customerTransactionHandler';
import * as  evals from './evaluator/transactionRequest/evaluator';

import { Validator } from './validation/validator';
import { TransactionResponse } from './models/transaction/transactionResponse';
import { CustomerTransaction } from './models/graphTransaction_viewmodel/customerTransaction';

 
let velocityLimitsEvaluator=()=> {
  try {
    let transactionRequest: Array<TransactionRequest> = transactionRequestSource;
    const isValidDataSrc = Validator.validateDataSource(transactionRequest);
  
    if (!isValidDataSrc)
      throw new Error(errorMessages.errors['input-not-found']);
  
    const customerTransactionGraphCollection: Array<CustomerTransaction> = transactionTreeHandler.CustomerTransactionHandler
      .createCustomerTransactionTree(transactionRequest);
  
    if (!customerTransactionGraphCollection || customerTransactionGraphCollection.length === 0)
      throw new Error(errorMessages.errors['transaction-request-collection-not-found']);
  
    const transactionResponseCollection: Array<TransactionResponse> =
      evals.TransactionEvaluator.transactionEval(customerTransactionGraphCollection);
  
    if (!transactionResponseCollection || transactionResponseCollection.length === 0)
      throw new Error(errorMessages.errors['transaction-response-collection-not-found']);
    
      transactionResponseCollection.forEach(trnsResponse=>console.log(trnsResponse))
  } catch (error) {
    console.error(error);
  }  
}
   
velocityLimitsEvaluator();
 


console.log('------------------------------------------END --------------------------------------------------------')

 



















 

 



