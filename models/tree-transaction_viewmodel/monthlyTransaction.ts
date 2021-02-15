import { WeeklyTransaction } from "./weeklyTransaction";

export class MonthlyTransaction{
  month: number;
  weeklyTransactionCollection: Array<WeeklyTransaction> = new Array();
}