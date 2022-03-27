function fizzbuzz(number) {
    if (number % 15 === 0) return "FizzBuzz";
    else if (number % 5 === 0) return "Buzz";
    else if (number % 3 === 0) return "Fizz";
    else return number;
}

const max = 1500;
for (let index = 1; index <= max; index++) {
    console.log(fizzbuzz(index));
}
