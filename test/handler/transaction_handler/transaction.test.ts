import { TransactionFunctions } from '../../../handler/transactionHandler/transaction';
import { TransactionRequest } from '../../../models/transaction/transactionRequest';
import { Transaction } from '../../../models/transaction/transaction';
import { DailyTransaction } from '../../../models/tree-transaction_viewmodel/dailyTransaction';
import { WeeklyTransaction } from '../../../models/tree-transaction_viewmodel/weeklyTransaction';
import { MonthlyTransaction } from '../../../models/tree-transaction_viewmodel/monthlyTransaction';
import { YearlyTransaction } from '../../../models/tree-transaction_viewmodel/yearlyTransaction';
import { CustomerTransaction } from '../../../models/tree-transaction_viewmodel/customerTransaction';


test("setTransactionDetail should return a transaction", () => {
  let transactionRequest = new TransactionRequest();
  transactionRequest.id = "123";
  transactionRequest.load_amount = "2000";
  transactionRequest.time = "2000-01-01T04:05:28Z";
  let transaction=new Transaction();
  transaction.id = transactionRequest.id;
  transaction.load_amount = transactionRequest.load_amount;
  transaction.time = transactionRequest.time;
  expect(TransactionFunctions.setTransactionDetail(transactionRequest)).toEqual(transaction)
})

test("setDailyTransaction should return a daily transaction obj", () => {
  let transactionDay = new DailyTransaction();
  let transaction=new Transaction();
  const day = 5;
  transactionDay.day = day;
  transactionDay.transactionCollection.push(transaction);
  expect(TransactionFunctions.setDailyTransaction(day,transaction)).toEqual(transactionDay)
})

test("setWeeklyTransaction should return a weekly transaction obj", () => {
  let transactionWeek = new WeeklyTransaction();
  let transactionDay = new DailyTransaction();

  const week = 4;
  transactionWeek.week = week;
  transactionWeek.dailyTransactionCollection.push(transactionDay);
  expect(TransactionFunctions.setWeeklyTransaction(week,transactionDay)).toEqual(transactionWeek)
})


test("setMonthlyTransaction should return a month transaction obj", () => {
  let transactionMonth = new MonthlyTransaction();
  let transactionWeek = new WeeklyTransaction();

  const month = 4;
  transactionMonth.month = month;
  transactionMonth.weeklyTransactionCollection.push(transactionWeek);
  expect(TransactionFunctions.setMonthlyTransaction(month,transactionWeek)).toEqual(transactionMonth)
})

test("setYearlyTransaction should return a year transaction obj", () => {
  let transactionYear = new YearlyTransaction();
  let transactionMonth = new MonthlyTransaction();

  const year = 2000;
  transactionYear.year = year;
  transactionYear.monthlyTransactionCollection.push(transactionMonth);
  expect(TransactionFunctions.setYearlyTransaction(year,transactionMonth)).toEqual(transactionYear)
})

test("setCustomerTransaction should return a customerTransaction obj", () => {
  let customerTransaction = new CustomerTransaction();
  let transactionYear = new YearlyTransaction();
  const customer_id = "2000";
  customerTransaction.customer_id = customer_id;
  customerTransaction.yearlyTransactionCollection.push(transactionYear);
  expect(TransactionFunctions.setCustomerTransaction(customer_id,transactionYear)).toEqual(customerTransaction)
})

 
 