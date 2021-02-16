import * as  velocity from '../../../setting/velocity/limits_config';
import { TransactionResponse } from '../../../models/transaction/transactionResponse';
import { TransactionEvaluator } from '../../../evaluator/transactionRequest/evaluator';
import * as  transactionTreeHandler from '../../../handler/tree_node/transaction/tree/customerTransactionHandler';
import { TransactionRequest } from '../../../models/transaction/transactionRequest';

test("checkTransactionAcceptability should return true ", () => {
  let sum_loads_value_daily = velocity.limitsConfig.maximum_load_amount_per_day-10;
  let load_amount = velocity.limitsConfig.maximum_load_amount_per_day-sum_loads_value_daily;
  let sum_loads_value_Weekly = velocity.limitsConfig.maximum_load_amount_per_week-(load_amount+sum_loads_value_daily);
  let sum_loads_times_daily = velocity.limitsConfig.maximum_times_loads_can_be_performed_per_day-1;
  expect(TransactionEvaluator.checkTransactionAcceptability(sum_loads_value_daily, load_amount, sum_loads_value_Weekly, sum_loads_times_daily)).toBe(true)
});
 

test("checkTransactionAcceptability should return false sum daily is not allowed senario 1", () => {
  let sum_loads_value_daily = velocity.limitsConfig.maximum_load_amount_per_day-10;
  let load_amount = velocity.limitsConfig.maximum_load_amount_per_day-sum_loads_value_daily+11;
  let sum_loads_value_Weekly = velocity.limitsConfig.maximum_load_amount_per_week-(load_amount+sum_loads_value_daily);
  let sum_loads_times_daily = velocity.limitsConfig.maximum_times_loads_can_be_performed_per_day-1;
  expect(TransactionEvaluator.checkTransactionAcceptability(sum_loads_value_daily, load_amount, sum_loads_value_Weekly, sum_loads_times_daily)).toBe(false)
});

test("checkTransactionAcceptability should return false sum daily is not allowed senario 2", () => {
  let sum_loads_value_daily = velocity.limitsConfig.maximum_load_amount_per_day-10;
  let load_amount = velocity.limitsConfig.maximum_load_amount_per_day-sum_loads_value_daily;
  let sum_loads_value_Weekly = velocity.limitsConfig.maximum_load_amount_per_week+1;
  let sum_loads_times_daily = velocity.limitsConfig.maximum_times_loads_can_be_performed_per_day-1;
  expect(TransactionEvaluator.checkTransactionAcceptability(sum_loads_value_daily, load_amount, sum_loads_value_Weekly, sum_loads_times_daily)).toBe(false)
});

test("checkTransactionAcceptability should return false sum daily is not allowed senario 3", () => {
  let sum_loads_value_daily = velocity.limitsConfig.maximum_load_amount_per_day-10;
  let load_amount = velocity.limitsConfig.maximum_load_amount_per_day-sum_loads_value_daily;
  let sum_loads_value_Weekly = velocity.limitsConfig.maximum_load_amount_per_week-(load_amount+sum_loads_value_daily);
  let sum_loads_times_daily = velocity.limitsConfig.maximum_times_loads_can_be_performed_per_day+1;
  expect(TransactionEvaluator.checkTransactionAcceptability(sum_loads_value_daily, load_amount, sum_loads_value_Weekly, sum_loads_times_daily)).toBe(false)
});


test("transactionEval should all transaction be accepted ", () => {

  let arrayTransactionRequest = new Array<TransactionRequest>();
  let transactionRequest01 = new TransactionRequest();
  transactionRequest01.customer_id = "1234";
  transactionRequest01.id = "1010";
  transactionRequest01.load_amount = (velocity.limitsConfig.maximum_load_amount_per_day-1).toString();
  transactionRequest01.time="2000-01-01T04:06:28Z";
  arrayTransactionRequest.push(transactionRequest01);

  let transactionRequest02 = new TransactionRequest();
  transactionRequest02.customer_id = "1234";
  transactionRequest02.id = "1011";
  transactionRequest02.load_amount = (velocity.limitsConfig.maximum_load_amount_per_day-1).toString();
  transactionRequest02.time = "2000-01-02T04:06:28Z";
  arrayTransactionRequest.push(transactionRequest02);
  
  let customerTransactionCollection = transactionTreeHandler.CustomerTransactionHandler.createCustomerTransactionTree(arrayTransactionRequest);

  let transactionResponseCollection = new Array<TransactionResponse>();
  let transactionResponse = new TransactionResponse(transactionRequest01.id, transactionRequest01.customer_id, true);
  let transactionResponseSecond = new TransactionResponse(transactionRequest02.id, transactionRequest02.customer_id, true);
  transactionResponseCollection.push(transactionResponse);
  transactionResponseCollection.push(transactionResponseSecond);

  expect(TransactionEvaluator.transactionEval(customerTransactionCollection)).toEqual(transactionResponseCollection)
});


test("transactionEval should all transaction be accepted and remove all duplicate except the first one", () => {
  let arrayTransactionRequest = new Array<TransactionRequest>();
  let transactionRequest01 = new TransactionRequest();
  transactionRequest01.customer_id = "1234";
  transactionRequest01.id = "1010";
  transactionRequest01.load_amount = (velocity.limitsConfig.maximum_load_amount_per_day-1).toString();
  transactionRequest01.time="2000-01-01T04:06:28Z";
  arrayTransactionRequest.push(transactionRequest01);

  let transactionRequest02 = new TransactionRequest();
  transactionRequest02.customer_id = transactionRequest01.customer_id;
  transactionRequest02.id = transactionRequest01.id;
  transactionRequest02.load_amount = (velocity.limitsConfig.maximum_load_amount_per_day-1).toString();
  transactionRequest02.time = "2000-01-02T04:06:28Z";
  arrayTransactionRequest.push(transactionRequest02);
  
  let customerTransactionCollection = transactionTreeHandler.CustomerTransactionHandler.createCustomerTransactionTree(arrayTransactionRequest);

  let transactionResponseCollection = new Array<TransactionResponse>();
  let transactionResponse = new TransactionResponse(transactionRequest01.id, transactionRequest01.customer_id, true);
  transactionResponseCollection.push(transactionResponse);

  expect(TransactionEvaluator.transactionEval(customerTransactionCollection)).toEqual(transactionResponseCollection)
});



test("transactionEval should reject maximum number of load amount per day for specefic customer ", () => {

  let arrayTransactionRequest = new Array<TransactionRequest>();

  for (let index = 1; index <= velocity.limitsConfig.maximum_times_loads_can_be_performed_per_day+1; index++) {
    let transactionRequest = new TransactionRequest();
    transactionRequest.customer_id = "1234";
    transactionRequest.id = index.toString();
    transactionRequest.load_amount = "1";
    transactionRequest.time="2000-01-01T04:06:28Z";
    arrayTransactionRequest.push(transactionRequest);
  }
 
  
  let customerTransactionCollection = transactionTreeHandler.CustomerTransactionHandler.createCustomerTransactionTree(arrayTransactionRequest);

  let transactionResponseCollection = new Array<TransactionResponse>();
 
 for (let index = 1; index <= velocity.limitsConfig.maximum_times_loads_can_be_performed_per_day+1; index++) {
   let transactionResponse=new TransactionResponse(index.toString(),"1234",index!==velocity.limitsConfig.maximum_times_loads_can_be_performed_per_day+1)
   transactionResponseCollection.push(transactionResponse)
 }

  expect(TransactionEvaluator.transactionEval(customerTransactionCollection)).toEqual(transactionResponseCollection)
});