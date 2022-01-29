const PerformanceCalculator = require('./PerformanceCalculator.js');

class TragedyCalculator extends PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        super(aPerformance, aPlay);
        this.performance = aPerformance;
        this.play = aPlay;
    }
    
    get amount() {
        let result = 0;
        result = 40000;
        
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }

        return result;
    }
}

module.exports = TragedyCalculator;