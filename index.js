/*
This is our starting point.Currently We are requesting 
24 hours of historical data with 5 mins of candlesticks. 
So we will receive 288 data points of the past 
24 hours of historical data.
*/
// Requires
const program = require('commander')
const Backtester = require('./src/backtester')
const Trader = require('./src/trader')
const config = require('./configuration')
const Ticker = require('./src/ticker')

//Get current date and time (It is in UTC)
const now = new Date()
//Yesterday is exactly 24 hours back from current time.
const yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1e3))

function toDate(val) {
  return new Date(val * 1e3)

}

program.version('1.0.0')
  .option('-i, --interval [interval]', 'Interval in seconds for candlestick', parseInt)
  .option('-p, --product [product]', 'Product Identifier', 'BTC-USD')
  .option('-s, --start [start]', 'Start Time in Unix seconds', toDate, yesterday)
  .option('-e, --end [end]', 'End time in unix seconds', toDate, now)
  .option('-t, --strategy [strategy]', 'Strategy Type')
  .option('-l, --live', 'Run live')
  .parse(process.argv)

// To set api key and all that safely, do this on the command line:
// export COINBASEPRO_API_KEY = "your key"

//The code starts executing from the main.
const main = async function() {
  const { interval, product, start, end, strategy, live } = program

  if (live) {
    const trader = new Trader({
      start, end, product, interval, strategyType: strategy
    })

    await trader.start()

  } else {
    const tester = new Backtester({ 
      start, end, product, interval, strategyType: strategy 
    }) //Create a new object of Historical
    
    await tester.start()
  }
}

main()