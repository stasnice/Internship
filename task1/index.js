const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/*ask user for input and precess it using getMin and getMax functions*/
rl.question('Please type some numbers, and press enter to get sum of min and max input value ', (answer) => {
    const sum = getMin(answer) + getMax(answer);
    console.log(getOutputMsg(sum));
    rl.close();
});

function getMin(incString) {
    let min;
    for (let i = 0; i < incString.length; i++){
        if (!isNaN(incString[i]) && min === undefined || incString[i] < min){
            min = incString[i];
        }
    }

    return Number(min);
}

function getMax(incString) {
    let max;
    for (let i = 0; i < incString.length; i++){
        if(!isNaN(incString[i]) && max === undefined || incString[i] > max)
            max = incString[i];
    }

    return Number(max);
}

function getOutputMsg(sum) {
    return (isNaN(sum)) ? 'Check your input.It should contain at least 2 numbers' : `Sum of min and max values is: ${sum}`;
}