import { DateTimeParts } from "../../models/common/dateTimeParts";
 
import { Transaction } from "../../models/transaction/transaction";
import { TransactionRequest } from '../../models/transaction/transactionRequest';
import { CustomerTransaction } from '../../models/tree-transaction_viewmodel/customerTransaction';
import { DailyTransaction } from "../../models/tree-Transaction_viewmodel/dailyTransaction";
import { MonthlyTransaction } from "../../models/tree-Transaction_viewmodel/monthlyTransaction";
import { WeeklyTransaction } from "../../models/tree-Transaction_viewmodel/weeklyTransaction";
import { YearlyTransaction } from "../../models/tree-Transaction_viewmodel/yearlyTransaction";

export class TransactionFunctions{

  //** This function map a TransactionRequest to a Transaction */
  static setTransactionDetail = (TransactionRequest: TransactionRequest): Transaction => {
    let transaction = new Transaction();

    transaction.id = TransactionRequest.id;
    transaction.load_amount = TransactionRequest.load_amount;
    transaction.time = TransactionRequest.time;
    
    return transaction;
  }
  //** This function map a TransactionRequest plus specific day to a  DailyTransaction */
  static setDailyTransaction=(day: number, transaction: Transaction): DailyTransaction=>{
  let transactionDay = new DailyTransaction();

  transactionDay.day = day;
  transactionDay.transactionCollection.push(transaction);

  return transactionDay;
  }
  //** This function map a DailyTransaction plus specific week to a  WeeklyTransaction */
  static setWeeklyTransaction =(week: number, transactionDay: DailyTransaction): WeeklyTransaction=>{
  let transactionWeek = new WeeklyTransaction();

  transactionWeek.week = week;
  transactionWeek.dailyTransactionCollection.push(transactionDay);

  return transactionWeek;
  }

  //** This function map a WeeklyTransaction plus specific month to a MonthlyTransaction */
  static setMonthlyTransaction= (month: number, transactionWeek: WeeklyTransaction): MonthlyTransaction=>{
  let transactionMonth = new MonthlyTransaction();

  transactionMonth.month = month;
  transactionMonth.weeklyTransactionCollection.push(transactionWeek);

  return transactionMonth;
  }
  //** This function map a MonthlyTransaction plus specific year to a YearlyTransaction */

  static setYearlyTransaction =(year: number, transactionMonth: MonthlyTransaction): YearlyTransaction=>{
  let transactionYear = new YearlyTransaction();

  transactionYear.year =year;
  transactionYear.monthlyTransactionCollection.push(transactionMonth);

  return transactionYear;
  }
  //** This function map a YearlyTransaction plus specific customer_id to a CustomerTransaction */

  static setCustomerTransaction=(customer_id: string,transactionYear: YearlyTransaction): CustomerTransaction=>{

  let customerTransaction = new CustomerTransaction();

  customerTransaction.customer_id = customer_id;
  customerTransaction.yearlyTransactionCollection.push(transactionYear);

  return customerTransaction;
  }
  //** This function create a CustomerTransaction */
  static createCustomerTransaction=(transactionRequest:TransactionRequest,dateParts:DateTimeParts) :CustomerTransaction=> {
  
    const yearlyTransactionDetail = TransactionFunctions.creatYearlyTransaction(transactionRequest,dateParts);
    const customerTransaction = TransactionFunctions.setCustomerTransaction(transactionRequest.customer_id, yearlyTransactionDetail);
    return customerTransaction;
  }
  //** This function create a YearlyTransaction */
  
  static creatYearlyTransaction=(transactionRequest: TransactionRequest,dateParts:DateTimeParts): YearlyTransaction => {
  
    const monthlyTransactionDetail = TransactionFunctions.createMonthlyTransaction(transactionRequest,dateParts)
    const yearlyTransactionDetail = TransactionFunctions.setYearlyTransaction(dateParts.year, monthlyTransactionDetail);
    return yearlyTransactionDetail;
  }
  //** This function create a MonthlyTransaction */
  
  static createMonthlyTransaction=(transactionRequest: TransactionRequest,dateParts:DateTimeParts):MonthlyTransaction => {
    const weeklyTransactionDetail = TransactionFunctions.createWeeklyTransaction(transactionRequest,dateParts);
    const monthlyTransactionDetail = TransactionFunctions.setMonthlyTransaction(dateParts.month, weeklyTransactionDetail);
    return monthlyTransactionDetail;
  }
  //** This function create a WeeklyTransaction */
  
  static createWeeklyTransaction=(transactionRequest: TransactionRequest,dateParts:DateTimeParts):WeeklyTransaction=> {
    const dailyTransactionDetail =  TransactionFunctions.createDailyTransaction(transactionRequest,dateParts)
    const weeklyTransactionDetail = TransactionFunctions.setWeeklyTransaction(dateParts.week, dailyTransactionDetail);
    return weeklyTransactionDetail;
  }
  //** This function create a DailyTransaction */
  
  static createDailyTransaction =(transactionRequest: TransactionRequest,dateParts:DateTimeParts):DailyTransaction =>{
    const transactionDetail = TransactionFunctions.createTransactionDetail(transactionRequest);
    const dailyTransactionDetail = TransactionFunctions.setDailyTransaction(dateParts.day, transactionDetail);
    return dailyTransactionDetail;
  }
  //** This function create a Transaction */
  
  static createTransactionDetail = (transactionRequest: TransactionRequest):Transaction =>{
    const transactionDetail = TransactionFunctions.setTransactionDetail(transactionRequest);
    return transactionDetail;
  }
}
