function getFibonator()
{
    let previous = 0;
    let current = 1;

    return function()
    {
        const result = previous + current;
        previous = current;
        current = result;

        return previous;
    }
}

let fib = getFibonator();
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());

