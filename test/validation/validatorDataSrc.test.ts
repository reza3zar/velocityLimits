
import * as  errorMessages from '../../setting/transaction-error/errors';
import { ValidatorDataSrc } from '../../validation/validatorDataSrc';
import { TransactionRequest } from '../../models/transaction/transactionRequest';


test("validateDataSource function should return true when input data source has more than one records", () => {
  let dataSrc = new Array<TransactionRequest>();
  let transactionRequest = new TransactionRequest();
  dataSrc.push(transactionRequest)
  expect(ValidatorDataSrc.validateDataSource(dataSrc)).toBe(true);
})

test("validateDataSource function should return false when input data source is empty or undefined", () => {
  expect(ValidatorDataSrc.validateDataSource([])).toBe(false);
}) 