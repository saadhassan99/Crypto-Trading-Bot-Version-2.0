/*
This is our starting point.Currently We are requesting 
24 hours of historical data with 5 mins of candlesticks. 
So we will receive 288 data points of the past 
24 hours of historical data.
*/
// Requires
const program = require('commander')
const Historical = require('./src/historical')
const config = require("./configuration")

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
  .parse(process.argv)

// To set api key and all that safely, do this on the command line:
// export COINBASEPRO_API_KEY = "your key"

//The code starts executing from the main.
const main = async function() {
  const { interval, product, start, end } = program

  const service = new Historical({ start, end, product, interval }) //Create a new object of Historical
  
  const data = await service.getData() //Get data.
  
  console.log(data[0])
  console.log(data[data.length - 1])
  console.log(data.length)
  
}

main()