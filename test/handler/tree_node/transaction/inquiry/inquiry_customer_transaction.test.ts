import { InquiryCustomerTransaction } from "../../../../../handler/tree_node/transaction/inquiry/inquiryCustomerTransaction";
import { DateTimeParts } from "../../../../../models/common/dateTimeParts";
import { CustomerTransaction } from "../../../../../models/tree-transaction_viewmodel/customerTransaction";
import { DailyTransaction } from '../../../../../models/tree-transaction_viewmodel/dailyTransaction';
import { MonthlyTransaction } from '../../../../../models/tree-transaction_viewmodel/monthlyTransaction';
import { WeeklyTransaction } from "../../../../../models/tree-transaction_viewmodel/weeklyTransaction";
import { YearlyTransaction } from "../../../../../models/tree-transaction_viewmodel/yearlyTransaction";
import * as  errorMessages from '../../../../../setting/transaction-error/errors';


test("getDayOfCustomerTransaction throw exception because found nothing", () => {
  try {
    let customerTransaction = new CustomerTransaction();
    customerTransaction.yearlyTransactionCollection = new Array<YearlyTransaction>();
    let dateTimeParts =new DateTimeParts();
    dateTimeParts.day = 4;
    let yearlyTran = new YearlyTransaction();
    let monthlyTran = new MonthlyTransaction();
    let weeklyTran = new WeeklyTransaction();
    let dailyTran = new DailyTransaction();
  
    dailyTran.day = 6;
    weeklyTran.dailyTransactionCollection.push(dailyTran);
    monthlyTran.weeklyTransactionCollection.push(weeklyTran)
    yearlyTran.monthlyTransactionCollection.push(monthlyTran);
    customerTransaction.yearlyTransactionCollection.push(yearlyTran);
    expect(InquiryCustomerTransaction.getDayOfCustomerTransaction(customerTransaction, dateTimeParts)).toThrow(((new Error(errorMessages.errors["day-customer-transaction-is-not-correct-format"]))));
  } catch (error) {
      expect(error).toStrictEqual((new Error(errorMessages.errors["day-customer-transaction-is-not-correct-format"])));
  }
})

test("getDayOfCustomerTransaction throw exception because found more than one record", () => {
  try {
    let customerTransaction = new CustomerTransaction();
    customerTransaction.yearlyTransactionCollection = new Array<YearlyTransaction>();
    let dateTimeParts =new DateTimeParts();
    dateTimeParts.day = 4;
    let yearlyTran = new YearlyTransaction();
    let monthlyTran = new MonthlyTransaction();
    let weeklyTran = new WeeklyTransaction();
    let dailyTran = new DailyTransaction();
  
    dailyTran.day = 4;
    weeklyTran.dailyTransactionCollection.push(dailyTran);
    weeklyTran.dailyTransactionCollection.push(dailyTran);

    monthlyTran.weeklyTransactionCollection.push(weeklyTran)
    yearlyTran.monthlyTransactionCollection.push(monthlyTran);
    customerTransaction.yearlyTransactionCollection.push(yearlyTran);
    expect(InquiryCustomerTransaction.getDayOfCustomerTransaction(customerTransaction, dateTimeParts)).toThrow(((new Error(errorMessages.errors["day-customer-transaction-is-not-correct-format"]))));
  } catch (error) {
      expect(error).toStrictEqual((new Error(errorMessages.errors["day-customer-transaction-is-not-correct-format"])));
  }
})

test("getDayOfCustomerTransaction return a dailyTransaction", () => {
  let customerTransaction = new CustomerTransaction();
  customerTransaction.yearlyTransactionCollection = new Array<YearlyTransaction>();
  let dateTimeParts =new DateTimeParts();
  dateTimeParts.day = 4;
  let yearlyTran = new YearlyTransaction();
  let monthlyTran = new MonthlyTransaction();
  let weeklyTran = new WeeklyTransaction();
  let dailyTran = new DailyTransaction();

  dailyTran.day = 4;
  weeklyTran.dailyTransactionCollection.push(dailyTran);
  monthlyTran.weeklyTransactionCollection.push(weeklyTran)
  yearlyTran.monthlyTransactionCollection.push(monthlyTran);
  customerTransaction.yearlyTransactionCollection.push(yearlyTran);
  expect(InquiryCustomerTransaction.getDayOfCustomerTransaction(customerTransaction, dateTimeParts)).toEqual(dailyTran);
})


