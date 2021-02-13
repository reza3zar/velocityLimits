"use strict";
exports.__esModule = true;
exports.DateTimeUtility = void 0;
var dateTimeParts_1 = require("../models/common/dateTimeParts");
var moment = require("moment");
var errors_1 = require("../setting/transaction-error/errors");
var DateTimeUtility = /** @class */ (function () {
    function DateTimeUtility() {
    }
    DateTimeUtility.getDateTimeParts = function (dateTime) {
        if (!dateTime)
            throw new Error(errors_1.errors['date-time-format-is-wrong']);
        var dateTimeParts = new dateTimeParts_1.DateTimeParts();
        dateTimeParts.year = moment.utc(dateTime).year();
        dateTimeParts.month = moment.utc(dateTime).month();
        dateTimeParts.week = moment.utc(dateTime).week();
        dateTimeParts.day = moment.utc(dateTime).day();
        dateTimeParts.hour = moment.utc(dateTime).hour();
        dateTimeParts.minute = moment.utc(dateTime).minute();
        dateTimeParts.milliSecond = moment.utc(dateTime).millisecond();
        return dateTimeParts;
    };
    return DateTimeUtility;
}());
exports.DateTimeUtility = DateTimeUtility;
