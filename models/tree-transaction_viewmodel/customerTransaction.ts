import {   YearlyTransaction } from "./yearlyTransaction";

export class CustomerTransaction{
  customer_id: string;
  yearlyTransactionCollection: Array<YearlyTransaction> = new Array();
}