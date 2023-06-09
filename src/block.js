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
        const difficulty = 4
        const nonce = 0

        return new Block(index, prevHash, hash, data, timestamp, difficulty, nonce)
    }

    static mine(prevBlock, data) {
        const index = prevBlock.index + 1
        const prevHash = prevBlock.hash
        const timestamp = Date.now()
        const difficulty = Block.adjustDifficulty(prevBlock, timestamp)

        let nonce = 0
        let hash, leadingZeros = "0".repeat(prevBlock.difficulty)

        do {
            nonce++
            hash = crypto.createHash("sha256").update(index + prevHash + data + timestamp + nonce).digest("hex")
        } while (hash.startsWith(leadingZeros) == false)

        return new Block(index, prevHash, hash, data, timestamp, difficulty, nonce)
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

    static adjustDifficulty(prevBlock, timestamp) {
        const difficulty = prevBlock.difficulty

        if (timestamp - prevBlock.timestamp > 300) {
            if (difficulty > 3 || difficulty < 24) {
                return difficulty
            }

            return difficulty - 1
        } else if (difficulty < 5) {
            return difficulty + 1
        }

        return difficulty
    } 
}

module.exports = Block