import { DateTimeParts } from "../../../../models/common/dateTimeParts";
import { CustomerTransaction } from "../../../../models/tree-transaction_viewmodel/customerTransaction";
import { DailyTransaction } from "../../../../models/tree-transaction_viewmodel/dailyTransaction";
import { MonthlyTransaction } from "../../../../models/tree-transaction_viewmodel/monthlyTransaction";
import { WeeklyTransaction } from "../../../../models/tree-transaction_viewmodel/weeklyTransaction";
import { YearlyTransaction } from "../../../../models/tree-transaction_viewmodel/yearlyTransaction";
import * as  errorMessages from '../../../../setting/transaction-error/errors';

export class InquiryCustomerTransaction{
  static getYearOfCustomerTransaction=(customerTransaction: CustomerTransaction, dateTimeParts: DateTimeParts) :YearlyTransaction=>  {
    const yearCustomerTransaction = customerTransaction.yearlyTransactionCollection.filter(x => x.year === dateTimeParts.year);
    if (!yearCustomerTransaction || yearCustomerTransaction.length !== 1)
      throw new Error(errorMessages.errors['year-customer-transaction-is-not-correct-format']);
    return yearCustomerTransaction[0];
  }
  
  static getMonthOfCustomerTransaction=(customerTransaction: CustomerTransaction, dateTimeParts: DateTimeParts) :MonthlyTransaction=>  {
    const yearCustomerTransaction = InquiryCustomerTransaction.getYearOfCustomerTransaction(customerTransaction, dateTimeParts);
   
    const monthCustomerTransaction = yearCustomerTransaction.monthlyTransactionCollection.filter(x => x.month === dateTimeParts.month);
    if (!monthCustomerTransaction || monthCustomerTransaction.length !== 1)
      throw new Error(errorMessages.errors['month-customer-transaction-is-not-correct-format']);
    
    return monthCustomerTransaction[0];
  }
  
  static getWeekOfCustomerTransaction=(customerTransaction: CustomerTransaction, dateTimeParts: DateTimeParts) :WeeklyTransaction=>  {
    const monthCustomerTransaction = InquiryCustomerTransaction.getMonthOfCustomerTransaction(customerTransaction, dateTimeParts);
    const weekCustomerTransaction = monthCustomerTransaction.weeklyTransactionCollection.filter(x => x.week === dateTimeParts.week);
    if (!weekCustomerTransaction || weekCustomerTransaction.length !== 1)
      throw new Error(errorMessages.errors['month-customer-transaction-is-not-correct-format']);
    
    return weekCustomerTransaction[0];
  }
  
  static getDayOfCustomerTransaction = (customerTransaction: CustomerTransaction, dateTimeParts: DateTimeParts):DailyTransaction => {
    const weekCustomerTransaction = InquiryCustomerTransaction.getWeekOfCustomerTransaction(customerTransaction, dateTimeParts);
    const dayCustomerTransaction = weekCustomerTransaction.dailyTransactionCollection.filter(x => x.day === dateTimeParts.day);
  
    if (!dayCustomerTransaction || dayCustomerTransaction.length !== 1)
    throw new Error(errorMessages.errors['day-customer-transaction-is-not-correct-format']);
  
  return dayCustomerTransaction[0];
}
  
static getCustomerYearlyTransacion = (customerTransaction: CustomerTransaction, year: number): Array<YearlyTransaction> => {
    return customerTransaction.yearlyTransactionCollection.filter(x => x.year === year);
  }
}