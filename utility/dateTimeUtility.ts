import { DateTimeParts } from '../models/common/dateTimeParts';
import * as moment from 'moment';
import { errors } from '../setting/transaction-error/errors';

export class DateTimeUtility{

   static getDateTimeParts = (dateTime: string):DateTimeParts => {
    if (!dateTime)
        throw new Error(errors['date-time-format-is-wrong']);
      
     let dateTimeParts = new DateTimeParts();

     dateTimeParts.year = moment.utc(dateTime).year();
     dateTimeParts.month = moment.utc(dateTime).month();
     dateTimeParts.week = moment.utc(dateTime).week();
     dateTimeParts.day = moment.utc(dateTime).day();
     dateTimeParts.hour = moment.utc(dateTime).hour();
     dateTimeParts.minute = moment.utc(dateTime).minute();
     dateTimeParts.milliSecond = moment.utc(dateTime).millisecond();
      
    return dateTimeParts;
  }
  
 
 
 }