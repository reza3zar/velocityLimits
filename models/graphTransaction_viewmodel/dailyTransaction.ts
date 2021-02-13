import { Transaction } from "../transaction/transaction";

export class DailyTransaction{
  day: number;
  transactionCollection: Array<Transaction> = new Array();
}