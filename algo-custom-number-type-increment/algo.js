/*
 * JavaScript implementation for Adding one
 * to number represented by digits in Array
 */

//Add 1 to the input Array<number> and return the incremented Array<number>
const increment = (number) => {
    // Start with last index
    let index = number.length - 1;

    // while the index is valid and the value at [index] == 9 set it as 0
    while (number[index] == 9) number[index--] = 0;

    // if index < 0 (if all digits were 9)
    if (index < 0)
        // insert 1 at the beginning
        number.unshift(1);
    // else increment the value at [index]
    else number[index]++;

    return number;
};

let number = [9, 9];
for (let index = 0; index < 150; index++) {
    console.log(increment(number));
}
