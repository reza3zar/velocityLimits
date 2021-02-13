export class Validator{

 static validateDataSource = (dataSource: Array<any>):boolean => {
    if (dataSource && dataSource.length > 0)
      return true;
    return false;
   } 
 

}