test("getWeekOfCustomerTransaction throw exception because found nothing", () => {
  try {
    let customerTransaction = new CustomerTransaction();
    customerTransaction.yearlyTransactionCollection = new Array<YearlyTransaction>();
  
    let dateTimeParts =new DateTimeParts();
    dateTimeParts.week = 4;
    let yearlyTran = new YearlyTransaction();
    let monthlyTran = new MonthlyTransaction();
    let weeklyTran = new WeeklyTransaction();
  
    weeklyTran.week = 5;
    monthlyTran.weeklyTransactionCollection.push(weeklyTran);
    yearlyTran.monthlyTransactionCollection.push(monthlyTran);
    customerTransaction.yearlyTransactionCollection.push(yearlyTran);
    expect(InquiryCustomerTransaction.getWeekOfCustomerTransaction(customerTransaction, dateTimeParts)).toThrow(((new Error(errorMessages.errors["week-customer-transaction-is-not-correct-format"]))));
  } catch (error) {
      expect(error).toStrictEqual((new Error(errorMessages.errors["week-customer-transaction-is-not-correct-format"])));
  }
})

test("getWeekOfCustomerTransaction throw exception because found more than one record", () => {
  try {
    let customerTransaction = new CustomerTransaction();
    customerTransaction.yearlyTransactionCollection = new Array<YearlyTransaction>();
  
    let dateTimeParts =new DateTimeParts();
    dateTimeParts.week = 4;
    let yearlyTran = new YearlyTransaction();
    let monthlyTran = new MonthlyTransaction();
    let weeklyTran = new WeeklyTransaction();
  
    weeklyTran.week = 4;
    monthlyTran.weeklyTransactionCollection.push(weeklyTran);
    monthlyTran.weeklyTransactionCollection.push(weeklyTran);
    yearlyTran.monthlyTransactionCollection.push(monthlyTran);
    customerTransaction.yearlyTransactionCollection.push(yearlyTran);
    expect(InquiryCustomerTransaction.getWeekOfCustomerTransaction(customerTransaction, dateTimeParts)).toThrow(((new Error(errorMessages.errors["week-customer-transaction-is-not-correct-format"]))));
  } catch (error) {
      expect(error).toStrictEqual((new Error(errorMessages.errors["week-customer-transaction-is-not-correct-format"])));
  }
})

test("getWeekOfCustomerTransaction return a weeklyTransaction", () => {
  let customerTransaction = new CustomerTransaction();
  customerTransaction.yearlyTransactionCollection = new Array<YearlyTransaction>();

  let dateTimeParts =new DateTimeParts();
  dateTimeParts.week = 4;
  let yearlyTran = new YearlyTransaction();
  let monthlyTran = new MonthlyTransaction();
  let weeklyTran = new WeeklyTransaction();

  weeklyTran.week = 4;
  monthlyTran.weeklyTransactionCollection.push(weeklyTran);
  yearlyTran.monthlyTransactionCollection.push(monthlyTran);
  customerTransaction.yearlyTransactionCollection.push(yearlyTran);

  expect(InquiryCustomerTransaction.getWeekOfCustomerTransaction(customerTransaction, dateTimeParts)).toEqual(weeklyTran);
})
 

test("getMonthOfCustomerTransaction throw exception because found nothing", () => {
  try {
    let customerTransaction = new CustomerTransaction();
    customerTransaction.yearlyTransactionCollection = new Array<YearlyTransaction>();
    let dateTimeParts =new DateTimeParts();
    dateTimeParts.month = 4;
    let yearlyTran = new YearlyTransaction();
    let monthlyTran = new MonthlyTransaction();
    monthlyTran.month = 5;
    customerTransaction.yearlyTransactionCollection.push(yearlyTran)
    expect(InquiryCustomerTransaction.getMonthOfCustomerTransaction(customerTransaction, dateTimeParts)).toThrow(((new Error(errorMessages.errors['month-customer-transaction-is-not-correct-format']))));
  } catch (error) {
      expect(error).toStrictEqual((new Error(errorMessages.errors['month-customer-transaction-is-not-correct-format'])));
  }
})

