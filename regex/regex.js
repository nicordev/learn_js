// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

const getTimeRegex = new RegExp('[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}')

let time = '2022-02-28 12:32:51'.match(getTimeRegex);

console.log(time[0])

let timeParts = '2022-02-28 12:32:51'.match(/([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/)

console.log({
    hours: timeParts[1],
    minutes: timeParts[2],
    seconds: timeParts[3],
})