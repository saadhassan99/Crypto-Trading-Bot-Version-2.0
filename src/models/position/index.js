/*To take a position, the bot will call the Position module 
to either enter in a trade or close the trade*/

class Position {
    constructor ({ trade, id }) {
        this.state = 'open'
        this.enter = trade
        this.id = id
    }

    close({ trade }) {
        this.state = 'closed'
        this.exit = trade
    }
}

module.exports = Position