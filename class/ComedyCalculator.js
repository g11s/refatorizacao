const PerformanceCalculator = require('./PerformanceCalculator.js');

class ComedyCalculator extends PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        super(aPerformance, aPlay);
        
        this.performance = aPerformance;
        this.play = aPlay;
    }
    
    get amount() {
        let result = 0;
        result = 30000;

        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;

        return result;
    }

    get volumeCredits() {
        return super.volumeCredits +  Math.floor(this.performance.audience / 5);
    }
}

module.exports = ComedyCalculator;