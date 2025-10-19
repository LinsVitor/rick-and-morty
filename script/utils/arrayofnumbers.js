export function arrayOfNumbers(start, end, step=1) {
    let array = [];
    let number = start;
    for (let i = start; i <= end; i++) {
        number += step;
        array.push(number);
    }
    return array;
}

console.log(arrayOfNumbers(9, 16))