const createStatementData = require('./createStatementData.js');
const invoices = require('./data/invoices.json');

const invoice = invoices[0]

function statement(invoice) {
    return renderPlainText(createStatementData(invoice));
}

function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;
    
    for(let perf of data.performances) {
        result += ` ${perf.play.name}: ${usd(perf.amount/100)} (${perf.audience} seats)\n`;
    }
    
    result += `Amount owned is ${usd(data.totalAmount/100)}\n`;
    result += `You earned ${data.totalVolumeCredits} credits\n`;

    return result;
}

function usd(aNumber) {
    return new Intl.NumberFormat("en-us",
                                            { style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber);
}

console.log(statement(invoice));