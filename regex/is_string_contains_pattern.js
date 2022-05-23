const regex = /hello/;

// console.log(regex.test('hello world!'));
//console.log('hello'.test('hello world!')) // TypeError: "hello".test is not a function
// console.log(typeof regex);
// console.log(typeof 'hello');

function isStringContainsPattern(haystack, needle) {
    if ('string' === typeof needle) {
        return haystack.includes(needle);
    }

    return needle.test(haystack);
}

console.log(isStringContainsPattern('hello World!', new RegExp('^hello')));
console.log(isStringContainsPattern('public.zog', /^public\./));