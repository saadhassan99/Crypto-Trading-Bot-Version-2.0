const Candlestick = require('../models/candlestick')
const Historical = require('../historical')
const { Simple } = require('../strategy/simple')

class Backtester {
    constructor ({ start, end, interval, product }) {
        this.start = start
        this.end = end
        this.interval
        this.product = product
        this.historical = new Historical ({
            start, end, interval, product
        })
    }

    async start() {
        try {
            const history = await this.historical.getData()
            this.strategy = new Simple({
                onBuySignal: (x) => { this.onBuySignal(x)},
                onSellSignal: (x) => { this.onSellSignal(x)}
            })

            

        } catch (error) {
            console.log(error)
        }
    }

    onBuySignal({ price }) {

    }

    onSellSignal({ price, size }) {

    }
}

module.exports = Backtester