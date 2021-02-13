import { DailyTransaction } from "./dailyTransaction";

export class WeeklyTransaction{
  week: number;
  dailyTransactionCollection:Array<DailyTransaction> = new Array();
}