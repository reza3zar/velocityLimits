import { DateTimeParts } from '../models/common/dateTimeParts';
import { CustomerTransaction } from '../models/graphTransaction_viewmodel/customerTransaction';
import { YearlyTransaction } from '../models/graphTransaction_viewmodel/yearlyTransaction';
import * as  errorMessages from '../setting/transaction-error/errors';
import { MonthlyTransaction } from '../models/graphTransaction_viewmodel/monthlyTransaction';
import { WeeklyTransaction } from '../models/graphTransaction_viewmodel/weeklyTransaction';

export class TransactinNodeValidator {


static checkCustomerofTransactionIsMatch = (customerTransaction: CustomerTransaction, customerId: string): boolean => {
  return customerTransaction.customer_id === customerId;
}

static checkCustomerTransactionIsMatched=(customerTransaction: CustomerTransaction, customerId: string)=> {
const customerIsMatched = TransactinNodeValidator.checkCustomerofTransactionIsMatch(customerTransaction, customerId);
if (!customerIsMatched)
  throw new Error(errorMessages.errors['customer-transaction-not-matched']);
}

static checkCustomerTransactionHasThisYear=(customerYearlyTransaction: Array<YearlyTransaction>,customerId: string, dateTimeParts: DateTimeParts, customerTransaction: CustomerTransaction): boolean=>{
  TransactinNodeValidator.checkCustomerTransactionIsMatched(customerTransaction, customerId);

 
if (customerYearlyTransaction && customerYearlyTransaction.length > 1) {
  throw new Error(errorMessages.errors['more-than-one-record-yearly-transaction-not-allowed']);
}
if (customerYearlyTransaction && customerYearlyTransaction.length === 1)
   return true;
return false;
}

static checkCustomerTransactionHasThisMonth=(yearCustomerTransaction:YearlyTransaction,customerId: string,dateTimeParts: DateTimeParts, customerTransaction: CustomerTransaction): boolean=>{
  TransactinNodeValidator.checkCustomerTransactionIsMatched(customerTransaction, customerId);
const monthCustomerTransaction = yearCustomerTransaction.monthlyTransactionCollection.filter(x => x.month === dateTimeParts.month);
if (monthCustomerTransaction && monthCustomerTransaction.length > 1) {
  throw new Error(errorMessages.errors['more-than-one-record-montly-transaction-not-allowed']);
}
if (monthCustomerTransaction && monthCustomerTransaction.length ===1)
  return true;
return false;
}

static checkCustomerTransactionHasThisWeek=(monthCustomerTransaction:MonthlyTransaction,dateTimeParts:DateTimeParts, customerTransaction: CustomerTransaction): boolean=>{
 
const weekCustomerTransaction = monthCustomerTransaction.weeklyTransactionCollection.filter(x => x.week === dateTimeParts.week);
if (weekCustomerTransaction && weekCustomerTransaction.length > 1) {
  throw new Error(errorMessages.errors['more-than-one-record-weekly-transaction-not-allowed']);
}
if (weekCustomerTransaction && weekCustomerTransaction.length ===1)
  return true;
return false;
}

static checkCustomerTransactionHasThisDay=(weekCustomerTransaction:WeeklyTransaction,dateTimeParts:DateTimeParts, customerTransaction: CustomerTransaction): boolean=>{
// getYearOfCustomerTransaction(customerTransaction, dateTimeParts);
 
const dayCustomerTransaction = weekCustomerTransaction.dailyTransactionCollection.filter(x => x.day === dateTimeParts.day);

if (dayCustomerTransaction && dayCustomerTransaction.length > 1) {
  throw new Error(errorMessages.errors['more-than-one-record-daily-transaction-not-allowed']);
}

if (dayCustomerTransaction && dayCustomerTransaction.length === 1)
  return true;
return false;
}
}
