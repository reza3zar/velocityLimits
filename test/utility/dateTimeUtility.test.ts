import { DateTimeUtility } from "../../utility/dateTimeUtility"
import { DateTimeParts } from '../../models/common/dateTimeParts';

test("getDateTimeParts test year should return 2010", () => {
  let dateTimeParts = new DateTimeParts();
  dateTimeParts.year = 2010;
  dateTimeParts.month = 1;
  dateTimeParts.week = 7;
  dateTimeParts.day = 5;
  dateTimeParts.hour = 7;
  dateTimeParts.minute = 9;
  dateTimeParts.second = 34;
  dateTimeParts.milliSecond = 0;
  expect(DateTimeUtility.getDateTimeParts("2010-02-12T07:09:34Z")).toEqual(dateTimeParts);
  
})