"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var transactions = __importStar(require("./data/transactions.json"));
var outPut = __importStar(require("./data/outPut.json"));
var moment = __importStar(require("moment"));
var customerTransaction_1 = require("./models/customerTransaction");
var transactionsDb = transactions;
function transactionManag(TransactionRequest) {
    var transaction = new customerTransaction_1.Transaction();
    transaction.id = TransactionRequest.id;
    transaction.load_amount = TransactionRequest.load_amount;
    transaction.time = TransactionRequest.time;
    return transaction;
}
function transactionDayManag(transactionTime, transaction) {
    var transactionDay = new customerTransaction_1.TransactionDay();
    transactionDay.dayNumber = moment.utc(transactionTime).day();
    transactionDay.transactionDetailCollection.push(transaction);
    return transactionDay;
}
function transactionWeekManag(transactionTime, transactionDay) {
    var transactionWeek = new customerTransaction_1.TransactionWeek();
    transactionWeek.weekNumber = moment.utc(transactionTime).week();
    transactionWeek.transactinDayCollection.push(transactionDay);
    return transactionWeek;
}
function transactionMonthManag(transactionTime, transactionWeek) {
    var transactionMonth = new customerTransaction_1.MonthTransaction();
    transactionMonth.monthNumber = moment.utc(transactionTime).month();
    transactionMonth.transactionWeekCollection.push(transactionWeek);
    return transactionMonth;
}
function transactionYearManag(transactionTime, transactionMonth) {
    var transactionYear = new customerTransaction_1.YearTransaction();
    transactionYear.year = moment.utc(transactionTime).year();
    transactionYear.transactionMonthCollection.push(transactionMonth);
    return transactionYear;
}
function customerTransactionManag(transactionCustomerId, transactionId, transactionYear) {
    var customerTransaction = new customerTransaction_1.CustomerTransaction();
    customerTransaction.customer_id = transactionCustomerId;
    // customerTransaction.id = transactionId;
    customerTransaction.yearTransactionCollection.push(transactionYear);
    return customerTransaction;
}
function customersTransactionManagement(TransactionRequest) {
    var transactionDetail = transactionManag(TransactionRequest);
    var transactionDay = transactionDayManag(TransactionRequest.time, transactionDetail);
    var transactionWeek = transactionWeekManag(TransactionRequest.time, transactionDay);
    var transactionMonth = transactionMonthManag(TransactionRequest.time, transactionWeek);
    var transactionYear = transactionYearManag(TransactionRequest.time, transactionMonth);
    var customerTransaction = customerTransactionManag(TransactionRequest.customer_id, TransactionRequest.id, transactionYear);
    return customerTransaction;
}
function yearTransactionManagement(TransactionRequest) {
    var transactionDetail = transactionManag(TransactionRequest);
    var transactionDay = transactionDayManag(TransactionRequest.time, transactionDetail);
    var transactionWeek = transactionWeekManag(TransactionRequest.time, transactionDay);
    var transactionMonth = transactionMonthManag(TransactionRequest.time, transactionWeek);
    var transactionYear = transactionYearManag(TransactionRequest.time, transactionMonth);
    return transactionYear;
}
function monthTransactionManagement(TransactionRequest) {
    var transactionDetail = transactionManag(TransactionRequest);
    var transactionDay = transactionDayManag(TransactionRequest.time, transactionDetail);
    var transactionWeek = transactionWeekManag(TransactionRequest.time, transactionDay);
    var transactionMonth = transactionMonthManag(TransactionRequest.time, transactionWeek);
    return transactionMonth;
}
function weekTransactionManagement(TransactionRequest) {
    var transactionDetail = transactionManag(TransactionRequest);
    var transactionDay = transactionDayManag(TransactionRequest.time, transactionDetail);
    var transactionWeek = transactionWeekManag(TransactionRequest.time, transactionDay);
    return transactionWeek;
}
function dayTransactionManagement(TransactionRequest) {
    var transactionDetail = transactionManag(TransactionRequest);
    var transactionDay = transactionDayManag(TransactionRequest.time, transactionDetail);
    return transactionDay;
}
function transactionManagement(TransactionRequest) {
    var transactionDetail = transactionManag(TransactionRequest);
    return transactionDetail;
}
function checkIsExistYear(customerId, year, customerTransaction) {
    var customerSearched = customerTransaction.customer_id === customerId;
    if (!customerSearched)
        throw new Error("checkIsExistYear has error");
    var yearfinded = customerTransaction.yearTransactionCollection.filter(function (x) { return x.year === year; });
    if (yearfinded && yearfinded.length > 1) {
        throw new Error("checkIsExistYear 2 has error");
    }
    if (yearfinded && yearfinded.length === 1)
        return true;
    return false;
}
function checkIsExistMonth(customerId, year, month, customerTransaction) {
    var customerSearched = customerTransaction.customer_id === customerId;
    if (!customerSearched)
        throw new Error("checkIsExistYear has error");
    var yearfinded = customerTransaction.yearTransactionCollection.filter(function (x) { return x.year === year; });
    if (yearfinded && yearfinded.length !== 1)
        throw new Error("checkIsExistMonth has error");
    var monthfinded = yearfinded[0].transactionMonthCollection.filter(function (x) { return x.monthNumber === month; });
    if (monthfinded && monthfinded.length > 0)
        return true;
    return false;
}
function checkIsExistWeek(year, month, week, customerTransaction) {
    var yearfinded = customerTransaction.yearTransactionCollection.filter(function (x) { return x.year === year; });
    if (yearfinded && yearfinded.length !== 1)
        throw new Error("checkIsExistWeek has error");
    var monthfinded = yearfinded[0].transactionMonthCollection.filter(function (x) { return x.monthNumber === month; });
    if (monthfinded && monthfinded.length !== 1)
        throw new Error("checkIsExistWeek 2 has error");
    var weekfinded = monthfinded[0].transactionWeekCollection.filter(function (x) { return x.weekNumber === week; });
    if (weekfinded && weekfinded.length > 0)
        return true;
    return false;
}
function checkIsExistDay(year, month, week, day, customerTransaction) {
    var yearfinded = customerTransaction.yearTransactionCollection.filter(function (x) { return x.year === year; });
    if (yearfinded && yearfinded.length !== 1)
        throw new Error("checkIsExistDay has error");
    var monthfinded = yearfinded[0].transactionMonthCollection.filter(function (x) { return x.monthNumber === month; });
    if (monthfinded && monthfinded.length !== 1)
        throw new Error("checkIsExistDay 2 has error");
    var weekfinded = monthfinded[0].transactionWeekCollection.filter(function (x) { return x.weekNumber === week; });
    if (weekfinded && weekfinded.length !== 1)
        throw new Error("checkIsExistDay 3 has error");
    var dayfinded = weekfinded[0].transactinDayCollection.filter(function (x) { return x.dayNumber === day; });
    if (dayfinded && dayfinded.length > 0)
        return true;
    return false;
}
var customerTransactionCollection = [];
transactionsDb.forEach(function (item) {
    var findItem = customerTransactionCollection.filter(function (x) { return x.customer_id === item.customer_id; });
    // let duplicate = customerTransactionCollection.filter(x => x.customer_id === item.customer_id && x.id === item.id)
    // if (duplicate && duplicate.length>0) {
    //   console.log('duplicate :', item); //6928
    //   return;
    // }
    if (!findItem || findItem.length == 0) {
        var insertInfo = customersTransactionManagement(item);
        customerTransactionCollection.push(insertInfo);
    }
    else if (!checkIsExistYear(item.customer_id, moment.utc(item.time).year(), findItem[0])) {
        var insertInfo = yearTransactionManagement(item);
        findItem[0].yearTransactionCollection.push(insertInfo);
    }
    else if (!checkIsExistMonth(item.customer_id, moment.utc(item.time).year(), moment.utc(item.time).month(), findItem[0])) {
        var insertInfo = monthTransactionManagement(item);
        findItem[0].yearTransactionCollection.filter(function (x) { return x.year === moment.utc(item.time).year(); })[0].transactionMonthCollection.push(insertInfo);
        // findItem[0].yearTransactionCollection[0].transactionMonthCollection.push(insertInfo);
    }
    else if (!checkIsExistWeek(moment.utc(item.time).year(), moment.utc(item.time).month(), moment.utc(item.time).week(), findItem[0])) {
        var insertInfo = weekTransactionManagement(item);
        findItem[0].yearTransactionCollection.filter(function (x) { return x.year === moment.utc(item.time).year(); })[0]
            .transactionMonthCollection.filter(function (x) { return x.monthNumber === moment.utc(item.time).month(); })[0].transactionWeekCollection.push(insertInfo);
        // findItem[0].yearTransactionCollection[0].transactionMonthCollection[0].transactionWeekCollection.push(insertInfo);
    }
    else if (!checkIsExistDay(moment.utc(item.time).year(), moment.utc(item.time).month(), moment.utc(item.time).week(), moment.utc(item.time).day(), findItem[0])) {
        var insertInfo = dayTransactionManagement(item);
        findItem[0].yearTransactionCollection.filter(function (x) { return x.year === moment.utc(item.time).year(); })[0]
            .transactionMonthCollection.filter(function (x) { return x.monthNumber === moment.utc(item.time).month(); })[0]
            .transactionWeekCollection.filter(function (x) { return x.weekNumber === moment.utc(item.time).week(); })[0].transactinDayCollection.push(insertInfo);
        // findItem[0].yearTransactionCollection[0].transactionMonthCollection[0].transactionWeekCollection[0].transactinDayCollection.push(insertInfo);
    }
    else {
        var insertInfo = transactionManagement(item);
        findItem[0].yearTransactionCollection.filter(function (x) { return x.year === moment.utc(item.time).year(); })[0]
            .transactionMonthCollection.filter(function (x) { return x.monthNumber === moment.utc(item.time).month(); })[0]
            .transactionWeekCollection.filter(function (x) { return x.weekNumber === moment.utc(item.time).week(); })[0]
            .transactinDayCollection.filter(function (x) { return x.dayNumber === moment.utc(item.time).day(); })[0]
            .transactionDetailCollection.push(insertInfo);
    }
});
customerTransactionCollection.forEach(function (x) {
    // console.log('customer :',x.customer_id)
    x.yearTransactionCollection.forEach(function (x) {
        var year = x.year;
        x.transactionMonthCollection.forEach(function (x) {
            var month = x.monthNumber;
            x.transactionWeekCollection.forEach(function (x) {
                var week = x.weekNumber;
                x.transactinDayCollection.forEach(function (x) {
                    var day = x.dayNumber;
                    x.transactionDetailCollection.forEach(function (x) {
                        // console.log(x.id, x.load_amount, moment.utc(x.time).year(), moment.utc(x.time).month(), moment.utc(x.time).week()
                        //   , moment.utc(x.time).day(), x.time)
                        // console.warn(x.id, x.load_amount, year, month, week
                        //   , day, x.time)
                        // if (moment.utc(x.time).year() !== year || moment.utc(x.time).month() !== month || moment.utc(x.time).week() !== week
                        //     || moment.utc(x.time).day()!==day) {
                        //   console.log('ERRRRRRRRRRROR',x)
                        // }
                    });
                });
            });
        });
    });
});
var customer290Out = outPut.filter(function (x) { return x.customer_id === '562'; });
customer290Out.forEach(function (element) {
    console.log(element);
});
var customer290 = customerTransactionCollection.filter(function (x) { return x.customer_id === '562'; });
var myOuput = [];
customer290.forEach(function (x) {
    var customer_id = x.customer_id;
    x.yearTransactionCollection.forEach(function (element) {
        element.transactionMonthCollection.forEach(function (month) {
            month.transactionWeekCollection.forEach(function (week) {
                var sumWeek = 0;
                week.transactinDayCollection.forEach(function (days) {
                    var daySum = 0;
                    var counterlimitDay = 0;
                    days.transactionDetailCollection.forEach(function (dayDetail) {
                        var load_amount = Number(dayDetail.load_amount.replace(/[^0-9.-]+/g, ""));
                        var id = dayDetail.id;
                        var load_amo = dayDetail.load_amount;
                        var time = dayDetail.time;
                        counterlimitDay++;
                        var hasDuplicatedRecord = myOuput.filter(function (x) { return x.id === id && x.customer_id === customer_id; });
                        if (hasDuplicatedRecord && hasDuplicatedRecord.length > 0) {
                            console.log('id ' + id + ' load_amount ' + load_amo + ' time ' + time + ' Status: Duplicate');
                            return;
                        }
                        if (daySum <= 5000 && (daySum + load_amount) <= 5000 && sumWeek <= 20000 && sumWeek + load_amount <= 20000 && counterlimitDay <= 3) {
                            daySum += load_amount;
                            // console.log('id ' + id + ' load_amount ' + load_amo + ' time ' + time + ' Status: True');
                            myOuput.push({ "id": id, "customer_id": customer_id, "load_amount": load_amo, "time": time, "Status": true });
                        }
                        else {
                            myOuput.push({ "id": id, "customer_id": customer_id, "load_amount": load_amo, "time": time, "Status": false });
                        }
                    });
                });
            });
        });
    });
});
myOuput.forEach(function (element) {
    console.log(element);
});
// console.log(transactionsDb.length);
// const unique= transactionsDb.map(item => item.customer_id)
//   .filter((value, index, self) => self.indexOf(value) === index)
// console.log(unique.length)
// console.log(customerTransactionCollection.length);
console.log('------------------------------------------END --------------------------------------------------------');
