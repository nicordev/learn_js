function transformString(string) {
    return `${string[0].toUpperCase()}${string.substring(1)}1`
}

console.log(transformString('hello@world'));