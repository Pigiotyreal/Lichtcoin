const Block = require("./block")

class Blockchain {
    constructor() {
        this.blocks = [Block.genesis]
    }

    addBlock(data) {
        const prevBlock = this.blocks[this.blocks.length - 1]
        const block = Block.mine(prevBlock, data)
        this.blocks.push(block)
    }

    isValid() {
        for (let i = 1; i < this.blocks.length; i++) {
            const block = this.blocks[i]
            const prevBlock = this.blocks[i - 1]

            if (Block.isValid(block, prevBlock) == false) {
                return false
            }
        }

        return true
    }
}

module.exports = Blockchain