import { DateTimeParts } from "../../../../../models/common/dateTimeParts";
import { TransactionRequest } from "../../../../../models/transaction/transactionRequest";
import * as _ from '../../../../../handler/transactionHandler/transaction';
import { CustomerTransaction } from "../../../../../models/tree-transaction_viewmodel/customerTransaction";
import { YearlyTransaction } from '../../../../../models/tree-transaction_viewmodel/yearlyTransaction';
import { MonthlyTransaction } from '../../../../../models/tree-transaction_viewmodel/monthlyTransaction';
import { WeeklyTransaction } from '../../../../../models/tree-transaction_viewmodel/weeklyTransaction';
import { DailyTransaction } from '../../../../../models/tree-transaction_viewmodel/dailyTransaction';
import { TransactionNodeHandler } from "../../../../../handler/tree_node/transaction/nodeHandler/TransactionNodeHandler";

 

test("addCustomerTransaction should add a customer transaction", () => {
  let transactionRequest = new TransactionRequest();
  let dateTimeParts = new DateTimeParts();
  dateTimeParts.day = 4;
  let updateCustomerTransaction = new CustomerTransaction();
  updateCustomerTransaction.yearlyTransactionCollection = new Array<YearlyTransaction>();
  let yearlyTransaction = new YearlyTransaction();
  let monthlyTransaction = new MonthlyTransaction();
  let weeklyTransaction = new WeeklyTransaction();
  let dailyTransaction = new DailyTransaction();
  dailyTransaction.day = 4;

  yearlyTransaction.monthlyTransactionCollection.push(monthlyTransaction);
  monthlyTransaction.weeklyTransactionCollection.push(weeklyTransaction);
  weeklyTransaction.dailyTransactionCollection.push(dailyTransaction);
  updateCustomerTransaction.yearlyTransactionCollection.push(yearlyTransaction);

  expect(TransactionNodeHandler.addCustomerTransaction(transactionRequest, dateTimeParts, updateCustomerTransaction));
});