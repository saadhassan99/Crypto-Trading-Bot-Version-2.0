/*
Trade module will keep track of the summary of a particular trade taken.
Main, 
The price we got filled at,
The time the trade got executed,
and the size of the trade.
*/
class Trade {
    constructor({ price, time, size }) {
      this.price = price
      this.time = time
      this.size = size
    }
  }
  
  module.exports = Trade