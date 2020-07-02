import { setCookie, convertDaysToMilliseconds, getCookie, deleteCookie } from './cookies.js'

const cookieName = 'zog-cookie';

setCookie(cookieName, 'Hello world!', convertDaysToMilliseconds(1));

console.log(getCookie(cookieName));

deleteCookie(cookieName);

console.log(getCookie(cookieName));