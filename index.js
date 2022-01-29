const invoices = require('./invoices.json');
const plays = require('./plays.json');

let start = Date.now();
let end = 0;

function statement(invoice) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`
    const format = new Intl.NumberFormat("en-us",
                                            { style: "currency", currency: "USD", minimumFractionDigits: 2}).format;
    
    for(let perf of invoice.performances) {
        const thisAmount = amountFor(perf);

        // soma créditos por volume
        volumeCredits += Math.max(perf.audience - 30, 0);
        // soma um crédito extr apara cada dez expectadores de comédia
        if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

        // exibe a linha para esta requisição
        result += ` ${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }

    result += `Amount owned is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;


    end = Date.now();

    return result;
}

function amountFor(aPerformance) {
    let result = 0;

    switch(playFor(aPerformance).type){
        case "tragedy":
            result = 40000;
            if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy":
            result = 30000;
            if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }
            result += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`unknow type: ${playFor(aPerformance).type}`);
    }

    return result;
}

function playFor(aPerformance) {
    return plays[aPerformance.playID];
}

const result = statement(invoices[0]);

console.log(result);
console.log(`Execution time: ${end - start} ms`);