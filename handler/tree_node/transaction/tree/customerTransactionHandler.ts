import * as nodeInquiry from '../../../tree_node/transaction/inquiry/inquiryCustomerTransaction'
import * as nodeManagement from '../../../tree_node/transaction/nodeHandler/TransactionNodeHandler'
import { DateTimeUtility } from '../../../../utility/dateTimeUtility';
import { TransactinNodeValidator } from '../../../../validation/transactin_nodevalidator';
import { CustomerTransaction } from '../../../../models/tree-transaction_viewmodel/customerTransaction';
import { TransactionRequest } from '../../../../models/transaction/transactionRequest';

export class CustomerTransactionHandler{

  static createCustomerTransactionTree = (transactionRequest: Array<TransactionRequest>): Array<CustomerTransaction> => {
    let customerTransactionCollection : Array<CustomerTransaction>=new Array<CustomerTransaction>();
    
    transactionRequest.forEach(transactionRequest => {

      const dateTimeParts = DateTimeUtility.getDateTimeParts(transactionRequest.time);
      const findCustomerTransaction = customerTransactionCollection.filter(x => x.customer_id === transactionRequest.customer_id);
      const updateCustomerTransaction = findCustomerTransaction[0];
    
      if (!findCustomerTransaction || findCustomerTransaction.length == 0)
      nodeManagement.TransactionNodeHandler.addCustomerTransactionNode(transactionRequest, dateTimeParts,customerTransactionCollection);
    
      else if (!TransactinNodeValidator.checkCustomerTransactionHasThisYear(nodeInquiry.InquiryCustomerTransaction.getCustomerYearlyTransacion(updateCustomerTransaction,dateTimeParts.year),transactionRequest.customer_id, updateCustomerTransaction))
      nodeManagement.TransactionNodeHandler.addYearCustomerTransactionNode(transactionRequest, dateTimeParts, updateCustomerTransaction);
     
      else if (!TransactinNodeValidator.checkCustomerTransactionHasThisMonth(nodeInquiry.InquiryCustomerTransaction.getYearOfCustomerTransaction(updateCustomerTransaction,dateTimeParts),transactionRequest.customer_id, dateTimeParts, updateCustomerTransaction))
      nodeManagement.TransactionNodeHandler.addMonthCustomerTransactionNode(transactionRequest, dateTimeParts, updateCustomerTransaction);
        
      else if (!TransactinNodeValidator.checkCustomerTransactionHasThisWeek(nodeInquiry.InquiryCustomerTransaction.getMonthOfCustomerTransaction(updateCustomerTransaction,dateTimeParts),dateTimeParts))
      nodeManagement.TransactionNodeHandler.addWeekCustomerTransactionNode(transactionRequest, dateTimeParts, updateCustomerTransaction);
      
      else if (!TransactinNodeValidator.checkCustomerTransactionHasThisDay(nodeInquiry.InquiryCustomerTransaction.getWeekOfCustomerTransaction(updateCustomerTransaction,dateTimeParts),dateTimeParts))
      nodeManagement.TransactionNodeHandler.addDayCustomerTransactionNode(transactionRequest, dateTimeParts, updateCustomerTransaction);
      else
      nodeManagement.TransactionNodeHandler.addCustomerTransaction(transactionRequest, dateTimeParts, updateCustomerTransaction);
    })

    return customerTransactionCollection;
  }
}