import { TransactinNodeValidator } from '../validation/transactin_nodevalidator';
import { WeeklyTransaction } from '../models/tree-transaction_viewmodel/weeklyTransaction';
import { DateTimeParts } from '../models/common/dateTimeParts';
import { DailyTransaction } from '../models/tree-transaction_viewmodel/dailyTransaction';
import * as  errorMessages from '../setting/transaction-error/errors';
import { MonthlyTransaction } from '../models/tree-transaction_viewmodel/monthlyTransaction';
import { YearlyTransaction } from '../models/tree-transaction_viewmodel/yearlyTransaction';
import { CustomerTransaction } from '../models/tree-transaction_viewmodel/customerTransaction';

 

test("checkCustomerTransactionHasThisDay should return false", () => {
  const weekCustomerTransaction = new WeeklyTransaction();
  let dateTimeParts = new DateTimeParts();
  dateTimeParts.day = 3;
  expect(TransactinNodeValidator.checkCustomerTransactionHasThisDay(weekCustomerTransaction, dateTimeParts)).toBe(false);
});

test("checkCustomerTransactionHasThisDay should return true", () => {
  let weekCustomerTransaction = new WeeklyTransaction();
  let firstDayWeek = new DailyTransaction();
  firstDayWeek.day = 1;
  weekCustomerTransaction.dailyTransactionCollection.push(firstDayWeek);
  let dateTimeParts = new DateTimeParts();
  dateTimeParts.day = 1;
  expect(TransactinNodeValidator.checkCustomerTransactionHasThisDay(weekCustomerTransaction,dateTimeParts)).toBe(true);
})

test("checkCustomerTransactionHasThisDay should throw error more than one day find", () => {
  
try {
   
  let weekCustomerTransaction = new WeeklyTransaction();
  let firstDayWeek = new DailyTransaction();
  firstDayWeek.day = 1;
  weekCustomerTransaction.dailyTransactionCollection.push(firstDayWeek);
  weekCustomerTransaction.dailyTransactionCollection.push(firstDayWeek);
  let dateTimeParts = new DateTimeParts();
  dateTimeParts.day = 1;
  expect(TransactinNodeValidator.checkCustomerTransactionHasThisDay(weekCustomerTransaction, dateTimeParts)).toThrow(new Error(errorMessages.errors['more-than-one-record-daily-transaction-not-allowed']));
 
} catch (error) {
  expect(error).toStrictEqual((new Error(errorMessages.errors['more-than-one-record-daily-transaction-not-allowed'])));
}
   
})


 

test("checkCustomerTransactionHasThisWeek should return false", () => {
  const monthCustomerTransaction = new MonthlyTransaction();
  let dateTimeParts = new DateTimeParts();
  dateTimeParts.week = 3;
  expect(TransactinNodeValidator.checkCustomerTransactionHasThisWeek(monthCustomerTransaction, dateTimeParts)).toBe(false);
});
  
test("checkCustomerTransactionHasThisWeek should return true", () => {
  let monthCustomerTransaction = new MonthlyTransaction();
  let weekCustomerTransaction = new WeeklyTransaction();
  weekCustomerTransaction.week = 3;
  monthCustomerTransaction.weeklyTransactionCollection.push(weekCustomerTransaction);
  let dateTimeParts = new DateTimeParts();
  dateTimeParts.week = 3;
  expect(TransactinNodeValidator.checkCustomerTransactionHasThisWeek(monthCustomerTransaction,dateTimeParts)).toBe(true);
})

test("checkCustomerTransactionHasThisWeek should throw error more than one week find", () => {
  
  try {
    let monthCustomerTransaction = new MonthlyTransaction();
    let weekCustomerTransaction = new WeeklyTransaction();
    weekCustomerTransaction.week = 3;
    monthCustomerTransaction.weeklyTransactionCollection.push(weekCustomerTransaction);
    monthCustomerTransaction.weeklyTransactionCollection.push(weekCustomerTransaction);

    let dateTimeParts = new DateTimeParts();
    dateTimeParts.week = 3;
    expect(TransactinNodeValidator.checkCustomerTransactionHasThisWeek(monthCustomerTransaction, dateTimeParts)).toThrow(new Error(errorMessages.errors['more-than-one-record-weekly-transaction-not-allowed']));
   
  } catch (error) {
    expect(error).toStrictEqual((new Error(errorMessages.errors['more-than-one-record-weekly-transaction-not-allowed'])));
  }
     
})
  
 

test("checkCustomerTransactionHasThisMonth should return false", () => {
  const yearCustomerTransaction = new YearlyTransaction();
  let customerTransaction = new CustomerTransaction();
  customerTransaction.customer_id = "1212";
  const customer_id = "1212";
  let dateTimeParts = new DateTimeParts();
  dateTimeParts.month = 3;
  expect(TransactinNodeValidator.checkCustomerTransactionHasThisMonth(yearCustomerTransaction,customer_id,dateTimeParts,customerTransaction)).toBe(false);
});

