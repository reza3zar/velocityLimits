
import * as  errorMessages from '../setting/transaction-error/errors';

export class ValidatorDataSrc{

  static validateDataSource = (dataSource: Array<any>): boolean => {
    if (dataSource && dataSource.length > 0)
      return true;
    return false;
   } 
}