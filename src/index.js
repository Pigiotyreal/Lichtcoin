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
}