test("getMonthOfCustomerTransaction throw exception because found more than one record", () => {
  try {
    let customerTransaction = new CustomerTransaction();
    customerTransaction.yearlyTransactionCollection = new Array<YearlyTransaction>();
    let dateTimeParts =new DateTimeParts();
    dateTimeParts.month = 4;
    let yearlyTran = new YearlyTransaction();
    let monthlyTran = new MonthlyTransaction();
    monthlyTran.month = 4;
    yearlyTran.monthlyTransactionCollection.push(monthlyTran);
    yearlyTran.monthlyTransactionCollection.push(monthlyTran);

    customerTransaction.yearlyTransactionCollection.push(yearlyTran)
    expect(InquiryCustomerTransaction.getMonthOfCustomerTransaction(customerTransaction, dateTimeParts)).toThrow(((new Error(errorMessages.errors['month-customer-transaction-is-not-correct-format']))));
  } catch (error) {
      expect(error).toStrictEqual((new Error(errorMessages.errors['month-customer-transaction-is-not-correct-format'])));
  }
})

test("getMonthOfCustomerTransaction return a yearlyTransaction", () => {
  let customerTransaction = new CustomerTransaction();
  customerTransaction.yearlyTransactionCollection = new Array<YearlyTransaction>();
  let dateTimeParts =new DateTimeParts();
  dateTimeParts.month = 4;
  let yearlyTran = new YearlyTransaction();
  let monthlyTran = new MonthlyTransaction();
  monthlyTran.month = 4;
  yearlyTran.monthlyTransactionCollection.push(monthlyTran);
  customerTransaction.yearlyTransactionCollection.push(yearlyTran)
  expect(InquiryCustomerTransaction.getMonthOfCustomerTransaction(customerTransaction, dateTimeParts)).toEqual(monthlyTran);
})

  
test("getYearOfCustomerTransaction return a yearlyTransaction", () => {
  let customerTransaction = new CustomerTransaction();
  let dateTimeParts =new DateTimeParts();
  dateTimeParts.year = 2001;
  let yearlyTranCollection = new Array<YearlyTransaction>();
  let yearlyTran = new YearlyTransaction();
  yearlyTran.year = 2001;
  yearlyTranCollection.push(yearlyTran);
  customerTransaction.yearlyTransactionCollection = yearlyTranCollection;
  expect(InquiryCustomerTransaction.getYearOfCustomerTransaction(customerTransaction, dateTimeParts)).toEqual(yearlyTran);
})

test("getYearOfCustomerTransaction throw exception because found more than one record", () => {
  try {
    let customerTransaction = new CustomerTransaction();
    let dateTimeParts =new DateTimeParts();
    dateTimeParts.year = 2001;
    let yearlyTranCollection = new Array<YearlyTransaction>();
    let yearlyTran = new YearlyTransaction();
    yearlyTran.year = 2001;
    yearlyTranCollection.push(yearlyTran);
    yearlyTranCollection.push(yearlyTran);
    customerTransaction.yearlyTransactionCollection = yearlyTranCollection;
    expect(InquiryCustomerTransaction.getYearOfCustomerTransaction(customerTransaction, dateTimeParts)).toThrow(((new Error(errorMessages.errors['year-customer-transaction-is-not-correct-format']))));
  } catch (error) {
      expect(error).toStrictEqual((new Error(errorMessages.errors['year-customer-transaction-is-not-correct-format'])));
  }
})

test("getYearOfCustomerTransaction throw exception because found nothing", () => {
  try {
    let customerTransaction = new CustomerTransaction();
    let dateTimeParts =new DateTimeParts();
    dateTimeParts.year = 2001;
    let yearlyTranCollection = new Array<YearlyTransaction>();
    let yearlyTran = new YearlyTransaction();
    yearlyTran.year = 2001;
    customerTransaction.yearlyTransactionCollection = yearlyTranCollection;
    expect(InquiryCustomerTransaction.getYearOfCustomerTransaction(customerTransaction, dateTimeParts)).toThrow(((new Error(errorMessages.errors['year-customer-transaction-is-not-correct-format']))));
  } catch (error) {
      expect(error).toStrictEqual((new Error(errorMessages.errors['year-customer-transaction-is-not-correct-format'])));
  }
})

test("getCustomerYearlyTransacion return an array of yearlyTransaction", () => {
  let customerTransaction = new CustomerTransaction();
  let yearlyTranCollection = new Array<YearlyTransaction>();
  let yearlyTran = new YearlyTransaction();
  yearlyTran.year = 2001;
  yearlyTranCollection.push(yearlyTran);
  customerTransaction.yearlyTransactionCollection = yearlyTranCollection;
  const year = 2001;
  expect(InquiryCustomerTransaction.getCustomerYearlyTransacion(customerTransaction, year)).toEqual(yearlyTranCollection)
});