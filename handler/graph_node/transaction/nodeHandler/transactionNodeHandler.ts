import { DateTimeParts } from "../../../../models/common/dateTimeParts";
import { TransactionRequest } from "../../../../models/transaction/transactionRequest";
import * as _ from '../../../transactionHandler/transaction';
import * as node from '../inquiry/inquiryCustomerTransaction'
import { CustomerTransaction } from "../../../../models/graphTransaction_viewmodel/customerTransaction";

export class TransactionNodeHandler{
  static addCustomerTransactionNode = (transactionRequest:TransactionRequest,dateTimeParts:DateTimeParts,customerTransactionCollection:Array<CustomerTransaction>) => {
    const insertInfo = _.TransactionFunctions.createCustomerTransaction(transactionRequest,dateTimeParts);
    customerTransactionCollection.push(insertInfo);
  }
  
  static addYearCustomerTransactionNode = (transactionRequest:TransactionRequest,dateTimeParts:DateTimeParts,updateCustomerTransaction:CustomerTransaction) => {
    const insertInfo = _.TransactionFunctions.creatYearlyTransaction(transactionRequest,dateTimeParts);
    updateCustomerTransaction.yearlyTransactionCollection.push(insertInfo);
  }
  
  static addMonthCustomerTransactionNode = (transactionRequest: TransactionRequest, dateTimeParts: DateTimeParts, updateCustomerTransaction: CustomerTransaction) => {
    const insertInfo = _.TransactionFunctions.createMonthlyTransaction(transactionRequest, dateTimeParts);
    
    const yearCustomerTransactionNode =node.InquiryCustomerTransaction.getYearOfCustomerTransaction(updateCustomerTransaction, dateTimeParts);
    yearCustomerTransactionNode.monthlyTransactionCollection.push(insertInfo);
  }
  
  static addWeekCustomerTransactionNode = (transactionRequest: TransactionRequest, dateTimeParts: DateTimeParts, updateCustomerTransaction: CustomerTransaction) => {
    const insertInfo = _.TransactionFunctions.createWeeklyTransaction(transactionRequest,dateTimeParts);
    const monthCustomerTransactionNode = node.InquiryCustomerTransaction.getMonthOfCustomerTransaction(updateCustomerTransaction, dateTimeParts);
    monthCustomerTransactionNode.weeklyTransactionCollection.push(insertInfo);
  }
  
  static addDayCustomerTransactionNode = (transactionRequest: TransactionRequest, dateTimeParts: DateTimeParts, updateCustomerTransaction: CustomerTransaction) => {
    const insertInfo = _.TransactionFunctions.createDailyTransaction(transactionRequest, dateTimeParts);
    const weekCustomerTransactionNode = node.InquiryCustomerTransaction.getWeekOfCustomerTransaction(updateCustomerTransaction, dateTimeParts);
    weekCustomerTransactionNode.dailyTransactionCollection.push(insertInfo);
  }
  
  static addCustomerTransaction = (transactionRequest: TransactionRequest, dateTimeParts: DateTimeParts, updateCustomerTransaction: CustomerTransaction) => {
    const insertInfo = _.TransactionFunctions.createTransactionDetail(transactionRequest);
    const dayCustomerTransactionNode = node.InquiryCustomerTransaction.getDayOfCustomerTransaction(updateCustomerTransaction, dateTimeParts);
    dayCustomerTransactionNode.transactionCollection.push(insertInfo)
  }
}