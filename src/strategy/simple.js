const Strategy = require('./strategy')

class SimpleStrategy extends Strategy {
    async run ({ sticks, time }) {
        const len = sticks.length
       if (len < 20 ) { return } //We want to make sure we got 20 candlesticks worth of data atleast
        
       const penu = sticks[len - 1]
       const last = sticks[len - 1]
       const price = last.close

       const open = this.openPositions()

       if(open.length == 0) {
            if (last < penu) {
                this.onBuySignal({ price })

            }
        } else {
            if (last > penu) {
                open.forEach(p => {
                    this.onSellSignal({ price, size: p.enter.size, position: p })
                })
            }
        }
    } 
}

module.exports = SimpleStrategy