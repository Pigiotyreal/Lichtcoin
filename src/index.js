const crypto = require("crypto")

class Block {
    constructor(index, prevHash, hash, data, timestamp, difficulty, nonce) {
        this.index = index
        this.prevHash = prevHash
        this.hash = hash
        this.data = data
        this.timestamp = timestamp
        this.difficulty = difficulty
        this.nonce = nonce
    }

    static get genesis() {
        const index = 0
        const prevHash = "0".repeat(64)
        const hash = crypto.createHash("sha256").update("Genesis Block").digest("hex")
        const data = "Genesis Block"
        const timestamp = 0
        const difficulty = 5
        const nonce = 0

        return new Block(index, prevHash, hash, data, timestamp, difficulty, nonce)
    }

    static mine(prevBlock, data) {
        const index = prevBlock.index + 1
        const prevHash = prevBlock.hash
        const timestamp = Date.now()
        let nonce = 0
        let hash, leadingZeros = "0".repeat(prevBlock.difficulty)

        do {
            nonce++
            hash = crypto.createHash("sha256").update(index + prevHash + data + timestamp + nonce).digest("hex")
        } while (hash.startsWith(leadingZeros) == false)

        return new Block(index, prevHash, hash, data, timestamp, prevBlock.difficulty, nonce)
    }

    static isValid(block, prevBlock) {
        if (block.index != prevBlock.index + 1) {
            return false
        } else if (block.prevHash != prevBlock.hash) {
            return false
        } else if (block.hash != Block.computeHash(block)) {
            return false
        }

        return true
    }

    static computeHash(block) {
        return crypto.createHash("sha256").update(block.index + block.prevHash + block.data + block.timestamp + block.nonce).digest("hex")
    }
}

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

const genesisBlock = Block.genesis
console.log(genesisBlock)

const block = Block.mine(genesisBlock, "Hello World")
console.log(block)

const blockchain = new Blockchain()
blockchain.addBlock("Hello World")
blockchain.addBlock("Hello World")
blockchain.addBlock("Hello World")
console.log(blockchain)

console.log(blockchain.isValid())