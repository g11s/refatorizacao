const invoices = require('./invoices.json');
const plays = require('./plays.json');

let start = Date.now();
let end = 0;

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`
    const format = new Intl.NumberFormat("en-us",
                                            { style: "currency", currency: "USD", minimumFractionDigits: 2}).format;
    
    for(let perf of invoice.performances) {
        const play = plays[perf.playID];
        const thisAmount = amountFor(perf, play);

        // soma créditos por volume
        volumeCredits += Math.max(perf.audience - 30, 0);
        // soma um crédito extr apara cada dez expectadores de comédia
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

        // exibe a linha para esta requisição
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;
        totalAmount += thisAmount;
    }

    result += `Amount owned is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;


    end = Date.now();

    return result;
}

function amountFor(aPerformance, play) {
    let thisAmount = 0;

    switch(play.type){
        case "tragedy":
            thisAmount = 40000;
            if (aPerformance.audience > 30) {
                thisAmount += 1000 * (aPerformance.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (aPerformance.audience > 20) {
                thisAmount += 10000 + 500 * (aPerformance.audience - 20);
            }
            thisAmount += 300 * aPerformance.audience;
            break;
        default:
            throw new Error(`unknow type: ${play.type}`);
    }

    return thisAmount;
}

const result = statement(invoices[0], plays);

console.log(result);
console.log(`Execution time: ${end - start} ms`);