test("checkCustomerTransactionHasThisMonth should return true", () => {
  let yearCustomerTransaction = new YearlyTransaction();
  let monthCustomerTransaction = new MonthlyTransaction();
  monthCustomerTransaction.month = 3;
  yearCustomerTransaction.monthlyTransactionCollection.push(monthCustomerTransaction);
  let customerTransaction = new CustomerTransaction();
  customerTransaction.customer_id = "1212";
  const customer_id = "1212";
  let dateTimeParts = new DateTimeParts();
  dateTimeParts.month = 3;
  expect(TransactinNodeValidator.checkCustomerTransactionHasThisMonth(yearCustomerTransaction,customer_id,dateTimeParts,customerTransaction)).toBe(true);
});

test("checkCustomerTransactionHasThisMonth should throw error more than one month find", () => {
try {
  let yearCustomerTransaction = new YearlyTransaction();
  let monthCustomerTransaction = new MonthlyTransaction();
  monthCustomerTransaction.month = 3;
  yearCustomerTransaction.monthlyTransactionCollection.push(monthCustomerTransaction);
  yearCustomerTransaction.monthlyTransactionCollection.push(monthCustomerTransaction);

  let customerTransaction = new CustomerTransaction();
  customerTransaction.customer_id = "1212";
  const customer_id = "1212";
  let dateTimeParts = new DateTimeParts();
  dateTimeParts.month = 3;
  
  expect(TransactinNodeValidator.checkCustomerTransactionHasThisMonth(yearCustomerTransaction,customer_id, dateTimeParts,customerTransaction)).toThrow(new Error( errorMessages.errors['more-than-one-record-montly-transaction-not-allowed']));
   
} catch (error) {
  expect(error).toStrictEqual((new Error(errorMessages.errors['more-than-one-record-montly-transaction-not-allowed'])));
}
});

 

test("checkCustomerTransactionHasThisYear should return false", () => {
  let customerYearlyTransaction = new Array<YearlyTransaction>();
  let customerTransaction = new CustomerTransaction();
  customerTransaction.customer_id = "2020";
  let customerId = "2020";
  expect(TransactinNodeValidator.checkCustomerTransactionHasThisYear(customerYearlyTransaction,customerId,customerTransaction)).toBe(false);
});

test("checkCustomerTransactionHasThisYear should return true", () => {
  let customerYearlyTransaction = new Array<YearlyTransaction>();
  customerYearlyTransaction.push(new YearlyTransaction());
  let customerTransaction = new CustomerTransaction();
  customerTransaction.customer_id = "2020";
  let customerId = "2020";
  expect(TransactinNodeValidator.checkCustomerTransactionHasThisYear(customerYearlyTransaction,customerId,customerTransaction)).toBe(true);
});

test("checkCustomerTransactionHasThisYear should throw error more than one year find", () => {
  try {
    let customerYearlyTransaction = new Array<YearlyTransaction>();
    customerYearlyTransaction.push(new YearlyTransaction());
    customerYearlyTransaction.push(new YearlyTransaction());
    let customerTransaction = new CustomerTransaction();
    customerTransaction.customer_id = "2020";
    let customerId = "2020";
    expect(TransactinNodeValidator.checkCustomerTransactionHasThisYear(customerYearlyTransaction,customerId,customerTransaction)).toThrow(new Error( errorMessages.errors['more-than-one-record-yearly-transaction-not-allowed']));
  } catch (error) {
    expect(error).toStrictEqual((new Error( errorMessages.errors['more-than-one-record-yearly-transaction-not-allowed'])));
  }
});
  


test("checkCustomerTransactionIsMatched should return true", () => {
  let customerTransaction = new CustomerTransaction();
  customerTransaction.customer_id = "2020";
  let customerId = "2020";
  expect(TransactinNodeValidator.checkCustomerTransactionIsMatched(customerTransaction,customerId)).toBe(true);
});

test("checkCustomerTransactionIsMatched customer transaction does not match", () => {
  try {
    let customerYearlyTransaction = new Array<YearlyTransaction>();
    customerYearlyTransaction.push(new YearlyTransaction());
    customerYearlyTransaction.push(new YearlyTransaction());
    let customerTransaction = new CustomerTransaction();
    customerTransaction.customer_id = "2021";
    let customerId = "2020";
    expect(TransactinNodeValidator.checkCustomerTransactionHasThisYear(customerYearlyTransaction,customerId,customerTransaction)).toThrow(new Error( errorMessages.errors['customer-transaction-not-matched']));
  } catch (error) {
    expect(error).toStrictEqual((new Error( errorMessages.errors['customer-transaction-not-matched'])));
  }
});


test("checkCustomerTransactionIsMatched argument parameter throw error", () => {
try {
  let customerTransaction = new CustomerTransaction();
  let customerId : string="";
  expect(TransactinNodeValidator.checkCustomerTransactionIsMatched(customerTransaction,customerId)).toThrow(new Error( errorMessages.errors['argument-parameters-are-empty-or-null']));

} catch (error) {
  expect(error).toStrictEqual((new Error( errorMessages.errors['argument-parameters-are-empty-or-null'])));
}
});
  