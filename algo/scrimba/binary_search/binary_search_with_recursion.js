const search = (elements, targetElement, left = 0, right = elements.length - 1) => {
    if (left > right) {
        return -1;
    }
    
    const middle = Math.floor((right + left) / 2);
    
    if (targetElement === elements[middle]) {
        return middle;
    }
    
    if (targetElement < elements[middle]) {
        return search(elements, targetElement, left, middle - 1);
    }
    
    return search(elements, targetElement, middle + 1, right);
};