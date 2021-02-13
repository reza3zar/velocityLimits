import { MonthlyTransaction } from "./monthlyTransaction";

export class YearlyTransaction{
  year: number;
  monthlyTransactionCollection: Array<MonthlyTransaction> = new Array();
}