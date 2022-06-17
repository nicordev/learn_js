function main() {
    throw 'hello world!';
}

try {
    main();
} catch (error) {
    console.log(error);
}

try {
    throw new Error('what?');
} catch (error) {
    console.log(error);
}
