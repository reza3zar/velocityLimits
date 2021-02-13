import { CustomerTransaction } from "../../models/graphTransaction_viewmodel/customerTransaction";
import * as  velocity from '../../setting/velocity/limits_config';
import { TransactionResponse } from '../../models/transaction/transactionResponse';

export class TransactionEvaluator{
  static transactionEval = (customerTransactionCollection: Array<CustomerTransaction>) :Array<TransactionResponse> => {
    let transactionResponseCollection= new Array<TransactionResponse>();

    customerTransactionCollection.forEach(customerTransactionNode => {
      const customer_id = customerTransactionNode.customer_id;
      customerTransactionNode.yearlyTransactionCollection.forEach(yearlyTransactionNode => {
        yearlyTransactionNode.monthlyTransactionCollection.forEach(monthlyTransactionNode => {
          monthlyTransactionNode.weeklyTransactionCollection.forEach(weeklyTransactionNode => {
            let sum_loads_value_Weekly = 0;
             weeklyTransactionNode.dailyTransactionCollection.forEach(dailyTransactionNode => {
              let sum_loads_value_daily = 0;
              let sum_loads_times_daily = 0;
               dailyTransactionNode.transactionCollection.forEach(transactionInfo => {
                 const transaction_value = Number(transactionInfo.load_amount.replace(/[^0-9.-]+/g, ""));
                 const transaction_id = transactionInfo.id;
                 sum_loads_times_daily++;
                 
                 let hasDuplicatedRecord = transactionResponseCollection.filter(x => x.id === transaction_id && x.customer_id === customer_id)
                 if (hasDuplicatedRecord && hasDuplicatedRecord.length > 0)
                   return;
                 
    
                 if (checkTransactionAcceptability(sum_loads_value_daily, transaction_value, sum_loads_value_Weekly, sum_loads_times_daily)) {
                   sum_loads_value_daily += transaction_value;
                   const transactionResponse  = new TransactionResponse(transaction_id, customer_id, true);
                   transactionResponseCollection.push(transactionResponse);
                 }
                else {
                  const transactionResponse  = new TransactionResponse(transaction_id, customer_id, false);
                  transactionResponseCollection.push(transactionResponse);
                 }
              });
            })
           });
         });
       });
    })
    return transactionResponseCollection;
  }
}

let checkTransactionAcceptability = (sum_loads_value_daily: number, load_amount: number, sum_loads_value_Weekly: number, sum_loads_times_daily: number)=> {
      
  const maximumLoadAcceptable_perday = velocity.limitsConfig.maximum_value_can_be_load_per_day;
  const maximumLoadAcceptable_perweek = velocity.limitsConfig.maximum_value_can_be_load_per_week;
  const maximumTimesAcceptable_perday = velocity.limitsConfig.maximum_times_loads_can_be_performed_per_day;

  return sum_loads_value_daily <= maximumLoadAcceptable_perday && (sum_loads_value_daily + load_amount) <= maximumLoadAcceptable_perday && sum_loads_value_Weekly <= maximumLoadAcceptable_perweek
    && sum_loads_value_Weekly + load_amount <= maximumLoadAcceptable_perweek
    && sum_loads_times_daily <= maximumTimesAcceptable_perday;
}
