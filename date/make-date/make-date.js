function makeDate(datetime, dateTimeSeparator, dateSeparator, timeSeparator) {
    var datetimeMainParts = datetime.split(dateTimeSeparator);
    var dateParts = datetimeMainParts[0].split(dateSeparator);
    var timeParts = datetimeMainParts[1].split(timeSeparator);
    var year = dateParts[2];
    var monthIndex = dateParts[1] - 1;
    var day = dateParts[0];
    var hour = timeParts[0];
    var minute = timeParts[1];
    var second = timeParts[2];

    return new Date(year, monthIndex, day, hour, minute, second);
}
