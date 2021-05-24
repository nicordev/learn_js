function removeDuplicates(myArray) {
    return myArray.filter((currentItem, currentKey, items) => items.indexOf(currentItem) === currentKey)
}

const fruits = [
    'apple',
    'apple',
    'pear',
    'pear',
    'raspberry'
]

console.log(removeDuplicates(fruits))