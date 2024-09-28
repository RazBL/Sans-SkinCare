function qs(selector, parent = document) {
    return parent.querySelector(selector)
}


function qsa(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}


function first(arr, n = 1) {

    if (arr.length < 1 || array == undefined)
        return -1;
    else
        return arr.slice(0, n);
        
}
