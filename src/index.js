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
        const data = "Genesis Block"
        const timestamp = 0
        const difficulty = 0
        const nonce = 0

        return new Block(index, prevHash, data, timestamp, difficulty, nonce)
    }
}