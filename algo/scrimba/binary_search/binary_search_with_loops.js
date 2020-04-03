/**
 * Find the index of an element inside an array using binary search.
 * 
 * Return -1 if the element is not in the array.
 * 
 * @param {Array} array 
 * @param {Integer} element 
 */
let binarySearchWithLoops = (array, element) => {
    
    let getMedium = (left, right) => Math.floor((left + right) / 2);
    let left = 0;
    let right = array.length - 1;
    let middle = null;
    let currentElement = null;
    
    while (left <= right) {
        middle = getMedium(left, right);
        currentElement = array[middle];
        
        if (currentElement === element) {
            return middle;
        }
        
        if (currentElement > element) {
            right = middle - 1;
            continue;
        }
        
        left = middle + 1;
    }
    
    return -1;
};